// Array donde se almacenan los gastos
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

/**
 * Guarda los datos en localStorage
 */
function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

/**
 * Renderiza la lista de gastos en pantalla
 */
function renderExpenses() {
    const list = document.getElementById("expense-list");
    const totalElement = document.getElementById("total");

    list.innerHTML = "";

    let total = 0;

    expenses.forEach((expense, index) => {
        total += expense.amount;

        const li = document.createElement("li");
        li.innerHTML = `
            ${expense.description} - $${expense.amount}
            <button onclick="deleteExpense(${index})">X</button>
        `;

        list.appendChild(li);
    });

    totalElement.textContent = `Total: $${total}`;
}

/**
 * Agrega un nuevo gasto
 */
function addExpense() {
    const description = document.getElementById("description").value;
    const amount = parseFloat(document.getElementById("amount").value);

    if (!description || isNaN(amount)) {
        alert("Datos inválidos");
        return;
    }

    expenses.push({ description, amount });
    saveExpenses();
    renderExpenses();
}

/**
 * Elimina un gasto
 */
function deleteExpense(index) {
    expenses.splice(index, 1);
    saveExpenses();
    renderExpenses();
}

// Inicialización
renderExpenses();