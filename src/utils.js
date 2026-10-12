export function convertCurrency(amount, fromCurrency, toCurrency, rates) {
    if (!Number.isFinite(amount) || amount < 0) {
        throw new Error("Amount must be a non-negative number.");
    }

    if (fromCurrency === toCurrency) {
        return amount;
    }

    if (
        !rates ||
        !Number.isFinite(rates[fromCurrency]) ||
        !Number.isFinite(rates[toCurrency]) ||
        rates[fromCurrency] <= 0 ||
        rates[toCurrency] <= 0
    ) {
        throw new Error("Missing or invalid exchange rate.");
    }

    // Rates are relative to the same base currency.
    return (amount / rates[fromCurrency]) * rates[toCurrency];
}

export function calculateTotal(expenses, homeCurrency, rates) {
    return expenses.reduce((total, expense) => {
        return total + convertCurrency(
            expense.amount,
            expense.currency,
            homeCurrency,
            rates
        );
    }, 0);
}

export function filterExpenses(expenses, category) {
    if (category === "All") {
        return expenses;
    }

    return expenses.filter(
        (expense) => expense.category === category
    );
}

export function formatMoney(amount, currency) {
    return new Intl.NumberFormat("en-KE", {
        style: "currency",
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}
