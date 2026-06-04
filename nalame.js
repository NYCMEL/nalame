(function () {
  'use strict';

  class MtkNalame {
    constructor(root) {
      this.root = root;
      this.config = window.NalameConfig || {};
      this.app = this.config.app || {};
      this.questions = Array.isArray(this.config.questions) ? this.config.questions : [];
      this.currentIndex = 0;
      this.answers = {};
      this.theme = this.app.defaultTheme === 'dark' ? 'dark' : 'light';
      this.statusText = '';
      this.onMessage = this.onMessage.bind(this);
      this.handleClick = this.handleClick.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleKeydown = this.handleKeydown.bind(this);
      this.init();
    }

    init() {
      if (!this.root || this.root.dataset.nalameInitialized === 'true') { return; }
      this.root.dataset.nalameInitialized = 'true';
      this.root.setAttribute('data-theme', this.theme);
      this.root.addEventListener('click', this.handleClick);
      this.root.addEventListener('change', this.handleChange);
      this.root.addEventListener('keydown', this.handleKeydown);
      if (window.wc && typeof window.wc.subscribe === 'function') { window.wc.subscribe('4-nalame', this.onMessage); }
      this.render();
      this.publish('nalame:ready', { totalQuestions: this.questions.length, theme: this.theme });
    }

    onMessage(message) {
      if (!message || typeof message !== 'object') { return; }
      switch (message.action || message.type) {
        case 'goToQuestion': this.goToQuestion(Number(message.index)); break;
        case 'setTheme': this.setTheme(message.theme); break;
        case 'restart': this.restart(); break;
        case 'next': this.next(); break;
        case 'previous': this.previous(); break;
        case 'skip': this.skip(); break;
        default: break;
      }
    }

    handleClick(event) {
      const target = event.target.closest('[data-nalame-action]');
      if (!target) { return; }
      switch (target.getAttribute('data-nalame-action')) {
        case 'theme-light': this.setTheme('light'); break;
        case 'theme-dark': this.setTheme('dark'); break;
        case 'previous': this.previous(); break;
        case 'next': this.next(); break;
        case 'skip': this.skip(); break;
        case 'restart': this.restart(); break;
        default: break;
      }
    }

    handleChange(event) {
      const input = event.target.closest('[data-nalame-answer]');
      if (!input) { return; }
      const question = this.getCurrentQuestion();
      const answer = this.findAnswer(question, input.value);
      if (!question || !answer) { return; }
      this.answers[question.id] = answer.id;
      this.statusText = '';
      this.publish('nalame:answerSelected', { questionId: question.id, answerId: answer.id, answerText: answer.text, index: this.currentIndex });
      this.render();
    }

    handleKeydown(event) {
      if (event.altKey || event.ctrlKey || event.metaKey) { return; }
      if (event.key === 'ArrowRight') { event.preventDefault(); this.next(); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); this.previous(); }
    }

    getCurrentQuestion() { return this.questions[this.currentIndex] || null; }
    findAnswer(question, id) { return question && Array.isArray(question.answers) ? question.answers.find((answer) => answer.id === id) || null : null; }
    setTheme(theme) { this.theme = theme === 'dark' ? 'dark' : 'light'; this.root.setAttribute('data-theme', this.theme); this.publish('nalame:themeChanged', { theme: this.theme }); this.render(); }
    goToQuestion(index) { if (Number.isInteger(index) && index >= 0 && index <= this.questions.length) { this.currentIndex = index; this.render(); } }
    next() { if (this.currentIndex < this.questions.length) { this.currentIndex += 1; this.publish('nalame:next', { index: this.currentIndex }); this.render(); } }
    previous() { if (this.currentIndex > 0) { this.currentIndex -= 1; this.publish('nalame:previous', { index: this.currentIndex }); this.render(); } }
    skip() { const question = this.getCurrentQuestion(); if (question) { this.answers[question.id] = ''; this.publish('nalame:skipped', { questionId: question.id, index: this.currentIndex }); } this.next(); }
    restart() { this.currentIndex = 0; this.answers = {}; this.statusText = ''; this.publish('nalame:restart', { totalQuestions: this.questions.length }); this.render(); }

    publish(type, detail) {
      const payload = { source: 'nalame', type, detail: detail || {}, timestamp: new Date().toISOString() };
      if (window.wc && typeof window.wc.log === 'function') { window.wc.log('nalame publish', payload); }
      if (window.wc && typeof window.wc.publish === 'function') { window.wc.publish(type, payload); }
    }

    render() { this.root.innerHTML = this.template(); }

    template() {
      return `<div class="nalame__shell">${this.progressTemplate()}${this.headerTemplate()}<main class="nalame__main">${this.currentIndex >= this.questions.length ? this.summaryTemplate() : this.questionTemplate()}</main><div class="nalame__sr-only" aria-live="polite">${this.escape(this.statusText)}</div></div>`;
    }

    progressTemplate() {
      const completed = Math.min(this.currentIndex, this.questions.length);
      const width = this.questions.length ? (completed / this.questions.length) * 100 : 0;
      return `<div class="nalame__progress-wrap" aria-label="${this.escape(this.app.progressLabel)} ${completed} of ${this.questions.length}"><span class="nalame__progress-track" aria-hidden="true"><span class="nalame__progress-bar" style="width:${width}%"></span></span></div>`;
    }

    headerTemplate() {
      return `<header class="nalame__header"><div class="nalame__brand"><span class="nalame__eyebrow">${this.escape(this.app.eyebrow)}</span><h1 class="nalame__title">${this.escape(this.app.title)}</h1></div><div class="nalame__theme" role="group" aria-label="${this.escape(this.app.modeLabel)}"><button class="nalame__theme-button" type="button" data-nalame-action="theme-light" aria-pressed="${this.theme === 'light'}">${this.escape(this.app.lightLabel)}</button><button class="nalame__theme-button" type="button" data-nalame-action="theme-dark" aria-pressed="${this.theme === 'dark'}">${this.escape(this.app.darkLabel)}</button></div></header>`;
    }

    questionTemplate() {
      const question = this.getCurrentQuestion();
      const current = question ? this.answers[question.id] || '' : '';
      const last = this.currentIndex === this.questions.length - 1;
      return `<section class="nalame__card nalame__card--quiz" aria-labelledby="nalame-question-title"><h2 class="nalame__question" id="nalame-question-title">${this.escape(question ? question.text : '')}</h2><fieldset class="nalame__answers" aria-label="${this.escape(this.app.answerGroupLabel)}"><legend class="nalame__sr-only">${this.escape(this.app.answerGroupLabel)}</legend>${question.answers.map((answer) => this.answerTemplate(question, answer, current)).join('')}</fieldset><div class="nalame__actions" aria-label="Quiz navigation"><button class="nalame__button" type="button" data-nalame-action="previous" ${this.currentIndex === 0 ? 'disabled' : ''}>&#8249; ${this.escape(this.app.previousLabel)}</button><button class="nalame__button nalame__button--primary" type="button" data-nalame-action="next">${this.escape(last ? this.app.completeLabel : this.app.nextLabel)} &#8250;</button></div></section>`;
    }

    answerTemplate(question, answer, current) {
      return `<div class="nalame__answer"><input class="nalame__answer-input" type="radio" name="${this.escape(question.id)}" value="${this.escape(answer.id)}" data-nalame-answer ${current === answer.id ? 'checked' : ''} aria-label="${this.escape(answer.text)}"><span class="nalame__answer-label"><span class="nalame__answer-check" aria-hidden="true"></span><span class="nalame__answer-text">${this.escape(answer.text)}</span></span></div>`;
    }

    summaryTemplate() {
      return `<section class="nalame__card nalame__summary" aria-label="${this.escape(this.app.summaryAriaLabel)}"><div class="nalame__summary-header"><h2 class="nalame__summary-title">${this.escape(this.app.summaryTitle)}</h2><p class="nalame__summary-intro">${this.escape(this.app.summaryIntro)}</p></div><ol class="nalame__summary-list">${this.questions.map((question) => this.summaryItemTemplate(question)).join('')}</ol><div class="nalame__actions"><button class="nalame__button nalame__button--primary" type="button" data-nalame-action="restart">${this.escape(this.app.restartLabel)}</button></div></section>`;
    }

    summaryItemTemplate(question) {
      const answer = this.findAnswer(question, this.answers[question.id]);
      return `<li class="nalame__summary-item"><p class="nalame__summary-question">${this.escape(question.text)}</p><p class="nalame__summary-answer">${this.escape(answer ? answer.text : this.app.emptyAnswerLabel)}</p></li>`;
    }

    escape(value) { return String(value || '').replace(/[&<>"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[char])); }
  }

  function boot() {
    document.querySelectorAll('nalame.nalame, .nalame').forEach((root) => new MtkNalame(root));
  }

  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', boot); } else { boot(); }
  window.setTimeout(boot, 250);
}());
