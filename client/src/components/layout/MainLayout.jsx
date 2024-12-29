import PropTypes from "prop-types";
import NavBar from "../Navbar";
import { useState, useEffect } from "react";

const MainLayout = ({ children }) => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            className={`min-h-screen flex flex-col transition-colors duration-300 bg-blue-400`}
        >
            {/* Navbar */}
            <NavBar isScrolled={isScrolled} />

            {/* Main Content */}
            <main className="flex-grow">{children}</main>
        </div>
    );
};

MainLayout.propTypes = {
    children: PropTypes.node,
};

export default MainLayout;
