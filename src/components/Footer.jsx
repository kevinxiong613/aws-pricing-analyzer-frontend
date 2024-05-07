import React from "react";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="flex items-center justify-between px-4 py-2 bg-customHeaderBlack text-white fixed bottom-0 left-0 w-full z-50">
            <div className="flex items-center">
                <div>
                    <h2 className="text-lg font-bold">Socials</h2>
                    <div className="flex space-x-2 mt-2">
                        {/* Example social media icons */}
                        <a href="#" className="text-gray-300 hover:text-white">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                />
                            </svg>
                        </a>
                        <a href="#" className="text-gray-300 hover:text-white">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 14H3m13 0h-5m5 0l1-5-1 5zM5 14v6a2 2 0 002 2h10a2 2 0 002-2v-6"
                                />
                            </svg>
                        </a>
                        {/* Add more social media icons as needed */}
                    </div>
                    <h>Copyright</h>
                </div>
            </div>
            <div>
                <Link href="/contact-us">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Contact Us
                    </button>
                </Link>
            </div>
        </footer>
    );
};

export default Footer;
