import { supabase } from "./supabaseClient.js"

async function loadDashboard(){

const { data: sales } = await supabase
.from("sales")
.select("total")

const { data: expenses } = await supabase
.from("expenses")
.select("amount")

let totalSales = sales.reduce((sum,s)=>sum+s.total,0)
let totalExpenses = expenses.reduce((sum,e)=>sum+e.amount,0)

let profit = totalSales-totalExpenses

document.getElementById("sales").innerText = totalSales
document.getElementById("expenses").innerText = totalExpenses
document.getElementById("profit").innerText = profit

}

loadDashboard()