export let expenses = [];

export function addExpense(expense) {
    const updated = [...expenses, expense];
    expenses = updated;
}

export function deleteExpense(id) {
    expenses = expenses.filter((expense) => expense.id !== id);
}

export function updateExpenseCategory(id, newCategory) {
    expenses = expenses.map((expense) => {
        if (expense.id === id) {
            return { ...expense, category: newCategory };
        }

        return expense;
    });
}