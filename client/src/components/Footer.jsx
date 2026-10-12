import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-100 text-black py-8 pb-[max(2rem,env(safe-area-inset-bottom))]">
            <div className="max-w-screen-xl mx-auto px-4 text-center">
                {/* Legal Links */}
                <div className="mb-6 flex flex-wrap justify-center gap-x-6 gap-y-2">
                    <Link to="/privacy-policy" className="py-2 hover:text-blue-600 hover:underline">
                        Privacy Policy
                    </Link>
                    <Link to="/terms-and-conditions" className="py-2 hover:text-blue-600 hover:underline">
                        Terms & Conditions
                    </Link>
                </div>

                {/* Disclaimer */}
                <p className="text-sm mb-6">
                    This website is for educational purposes only and does not provide medical diagnoses. Always consult a healthcare professional for accurate diagnoses.
                </p>

                {/* Copyright */}
                <div className="text-sm">
                    &copy; {new Date().getFullYear()} MediSkinAI. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
