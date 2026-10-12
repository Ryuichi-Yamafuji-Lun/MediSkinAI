import { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Icon from "../Icons";

const trustPoints = [
    { icon: "lock", label: "Photos are never stored" },
    { icon: "heart", label: "Free, no account needed" },
    { icon: "info", label: "Screening aid, not a diagnosis" },
];

// Static, clearly labelled sample of what the result screen looks like
const ExampleResultCard = () => (
    <div className="w-full max-w-sm rounded-2xl bg-white shadow-xl ring-1 ring-slate-900/5 overflow-hidden" aria-hidden="true">
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">Example result</span>
            <span className="text-xs text-slate-400">Sample only</span>
        </div>
        <div className="bg-green-50 px-5 py-5 flex items-start gap-3">
            <span className="text-green-600 shrink-0">
                <Icon name="check" className="w-8 h-8" />
            </span>
            <div>
                <p className="font-semibold text-slate-800">No high-risk pattern detected</p>
                <p className="mt-1 text-sm text-slate-600">Keep an eye on it and see a dermatologist if it changes.</p>
            </div>
        </div>
        <div className="px-5 py-5 space-y-4">
            <div>
                <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Model confidence</span>
                    <span className="font-semibold text-slate-700">87%</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-slate-100">
                    <div className="h-2 w-[87%] rounded-full bg-green-500" />
                </div>
            </div>
            <div className="rounded-lg bg-slate-50 p-3 text-sm text-slate-600 flex gap-2">
                <Icon name="sparkles" className="w-5 h-5 shrink-0 text-blue-600" />
                <span>A plain-language explanation of the result and what to do next.</span>
            </div>
        </div>
    </div>
);

const WelcomeSection = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    return (
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-0 lg:min-h-[calc(100vh-5rem)] flex items-center">
            <div className="grid w-full grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">

                {/* Text Content */}
                <div data-aos="fade-right" className="text-center lg:text-left">
                    <p className="text-sm font-semibold text-blue-600">AI skin-spot screening</p>
                    <h1 className="mt-2 text-4xl font-bold tracking-tight text-balance text-slate-900 sm:text-5xl xl:text-6xl">
                        Worried about a mole?
                        <span className="block text-blue-600">Get a second look.</span>
                    </h1>

                    <p className="mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-slate-600">
                        Upload a photo of a mole or skin spot. An AI model screens it, then explains the result in plain language, including when to have it checked by a dermatologist.
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-x-6 lg:justify-start">
                        <Link
                            to="/detection"
                            className="inline-flex w-full sm:w-auto justify-center items-center gap-2 rounded-md bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-xs hover:bg-blue-700 focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all duration-200"
                        >
                            Check a Photo
                            <Icon name="arrowRight" className="w-5 h-5" />
                        </Link>
                        <Link to="/about" className="px-4 py-2 font-semibold text-slate-700 hover:text-blue-600 transition-colors">
                            How it works
                        </Link>
                    </div>

                    <ul className="mt-8 flex flex-col sm:flex-row sm:flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-sm text-slate-600">
                        {trustPoints.map((point) => (
                            <li key={point.label} className="flex items-center gap-2">
                                <Icon name={point.icon} className="w-5 h-5 text-blue-600" />
                                {point.label}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Example result */}
                <div data-aos="fade-left" className="flex justify-center lg:justify-end">
                    <div className="motion-safe:animate-float w-full flex justify-center lg:justify-end">
                        <ExampleResultCard />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomeSection;
