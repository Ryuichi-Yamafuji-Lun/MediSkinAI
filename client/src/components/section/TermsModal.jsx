import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const TermsModal = ({ onAgree }) => {
    return (
        <div
            className="fixed inset-0 z-[70] bg-gray-800/75 flex justify-center items-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="terms-modal-title"
        >
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] max-h-[90dvh] overflow-y-auto">
                <h2 id="terms-modal-title" className="text-xl sm:text-2xl font-bold mb-4">Terms and Conditions</h2>
                <p className="text-gray-600 mb-4 sm:mb-6">
                    By using this service, you agree to our{" "}
                    <Link
                        to="/terms-and-conditions"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline hover:text-blue-600"
                    >
                        terms and conditions
                    </Link>
                    . Please read them carefully before proceeding.
                </p>
                <p className="text-gray-600 mb-4 sm:mb-6">
                    Disclaimer: This platform is for educational purposes only and is not intended as a substitute for professional advice. 
                </p>
                <p className="text-red-600 font-bold mb-6">
                    WARNING: The results provided by this platform may be inaccurate. If you are concerned about a skin lesion, consult a dermatologist immediately. 
                    A malignant mole can sometimes appear benign in automated results. This tool is a first step to build confidence in seeking professional advice.
                </p>
                <button
                    type="button"
                    onClick={onAgree}
                    autoFocus
                    className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
                >
                    I Agree
                </button>
            </div>
        </div>
    );
};

TermsModal.propTypes = {
    onAgree: PropTypes.func.isRequired,
};

export default TermsModal;
