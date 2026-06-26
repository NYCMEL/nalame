const state = JSON.parse(JSON.stringify(roadmapConfig));

const els = {
  headline: document.getElementById("headline"),
  subhead: document.getElementById("subhead"),

  currentIncome: document.getElementById("currentIncome"),
  targetIncome: document.getElementById("targetIncome"),
  availableHours: document.getElementById("availableHours"),
  goalType: document.getElementById("goalType"),

  currentIncomeLabel: document.getElementById("currentIncomeLabel"),
  targetIncomeLabel: document.getElementById("targetIncomeLabel"),
  availableHoursLabel: document.getElementById("availableHoursLabel"),

  todayKpi: document.getElementById("todayKpi"),
  goalKpi: document.getElementById("goalKpi"),
  monthlyIncreaseKpi: document.getElementById("monthlyIncreaseKpi"),
  annualIncreaseKpi: document.getElementById("annualIncreaseKpi"),
  timelineKpi: document.getElementById("timelineKpi"),
  confidenceKpi: document.getElementById("confidenceKpi"),

  todayBadge: document.getElementById("todayBadge"),
  goalBadge: document.getElementById("goalBadge"),
  todayBadgeValue: document.getElementById("todayBadgeValue"),
  goalBadgeValue: document.getElementById("goalBadgeValue"),

  grid: document.getElementById("grid"),
  points: document.getElementById("points"),
  labels: document.getElementById("labels"),
  growthPath: document.getElementById("growthPath"),
  growthPathShadow: document.getElementById("growthPathShadow"),
  areaPath: document.getElementById("areaPath"),
  milestones: document.getElementById("milestones"),
  pathCopy: document.getElementById("pathCopy"),
  replayBtn: document.getElementById("replayBtn")
};

const chart = {
  width: 1000,
  height: 520,
  padX: 86,
  padTop: 48,
  padBottom: 86
};

function initControls() {
  els.headline.textContent = `${state.copy.firstName}, ${state.copy.headline}`;
  els.subhead.textContent = state.copy.subhead;

  els.currentIncome.value = state.answers.currentIncome;
  els.targetIncome.value = state.answers.targetIncome;
  els.availableHours.value = state.answers.availableHours;
  els.goalType.value = state.answers.goalType;

  ["input", "change"].forEach(evt => {
    els.currentIncome.addEventListener(evt, onInput);
    els.targetIncome.addEventListener(evt, onInput);
    els.availableHours.addEventListener(evt, onInput);
    els.goalType.addEventListener(evt, onInput);
  });

  els.replayBtn.addEventListener("click", () => render(true));
}

function onInput() {
  state.answers.currentIncome = Number(els.currentIncome.value);
  state.answers.targetIncome = Number(els.targetIncome.value);
  state.answers.availableHours = Number(els.availableHours.value);
  state.answers.goalType = els.goalType.value;
  render(false);
}

function getPlotPoints(journey) {
  const minY = Math.max(0, journey.currentIncome * 0.75);
  const maxY = journey.targetIncome * 1.12;
  const plotW = chart.width - chart.padX * 2;
  const plotH = chart.height - chart.padTop - chart.padBottom;

  return journey.stages.map((stage, index) => {
    const x = chart.padX + (plotW / (journey.stages.length - 1)) * index;
    const y = chart.padTop + plotH - ((stage.income - minY) / (maxY - minY)) * plotH;
    return { ...stage, x, y };
  });
}

function curvedPath(points) {
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const cx1 = prev.x + (curr.x - prev.x) * 0.48;
    const cy1 = prev.y;
    const cx2 = prev.x + (curr.x - prev.x) * 0.52;
    const cy2 = curr.y;
    d += ` C ${cx1} ${cy1}, ${cx2} ${cy2}, ${curr.x} ${curr.y}`;
  }
  return d;
}

function areaPath(points) {
  const baseY = chart.height - chart.padBottom;
  return `${curvedPath(points)} L ${points[points.length - 1].x} ${baseY} L ${points[0].x} ${baseY} Z`;
}

function renderGrid(journey) {
  els.grid.innerHTML = "";
  const gridCount = 5;
  const minY = Math.max(0, journey.currentIncome * 0.75);
  const maxY = journey.targetIncome * 1.12;
  const plotH = chart.height - chart.padTop - chart.padBottom;
  const plotW = chart.width - chart.padX * 2;

  for (let i = 0; i <= gridCount; i++) {
    const y = chart.padTop + (plotH / gridCount) * i;
    const value = Math.round(maxY - ((maxY - minY) / gridCount) * i);

    const line = svgEl("line", {
      x1: chart.padX,
      y1: y,
      x2: chart.padX + plotW,
      y2: y,
      class: "grid-line"
    });

    const label = svgEl("text", {
      x: 22,
      y: y + 4,
      class: "grid-label"
    });
    label.textContent = money(value).replace(".00", "");

    els.grid.append(line, label);
  }
}

function renderChart(journey, replay) {
  const points = getPlotPoints(journey);
  const pathD = curvedPath(points);

  renderGrid(journey);

  els.areaPath.setAttribute("d", areaPath(points));
  els.growthPath.setAttribute("d", pathD);
  els.growthPathShadow.setAttribute("d", pathD);

  els.points.innerHTML = "";
  els.labels.innerHTML = "";

  points.forEach(point => {
    const circle = svgEl("circle", {
      cx: point.x,
      cy: point.y,
      r: point.isGoal ? 10 : 8,
      class: `point ${point.isCurrent ? "point-current" : ""} ${point.isGoal ? "point-goal" : ""}`
    });

    const label = svgEl("text", {
      x: point.x,
      y: chart.height - 38,
      "text-anchor": "middle",
      class: "stage-text"
    });
    label.textContent = point.name;

    els.points.append(circle);
    els.labels.append(label);
  });

  positionBadge(els.todayBadge, points[0]);
  positionBadge(els.goalBadge, points[points.length - 1]);

  if (replay) {
    animatePath(els.growthPath);
    animatePath(els.growthPathShadow);
  }
}

function animatePath(path) {
  const length = path.getTotalLength();
  path.style.transition = "none";
  path.style.strokeDasharray = length;
  path.style.strokeDashoffset = length;
  path.getBoundingClientRect();

  path.style.transition = "stroke-dashoffset 1700ms cubic-bezier(.2,.8,.2,1)";
  path.style.strokeDashoffset = "0";
}

function positionBadge(el, point) {
  const x = (point.x / chart.width) * 100;
  const y = (point.y / chart.height) * 100;
  el.style.left = `${x}%`;
  el.style.top = `${Math.max(12, y - 7)}%`;
}

function renderSummary(journey) {
  els.currentIncomeLabel.textContent = `${money(journey.currentIncome)} / month`;
  els.targetIncomeLabel.textContent = `${money(journey.targetIncome)} / month`;
  els.availableHoursLabel.textContent = `${journey.availableHours} hours / week`;

  els.todayKpi.textContent = `${money(journey.currentIncome)}/mo`;
  els.goalKpi.textContent = `${money(journey.targetIncome)}/mo`;
  els.monthlyIncreaseKpi.textContent = `+${money(journey.monthlyIncrease)}/mo`;
  els.annualIncreaseKpi.textContent = `+${money(journey.annualIncrease)}/yr`;
  els.timelineKpi.textContent = `${journey.estimatedMonths} months`;
  els.confidenceKpi.textContent = `${journey.confidence}%`;

  els.todayBadgeValue.textContent = `${money(journey.currentIncome)}/mo`;
  els.goalBadgeValue.textContent = `${money(journey.targetIncome)}/mo`;

  els.pathCopy.textContent = `Based on ${journey.availableHours} hours per week and a ${labelForGoal(journey.goalType)} goal, your roadmap estimates ${journey.estimatedMonths} months to reach ${money(journey.targetIncome)} per month.`;
}

function renderMilestones(journey) {
  els.milestones.innerHTML = journey.stages.map(stage => `
    <article class="milestone ${stage.isCurrent ? "current" : ""}">
      <div class="number">${stage.isCurrent ? "You are here" : stage.isGoal ? "Goal" : `Month ${stage.month}`}</div>
      <h3>${stage.name}</h3>
      <p>${stage.description}</p>
      <p><strong>${money(stage.income)}/mo</strong></p>
    </article>
  `).join("");
}

function render(replay = true) {
  const journey = buildJourney(state);
  renderSummary(journey);
  renderChart(journey, replay);
  renderMilestones(journey);
}

function labelForGoal(goalType) {
  return {
    side: "side income",
    fulltime: "full-time",
    career: "career change"
  }[goalType] || goalType;
}

function svgEl(name, attrs = {}) {
  const el = document.createElementNS("http://www.w3.org/2000/svg", name);
  Object.entries(attrs).forEach(([key, value]) => {
    el.setAttribute(key, value);
  });
  return el;
}

initControls();
render(true);
