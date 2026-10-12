import PropTypes from "prop-types";
import NavBar from "../Navbar";
import Footer from "../Footer";
import { useState, useEffect } from "react";

const MainLayout = ({ children }) => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        // overflow-x-clip stops AOS slide-in animations from causing sideways scroll on mobile
        // (overflow-hidden would break the sticky navbar)
        <div className="min-h-screen min-h-dvh flex flex-col overflow-x-clip bg-blue-100">
            {/* Navbar */}
            <NavBar isScrolled={isScrolled} />

            {/* Main Content */}
            <main className="grow">{children}</main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

MainLayout.propTypes = {
    children: PropTypes.node,
};

export default MainLayout;
