import { supabase } from "./supabaseClient.js"

const logoutBtn = document.getElementById("logoutBtn")

logoutBtn.addEventListener("click", async () => {
await supabase.auth.signOut()
window.location.href = "index.html"
})

async function loadDashboard(){

const { data: userData } = await supabase.auth.getUser()
const user = userData.user

// SALES
const { data: sales } = await supabase
.from("sales")
.select("total, date")
.eq("user_id", user.id)

// EXPENSES
const { data: expenses } = await supabase
.from("expenses")
.select("amount")
.eq("user_id", user.id)

let totalSales = 0
let totalExpenses = 0

if(sales){
totalSales = sales.reduce((sum, s) => sum + Number(s.total), 0)
}

if(expenses){
totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount), 0)
}

let profit = totalSales - totalExpenses

document.getElementById("sales").innerText = totalSales
document.getElementById("expenses").innerText = totalExpenses
document.getElementById("profit").innerText = profit


// Chart data
const labels = sales.map(s => s.date)
const salesData = sales.map(s => s.total)

const ctx = document.getElementById("salesChart")

new Chart(ctx, {
type: "line",
data: {
labels: labels,
datasets: [{
label: "Sales",
data: salesData,
borderWidth: 2,
tension: 0.3
}]
},
options:{
responsive:true
}
})

}

loadDashboard()