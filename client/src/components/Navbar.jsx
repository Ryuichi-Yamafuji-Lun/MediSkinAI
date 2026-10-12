import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { NavLink, Link, useLocation } from "react-router-dom";
import Logo from "../assets/Logo.webp";

const NavBar = ({ isScrolled }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    // close the mobile menu on navigation (including browser back)
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    // close the mobile menu with Escape, and if the screen grows to desktop width
    useEffect(() => {
        if (!isMenuOpen) return;
        const onKeyDown = (e) => {
            if (e.key === "Escape") setIsMenuOpen(false);
        };
        const desktop = window.matchMedia("(min-width: 768px)");
        const onResize = (e) => {
            if (e.matches) setIsMenuOpen(false);
        };
        window.addEventListener("keydown", onKeyDown);
        desktop.addEventListener("change", onResize);
        return () => {
            window.removeEventListener("keydown", onKeyDown);
            desktop.removeEventListener("change", onResize);
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
            className={`sticky top-0 z-50 w-full flex items-center justify-between px-4 sm:px-8 py-3 sm:py-4 transition-colors duration-300 ease-in-out ${
                isScrolled || isMenuOpen ? "bg-white shadow-md" : "bg-transparent"
            }`}
        >
            {/* Logo Section */}
            <Link to="/" className="relative z-50 flex items-center gap-2 text-xl sm:text-2xl font-bold text-slate-800">
                <img src={Logo} alt="" className="h-8 w-auto" width="30" height="32" />
                MediSkinAI
            </Link>

            {/* Desktop Links & CTA */}
            <div className="hidden md:flex items-center gap-6">
                {navLinks.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        end
                        style={({ isActive }) => isActive ? activeLinkStyle : undefined}
                        className="text-slate-600 hover:text-blue-600 transition-colors duration-200"
                    >
                        {link.label}
                    </NavLink>
                ))}
                <NavLink
                    to="/detection"
                    className="bg-blue-600 text-white font-semibold px-5 py-2 rounded-full hover:bg-blue-700 shadow-xs transition-all duration-200"
                >
                    Start Detection
                </NavLink>
            </div>

            {/* Mobile Menu Button (Hamburger/Close Icon) - 44px tap target */}
            <button
                type="button"
                className="md:hidden relative z-50 -mr-2 flex h-11 w-11 items-center justify-center text-slate-800"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-controls="mobile-menu"
                aria-expanded={isMenuOpen}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
                <div className="w-6 h-5 flex flex-col justify-between">
                    <span className={`block h-0.5 bg-current transform transition duration-300 ease-in-out ${isMenuOpen ? "rotate-45 translate-y-[9px]" : ""}`} />
                    <span className={`block h-0.5 bg-current transition duration-300 ease-in-out ${isMenuOpen ? "opacity-0" : ""}`} />
                    <span className={`block h-0.5 bg-current transform transition duration-300 ease-in-out ${isMenuOpen ? "-rotate-45 translate-y-[-9px]" : ""}`} />
                </div>
            </button>

            {/* Mobile Dropdown Menu */}
            <div
                id="mobile-menu"
                aria-hidden={!isMenuOpen}
                inert={isMenuOpen ? undefined : ""}
                className={`fixed inset-0 h-screen h-dvh bg-white transform transition-transform duration-300 ease-in-out md:hidden ${
                    isMenuOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="flex flex-col items-center justify-center h-full gap-8 text-xl">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            end
                            onClick={() => setIsMenuOpen(false)}
                            style={({ isActive }) => isActive ? activeLinkStyle : undefined}
                            className="text-slate-600 px-4 py-2"
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

NavBar.propTypes = {
    isScrolled: PropTypes.bool,
};

export default NavBar;
