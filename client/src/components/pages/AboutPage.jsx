import { useEffect } from "react";
import "aos/dist/aos.css"; // Import AOS styles
import AOS from "aos";
import StepImage from "../../assets/StepImage.jpeg";
import ConcernImage from "../../assets/ConcernImage.jpeg";
import CNNImage from "../../assets/CNNImage.jpeg";

const AboutUsPage = () => {
    useEffect(() => {
        AOS.init({
            duration: 800, 
            offset: 200, 
            easing: "ease-in-out", 
            once: false, 
        });
    }, []);

    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <div className="bg-blue-100 text-center py-10 sm:py-16 px-4">
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">About Us</h1>
            </div>

            {/* Content Section */}
            <div className="bg-white">
                {/* Section 1: Our Mission */}
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 py-10 sm:py-16 px-4 sm:px-8" data-aos="fade-up">
                    <div className="md:w-1/2 text-center md:text-left">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">Our Mission</h2>
                        <p className="text-base sm:text-lg text-gray-600">
                            Skin cancer is one of the most common forms of cancer, yet early detection can significantly improve outcomes. Our mission at MediSkinAI is to empower individuals to take the first step in understanding their skin health, bridging the gap between awareness and action.
                        </p>
                    </div>
                    <div className="w-full md:w-1/2 md:p-4">
                        <img src={StepImage} alt="Mission" loading="lazy" className="w-full h-auto rounded-lg shadow-lg" />
                    </div>
                </div>

                {/* Section 2: The Challenge */}
                <div className="flex flex-col md:flex-row-reverse items-center gap-6 md:gap-10 py-10 sm:py-16 px-4 sm:px-8 bg-gray-50" data-aos="fade-up">
                    <div className="md:w-1/2 text-center md:text-left">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">The Challenge</h2>
                        <p className="text-base sm:text-lg text-gray-600">
                            Studies show that over 3 million cases of skin cancer are diagnosed each year in the U.S, with rates of skin cancer continuing to rise globally. Despite these alarming statistics, many people delay seeking professional help due to fear, stigma, or lack of access. Our platform provides a non-intrusive way to assess skin health, giving users the confidence to consult a dermatologist if necessary.
                        </p>
                    </div>
                    <div className="w-full md:w-1/2 md:p-4">
                        <img src={ConcernImage} alt="Challenge" loading="lazy" className="w-full h-auto rounded-lg shadow-lg" />
                    </div>
                </div>

                {/* Section 3: The Technology */}
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 py-10 sm:py-16 px-4 sm:px-8" data-aos="fade-up">
                    <div className="md:w-1/2 text-center md:text-left">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">The Technology</h2>
                        <p className="text-base sm:text-lg text-gray-600">
                            Our AI, powered by ResNet50, uses convolutional neural networks trained on the ISIC dataset to screen photos of moles or skin lesions as likely benign or likely malignant. An AI assistant then explains the result in plain language and suggests next steps. It is a screening aid, not a diagnosis: it can miss malignant lesions, so see a dermatologist about anything that worries you.
                        </p>
                    </div>
                    <div className="w-full md:w-1/2 md:p-4">
                        <img src={CNNImage} alt="Technology" loading="lazy" className="w-full h-auto rounded-lg shadow-lg" />
                    </div>
                </div>

                {/* Disclaimer Section */}
                <div className="text-center py-8 px-4 sm:px-8 bg-blue-100">
                    <p className="text-gray-600 italic text-base sm:text-lg max-w-4xl mx-auto">
                        Disclaimer: MediSkinAI is not a substitute for professional medical advice. Always consult a qualified healthcare provider for accurate diagnoses and treatment.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutUsPage;
