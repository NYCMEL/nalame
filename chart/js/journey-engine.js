function money(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function buildJourney(config) {
  const answers = config.answers;
  const currentIncome = Number(answers.currentIncome);
  const targetIncome = Math.max(Number(answers.targetIncome), currentIncome + 500);
  const availableHours = Number(answers.availableHours);
  const goalType = answers.goalType;

  const gap = targetIncome - currentIncome;
  const gainPerMonth = availableHours * config.assumptions.baseMonthlyGainPerHour[goalType];
  const estimatedMonths = clamp(
    Math.ceil(gap / gainPerMonth),
    config.assumptions.minimumMonths,
    config.assumptions.maximumMonths
  );

  const confidence = clamp(
    Math.round(58 + availableHours * 0.7 + (goalType === "fulltime" ? 8 : 0) - estimatedMonths * 0.8),
    61,
    94
  );

  const stages = config.stages.map((stage, index) => {
    const progress = index / (config.stages.length - 1);
    const eased = 1 - Math.pow(1 - progress, 1.45);
    const income = Math.round(currentIncome + gap * eased);
    const month = Math.max(0, Math.round(estimatedMonths * progress));

    return {
      ...stage,
      income,
      month,
      index,
      isCurrent: index === 0,
      isGoal: index === config.stages.length - 1
    };
  });

  return {
    currentIncome,
    targetIncome,
    gap,
    monthlyIncrease: gap,
    annualIncrease: gap * 12,
    availableHours,
    goalType,
    estimatedMonths,
    confidence,
    stages
  };
}
