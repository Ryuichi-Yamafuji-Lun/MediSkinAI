import { Link } from 'react-router-dom';

const CONTACT_EMAIL = "ryuichi.y.lun@gmail.com";

const Footer = () => {
    return (
        <footer className="bg-gray-100 text-slate-700 py-8 pb-[max(2rem,env(safe-area-inset-bottom))]">
            <div className="max-w-(--breakpoint-xl) mx-auto px-4 text-center">
                {/* Legal Links */}
                <nav aria-label="Footer" className="mb-6 flex flex-wrap justify-center gap-x-6 gap-y-2">
                    <Link to="/about" className="py-2 hover:text-blue-600 hover:underline">
                        About
                    </Link>
                    <Link to="/privacy-policy" className="py-2 hover:text-blue-600 hover:underline">
                        Privacy Policy
                    </Link>
                    <Link to="/terms-and-conditions" className="py-2 hover:text-blue-600 hover:underline">
                        Terms & Conditions
                    </Link>
                    <a href={`mailto:${CONTACT_EMAIL}`} className="py-2 hover:text-blue-600 hover:underline">
                        Contact
                    </a>
                </nav>

                {/* Disclaimer */}
                <p className="text-sm text-slate-600 mb-6 max-w-2xl mx-auto">
                    MediSkinAI is an educational tool and does not provide medical diagnoses. Always consult a healthcare professional about any skin concern.
                </p>

                {/* Credit */}
                <p className="text-sm text-slate-600">
                    &copy; {new Date().getFullYear()} MediSkinAI ·{" "}
                    <a href="https://github.com/Ryuichi-Yamafuji-Lun/MediSkinAI" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600">
                        GitHub
                    </a>{" "}
                    ·{" "}
                    <a href="https://www.linkedin.com/in/ryulun/" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600">
                        LinkedIn
                    </a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
