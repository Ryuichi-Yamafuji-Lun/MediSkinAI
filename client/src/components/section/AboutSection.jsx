import { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import AboutImage from "../../assets/BrainImage.webp"; 

const AboutSection = () => {
        // Initialize AOS when the component mounts
    useEffect(() => {
        AOS.init({
        duration: 1000, // Duration of the animation in ms
        once: true, // Animation only happens once when the element is scrolled into view
        });
    }, []);
    return (
        <div 
            data-aos="fade-up"
            data-aos-delay="200" 
            className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 w-full max-w-7xl my-10 md:my-16 px-4 py-8 sm:px-8 bg-white md:rounded-2xl"
        >
            {/* Image */}
            <div className="md:w-1/2 p-2">
                <img
                    src={AboutImage}
                    alt="About MediSkinAI"
                    width="800"
                    height="800"
                    loading="lazy"
                    className="w-full max-w-sm md:max-w-none mx-auto h-auto rounded-xl"
                />
            </div>

            {/* Text Content */}
            <div className="md:w-1/2 text-center md:text-left">
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-800 mb-4">
                    About Us
                </h2>
                <p className="text-base sm:text-lg text-gray-600 mb-6">
                MediSkinAI is an AI-powered platform designed to help you assess potential skin health risks with ease. Using advanced machine learning and the ISIC dataset, our model analyzes images of moles and skin lesions to provide an early indication of whether they might be cancerous. We aim to offer a simple first step in understanding your skin health. While our tool isn’t a medical diagnosis, it helps raise awareness and empowers you to seek professional advice if needed.
                </p>
                <Link to="/about" className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg">
                    Learn More
                </Link>
            </div>
        </div>
    );
};

export default AboutSection;
