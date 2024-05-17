"use client";
import React, { useEffect } from "react";
import { verifyUser } from "@/api/auth";
import { useRouter } from "next/navigation"; // Redirect to dashboard page
import Header from "@/components/Header";
import Dashboard from "@/components/Dashboard";

export default function dashboard() {
    const router = useRouter();

    useEffect(() => {
        const verifyToken = async () => {
            {
                /* Need to have this async function in here, can't directly put async function as parameter of useEffect since it expects a "cleanup" function */
            }
            const jwtToken = localStorage.getItem("token");
            try {
                const verified = await verifyUser(jwtToken);
                if (!verified) {
                    router.push("/login");
                }
            } catch (error) {
                console.error(error);
                router.push("/login"); // If there is an error verifying their token don't want them on this page
            }
        };

        verifyToken();
    }, []);

    return (
        <>
            <Header />
            <Dashboard />
        </>
    );
}
