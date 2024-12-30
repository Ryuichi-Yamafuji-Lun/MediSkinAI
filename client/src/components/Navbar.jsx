const NavBar = ({ isScrolled }) => {
    return (
        <nav
            className={`w-full flex justify-between items-center px-8 py-4 sticky top-0 transition duration-300 z-50 ${
                isScrolled
                    ? "bg-white shadow-lg"
                    : "bg-transparent"
            }`}
        >
            {/* Logo Section */}
            <div className="text-2xl font-bold text-gray-800">MediSkinAI</div>

            {/* Links Section */}
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
                    href="/forecast"
                    className="text-gray-800 font-medium hover:text-gray-500 transition duration-300"
                >
                    Detection
                </a>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-gray-800 focus:outline-none">
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
        </nav>
    );
};

export default NavBar;
