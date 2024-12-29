import HomeImage from "../../assets/HomeImage.png"

const AboutSection = () => {
    return (
        <div className="flex flex-col-reverse md:flex-row items-center m-16 md:m-16 px-8 bg-white">
            {/* Image */}
            <div className="md:w-1/2 pl-2">
                <img
                src = {HomeImage}
                alt="AI Robot Doctor making skin diagnosis"
                className="w-full h-auto rounded-xl"
                />
            </div>

            {/* Text Content */}
            <div className="md:w-1/2 text-center md:text-left">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
                Your Skin,
                </h1>
                <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
                Your First Step
                </h1>
                <p className="text-lg text-gray-600">
                Worried about a mole or skin change? Upload a photo to get an AI analysis indicating potential concerns and confidence levels.
                </p>
                <p className="text-gray-500 text-sm italic mb-6">
                Disclaimer: This platform is for educational purposes only and is not intended as a substitute for professional advice. For an accurate diagnosis or specific medical concerns, please consult a qualified healthcare provider.
                </p>

                {/* Change to ahref */}
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg">
                Get Started
                </button>
            </div>       
        </div>
    );
  };
  
  export default AboutSection;