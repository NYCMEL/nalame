window.NalameConfig = {
  meta: {
    appName: "nalame",
    version: "1.0.0",
    topicSubscribe: "4-nalame",
    topicPublish: "nalame-action"
  },
  brand: {
    name: "Nalame",
    eyebrow: "Personalized fitness plan",
    logoText: "N",
    ariaLabel: "Nalame home"
  },
  hero: {
    badge: "7-minute setup",
    title: "Build a stronger body with a plan made for your lifestyle",
    subtitle: "Answer a few quick questions and get a guided calisthenics-style plan you can customize later with your own content, images, and program details.",
    primaryAction: "Start my plan",
    secondaryAction: "See how it works",
    imageAlt: "Person training at home with a guided fitness plan",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1100&q=80",
    stats: [
      { "value": "10 min", "label": "daily sessions" },
      { "value": "0", "label": "equipment needed" },
      { "value": "4 wk", "label": "starter path" }
    ]
  },
  trust: {
    title: "Designed for beginners and returners",
    items: [
      "Bodyweight-first workouts",
      "Mobile-friendly guidance",
      "Progressive daily steps"
    ]
  },
  steps: {
    title: "Your plan starts with simple questions",
    items: [
      {
        "icon": "person",
        "title": "Tell us your goal",
        "text": "Choose your main focus so the experience can guide the next step."
      },
      {
        "icon": "schedule",
        "title": "Pick your routine",
        "text": "Select a realistic schedule that fits into your daily life."
      },
      {
        "icon": "trending_up",
        "title": "Follow your path",
        "text": "Use a clear plan with cards, prompts, and progress cues."
      }
    ]
  },
  quiz: {
    title: "Let’s personalize your starting point",
    subtitle: "This sample form is fully JSON-driven and ready for your next prompt updates.",
    submitLabel: "Continue",
    fields: [
      {
        "name": "goal",
        "label": "Main goal",
        "type": "select",
        "required": true,
        "options": [
          { "value": "strength", "label": "Build strength" },
          { "value": "mobility", "label": "Improve mobility" },
          { "value": "weight", "label": "Lose weight" },
          { "value": "habit", "label": "Build a daily habit" }
        ]
      },
      {
        "name": "experience",
        "label": "Experience level",
        "type": "select",
        "required": true,
        "options": [
          { "value": "beginner", "label": "Beginner" },
          { "value": "returning", "label": "Returning" },
          { "value": "active", "label": "Active" }
        ]
      },
      {
        "name": "email",
        "label": "Email address",
        "type": "email",
        "required": true,
        "placeholder": "you@example.com"
      }
    ]
  },
  benefits: {
    title: "What this landing page supports",
    items: [
      {
        "title": "Conversion-focused layout",
        "text": "A clear hero, proof area, guided steps, and form section."
      },
      {
        "title": "Material-inspired UI",
        "text": "Cards, elevation, focus states, motion, and accessible controls."
      },
      {
        "title": "Easy content replacement",
        "text": "Text, labels, images, buttons, stats, and form fields live in config."
      }
    ]
  },
  footer: {
    text: "© 2026 Nalame. All content is configurable.",
    links: [
      { "label": "Privacy", "href": "#privacy" },
      { "label": "Terms", "href": "#terms" },
      { "label": "Contact", "href": "#contact" }
    ]
  }
};
