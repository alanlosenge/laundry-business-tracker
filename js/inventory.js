import { supabase } from "./supabaseClient.js"

// Logout
document.getElementById("logoutBtn").addEventListener("click", async () => {
    await supabase.auth.signOut()
    window.location.href = "index.html"
})

// Add inventory item
async function addItem(){
    const item = document.getElementById("item").value
    const quantity = document.getElementById("quantity").value
    const cost = document.getElementById("cost").value

    const { data: userData } = await supabase.auth.getUser()
    const user = userData.user

    const { error } = await supabase.from("inventory").insert([
        { item_name:item, quantity, cost, user_id:user.id }
    ])

    if(error){ alert("Error adding item") }
    else { loadInventory() }
}

// Load inventory
async function loadInventory(){
    const { data: userData } = await supabase.auth.getUser()
    const user = userData.user

    const { data: items } = await supabase.from("inventory")
        .select("*")
        .eq("user_id", user.id)

    const table = document.getElementById("inventoryTable")
    table.innerHTML = ""
    items.forEach(i => {
        const row = document.createElement("tr")
        row.innerHTML = `
        <td>${i.item_name}</td>
        <td>${i.quantity}</td>
        <td>${i.cost}</td>
        <td>${i.updated_at}</td>
        <td><button onclick="deleteItem('${i.id}')">Delete</button></td>
        `
        table.appendChild(row)
    })
}

// Delete inventory item
async function deleteItem(id){
    await supabase.from("inventory").delete().eq("id", id)
    loadInventory()
}

window.addItem = addItem
window.deleteItem = deleteItem
loadInventory()