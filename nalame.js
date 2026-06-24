(function () {
  'use strict';

  class MtkNalame {
    constructor(root) {
      this.root = root;
      this.config = window.NalameConfig || {};
      this.app = this.config.app || {};
      this.questions = Array.isArray(this.config.questions) ? this.config.questions : [];
      this.stepIndex = 0;
      this.answers = {};
      this.statusText = '';
      this.touchStartX = 0;
      this.touchEndX = 0;
      this.handleClick = this.handleClick.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleKeydown = this.handleKeydown.bind(this);
      this.handleTouchStart = this.handleTouchStart.bind(this);
      this.handleTouchEnd = this.handleTouchEnd.bind(this);
      this.init();
    }

    init() {
      if (!this.root || this.root.dataset.nalameInitialized === 'true') {
        return;
      }
      this.root.dataset.nalameInitialized = 'true';
      this.loadScss('nalame.scss');
      this.root.addEventListener('click', this.handleClick);
      this.root.addEventListener('change', this.handleChange);
      this.root.addEventListener('keydown', this.handleKeydown);
      this.root.addEventListener('touchstart', this.handleTouchStart, { passive: true });
      this.root.addEventListener('touchend', this.handleTouchEnd, { passive: true });
      this.render();
      this.publish('nalame:ready', { totalQuestions: this.questions.length });
    }

    loadScss(href) {
      if (document.querySelector('style[data-nalame-scss]')) {
        return;
      }
      fetch(href, { cache: 'no-cache' })
        .then((response) => response.ok ? response.text() : '')
        .then((scss) => {
          if (!scss) {
            return;
          }
          const style = document.createElement('style');
          style.setAttribute('data-nalame-scss', href);
          style.textContent = scss;
          document.head.appendChild(style);
        })
        .catch(() => {});
    }

    get totalQuestionSteps() {
      return this.questions.length * 2;
    }

    get questionIndex() {
      return Math.floor(this.stepIndex / 2);
    }

    get isConversationStep() {
      return this.stepIndex % 2 === 0;
    }

    get isSummaryStep() {
      return this.stepIndex >= this.totalQuestionSteps;
    }

    getCurrentQuestion() {
      return this.questions[this.questionIndex] || null;
    }

    handleClick(event) {
      const actionTarget = event.target.closest('[data-nalame-action]');
      if (!actionTarget) {
        return;
      }
      const action = actionTarget.getAttribute('data-nalame-action');
      switch (action) {
        case 'back':
          this.previous();
          break;
        case 'continue':
          this.next();
          break;
        case 'restart':
          this.restart();
          break;
        default:
          break;
      }
    }

    handleChange(event) {
      const input = event.target.closest('[data-nalame-answer]');
      if (!input) {
        return;
      }
      const question = this.getCurrentQuestion();
      const selectedAnswer = this.findAnswer(question, input.value);
      if (!question || !selectedAnswer) {
        return;
      }
      this.answers[question.id] = selectedAnswer.id;
      this.statusText = '';
      this.publish('nalame:answerSelected', {
        questionId: question.id,
        answerId: selectedAnswer.id,
        answerText: selectedAnswer.text,
        index: this.questionIndex
      });
      this.render();
    }

    handleKeydown(event) {
      if (event.altKey || event.ctrlKey || event.metaKey) {
        return;
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        this.next();
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        this.previous();
      }
    }

    handleTouchStart(event) {
      this.touchStartX = event.changedTouches && event.changedTouches[0] ? event.changedTouches[0].clientX : 0;
    }

    handleTouchEnd(event) {
      this.touchEndX = event.changedTouches && event.changedTouches[0] ? event.changedTouches[0].clientX : 0;
      const delta = this.touchStartX - this.touchEndX;
      if (Math.abs(delta) < 60) {
        return;
      }
      if (delta > 0) {
        this.next();
      } else {
        this.previous();
      }
    }

    findAnswer(question, answerId) {
      if (!question || !Array.isArray(question.answers)) {
        return null;
      }
      return question.answers.find((answer) => answer.id === answerId) || null;
    }

    next() {
      if (this.isSummaryStep) {
        return;
      }

      const question = this.getCurrentQuestion();

      if (!this.isConversationStep && question && !this.answers[question.id]) {
        this.statusText = this.app.requiredMessage || 'Select one option.';
        this.render();
        return;
      }

      this.stepIndex = Math.min(this.stepIndex + 1, this.totalQuestionSteps);
      this.statusText = '';
      this.publish('nalame:next', {
        stepIndex: this.stepIndex,
        questionIndex: this.questionIndex,
        complete: this.isSummaryStep,
        questionId: this.getCurrentQuestion() ? this.getCurrentQuestion().id : ''
      });
      this.render();
    }

    previous() {
      if (this.stepIndex <= 0) {
        return;
      }
      this.stepIndex -= 1;
      this.statusText = '';
      this.publish('nalame:previous', {
        stepIndex: this.stepIndex,
        questionIndex: this.questionIndex,
        questionId: this.getCurrentQuestion() ? this.getCurrentQuestion().id : ''
      });
      this.render();
    }

    restart() {
      this.stepIndex = 0;
      this.answers = {};
      this.statusText = '';
      this.publish('nalame:restart', { totalQuestions: this.questions.length });
      this.render();
    }

    publish(type, detail) {
      const payload = {
        source: 'nalame',
        type,
        detail: detail || {},
        timestamp: new Date().toISOString()
      };
      if (window.wc && typeof window.wc.publish === 'function') {
        window.wc.publish(type, payload);
      }
    }

    render() {
      this.root.innerHTML = this.template();
    }

    template() {
      return `
        <div class="nalame__shell">
          ${this.progressTemplate()}
          ${this.headerTemplate()}
          <main class="nalame__main">
            ${this.isSummaryStep ? this.summaryTemplate() : this.carouselTemplate()}
          </main>
          <div class="nalame__sr-only" aria-live="polite">${this.escape(this.statusText || '')}</div>
        </div>
      `;
    }

    progressTemplate() {
      const completedQuestions = Math.min(this.questionIndex, this.questions.length);
      const progress = this.totalQuestionSteps ? (this.stepIndex / this.totalQuestionSteps) * 100 : 0;
      return `
        <div class="nalame__progress-wrap" aria-label="${this.escape(this.app.progressLabel || 'Question')} ${completedQuestions} of ${this.questions.length}">
          <span class="nalame__progress-track" aria-hidden="true">
            <span class="nalame__progress-bar" style="width: ${progress}%"></span>
          </span>
        </div>
      `;
    }

    headerTemplate() {
      return `
        <header class="nalame__header">
          <div class="nalame__brand">
            <span class="nalame__eyebrow">${this.escape(this.app.eyebrow || '')}</span>
            <h1 class="nalame__title">${this.escape(this.app.title || '')}</h1>
          </div>
        </header>
      `;
    }

    carouselTemplate() {
      return `
        <section class="nalame__carousel" aria-label="Question carousel">
          <div class="nalame__track" style="transform: translateX(-${this.stepIndex * 100}%);">
            ${this.questions.map((question, index) => this.conversationSlideTemplate(question, index)).join('')}
            ${this.questions.map((question, index) => this.questionSlideTemplate(question, index)).join('')}
          </div>
        </section>
      `;
    }

    orderedSlidesTemplate() {
      return this.questions.map((question, index) => `
        ${this.conversationSlideTemplate(question, index)}
        ${this.questionSlideTemplate(question, index)}
      `).join('');
    }

    carouselTemplate() {
      return `
        <section class="nalame__carousel" aria-label="Question carousel">
          <div class="nalame__track" style="transform: translateX(-${this.stepIndex * 100}%);">
            ${this.orderedSlidesTemplate()}
          </div>
        </section>
      `;
    }


    getRandomLocksmithImage() {
      const images = [
        'https://images.unsplash.com/photo-1517048676732-d65bc937f952',
        'https://images.unsplash.com/photo-1521791136064-7986c2920216',
        'https://images.unsplash.com/photo-1556155092-490a1ba16284',
        'https://images.unsplash.com/photo-1450101499163-c8848c66ca85',
        'https://images.unsplash.com/photo-1581092921461-eab62e97a780'
      ];
      return images[Math.floor(Math.random() * images.length)];
    }

    conversationSlideTemplate(question, index) {
      const step = index * 2;
      const isActive = step === this.stepIndex;
      return `
        <section class="nalame__slide nalame__slide--conversation ${isActive ? 'is-active' : ''}" aria-labelledby="nalame-conversation-title-${index}" ${isActive ? '' : 'aria-hidden="true"'}>
          <div class="nalame__conversation-card">
            
            <div class="nalame__conversation-image-holder" aria-hidden="true"><img class="nalame__conversation-image" src="https://picsum.photos/600/350?random=1" alt=""></div><h2 class="nalame__conversation-title" id="nalame-conversation-title-${index}">${this.escape(question && question.conversation ? question.conversation : '')}</h2>
            <div class="nalame__question-images">
              <div class="nalame__question-image nalame__question-image--1"></div>
              <div class="nalame__question-image nalame__question-image--2"></div>
              <div class="nalame__question-image nalame__question-image--3"></div>
            </div>
            <p class="nalame__conversation-copy">${this.escape(question && question.conversation ? question.conversation : '')}</p>
            <div class="nalame__conversation-actions">
              <button class="nalame__button nalame__button--primary nalame__button--center" type="button" data-nalame-action="continue">CONTINUE</button>
            </div>
          </div>
        </section>
      `;
    }

    questionSlideTemplate(question, index) {
      const step = index * 2 + 1;
      const isActive = step === this.stepIndex;
      const currentAnswer = question ? this.answers[question.id] || '' : '';
      const isLast = index === this.questions.length - 1;
      return `
        <section class="nalame__slide nalame__slide--question ${isActive ? 'is-active' : ''}" aria-labelledby="nalame-question-title-${index}" ${isActive ? '' : 'aria-hidden="true"'}>
          <div class="nalame__card nalame__card--quiz">
            <h2 class="nalame__question" id="nalame-question-title-${index}">${this.escape(question ? question.text : '')}</h2>
            
            <fieldset class="nalame__answers" aria-label="${this.escape(this.app.answerGroupLabel || 'Answer choices')}">
              <legend class="nalame__sr-only">${this.escape(this.app.answerGroupLabel || 'Answer choices')}</legend>
              ${question && Array.isArray(question.answers) ? question.answers.map((answer) => this.answerTemplate(question, answer, currentAnswer)).join('') : ''}
            </fieldset>
            <div class="nalame__status">${isActive ? this.escape(this.statusText || '') : ''}</div>
            ${isActive && currentAnswer ? this.actionsTemplate(isLast) : ''}
          </div>
        </section>
      `;
    }

    answerTemplate(question, answer, currentAnswer) {
      const checked = currentAnswer === answer.id ? 'checked' : '';
      const selectedClass = currentAnswer === answer.id ? ' is-selected' : '';
      return `
        <label class="nalame__answer${selectedClass}">
          <input class="nalame__answer-input" type="radio" name="${this.escape(question.id)}" value="${this.escape(answer.id)}" data-nalame-answer ${checked} aria-label="${this.escape(answer.text)}">
          <span class="nalame__answer-label">
            <span class="nalame__answer-text">${this.escape(answer.text)}</span>
            <span class="nalame__answer-check" aria-hidden="true"></span>
          </span>
        </label>
      `;
    }

    actionsTemplate(isLast) {
      return `
        <div class="nalame__actions" aria-label="Quiz navigation">
          <button class="nalame__button nalame__button--back" type="button" data-nalame-action="back">‹ ${this.escape(this.app.previousLabel || 'Back')}</button>
          <button class="nalame__button nalame__button--primary" type="button" data-nalame-action="continue">${this.escape(isLast ? (this.app.completeLabel || 'Complete') : (this.app.nextLabel || 'Continue'))} ›</button>
        </div>
      `;
    }

    summaryTemplate() {
      return `
        <section class="nalame__card nalame__summary" aria-label="${this.escape(this.app.summaryAriaLabel || 'Completed answers')}">
          <div class="nalame__summary-header">
            <h2 class="nalame__summary-title">${this.escape(this.app.summaryTitle || 'Summary')}</h2>
            <p class="nalame__summary-intro">${this.escape(this.app.summaryIntro || '')}</p>
          </div>
          <ol class="nalame__summary-list">
            ${this.questions.map((question, index) => this.summaryItemTemplate(question, index)).join('')}
          </ol>
          <div class="nalame__actions">
            <button class="nalame__button nalame__button--primary" type="button" data-nalame-action="restart">${this.escape(this.app.restartLabel || 'Start Over')}</button>
          </div>
        </section>
      `;
    }

    summaryItemTemplate(question, index) {
      const answerId = this.answers[question.id] || '';
      const answer = this.findAnswer(question, answerId);
      const answerText = answer ? answer.text : (this.app.emptyAnswerLabel || 'Skipped');
      return `
        <li class="nalame__summary-item">
          <p class="nalame__summary-question">${index + 1}. ${this.escape(question.text)}</p>
          <p class="nalame__summary-answer">${this.escape(answerText)}</p>
        </li>
      `;
    }

    escape(value) {
      return String(value || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }

    static boot() {
      const roots = document.querySelectorAll('nalame.nalame, .nalame');
      roots.forEach((root) => {
        if (root.tagName && root.tagName.toLowerCase() === 'nalame') {
          new MtkNalame(root);
        }
      });
    }
  }

  window.MtkNalame = MtkNalame;

  const whenReady = () => {
    MtkNalame.boot();
    const observer = new MutationObserver(() => {
      MtkNalame.boot();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', whenReady, { once: true });
  } else {
    whenReady();
  }
}());
