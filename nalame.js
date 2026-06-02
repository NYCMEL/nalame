class MtkNalame {
  constructor(root, config) {
    this.root = root;
    this.config = config || window.nalameConfig || {};
    this.state = {
      selectedAge: "",
      form: {}
    };
    this.topic = this.config?.app?.topic || "4-nalame";
    this.publishTopic = this.config?.app?.publishTopic || "3-nalame";
    this.boundOnMessage = this.onMessage.bind(this);
  }

  init() {
    if (!this.root || this.root.dataset.nalameReady === "true") {
      return;
    }

    this.root.dataset.nalameReady = "true";
    this.render();
    this.bindEvents();
    this.subscribe();
    this.publish("nalame.ready", {
      message: this.config?.messages?.ready || "Ready",
      component: this.config?.app?.name || "nalame"
    });
  }

  subscribe() {
    if (window.wc && typeof window.wc.subscribe === "function") {
      window.wc.subscribe("4-nalame", this.boundOnMessage);
    }
  }

  onMessage(message) {
    if (!message || typeof message !== "object") {
      return;
    }

    const type = message.type || message.event || message.action;

    switch (type) {
      case "nalame.updateConfig":
        this.config = Object.assign({}, this.config, message.config || {});
        this.render();
        this.bindEvents();
        this.publish("nalame.configUpdated", {
          message: this.config?.messages?.updated || "Updated"
        });
        break;
      case "nalame.reset":
        this.state = { selectedAge: "", form: {} };
        this.render();
        this.bindEvents();
        this.publish("nalame.resetComplete", { selectedAge: "" });
        break;
      case "nalame.selectAge":
        if (message.value) {
          this.selectAge(message.value);
        }
        break;
      default:
        this.publish("nalame.messageReceived", {
          receivedType: type || "unknown",
          message
        });
        break;
    }
  }

  render() {
    const shell = this.root.querySelector("[data-nalame-root]") || this.root;
    shell.innerHTML = [
      this.renderHeader(),
      this.renderHero(),
      this.renderPanel(),
      this.renderMessage(),
      this.renderLegal(),
      this.renderFooter()
    ].join("");
  }

  renderHeader() {
    const brand = this.config?.brand || {};
    const hero = this.config?.hero || {};

    return `
      <header class="nalame__header">
        <div class="nalame__brand" aria-label="${this.escapeAttr(brand.label || "NalaMe")}">
          <span class="nalame__brand-mark" aria-hidden="true">${this.escapeHtml(brand.logoText || "NM")}</span>
          <span>${this.escapeHtml(brand.label || "NalaMe")}</span>
        </div>
        <div class="nalame__progress">${this.escapeHtml(hero.progressLabel || "")}</div>
      </header>
    `;
  }

  renderHero() {
    const hero = this.config?.hero || {};
    const image = hero.image ? `<img class="nalame__media-image" src="${this.escapeAttr(hero.image)}" alt="${this.escapeAttr(hero.imageAlt || "")}">` : "";

    return `
      <section class="nalame__hero" aria-labelledby="nalame-title">
        <div class="nalame__eyebrow">${this.escapeHtml(hero.eyebrow || "")}</div>
        <h1 class="nalame__title">${this.escapeHtml(hero.title || "")}</h1>
        <p class="nalame__subtitle">${this.escapeHtml(hero.subtitle || "")}</p>
        <div class="nalame__media" role="img" aria-label="${this.escapeAttr(hero.imageAlt || "Workout illustration")}">${image}</div>
      </section>
    `;
  }

  renderPanel() {
    return `
      <main class="nalame__panel" aria-label="NalaMe questionnaire">
        <p class="nalame__helper">${this.escapeHtml(this.config?.hero?.helperText || "")}</p>
        <div class="nalame__options" role="group" aria-label="Age range options">
          ${this.renderAgeOptions()}
        </div>
        ${this.renderForm()}
        ${this.renderTrust()}
        ${this.renderActions()}
      </main>
    `;
  }

  renderAgeOptions() {
    return (this.config?.ageOptions || []).map((item, index) => {
      const selected = this.state.selectedAge === item.value;
      const image = item.image
        ? `<img src="${this.escapeAttr(item.image)}" alt="${this.escapeAttr(item.imageAlt || "")}">`
        : `<span aria-hidden="true">${this.escapeHtml(String(index + 1))}</span>`;

      return `
        <button class="nalame__option" type="button" data-nalame-age="${this.escapeAttr(item.value)}" aria-pressed="${selected ? "true" : "false"}">
          <span class="nalame__option-image">${image}</span>
          <span>
            <span class="nalame__option-title">${this.escapeHtml(item.label || "")}</span>
            <span class="nalame__option-description">${this.escapeHtml(item.description || "")}</span>
          </span>
          <span class="nalame__option-check" aria-hidden="true">✓</span>
        </button>
      `;
    }).join("");
  }

  renderForm() {
    const form = this.config?.form || {};
    const fields = form.fields || [];

    if (!fields.length) {
      return "";
    }

    return `
      <section class="nalame__form-card" aria-label="${this.escapeAttr(form.sectionTitle || "Profile")}">
        <h2 class="nalame__form-title">${this.escapeHtml(form.sectionTitle || "")}</h2>
        ${fields.map((field) => this.renderField(field)).join("")}
      </section>
    `;
  }

  renderField(field) {
    const value = this.state.form[field.name] || "";
    const required = field.required ? "required aria-required=\"true\"" : "";

    if (field.type === "select") {
      return `
        <div class="nalame__field">
          <label class="nalame__label" for="${this.escapeAttr(field.id)}">${this.escapeHtml(field.label || "")}</label>
          <select class="nalame__select" id="${this.escapeAttr(field.id)}" name="${this.escapeAttr(field.name)}" data-nalame-field ${required}>
            <option value=""></option>
            ${(field.options || []).map((option) => `<option value="${this.escapeAttr(option.value)}" ${value === option.value ? "selected" : ""}>${this.escapeHtml(option.label)}</option>`).join("")}
          </select>
        </div>
      `;
    }

    return `
      <div class="nalame__field">
        <label class="nalame__label" for="${this.escapeAttr(field.id)}">${this.escapeHtml(field.label || "")}</label>
        <input class="nalame__input" id="${this.escapeAttr(field.id)}" name="${this.escapeAttr(field.name)}" type="${this.escapeAttr(field.type || "text")}" value="${this.escapeAttr(value)}" autocomplete="${this.escapeAttr(field.autocomplete || "off")}" data-nalame-field ${required}>
      </div>
    `;
  }

  renderTrust() {
    const trust = this.config?.trust || [];
    if (!trust.length) {
      return "";
    }

    return `
      <ul class="nalame__trust" aria-label="Plan highlights">
        ${trust.map((item) => `<li class="nalame__trust-item">${this.escapeHtml(item)}</li>`).join("")}
      </ul>
    `;
  }

  renderActions() {
    const actions = this.config?.actions || {};
    const primary = actions.primary || {};
    const secondary = actions.secondary || {};

    return `
      <div class="nalame__actions">
        <button class="nalame__button nalame__button--primary" type="button" data-nalame-action="primary" aria-label="${this.escapeAttr(primary.ariaLabel || primary.label || "Continue")}">${this.escapeHtml(primary.label || "Continue")}</button>
        <button class="nalame__button nalame__button--secondary" type="button" data-nalame-action="secondary" aria-label="${this.escapeAttr(secondary.ariaLabel || secondary.label || "Learn more")}">${this.escapeHtml(secondary.label || "Learn more")}</button>
      </div>
    `;
  }

  renderMessage() {
    return `<div class="nalame__message" data-nalame-message role="status" aria-live="polite"></div>`;
  }

  renderLegal() {
    const legal = this.config?.legal || {};
    const links = (legal.links || []).map((link) => `<a class="nalame__link" href="${this.escapeAttr(link.href || "#")}">${this.escapeHtml(link.label || "")}</a>`).join(" ");

    return `
      <section class="nalame__legal" aria-label="Legal notice">
        <span>${this.escapeHtml(legal.text || "")}</span>
        <span class="nalame__legal-links">${links}</span>
      </section>
    `;
  }

  renderFooter() {
    const footer = this.config?.footer || {};
    const links = (footer.links || []).map((link) => `<a class="nalame__link" href="${this.escapeAttr(link.href || "#")}">${this.escapeHtml(link.label || "")}</a>`).join("");

    return `
      <footer class="nalame__footer">
        <span class="nalame__footer-title">${this.escapeHtml(footer.title || "")}</span>
        <nav class="nalame__footer-links" aria-label="Footer links">${links}</nav>
      </footer>
    `;
  }

  bindEvents() {
    this.root.querySelectorAll("[data-nalame-age]").forEach((button) => {
      button.addEventListener("click", () => this.selectAge(button.dataset.nalameAge));
    });

    this.root.querySelectorAll("[data-nalame-field]").forEach((field) => {
      field.addEventListener("input", () => this.updateField(field));
      field.addEventListener("change", () => this.updateField(field));
    });

    this.root.querySelectorAll("[data-nalame-action]").forEach((button) => {
      button.addEventListener("click", () => this.handleAction(button.dataset.nalameAction));
    });
  }

  selectAge(value) {
    this.state.selectedAge = value;
    this.root.querySelectorAll("[data-nalame-age]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.nalameAge === value));
    });
    this.setMessage("");
    this.publish("nalame.ageSelected", {
      selectedAge: value,
      selectedOption: this.getSelectedAgeOption(value)
    });
  }

  updateField(field) {
    this.state.form[field.name] = field.value;
    this.publish("nalame.fieldUpdated", {
      name: field.name,
      value: field.value
    });
  }

  handleAction(actionName) {
    const actions = this.config?.actions || {};
    const action = actionName === "secondary" ? actions.secondary : actions.primary;

    if (actionName === "primary" && !this.state.selectedAge) {
      this.setMessage(this.config?.messages?.selectAge || "Please make a selection.");
      this.publish("nalame.validationError", {
        field: "age",
        message: this.config?.messages?.selectAge || "Please make a selection."
      });
      return;
    }

    this.publish(action?.event || `nalame.${actionName}`, {
      selectedAge: this.state.selectedAge,
      selectedOption: this.getSelectedAgeOption(this.state.selectedAge),
      form: Object.assign({}, this.state.form)
    });
  }

  getSelectedAgeOption(value) {
    return (this.config?.ageOptions || []).find((item) => item.value === value) || null;
  }

  setMessage(message) {
    const node = this.root.querySelector("[data-nalame-message]");
    if (node) {
      node.textContent = message;
    }
  }

  publish(event, payload) {
    const data = {
      component: this.config?.app?.name || "nalame",
      event,
      timestamp: new Date().toISOString(),
      payload: payload || {}
    };

    if (window.wc && typeof window.wc.log === "function") {
      window.wc.log("nalame", data);
    }

    if (window.wc && typeof window.wc.publish === "function") {
      window.wc.publish(this.publishTopic, data);
    }
  }

  escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  escapeAttr(value) {
    return this.escapeHtml(value);
  }

  static waitForRoots(callback) {
    const run = () => {
      document.querySelectorAll("nalame.nalame").forEach((root) => callback(root));
    };

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", run, { once: true });
    } else {
      run();
    }

    const observer = new MutationObserver(run);
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    });
  }
}

MtkNalame.waitForRoots((root) => {
  const app = new MtkNalame(root, window.nalameConfig);
  app.init();
});
