import { useState } from "react";

const TermsModal = ({ onAgree }) => {
    const [isVisible, setIsVisible] = useState(true);

    const handleAgree = () => {
        setIsVisible(false);
        onAgree();
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg">
                <h2 className="text-2xl font-bold mb-4">Terms and Conditions</h2>
                <p className="text-gray-600 mb-6">
                    By using this service, you agree to our{" "}
                    <a
                        href="/terms-and-conditions" // Change this path to the correct route or URL
                        target="_blank" // Opens in a new tab
                        rel="noopener noreferrer" // Ensures security for external links
                        className="text-blue-500 underline hover:text-blue-600"
                    >
                        terms and conditions
                    </a>
                    . Please read them carefully before proceeding.
                </p>
                <p className="text-gray-600 mb-6">
                    Disclaimer: This platform is for educational purposes only and is not intended as a substitute for professional advice. 
                </p>
                <p className="text-red-600 font-bold mb-6">
                    WARNING: The results provided by this platform may be inaccurate. If you are concerned about a skin lesion, consult a dermatologist immediately. 
                    A malignant mole can sometimes appear benign in automated results. This tool is a first step to build confidence in seeking professional advice.
                </p>
                <button
                    onClick={handleAgree}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
                >
                    I Agree
                </button>
            </div>
        </div>
    );
};

export default TermsModal;