import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import MolePicture from "../../assets/Mole.jpeg"; // Image for the first step (e.g., taking a picture)
import UploadPicture from "../../assets/Upload.jpeg"; // Image for the second step (e.g., uploading the photo)
import ResultPicture from "../../assets/Result.jpeg"; // Image for the third step (e.g., receiving the results)

const HowItWorksSection = () => {
    // Initialize AOS when the component mounts
    useEffect(() => {
      AOS.init({
        duration: 1000, // Duration of the animation in ms
        once: true, // Animation only happens once when the element is scrolled into view
      });
    }, []);
  
    return (
      <div className="min-h-screen bg-gray-50 py-16 px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 text-center mb-8">
          How It Works
        </h2>
  
        {/* Step 1 */}
        <div
          data-aos="fade-up"
          data-aos-delay="400" 
          className="flex flex-col md:flex-row items-center mb-16"
        >
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <img
              src={MolePicture}
              alt="Taking a picture of the mole"
              className="w-full h-72 object-cover rounded-xl" 
            />
          </div>
          <div className="w-full md:w-1/2 md:pl-8 text-center md:text-left">
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              Step 1: Take a Picture
            </h3>
            <p className="text-gray-600">
              Simply take a clear photo of the mole or skin area you want analyzed. Ensure it is well-lit for the best results.
            </p>
          </div>
        </div>
  
        {/* Step 2 */}
        <div
          data-aos="fade-up"
          data-aos-delay="600" // Delay for the next step
          className="flex flex-col md:flex-row items-center mb-16"
        >
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <img
              src={UploadPicture}
              alt="Uploading the photo"
              className="w-full h-72 object-cover rounded-xl"
            />
          </div>
          <div className="w-full md:w-1/2 md:pl-8 text-center md:text-left">
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              Step 2: Upload the Photo
            </h3>
            <p className="text-gray-600">
              Once the picture is taken, upload it to our platform. Our AI model will process the image and provide an analysis.
            </p>
          </div>
        </div>
  
        {/* Step 3 */}
        <div
          data-aos="fade-up"
          data-aos-delay="800" // delay for the next step
          className="flex flex-col md:flex-row items-center"
        >
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <img
              src={ResultPicture}
              alt="Getting results"
              className="w-full h-72 object-cover rounded-xl"
            />
          </div>
          <div className="w-full md:w-1/2 md:pl-8 text-center md:text-left">
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              Step 3: Get Your Results
            </h3>
            <p className="text-gray-600">
              After processing, you'll receive a detailed result, indicating whether the mole is benign or potentially malignant.
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  export default HowItWorksSection;