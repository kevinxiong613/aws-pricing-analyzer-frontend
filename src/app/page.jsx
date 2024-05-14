"use client";
import React from "react";
import "../app/styles/globals.css";
import Home from "../components/Home.jsx";
import Header from "@/components/Header";
export default function Main() {
    return (
        <div>
            <Header />
            <Home />
        </div>
    );
}
