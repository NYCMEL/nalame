# Personalized Income Roadmap

A dark, fintech-style personalized roadmap prototype.

## What it does

This is not just a chart. It is a personalized journey experience.

The user can change:

- Current monthly income
- Target monthly income
- Available hours per week
- Goal type

The roadmap updates in real time.

## Files

- `index.html`
- `css/style.css`
- `js/config.js`
- `js/journey-engine.js`
- `js/app.js`

## How to use

Open `index.html` in your browser.

To change default values, edit:

`js/config.js`

```js
answers: {
  currentIncome: 2500,
  targetIncome: 8000,
  availableHours: 20,
  goalType: "side"
}
```

## Features

- Dark fintech-style UI
- Animated SVG growth path
- Red "You Are Here" marker
- Green goal marker
- Income projection
- Annual upside calculation
- Estimated timeline
- Confidence score
- Milestone cards
- Real-time updates
- No frameworks
- No dependencies
