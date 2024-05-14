"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

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
        <div className="flex flex-col items-center justify-center pt-60">
            {/* Add a shadow, padding, and border radius */}
            <div className="bg-white p-10 rounded-lg shadow-lg">
                <div className="flex justify-center items-center">
                    <Image
                        className="mr-5"
                        src={`/Designer.png`}
                        width="100"
                        height="100"
                        alt="Logo"
                    />
                </div>
                <form onSubmit={handleLogin}>
                    <div className="mb-15 text-xl p-5">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            className="border p-2 border-gray-800 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-15 text-xl p-5">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            className="border p-2 border-gray-800 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div className="mb-15 text-xl p-5">
                        <button
                            className="bg-customButton py-2 px-40 font-bold text-white text-xl rounded-lg hover:bg-blue-700"
                            type="submit"
                        >
                            Login
                        </button>
                    </div>
                </form>
                <div className="text-center">
                    <Link href="/sign-up">
                        {" "}
                        {/* If they don't have an account link them to the sign up page instead */}
                        <button className="hover:text-blue-700">
                            Don't have an account? Sign up here.
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
