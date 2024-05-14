import Link from "next/link";
import Image from "next/image";
import "../app/styles/globals.css";

const Header = () => {
    return (
        <div className="flex items-center justify-between bg-customWhiteHeader px-4 fixed top-0 left-0 w-full z-50 shadow-lg">
            <div className="ml-4 md:ml-8">
                {/* Create space on left without letting it be the button*/}
                <Link href="/">
                    <div className="flex items-center h-full py-1">
                        {/* Uncomment Image if needed */}
                        <Image
                            className="mr-2 md:mr-4"
                            src={`/Designer.png`}
                            width="50"
                            height="50"
                            alt="Logo"
                        />
                        <h1 className="text-4xl md:text-4xl header-text font-medium font-newsreader mt-2">
                            Nimbus
                        </h1>
                    </div>
                </Link>
            </div>
            <div className="flex items-center mr-4 md:mr-8">
                <ul className="flex items-center space-x-6 md:space-x-10">
                    {" "}
                    {/* Reduced spacing */}
                    <li>
                        <Link href="/about-us">
                            <p className="hover:text-gray-300 py-2 md:py-3 px-3 md:px-5">
                                About Us
                            </p>
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard">
                            <p className="hover:text-gray-300 py-2 md:py-3 px-3 md:px-5">
                                Dashboard
                            </p>
                        </Link>
                    </li>
                    <li>
                        <Link href="/login">
                            {" "}
                            {/* md means size 768 and above should apply the tag, otherwise don't*/}
                            <p className="bg-customButton text-white py-2 px-4 font-bold rounded hover:bg-blue-700 transition-colors text-center">
                                Login
                            </p>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Header;
