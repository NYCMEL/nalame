class MtkNalame {
  constructor(root) {
    this.root = root;
    this.config = window.NalameConfig || {};
    this.meta = this.config.meta || {};
    this.publishTopic = this.meta.topicPublish || 'nalame-action';
    this.subscribeTopic = this.meta.topicSubscribe || '4-nalame';
    this.container = this.root.querySelector('[data-nalame-root]') || this.root;
    this.onMessage = this.onMessage.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  init() {
    if (this.root.dataset.nalameInitialized === 'true') {
      return;
    }

    this.root.dataset.nalameInitialized = 'true';
    this.render();
    this.bindEvents();
    this.subscribe();
    this.publish('ready', { appName: this.meta.appName || 'nalame' });
  }

  bindEvents() {
    this.root.addEventListener('click', this.handleClick);
    this.root.addEventListener('submit', this.handleSubmit);
  }

  subscribe() {
    if (window.wc && typeof window.wc.subscribe === 'function') {
      window.wc.subscribe(this.subscribeTopic, this.onMessage);
    }
  }

  onMessage(message) {
    if (!message || typeof message !== 'object') {
      return;
    }

    const action = message.action || message.type;

    switch (action) {
      case 'refresh':
        this.config = window.NalameConfig || this.config;
        this.render();
        this.publish('refreshed', { source: 'message' });
        break;
      case 'scrollToQuiz':
        this.scrollToSection('nalame-quiz');
        break;
      default:
        this.publish('messageReceived', { message });
        break;
    }
  }

  handleClick(event) {
    const trigger = event.target.closest('[data-nalame-action]');

    if (!trigger || !this.root.contains(trigger)) {
      return;
    }

    const action = trigger.getAttribute('data-nalame-action');
    const target = trigger.getAttribute('data-nalame-target');

    this.publish(action, { target, label: trigger.textContent.trim() });

    if (target) {
      event.preventDefault();
      this.scrollToSection(target);
    }
  }

  handleSubmit(event) {
    const form = event.target.closest('[data-nalame-form]');

    if (!form || !this.root.contains(form)) {
      return;
    }

    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      this.publish('formInvalid', { form: 'quiz' });
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries());
    this.publish('formSubmit', { form: 'quiz', data });
  }

  scrollToSection(sectionName) {
    const section = this.root.querySelector(`[data-nalame-section="${sectionName}"]`);

    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  publish(action, payload = {}) {
    const message = {
      app: this.meta.appName || 'nalame',
      action,
      payload,
      timestamp: new Date().toISOString()
    };

    if (window.wc && typeof window.wc.log === 'function') {
      window.wc.log('nalame publish', message);
    }

    if (window.wc && typeof window.wc.publish === 'function') {
      window.wc.publish(this.publishTopic, message);
    }
  }

  render() {
    const config = this.config;
    const brand = config.brand || {};
    const hero = config.hero || {};
    const trust = config.trust || {};
    const steps = config.steps || {};
    const quiz = config.quiz || {};
    const benefits = config.benefits || {};
    const footer = config.footer || {};

    this.container.innerHTML = `
      ${this.renderHeader(brand)}
      ${this.renderHero(brand, hero)}
      ${this.renderTrust(trust)}
      ${this.renderCards('nalame-steps', steps.title, steps.items || [])}
      ${this.renderQuiz(quiz)}
      ${this.renderCards('nalame-benefits', benefits.title, benefits.items || [])}
      ${this.renderFooter(footer)}
    `;
  }

  renderHeader(brand) {
    return `
      <header class="nalame__header" aria-label="${this.escape(brand.name || 'Nalame')}">
        <a class="nalame__brand" href="#top" aria-label="${this.escape(brand.ariaLabel || 'Nalame home')}" data-nalame-action="brand" data-nalame-target="top">
          <span class="nalame__logo" aria-hidden="true">${this.escape(brand.logoText || 'N')}</span>
          <span>${this.escape(brand.name || 'Nalame')}</span>
        </a>
        <nav class="nalame__nav" aria-label="Primary navigation">
          <a class="nalame__nav-link" href="#nalame-steps" data-nalame-action="nav" data-nalame-target="nalame-steps">How it works</a>
          <a class="nalame__nav-link" href="#nalame-quiz" data-nalame-action="nav" data-nalame-target="nalame-quiz">Start</a>
        </nav>
      </header>
    `;
  }

  renderHero(brand, hero) {
    return `
      <section class="nalame__hero" data-nalame-section="top">
        <div class="nalame__hero-content">
          <p class="nalame__eyebrow">${this.escape(brand.eyebrow || '')}</p>
          <p class="nalame__badge">${this.escape(hero.badge || '')}</p>
          <h1 class="nalame__title">${this.escape(hero.title || '')}</h1>
          <p class="nalame__subtitle">${this.escape(hero.subtitle || '')}</p>
          <div class="nalame__actions" aria-label="Hero actions">
            <button class="nalame__button nalame__button--primary" type="button" data-nalame-action="primaryCta" data-nalame-target="nalame-quiz">${this.escape(hero.primaryAction || 'Start')}</button>
            <button class="nalame__button nalame__button--secondary" type="button" data-nalame-action="secondaryCta" data-nalame-target="nalame-steps">${this.escape(hero.secondaryAction || 'Learn more')}</button>
          </div>
        </div>
        <div class="nalame__visual" aria-label="Program preview">
          <div class="nalame__image-card">
            <img class="nalame__image" src="${this.escapeAttr(hero.image || '')}" alt="${this.escapeAttr(hero.imageAlt || '')}">
          </div>
          <div class="nalame__stats" aria-label="Program highlights">
            ${(hero.stats || []).map((item) => this.renderStat(item)).join('')}
          </div>
        </div>
      </section>
    `;
  }

  renderStat(item) {
    return `
      <div class="nalame__stat">
        <span class="nalame__stat-value">${this.escape(item.value || '')}</span>
        <span class="nalame__stat-label">${this.escape(item.label || '')}</span>
      </div>
    `;
  }

  renderTrust(trust) {
    return `
      <section class="nalame__section" aria-label="Trust highlights">
        <div class="nalame__trust">
          <h2 class="nalame__trust-title">${this.escape(trust.title || '')}</h2>
          <ul class="nalame__trust-list">
            ${(trust.items || []).map((item) => `<li class="nalame__trust-item">${this.escape(item)}</li>`).join('')}
          </ul>
        </div>
      </section>
    `;
  }

  renderCards(sectionName, title, items) {
    return `
      <section class="nalame__section" data-nalame-section="${this.escapeAttr(sectionName)}">
        <div class="nalame__section-header">
          <h2 class="nalame__section-title">${this.escape(title || '')}</h2>
        </div>
        <div class="nalame__grid">
          ${items.map((item) => this.renderCard(item)).join('')}
        </div>
      </section>
    `;
  }

  renderCard(item) {
    return `
      <article class="nalame__card">
        <span class="nalame__icon" aria-hidden="true">${this.escape((item.icon || item.title || '').slice(0, 1))}</span>
        <h3 class="nalame__card-title">${this.escape(item.title || '')}</h3>
        <p class="nalame__card-text">${this.escape(item.text || '')}</p>
      </article>
    `;
  }

  renderQuiz(quiz) {
    return `
      <section class="nalame__section" data-nalame-section="nalame-quiz">
        <div class="nalame__quiz">
          <div>
            <h2 class="nalame__section-title">${this.escape(quiz.title || '')}</h2>
            <p class="nalame__subtitle">${this.escape(quiz.subtitle || '')}</p>
          </div>
          <form class="nalame__form" data-nalame-form novalidate>
            ${(quiz.fields || []).map((field) => this.renderField(field)).join('')}
            <button class="nalame__button nalame__button--primary" type="submit" data-nalame-action="quizSubmit">${this.escape(quiz.submitLabel || 'Continue')}</button>
          </form>
        </div>
      </section>
    `;
  }

  renderField(field) {
    const name = this.escapeAttr(field.name || 'field');
    const label = this.escape(field.label || 'Field');
    const required = field.required ? ' required aria-required="true"' : '';

    if (field.type === 'select') {
      return `
        <label class="nalame__field">
          <span class="nalame__label">${label}</span>
          <select class="nalame__select" name="${name}"${required}>
            <option value="">Choose one</option>
            ${(field.options || []).map((option) => `<option value="${this.escapeAttr(option.value || '')}">${this.escape(option.label || '')}</option>`).join('')}
          </select>
        </label>
      `;
    }

    return `
      <label class="nalame__field">
        <span class="nalame__label">${label}</span>
        <input class="nalame__input" name="${name}" type="${this.escapeAttr(field.type || 'text')}" placeholder="${this.escapeAttr(field.placeholder || '')}"${required}>
      </label>
    `;
  }

  renderFooter(footer) {
    return `
      <footer class="nalame__footer">
        <p>${this.escape(footer.text || '')}</p>
        <nav class="nalame__footer-links" aria-label="Footer navigation">
          ${(footer.links || []).map((link) => `<a class="nalame__footer-link" href="${this.escapeAttr(link.href || '#')}" data-nalame-action="footerLink">${this.escape(link.label || '')}</a>`).join('')}
        </nav>
      </footer>
    `;
  }

  escape(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  escapeAttr(value) {
    return this.escape(value);
  }

  static waitForRoots() {
    const roots = document.querySelectorAll('nalame.nalame');
    roots.forEach((root) => new MtkNalame(root).init());
  }

  static boot() {
    const start = () => MtkNalame.waitForRoots();

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', start, { once: true });
    } else {
      start();
    }

    const observer = new MutationObserver(() => MtkNalame.waitForRoots());
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }
}

MtkNalame.boot();
