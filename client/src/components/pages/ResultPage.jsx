import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// --- SVG Icons for visual feedback ---
const CheckCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const ExclamationTriangleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.007H12v-.007z" />
    </svg>
);


const ResultPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const result = location.state;

    useEffect(() => {
        if (!result) {
            navigate("/detection");
        }
    }, [result, navigate]);

    if (!result) {
        return null;
    }

    // Deconstruct the new state keys: classification and explanation
    const { classification, confidence, explanation } = result;
    const isMalignant = classification.toLowerCase() === "malignant";
    const confidencePercent = confidence.toFixed(2);

    // --- Theme object for dynamic styling ---
    const theme = isMalignant ? {
        primaryColor: "text-amber-600",
        bgColor: "bg-amber-50",
        ringColor: "ring-amber-200",
        icon: <ExclamationTriangleIcon />,
        title: "Analysis Suggests a High-Risk Classification",
        advice: "A classification of 'Malignant' means the AI has identified characteristics that require a professional medical evaluation.",
    } : {
        primaryColor: "text-green-600",
        bgColor: "bg-green-50",
        ringColor: "ring-green-200",
        icon: <CheckCircleIcon />,
        title: "Analysis Suggests a Low-Risk Classification",
        advice: "A classification of 'Benign' indicates the lesion is likely non-cancerous. It is always best to monitor your skin for any changes.",
    };

    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (confidence / 100) * circumference;

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-100 p-4 sm:p-6">
            <div className="bg-white shadow-xl rounded-lg w-full max-w-lg overflow-hidden">
                {/* --- Result Header --- */}
                <div className={`p-6 text-center ${theme.bgColor} ${theme.primaryColor}`}>
                    <div className="flex flex-col items-center gap-4">
                        {theme.icon}
                        <h1 className="text-3xl font-bold text-slate-800">{theme.title}</h1>
                        <p className="text-lg text-slate-600">{theme.advice}</p>
                    </div>
                </div>

                <div className="p-6 sm:p-8 space-y-6">
                    {/* --- Confidence Gauge --- */}
                    <div className="flex flex-col sm:flex-row items-center justify-around gap-6">
                        <div className="relative w-32 h-32 flex items-center justify-center">
                            <svg className="transform -rotate-90" width="100%" height="100%" viewBox="0 0 120 120">
                                <circle cx="60" cy="60" r={radius} strokeWidth="10" className="text-slate-200" fill="transparent" />
                                <circle
                                    cx="60" cy="60" r={radius} strokeWidth="10" fill="transparent"
                                    className={`${theme.primaryColor} transition-all duration-1000 ease-out`}
                                    strokeDasharray={circumference}
                                    strokeDashoffset={offset}
                                    strokeLinecap="round"
                                />
                            </svg>
                            <span className="absolute text-2xl font-bold text-slate-700">{confidencePercent}%</span>
                        </div>
                        <div className="text-center sm:text-left">
                            <p className="text-sm text-slate-500">AI Confidence Score</p>
                            <p className="text-lg text-slate-600">The model is <span className="font-bold text-slate-800">{confidencePercent}%</span> confident in its assessment based on the provided image.</p>
                        </div>
                    </div>
                    
                    <hr/>
                    
                    {/* --- LLM Explanation Section --- */}
                    <div className="p-6">
                        <h2 className="text-xl font-semibold text-slate-800 mb-4">AI Assistant Explanation</h2>
                        <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{explanation}</p>
                    </div>
                    
                    <hr/>
                    
                    {/* --- Next Steps & Resources --- */}
                    <div>
                        <h2 className="text-xl font-semibold text-slate-800 mb-4">Next Steps & Resources</h2>
                        <div className="space-y-4">
                            <a href="https://www.aad.org/public/fad" target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-all">
                                Find a Dermatologist Near You
                            </a>
                            <a href="https://www.skincancer.org/" target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-slate-200 text-slate-800 font-bold py-3 px-4 rounded-lg hover:bg-slate-300 transition-all">
                                Learn More from The Skin Cancer Foundation
                            </a>
                        </div>
                    </div>

                    <hr/>

                    <div className="text-center">
                        <button
                            onClick={() => navigate("/detection")}
                            className="text-blue-600 font-semibold hover:text-blue-800 transition-colors"
                        >
                            Analyze Another Image
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultPage;