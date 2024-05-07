"use client";
import React, { useState } from "react";

export default function Login() {
    // State to manage form input values
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Function to handle form submission
    const handleLogin = (e) => {
        e.preventDefault();
        // Here you would typically send the form data to an API for authentication
        console.log("Email:", email);
        console.log("Password:", password);

        // Reset the form fields (optional)
        setEmail("");
        setPassword("");
    };

    return (
        <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
            <h2>Logi</h2>
            <form onSubmit={handleLogin}>
                <div style={{ marginBottom: "15px" }}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        style={{ width: "100%" }}
                    />
                </div>
                <div style={{ marginBottom: "15px" }}>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                        style={{ width: "100%" }}
                    />
                </div>
                <button type="submit" style={{ padding: "10px 20px" }}>
                    Login
                </button>
            </form>
        </div>
    );
}
