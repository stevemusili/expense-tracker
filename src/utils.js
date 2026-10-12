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

