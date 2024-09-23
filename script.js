document.addEventListener("DOMContentLoaded", function() {
    // Input fields and buttons
    const expenseNameInput = document.getElementById("expenseName");
    const expenseAmountInput = document.getElementById("expenseAmount");
    const inflowDescriptionInput = document.getElementById("inflowDescription");
    const receivedAmountInput = document.getElementById("receivedAmount");
    const addExpenseButton = document.getElementById("addExpense");
    const addReceivedButton = document.getElementById("addReceived");
    const resetButton = document.getElementById("resetButton");

    // Display elements
    const expenseList = document.getElementById("expenseList");
    const inflowList = document.getElementById("inflowList");
    const totalExpensesDisplay = document.getElementById("totalExpenses");
    const totalReceivedDisplay = document.getElementById("totalReceived");
    const totalBalanceDisplay = document.getElementById("totalBalance");

    // Data arrays and totals
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    let inflows = JSON.parse(localStorage.getItem("inflows")) || [];
    let totalReceived = parseFloat(localStorage.getItem("totalReceived")) || 0;
    let totalExpenses = parseFloat(localStorage.getItem("totalExpenses")) || 0;

    // Render all data when the page loads
    function renderData() {
        expenseList.innerHTML = ""; // Clear the list
        inflowList.innerHTML = "";  // Clear the inflow list

        // Render expenses
        expenses.forEach((expense, index) => {
            const li = document.createElement("li");
            li.textContent = `${expense.name}: $${expense.amount}`;
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.onclick = function() {
                deleteExpense(index);
            };
            li.appendChild(deleteButton);
            expenseList.appendChild(li);
        });

        // Render inflows
        inflows.forEach((inflow, index) => {
            const li = document.createElement("li");
            li.textContent = `${inflow.description}: $${inflow.amount}`;
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.onclick = function() {
                deleteInflow(index);
            };
            li.appendChild(deleteButton);
            inflowList.appendChild(li);
        });

        // Update totals on screen
        totalExpensesDisplay.textContent = totalExpenses.toFixed(2);
        totalReceivedDisplay.textContent = totalReceived.toFixed(2);
        totalBalanceDisplay.textContent = (totalReceived - totalExpenses).toFixed(2);
    }

    // Add expense function
    function addExpense() {
        const name = expenseNameInput.value;
        const amount = parseFloat(expenseAmountInput.value);

        if (name && amount) {
            expenses.push({ name, amount });
            totalExpenses += amount;

            // Save to local storage
            localStorage.setItem("expenses", JSON.stringify(expenses));
            localStorage.setItem("totalExpenses", totalExpenses.toFixed(2));

            // Clear inputs and render updated data
            //expenseNameInput.value = "";
            //expenseAmountInput.value = "";
            //renderData();
       // } else {
        //    alert("Please enter both expense name and amount.");
        }
    }

    // Add received amount (inflow) function
    function addReceived() {
        const description = inflowDescriptionInput.value;
        const amount = parseFloat(receivedAmountInput.value);

        if (description && amount) {
            inflows.push({ description, amount });
            totalReceived += amount;

            // Save to local storage
            localStorage.setItem("inflows", JSON.stringify(inflows));
            localStorage.setItem("totalReceived", totalReceived.toFixed(2));

            // Clear inputs and render updated data
            inflowDescriptionInput.value = "";
            receivedAmountInput.value = "";
            renderData();
        } else {
            alert("Please enter both inflow description and amount.");
        }
    }

    // Delete expense function
    function deleteExpense(index) {
        totalExpenses -= parseFloat(expenses[index].amount);
        expenses.splice(index, 1);

        // Update local storage
        localStorage.setItem("expenses", JSON.stringify(expenses));
        localStorage.setItem("totalExpenses", totalExpenses.toFixed(2));
        renderData();
    }

    // Delete inflow function
    function deleteInflow(index) {
        totalReceived -= parseFloat(inflows[index].amount);
        inflows.splice(index, 1);

        // Update local storage
        localStorage.setItem("inflows", JSON.stringify(inflows));
        localStorage.setItem("totalReceived", totalReceived.toFixed(2));
        renderData();
    }

    // Reset all data function
    function resetData() {
        // Clear data
        expenses = [];
        inflows = [];
        totalReceived = 0;
        totalExpenses = 0;

        // Clear local storage
        localStorage.clear();

        // Render updated data
        renderData();
    }

    // Event listeners
    addExpenseButton.addEventListener("click", addExpense);
    addReceivedButton.addEventListener("click", addReceived);
    resetButton.addEventListener("click", resetData);

    // Initial rendering
    renderData();
});
