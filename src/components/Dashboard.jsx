"use client";
import React, { useEffect } from "react";
import "../app/styles/globals.css";
import Image from "next/image";
import { getAWS } from "@/api/aws";

export default function Dashboard() {
    useEffect(() => {
        const getInfo = async () => {
            try {
                const awsInfo = await getAWS();
                console.log(awsInfo);
            } catch (error) {
                console.error(error);
            }
        };
        getInfo();
    }, []);
    return (
        <div className="min-h-screen bg-customWhiteHeader flex flex-col items-center mt-10">
            <div className="flex flex-col items-center justify-center pt-10">
                <h2 className="text-3xl font-newsreader p-5">
                    Welcome to Your Dashboard
                </h2>
                <div className="flex items-center mb-10">
                    <Image
                        className="mb-2 mr-5 rounded-lg"
                        src={`/test.png`}
                        width="600"
                        height="400"
                        alt="Dashboard Image"
                    />
                </div>
            </div>
            <div className="flex flex-col w-4/5 md:w-3/5 lg:w-2/5 bg-white p-5 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold header-text-sub mb-4">Overview</h2>
                <p className="text-lg">
                    Here you can manage your business data and insights. Use the
                    navigation to access different sections of your dashboard.
                </p>
                <ul className="list-disc ml-5 mt-4">
                    <li className="mb-2">Monitor performance metrics</li>
                    <li className="mb-2">Manage your projects</li>
                    <li className="mb-2">View financial reports</li>
                </ul>
            </div>
        </div>
    );
}
