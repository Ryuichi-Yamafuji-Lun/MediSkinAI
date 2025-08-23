import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import MolePicture from "../../assets/Mole.jpeg";
import UploadPicture from "../../assets/Upload.jpeg";
import ResultPicture from "../../assets/Result.jpeg";

const steps = [
  {
    stepNumber: "01",
    title: "Take a Picture",
    description: "Simply take a clear, well-lit photo of the mole or skin area you want analyzed for the most accurate results.",
    image: MolePicture,
    alt: "A clear, close-up photo of a skin mole.",
    aosAnimation: "fade-right", 
  },
  {
    stepNumber: "02",
    title: "Upload the Photo",
    description: "Securely upload your image to our platform. Our system is designed to protect your privacy throughout the process.",
    image: UploadPicture,
    alt: "A person uploading a photo from their smartphone to a cloud service.",
    aosAnimation: "fade-left", 
  },
  {
    stepNumber: "03",
    title: "Get Your Results",
    description: "Our AI model analyzes the image in moments and provides a detailed result, indicating if the lesion appears benign or shows signs that warrant further review.",
    image: ResultPicture,
    alt: "A medical professional reviewing analysis results on a tablet.",
    aosAnimation: "fade-right",
  },
];

const HowItWorksSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 800, 
      once: true,
      offset: 100, 
    });
  }, []);

  return (
    <div className="bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">The Process</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            A Better Way to Check Your Skin
          </p>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Our process is simple, secure, and designed to give you peace of mind in just three easy steps.
          </p>
        </div>

        <div className="mt-16 space-y-20">
          {steps.map((step, index) => (
            <div
              key={step.stepNumber}
              data-aos={step.aosAnimation}
              className={`flex flex-col items-center gap-8 lg:flex-row ${
                index % 2 !== 0 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image Content */}
              <div className="w-full lg:w-1/2">
                <img
                  src={step.image}
                  alt={step.alt}
                  className="w-full rounded-xl shadow-lg ring-1 ring-slate-900/10"
                />
              </div>
              
              {/* Text Content */}
              <div className="w-full lg:w-1/2">
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
                    {step.stepNumber}
                  </span>
                  <h3 className="text-2xl font-bold tracking-tight text-slate-800">{step.title}</h3>
                </div>
                <p className="mt-4 text-lg text-slate-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;