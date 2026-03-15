// auth.js
import { supabase } from './supabaseClient.js';

document.addEventListener("DOMContentLoaded", () => {

    // Initialize particles background
    if (typeof tsParticles !== "undefined") {
        tsParticles.load("particles", {
            fpsLimit: 60,
            particles: {
                number: { value: 80, density: { enable: true, area: 800 } },
                color: { value: "#ffffff" },
                shape: { type: "circle" },
                opacity: { value: 0.2, random: true },
                size: { value: 3, random: true },
                move: { enable: true, speed: 1, direction: "none", outModes: "out" }
            },
            interactivity: {
                events: { onHover: { enable: true, mode: "repulse" } },
                modes: { repulse: { distance: 100, duration: 0.4 } }
            },
            detectRetina: true
        });
    }

    // Helper function to display messages
    const showMessage = msg => document.getElementById('message').innerText = msg;

    // Signup function
    async function signup() {
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        if (!email || !password) return showMessage("Enter email & password");

        const { error } = await supabase.auth.signUp({ email, password });
        if (error) showMessage(error.message);
        else showMessage("Signup successful! Please login.");
    }

    // Login function
    async function login() {
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        if (!email || !password) return showMessage("Enter email & password");

        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) showMessage(error.message);
        else if (data?.session) {
            // Login successful → go to dashboard
            window.location.href = "dashboard.html";
        } else {
            showMessage("Login failed. Check credentials.");
        }
    }

    // Attach buttons
    document.getElementById('signupBtn').addEventListener('click', signup);
    document.getElementById('loginBtn').addEventListener('click', login);
});