import { supabase } from "./supabaseClient.js"

document.getElementById("logoutBtn").addEventListener("click", async () => {
    await supabase.auth.signOut()
    window.location.href = "index.html"
})

async function addSale(){
    const service = document.getElementById("service").value
    const quantity = document.getElementById("quantity").value
    const price = document.getElementById("price").value
    const total = quantity * price

    const { data: userData } = await supabase.auth.getUser()
    const user = userData.user

    const { error } = await supabase.from("sales").insert([{ service, quantity, price, total, user_id: user.id }])
    if(error){ alert("Error adding sale") }
    else { loadSales() }
}

async function loadSales(){
    const { data: userData } = await supabase.auth.getUser()
    const user = userData.user

    const { data: sales } = await supabase.from("sales").select("*").eq("user_id", user.id).order("date",{ascending:false})
    const table = document.getElementById("salesTable")
    table.innerHTML = ""
    sales.forEach(s => {
        const row = document.createElement("tr")
        row.innerHTML = `<td>${s.service}</td><td>${s.quantity}</td><td>${s.price}</td><td>${s.total}</td><td>${s.date}</td>
        <td><button onclick="deleteSale('${s.id}')">Delete</button></td>`
        table.appendChild(row)
    })
}

async function deleteSale(id){
    await supabase.from("sales").delete().eq("id",id)
    loadSales()
}

window.addSale = addSale
window.deleteSale = deleteSale
loadSales()