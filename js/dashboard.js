import { supabase } from "./supabaseClient.js"

// Logout
document.getElementById("logoutBtn").addEventListener("click", async () => {
    await supabase.auth.signOut()
    window.location.href = "index.html"
})

async function loadDashboard(){
    const { data: userData } = await supabase.auth.getUser()
    const user = userData.user

    // Sales
    const { data: sales } = await supabase
        .from("sales").select("total, date")
        .eq("user_id", user.id)

    // Expenses
    const { data: expenses } = await supabase
        .from("expenses").select("amount, date")
        .eq("user_id", user.id)

    let totalSales = sales.reduce((sum,s)=>sum+Number(s.total),0)
    let totalExpenses = expenses.reduce((sum,e)=>sum+Number(e.amount),0)
    let profit = totalSales - totalExpenses

    document.getElementById("sales").innerText = totalSales
    document.getElementById("expenses").innerText = totalExpenses
    document.getElementById("profit").innerText = profit

    // Prepare chart data
    const salesLabels = sales.map(s => s.date)
    const salesData = sales.map(s => s.total)

    const expensesLabels = expenses.map(e => e.date)
    const expensesData = expenses.map(e => e.amount)

    const ctxSales = document.getElementById("salesChart")
    new Chart(ctxSales, {
        type: 'line',
        data: { labels: salesLabels, datasets:[{ label:'Sales', data:salesData, borderWidth:2, borderColor:'#2563eb', tension:0.3 }] },
        options: { responsive:true }
    })

    const ctxProfit = document.getElementById("profitChart")
    const profitData = salesData.map((s,i)=>s-(expensesData[i]||0))
    new Chart(ctxProfit, {
        type: 'line',
        data:{ labels:salesLabels, datasets:[{ label:'Profit', data:profitData, borderWidth:2, borderColor:'#16a34a', tension:0.3 }] },
        options:{ responsive:true }
    })

    const ctxExpense = document.getElementById("expenseChart")
    new Chart(ctxExpense, {
        type:'line',
        data:{ labels:expensesLabels, datasets:[{ label:'Expenses', data:expensesData, borderWidth:2, borderColor:'#ef4444', tension:0.3 }] },
        options:{ responsive:true }
    })
}

loadDashboard()