import { describe, test, expect } from "@jest/globals";
import {
    convertCurrency,
    calculateTotal,
    filterExpenses
} from "../src/utils.js";

const rates = {
    USD: 1,
    KES: 130,
    EUR: 0.92,
    GBP: 0.78
};

const expenses = [
    { description: "Lunch", amount: 10, currency: "USD", category: "Food" },
    { description: "Bus", amount: 260, currency: "KES", category: "Transport" },
    { description: "Shoes", amount: 20, currency: "EUR", category: "Shopping" }
];

describe("convertCurrency", () => {
    test("converts USD to KES", () => {
        expect(convertCurrency(10, "USD", "KES", rates)).toBe(1300);
    });

    test("returns the same amount for the same currency", () => {
        expect(convertCurrency(25, "EUR", "EUR", rates)).toBe(25);
    });

    test("handles zero amounts", () => {
        expect(convertCurrency(0, "USD", "KES", rates)).toBe(0);
    });

    test("throws an error when a rate is missing", () => {
        expect(() =>
            convertCurrency(10, "USD", "JPY", rates)
        ).toThrow("Missing or invalid exchange rate.");
    });
});

describe("calculateTotal", () => {
    test("calculates a total in the selected currency", () => {
        // $10 + 260 KES + 20 EUR, converted to USD.
        const total = calculateTotal(expenses, "USD", rates);

        expect(total).toBeCloseTo(19.7538461538);
    });

    test("returns zero for an empty expense list", () => {
        expect(calculateTotal([], "KES", rates)).toBe(0);
    });
});

describe("filterExpenses", () => {
    test("returns only expenses in the selected category", () => {
        const result = filterExpenses(expenses, "Food");

        expect(result).toHaveLength(1);
        expect(result[0].description).toBe("Lunch");
    });

    test("returns every expense when All is selected", () => {
        expect(filterExpenses(expenses, "All")).toHaveLength(3);
    });
});