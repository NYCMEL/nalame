const roadmapConfig = {
  answers: {
    currentIncome: 2500,
    targetIncome: 8000,
    availableHours: 20,
    goalType: "side"
  },

  copy: {
    firstName: "Mel",
    headline: "This is your plan.",
    subhead: "A personalized roadmap generated from your income goal, available hours, and preferred path."
  },

  stages: [
    {
      name: "Training",
      description: "Build the core skill foundation."
    },
    {
      name: "Certification",
      description: "Create proof that you can do the work."
    },
    {
      name: "Business Setup",
      description: "Set up your offer, profile, and outreach system."
    },
    {
      name: "First Customers",
      description: "Move from learning to earning."
    },
    {
      name: "Growth",
      description: "Turn early wins into repeatable income."
    },
    {
      name: "Goal",
      description: "Reach your target monthly income."
    }
  ],

  assumptions: {
    baseMonthlyGainPerHour: {
      side: 36,
      fulltime: 52,
      career: 44
    },
    minimumMonths: 3,
    maximumMonths: 18
  }
};
