"use client";
import React, { useEffect } from "react";
import { verifyUser } from "@/api/auth";
import { useRouter } from "next/navigation"; // Redirect to dashboard page

export default function Dashboard() {
    const router = useRouter();

    useEffect(() => {
        const verifyToken = async () => {
            {
                /* Need to have this async function in here, can't directly put async function as parameter of useEffect since it expects a "cleanup" function */
            }
            const jwtToken = localStorage.getItem("token");
            console.log("jwtToken " + jwtToken);
            try {
                const verified = await verifyUser(jwtToken);
            } catch (error) {
                console.error(error);
            }
            if (!verified) {
                router.push("/login");
            }
        };

        verifyToken();
    }, [router]);

    return <div></div>;
}
