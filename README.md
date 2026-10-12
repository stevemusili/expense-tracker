# Expense tracker

## Description
The Expense Tracker is a simple web application that allows users to record,manage, and monitor their spending,organise expenses
,and understand how their money is being used.

## Live Demo Link
[View expense-tracker on GitHub pages](https://stevemusili.github.io/expense-tracker/)

## Features
- Convert amounts between different currencies.
- Select currencies for conversion.
- Display converted amounts.
- Display a running total.
- Delete expenses.
- Filter expenses by category.
- Fetch live exchange rates using a REST API.
- Handle API loading and error states.
- Simple and user-friendly interface.
- Responsive design for different screen sizes.

## Technologies Used
- HTML
- CSS
- JavaScript Modules
- Exchange Rate API
- ESLint
- Jest

## Project Structure
``` 
expense-tracker/
├── index.html
├── style.css
├── src/
│   ├── api.js
│   ├── state.js
│   ├── utils.js
│   ├── ui.js
│   └── main.js
├── tests/
│   └── utils.test.js
├── .eslintrc.json
├── .eslintignore
├── package.json
└── README.md

```
## Installation
Install Node.js, then run:
```
npm install
npm install --save-dev serve
```

## Run the application
```
npm start
```
Open the local URL in your terminal.

## Run tests
```
npm test
```

## Run ESLint
```
npm run lint 
```

