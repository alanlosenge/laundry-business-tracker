import { supabase } from "./supabaseClient.js"

const logoutBtn = document.getElementById("logoutBtn")

logoutBtn.addEventListener("click", async () => {
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

const { error } = await supabase
.from("sales")
.insert([
{
service: service,
quantity: quantity,
price: price,
total: total,
user_id: user.id
}
])

if(error){
alert("Error adding sale")
}
else{
alert("Sale added successfully")
loadSales()
}

}

async function loadSales(){

const { data: userData } = await supabase.auth.getUser()
const user = userData.user

const { data: sales } = await supabase
.from("sales")
.select("*")
.eq("user_id", user.id)
.order("date",{ascending:false})

const table = document.getElementById("salesTable")

table.innerHTML = ""

sales.forEach(sale => {

const row = document.createElement("tr")

row.innerHTML = `
<td>${sale.service}</td>
<td>${sale.quantity}</td>
<td>${sale.price}</td>
<td>${sale.total}</td>
<td>${sale.date}</td>
<td>
<button onclick="deleteSale('${sale.id}')">Delete</button>
</td>
`

table.appendChild(row)

})

}

async function deleteSale(id){

const { error } = await supabase
.from("sales")
.delete()
.eq("id",id)

if(error){
alert("Delete failed")
}
else{
loadSales()
}

}

window.addSale = addSale
window.deleteSale = deleteSale

loadSales()