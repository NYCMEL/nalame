window.nalameConfig = {
  app: {
    name: "nalame",
    topic: "4-nalame",
    publishTopic: "3-nalame",
    analyticsPrefix: "nalame",
    locale: "en-US"
  },
  brand: {
    label: "NalaMe",
    logoAlt: "NalaMe logo",
    logoText: "NM"
  },
  hero: {
    eyebrow: "PERSONALIZED FITNESS PLAN",
    title: "Choose your age range",
    subtitle: "Get a simple bodyweight plan built around your starting point, schedule, and goals.",
    helperText: "Select one option to continue.",
    imageAlt: "Person doing a bodyweight workout",
    image: "",
    progressLabel: "Step 1 of 5"
  },
  ageOptions: [
    {
      id: "age-18-29",
      label: "Age: 18-29",
      description: "Build strength, mobility, and consistency.",
      image: "",
      imageAlt: "Young adult workout profile",
      value: "18-29"
    },
    {
      id: "age-30-39",
      label: "Age: 30-39",
      description: "Balance busy days with focused training.",
      image: "",
      imageAlt: "Adult workout profile",
      value: "30-39"
    },
    {
      id: "age-40-49",
      label: "Age: 40-49",
      description: "Improve control, endurance, and flexibility.",
      image: "",
      imageAlt: "Middle-aged adult workout profile",
      value: "40-49"
    },
    {
      id: "age-50-plus",
      label: "Age: 50+",
      description: "Move safely with progressive bodyweight work.",
      image: "",
      imageAlt: "Older adult workout profile",
      value: "50+"
    }
  ],
  form: {
    sectionTitle: "Your profile",
    fields: [
      {
        id: "firstName",
        name: "firstName",
        label: "First name",
        type: "text",
        autocomplete: "given-name",
        required: false,
        error: "Enter your first name."
      },
      {
        id: "goal",
        name: "goal",
        label: "Main goal",
        type: "select",
        required: false,
        options: [
          { "label": "Build strength", "value": "strength" },
          { "label": "Lose weight", "value": "weight-loss" },
          { "label": "Improve mobility", "value": "mobility" },
          { "label": "Start a routine", "value": "routine" }
        ],
        error: "Choose your main goal."
      }
    ]
  },
  actions: {
    primary: {
      label: "Continue",
      ariaLabel: "Continue after selecting age range",
      event: "nalame.continue"
    },
    secondary: {
      label: "Learn more",
      ariaLabel: "Learn more about this plan",
      event: "nalame.learnMore"
    }
  },
  trust: [
    "No equipment required",
    "Beginner friendly",
    "Mobile-first plan"
  ],
  legal: {
    text: "By choosing your age and continuing, you agree to review our policies before continuing.",
    links: [
      { "label": "Terms of Service", "href": "#" },
      { "label": "Privacy Policy", "href": "#" }
    ]
  },
  footer: {
    title: "Docs",
    links: [
      { "label": "FAQ", "href": "#" },
      { "label": "Terms and Conditions", "href": "#" },
      { "label": "Privacy Policy", "href": "#" },
      { "label": "Subscription Policy", "href": "#" },
      { "label": "Money-Back Policy", "href": "#" }
    ]
  },
  messages: {
    selectAge: "Please select your age range to continue.",
    ready: "NalaMe is ready.",
    updated: "NalaMe content updated."
  }
};
