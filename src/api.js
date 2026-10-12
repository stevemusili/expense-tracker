export async function fetchExchangeRates(baseCurrency = "USD") {
    const response = await fetch(
        `https://open.er-api.com/v6/latest/${encodeURIComponent(baseCurrency)}`
    );

    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();

    if (
        data.result !== "success" ||
        !data.rates ||
        typeof data.rates !== "object"
    ) {
        throw new Error("Could not retrieve valid exchange rates.");
    }

    return data.rates;
}