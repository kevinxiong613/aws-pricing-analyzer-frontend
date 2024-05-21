"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import "../app/styles/globals.css";
import { useRouter } from "next/navigation";

const Header = () => {
    const [token, setToken] = useState(null);
    const router = useRouter();

    useEffect(() => {
        setToken(localStorage.getItem("token"));
    }, []); // Get the token to see if we should render this with login or logout button

    useEffect(() => {
        // This will be called whenever a route changes
        const storedToken = localStorage.getItem("token");
        setToken(storedToken);
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove from local storage to be null
        setToken(null);
    };

    return (
        <div className="flex items-center justify-between bg-customWhiteHeader px-4 fixed top-0 left-0 w-full z-50 shadow-lg">
            <div>
                {/* Create space on left without letting it be the button*/}
                <Link href="/">
                    <div className="flex items-center h-full py-1">
                        {/* Uncomment Image if needed */}
                        <Image
                            className="mr-1 md:mr-2 rounded-lg"
                            src={`/Designer.png`}
                            width="50"
                            height="50"
                            alt="Logo"
                        />
                        <h1 className="text-4xl md:text-4xl text-customBlue font-medium font-newsreader mt-2">
                            Munchka
                        </h1>
                    </div>
                </Link>
            </div>
            <div className="flex items-center space-x-6 md:space-x-10">
                {/* Reduced spacing */}
                <ul className="flex items-center">
                    <li>
                        <Link href="/search">
                            <p className="hover:text-gray-300 py-2 md:py-3 px-3 md:px-5">
                                Search
                            </p>
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard">
                            <p className="hover:text-gray-300 py-2 md:py-3 px-3 mr-5 md:px-5">
                                Dashboard
                            </p>
                        </Link>
                    </li>
                    {token ? (
                        <li>
                            <Link href="/" onClick={handleLogout}>
                                <p className="bg-customBlue text-white py-2 px-4 font-bold rounded hover:bg-blue-700 transition-colors text-center cursor-pointer">
                                    Logout
                                </p>
                            </Link>
                        </li>
                    ) : (
                        <li>
                            <Link href="/login">
                                <p className="bg-customBlue text-white py-2 px-4 font-bold rounded hover:bg-blue-700 transition-colors text-center">
                                    Login
                                </p>
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Header;
