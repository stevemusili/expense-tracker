import {
    convertCurrency,
    calculateTotal,
    filterExpenses,
    formatMoney
} from "./utils.js";

export function renderExpenses(expenses, homeCurrency, rates, category) {
    const container = document.querySelector("#expenses-container");
    const visibleExpenses = filterExpenses(expenses, category);

    container.replaceChildren();

    if (visibleExpenses.length === 0) {
        const message = document.createElement("li");
        message.className = "empty-message";
        message.textContent = "No expenses found.";
        container.append(message);
    }

    visibleExpenses.forEach((expense) => {
        const item = document.createElement("li");
        item.className = "expense-item";

        const details = document.createElement("div");
        details.className = "expense-details";

        const description = document.createElement("h3");
        description.textContent = expense.description;

        const categoryText = document.createElement("p");
        categoryText.textContent = expense.category;

        const originalAmount = document.createElement("p");
        originalAmount.textContent =
            `Original: ${formatMoney(expense.amount, expense.currency)}`;

        details.append(description, categoryText, originalAmount);

        const converted = document.createElement("p");
        converted.className = "converted-amount";

        try {
            const convertedAmount = convertCurrency(
                expense.amount,
                expense.currency,
                homeCurrency,
                rates
            );

            converted.textContent =
                `Converted: ${formatMoney(convertedAmount, homeCurrency)}`;
        } catch {
            converted.textContent = "Conversion unavailable";
        }

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "delete-button";
        deleteButton.textContent = "Delete";
        deleteButton.setAttribute(
            "aria-label",
            `Delete ${expense.description}`
        );
        deleteButton.dataset.id = expense.id;

        item.append(details, converted, deleteButton);
        container.append(item);
    });

    try {
        const total = calculateTotal(expenses, homeCurrency, rates);

        document.querySelector("#total-amount").textContent =
            formatMoney(total, homeCurrency);
    } catch {
        document.querySelector("#total-amount").textContent =
            "Total unavailable";
    }
}