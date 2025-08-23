import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import Logo from "../assets/Logo.png";

const NavBar = ({ isScrolled }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    const navLinks = [
        { to: "/", label: "Home" },
        { to: "/about", label: "About" },
    ];


    const activeLinkStyle = {
      color: '#2563eb', 
      fontWeight: '600',
    };

    return (
        <nav
            className={`sticky top-0 z-50 w-full flex items-center justify-between px-4 sm:px-8 py-4 transition-colors duration-300 ease-in-out ${
                isScrolled || isMenuOpen ? "bg-white shadow-md" : "bg-transparent"
            }`}
        >
            {/* Logo Section */}
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-slate-800">
                <img src={Logo} alt="MediSkinAI Logo" className="h-8 w-auto" />
                MediSkinAI
            </Link>

            {/* Desktop Links & CTA */}
            <div className="hidden md:flex items-center gap-6">
                {navLinks.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        style={({ isActive }) => isActive ? activeLinkStyle : undefined}
                        className="text-slate-600 hover:text-blue-600 transition-colors duration-200"
                    >
                        {link.label}
                    </NavLink>
                ))}
                <NavLink
                    to="/detection"
                    className="bg-blue-600 text-white font-semibold px-5 py-2 rounded-full hover:bg-blue-700 shadow-sm transition-all duration-200"
                >
                    Start Detection
                </NavLink>
            </div>

            {/* Mobile Menu Button (Hamburger/Close Icon) */}
            <button
                className="md:hidden z-50 text-slate-800"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-controls="mobile-menu"
                aria-expanded={isMenuOpen}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
                <div className="w-6 h-6 flex flex-col justify-around">
                    <span className={`block h-0.5 bg-current transform transition duration-300 ease-in-out ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
                    <span className={`block h-0.5 bg-current transition duration-300 ease-in-out ${isMenuOpen ? "opacity-0" : ""}`} />
                    <span className={`block h-0.5 bg-current transform transition duration-300 ease-in-out ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
                </div>
            </button>

            {/* Mobile Dropdown Menu */}
            <div
                id="mobile-menu"
                className={`absolute top-0 left-0 w-full h-screen bg-white transform transition-transform duration-300 ease-in-out md:hidden ${
                    isMenuOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="flex flex-col items-center justify-center h-full gap-8 text-xl">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            onClick={() => setIsMenuOpen(false)}
                            style={({ isActive }) => isActive ? activeLinkStyle : undefined}
                            className="text-slate-600"
                        >
                            {link.label}
                        </NavLink>
                    ))}
                    <NavLink
                        to="/detection"
                        onClick={() => setIsMenuOpen(false)}
                        className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-full"
                    >
                        Start Detection
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;