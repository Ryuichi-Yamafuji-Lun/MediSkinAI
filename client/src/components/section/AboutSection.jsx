import AboutImage from "../../assets/BrainImage.png"; 
import { Link } from "react-router-dom";

const AboutSection = () => {
    return (
        <div className="flex flex-col w-full md:flex-row items-center justify-center m-16 md:m-16 px-8 bg-white">
            {/* Image */}
            <div className="md:w-1/2 p-2">
                <img
                    src={AboutImage}
                    alt="About MediSkinAI"
                    className="w-full h-auto rounded-xl"
                />
            </div>

            {/* Text Content */}
            <div className="md:w-1/2 text-center md:text-left">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
                    About Us
                </h1>
                <p className="text-lg text-gray-600 mb-4">
                MediSkinAI is an AI-powered platform designed to help you assess potential skin health risks with ease. Using advanced machine learning and the ISIC dataset, our model analyzes images of moles and skin lesions to provide an early indication of whether they might be cancerous. With 91% accuracy, we aim to offer a simple first step in understanding your skin health. While our tool isn’t a medical diagnosis, it helps raise awareness and empowers you to seek professional advice if needed.
                </p>
                <Link to="/about" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg">
                    Learn More
                </Link>
            </div>
        </div>
    );
};

export default AboutSection;
