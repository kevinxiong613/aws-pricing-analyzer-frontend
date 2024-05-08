import Link from "next/link";
import Image from "next/image";
import "../app/styles/globals.css";

const Header = () => {
    return (
        <div className="flex items-center justify-between bg-customWhiteHeader px-4 py-1 fixed top-0 left-0 w-full z-50 shadow-lg">
            <div className="ml-60">
                {/* Create space on left without letting it be the button*/}
                <Link href="/">
                    <div className="flex items-center h-full py-1">
                        {/* Uncomment Image if needed */}
                        <Image
                            className="mr-5"
                            src={`/Designer.png`}
                            width="80"
                            height="80"
                            alt="Logo"
                        />
                        <h1 className="text-5xl header-text font-medium font-newsreader mt-2">
                            Nimbus
                        </h1>
                    </div>
                </Link>
            </div>
            <div className="flex justify-center items-center mr-60">
                <ul className="flex space-x-10">
                    {" "}
                    {/* Reduced spacing */}
                    <li>
                        <Link href="/about-us">
                            <p className="hover:text-gray-300 py-3 px-5 text-xl">
                                About Us
                            </p>
                        </Link>
                    </li>
                    <li>
                        <Link href="/contact-us">
                            <p className="hover:text-gray-300 py-3 px-5 text-xl">
                                Contact Us
                            </p>
                        </Link>
                    </li>
                    <li>
                        <Link href="/login">
                            <p className="bg-customButton text-xl text-white py-3 px-4 font-bold rounded hover:bg-blue-700 transition-colors text-center">
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
