import { useState } from "react";
import Logo from "../assets/Logo.png"

const NavBar = ({ isScrolled }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav
            className={`w-full flex justify-between items-center px-8 py-4 sticky top-0 transition duration-300 z-50 ${
                isScrolled ? "bg-white shadow-lg" : "bg-transparent"
            }`}
        >
            {/* Logo Section */}
            <div className="text-2xl font-bold text-gray-800 flex items-center">
                <a href="/" className="flex items-center">
                    {/* Logo */}
                    <img
                        src={Logo}
                        alt="Logo"
                        className="h-8 w-8 mr-2"
                    />
                    {/* Text */}
                    MediSkinAI
                </a>
            </div>

            {/* Desktop Links Section */}
            <div className="hidden md:flex space-x-8">
                <a
                    href="/"
                    className="text-gray-800 font-medium hover:text-gray-500 transition duration-300"
                >
                    Home
                </a>
                <a
                    href="/about"
                    className="text-gray-800 font-medium hover:text-gray-500 transition duration-300"
                >
                    About
                </a>
                <a
                    href="/detection"
                    className="text-gray-800 font-medium hover:text-gray-500 transition duration-300"
                >
                    Detection
                </a>
            </div>

            {/* Mobile Menu Button */}
            <button
                className="md:hidden text-gray-800 focus:outline-none"
                onClick={toggleMenu}
            >
                <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
            </button>

            {/* Mobile Dropdown Menu */}
            <div
                className={`absolute top-full left-0 w-full bg-white shadow-lg rounded-lg transition-all duration-300 ease-in-out overflow-hidden ${
                    isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
                }`}
            >
                <div className="flex flex-col space-y-4 py-4 px-8 items-center">
                    <a
                        href="/"
                        className="text-gray-800 font-medium hover:text-gray-500 transition duration-300"
                    >
                        Home
                    </a>
                    <a
                        href="/about"
                        className="text-gray-800 font-medium hover:text-gray-500 transition duration-300"
                    >
                        About
                    </a>
                    <a
                        href="/detection"
                        className="text-gray-800 font-medium hover:text-gray-500 transition duration-300"
                    >
                        Detection
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;