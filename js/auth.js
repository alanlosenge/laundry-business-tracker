import { supabase } from "./supabaseClient.js"

async function signup(){

const email = document.getElementById("email").value
const password = document.getElementById("password").value

const {data,error} = await supabase.auth.signUp({
email: email,
password: password
})

if(error){
document.getElementById("message").innerText = error.message
}
else{
document.getElementById("message").innerText = "Account created!"
}
}

async function login(){

const email = document.getElementById("email").value
const password = document.getElementById("password").value

const {data,error} = await supabase.auth.signInWithPassword({
email: email,
password: password
})

if(error){
document.getElementById("message").innerText = error.message
}
else{
window.location.href = "dashboard.html"
}

}

window.signup = signup
window.login = login