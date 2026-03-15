import { supabase } from "./supabaseClient.js"

// Logout
document.getElementById("logoutBtn").addEventListener("click", async () => {
    await supabase.auth.signOut()
    window.location.href = "index.html"
})

// Add expense
async function addExpense(){
    const name = document.getElementById("name").value
    const category = document.getElementById("category").value
    const amount = document.getElementById("amount").value

    const { data: userData } = await supabase.auth.getUser()
    const user = userData.user

    const { error } = await supabase.from("expenses").insert([
        { name, category, amount, user_id: user.id }
    ])

    if(error){ alert("Error adding expense") }
    else { loadExpenses() }
}

// Load expenses
async function loadExpenses(){
    const { data: userData } = await supabase.auth.getUser()
    const user = userData.user

    const { data: expenses } = await supabase
        .from("expenses")
        .select("*")
        .eq("user_id", user.id)
        .order("date",{ascending:false})

    const table = document.getElementById("expenseTable")
    table.innerHTML = ""
    expenses.forEach(e => {
        const row = document.createElement("tr")
        row.innerHTML = `
        <td>${e.name}</td>
        <td>${e.category}</td>
        <td>${e.amount}</td>
        <td>${e.date}</td>
        <td><button onclick="deleteExpense('${e.id}')">Delete</button></td>
        `
        table.appendChild(row)
    })
}

// Delete expense
async function deleteExpense(id){
    await supabase.from("expenses").delete().eq("id", id)
    loadExpenses()
}

window.addExpense = addExpense
window.deleteExpense = deleteExpense
loadExpenses()