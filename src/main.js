import { fetchExchangeRates } from "./api.js";
import { expenses, addExpense, deleteExpense } from "./state.js";
import { renderExpenses } from "./ui.js";

let rates = null;
let homeCurrency = document.querySelector("#home-currency").value;
let loadingRates = false;

const form = document.querySelector("#expense-form");
const status = document.querySelector("#status");
const submitButton = form.querySelector('button[type="submit"]');

function updateUI() {
    renderExpenses(
        expenses,
        homeCurrency,
        rates,
        document.querySelector("#filter").value
    );
}

async function loadRates() {
    if (loadingRates) {
        return;
    }

    loadingRates = true;
    submitButton.disabled = true;
    status.textContent = `Loading ${homeCurrency} exchange rates...`;
    status.className = "";

    try {
        const newRates = await fetchExchangeRates(homeCurrency);

        // Replace the rates only after a successful response.
        rates = newRates;

        status.textContent =
            `Exchange rates loaded successfully. Base currency: ${homeCurrency}.`;
        status.className = "status-success";

        updateUI();
    } catch (error) {
        console.error("Exchange rate error:", error);

        status.textContent =
            "Unable to load exchange rates. Check your internet connection and try again.";

        status.className = "status-error";
    } finally {
        loadingRates = false;
        submitButton.disabled = false;
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!rates) {
        status.textContent =
            "Expenses cannot be added until exchange rates load successfully.";
        status.className = "status-error";
        return;
    }

    const description = document.querySelector("#description").value.trim();
    const amount = Number(document.querySelector("#amount").value);
    const currency = document.querySelector("#expense-currency").value;
    const category = document.querySelector("#category").value;

    if (!description || !Number.isFinite(amount) || amount <= 0) {
        status.textContent =
            "Enter a description and an amount greater than zero.";
        status.className = "status-error";
        return;
    }

    addExpense({
        id: crypto.randomUUID(),
        description,
        amount,
        currency,
        category
    });

    form.reset();
    document.querySelector("#expense-currency").value = "USD";
    document.querySelector("#category").value = "Food";

    status.textContent = "Expense added successfully.";
    status.className = "status-success";

    updateUI();
});

document.querySelector("#home-currency").addEventListener(
    "change",
    async (event) => {
        homeCurrency = event.target.value;
        await loadRates();
    }
);

document.querySelector("#filter").addEventListener("change", updateUI);

document.querySelector("#expenses-container").addEventListener(
    "click",
    (event) => {
        const button = event.target.closest(".delete-button");

        if (!button) {
            return;
        }

        deleteExpense(button.dataset.id);
        updateUI();

        status.textContent = "Expense deleted successfully.";
        status.className = "status-success";
    }
);

loadRates();