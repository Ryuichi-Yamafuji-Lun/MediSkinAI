import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Icon from "../Icons";

const steps = [
  {
    stepNumber: "01",
    icon: "camera",
    title: "Take a clear photo",
    description: "Use good, even light and get close so the spot fills the frame. Keep it in focus and photograph one spot at a time.",
  },
  {
    stepNumber: "02",
    icon: "upload",
    title: "Upload it",
    description: "Your photo is analyzed in memory and discarded as soon as the result is sent back. It is never saved.",
  },
  {
    stepNumber: "03",
    icon: "document",
    title: "Read your result",
    description: "You get a benign or malignant screening estimate with a confidence score, plus a plain-language explanation and next steps.",
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
    <div className="w-full bg-slate-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-base font-semibold leading-7 text-blue-600">How it works</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Three steps, about a minute
          </p>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-slate-600">
            No sign-up and nothing to install. It works in your phone or computer browser.
          </p>
        </div>

        <ol className="mt-12 sm:mt-16 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {steps.map((step, index) => (
            <li
              key={step.stepNumber}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="rounded-2xl bg-white p-6 sm:p-8 shadow-xs ring-1 ring-slate-900/5"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white">
                  <Icon name={step.icon} className="w-6 h-6" />
                </span>
                <span className="text-sm font-semibold text-slate-300">{step.stepNumber}</span>
              </div>
              <h3 className="mt-6 text-xl font-bold tracking-tight text-slate-800">{step.title}</h3>
              <p className="mt-3 text-base text-slate-600">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default HowItWorksSection;
