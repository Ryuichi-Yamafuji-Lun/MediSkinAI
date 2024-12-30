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
            <div className="bg-blue-100 text-center py-16">
                <h1 className="text-5xl font-bold text-gray-800">About Us</h1>
            </div>

            {/* Content Section */}
            <div className="bg-white">
                {/* Section 1: Our Mission */}
                <div className="flex flex-col md:flex-row items-center py-16 px-8" data-aos="fade-up">
                    <div className="md:w-1/2 text-center md:text-left">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Mission</h2>
                        <p className="text-lg text-gray-600">
                            Skin cancer is one of the most common forms of cancer, yet early detection can significantly improve outcomes. Our mission at MediSkinAI is to empower individuals to take the first step in understanding their skin health, bridging the gap between awareness and action.
                        </p>
                    </div>
                    <div className="md:w-1/2 p-4">
                        <img src={StepImage} alt="Mission" className="w-full h-auto rounded-lg shadow-lg" />
                    </div>
                </div>

                {/* Section 2: The Challenge */}
                <div className="flex flex-col md:flex-row-reverse items-center py-16 px-8 bg-gray-50" data-aos="fade-up">
                    <div className="md:w-1/2 text-center md:text-left">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">The Challenge</h2>
                        <p className="text-lg text-gray-600">
                            Studies show that over 3 million non-melanoma skin cancer cases are diagnosed each year, and melanoma rates continue to rise globally. Despite these alarming statistics, many people delay seeking professional help due to fear, stigma, or lack of access. Our platform provides a non-intrusive way to assess skin health, giving users the confidence to consult a dermatologist if necessary.
                        </p>
                    </div>
                    <div className="md:w-1/2 p-4">
                        <img src={ConcernImage} alt="Challenge" className="w-full h-auto rounded-lg shadow-lg" />
                    </div>
                </div>

                {/* Section 3: The Technology */}
                <div className="flex flex-col md:flex-row items-center py-16 px-8" data-aos="fade-up">
                    <div className="md:w-1/2 text-center md:text-left">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">The Technology</h2>
                        <p className="text-lg text-gray-600">
                            Our AI, powered by ResNet50, uses convolutional neural networks trained on the ISIC dataset to provide an analysis of moles or skin lesions with 91% accuracy. This state-of-the-art approach ensures reliability while remaining user-friendly.
                        </p>
                    </div>
                    <div className="md:w-1/2 p-4">
                        <img src={CNNImage} alt="Technology" className="w-full h-auto rounded-lg shadow-lg" />
                    </div>
                </div>

                {/* Disclaimer Section */}
                <div className="text-center py-8 px-8 bg-blue-100">
                    <p className="text-gray-600 italic text-lg">
                        Disclaimer: MediSkinAI is not a substitute for professional medical advice. Always consult a qualified healthcare provider for accurate diagnoses and treatment.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutUsPage;
