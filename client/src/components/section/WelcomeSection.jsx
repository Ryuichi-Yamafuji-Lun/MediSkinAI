import { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import HomeImage from "../../assets/HomeImage.png";

const ArrowRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
    </svg>
);


const WelcomeSection = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    return (
        <div className="mx-auto max-w-7xl px-6 lg:px-8 min-h-[calc(100vh-5rem)] flex items-center">
            <div className="grid w-full grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
                
                {/* Text Content */}
                <div data-aos="fade-right" className="text-center lg:text-left">
                    <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
                        Early Detection,
                        <span className="block text-blue-600">Peace of Mind.</span>
                    </h1>
                    
                    <p className="mt-6 text-lg leading-8 text-slate-600">
                        Worried about a mole or skin change? Upload a photo to get an instant AI analysis, indicating potential concerns and confidence levels.
                    </p>
                    
                    <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                        <Link 
                            to="/detection" 
                            className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all duration-200"
                        >
                            Get Started
                            <ArrowRightIcon />
                        </Link>
                    </div>

                    <p className="mt-8 text-xs text-slate-500 italic">
                        Disclaimer: This platform is for informational purposes only and is not a substitute for professional medical advice. For a definitive diagnosis, please consult a qualified healthcare provider.
                    </p>
                </div>

                {/* Image */}
                <div data-aos="fade-left" className="flex justify-center">
                    <img
                        src={HomeImage}
                        alt="An abstract illustration of AI assisting with medical diagnostics on a screen"
                        className="w-full max-w-md lg:max-w-none h-auto animate-float"
                    />
                </div>
            </div>
        </div>
    );
};

export default WelcomeSection;