import Link from "next/link";
import Image from "next/image";
import "../app/styles/globals.css";

const Header = () => {
    return (
        <div className="flex items-center justify-between bg-customWhiteHeader px-4 py-4 fixed top-0 left-0 w-full z-50">
            <div className="flex items-center ml-10 h-full py-2 px-5">
                {/* Uncomment Image if needed */}
                <Image
                    className="mb-2 mr-5"
                    src={`/Designer.png`}
                    width="80"
                    height="80"
                    alt="Logo"
                />
                <h1 className="text-5xl header-text font-medium font-newsreader">
                    Nimbus
                </h1>
            </div>
            <div className="flex justify-center items-center">
                <ul className="flex space-x-10">
                    {" "}
                    {/* Reduced spacing */}
                    <li>
                        <Link href="/about-us">
                            <p className="hover:text-gray-300 py-2 px-5 text-xl">
                                About Us
                            </p>
                        </Link>
                    </li>
                    <li>
                        <Link href="/contact-us">
                            <p className="hover:text-gray-300 py-2 px-5 text-xl">
                                Contact Us
                            </p>
                        </Link>
                    </li>
                    <li>
                        <Link href="/login">
                            <p className="bg-customButton text-xl text-white py-2 px-5 font-bold rounded hover:bg-blue-700 transition-colors text-center ml-5 mr-10">
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
