import { supabase } from "./supabaseClient.js"

const logoutBtn = document.getElementById("logoutBtn")

logoutBtn.addEventListener("click", async () => {
await supabase.auth.signOut()
window.location.href = "index.html"
})

async function addExpense(){

const name = document.getElementById("name").value
const category = document.getElementById("category").value
const amount = document.getElementById("amount").value

const { data: userData } = await supabase.auth.getUser()
const user = userData.user

const { error } = await supabase
.from("expenses")
.insert([
{
name: name,
category: category,
amount: amount,
user_id: user.id
}
])

if(error){
alert("Error adding expense")
}
else{
alert("Expense added")
loadExpenses()
}

}

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

expenses.forEach(expense => {

const row = document.createElement("tr")

row.innerHTML = `
<td>${expense.name}</td>
<td>${expense.category}</td>
<td>${expense.amount}</td>
<td>${expense.date}</td>
<td>
<button onclick="deleteExpense('${expense.id}')">Delete</button>
</td>
`

table.appendChild(row)

})

}

async function deleteExpense(id){

const { error } = await supabase
.from("expenses")
.delete()
.eq("id",id)

if(error){
alert("Delete failed")
}
else{
loadExpenses()
}

}

window.addExpense = addExpense
window.deleteExpense = deleteExpense

loadExpenses()