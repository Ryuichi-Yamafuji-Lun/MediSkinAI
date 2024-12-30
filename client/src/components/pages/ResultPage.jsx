import { useLocation, useNavigate } from "react-router-dom";

const ResultPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Ensure the result is available; redirect to DetectionPage if not
    const result = location.state;

    if (!result) {
        navigate("/"); // Redirect to the home page if accessed directly
        return null;
    }

    // Destructure the diagnosis and confidence for easy access
    const { diagnosis, confidence } = result;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-6 text-blue-500">
                    Diagnosis Result
                </h1>
                <div className="mb-4">
                    <p className="text-lg text-gray-700">
                        <span className="font-semibold">Diagnosis:</span> {diagnosis}
                    </p>
                </div>
                <div className="mb-4">
                    <p className="text-lg text-gray-700">
                        <span className="font-semibold">Confidence:</span> {confidence.toFixed(2)}%
                    </p>
                </div>
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">What Does This Mean?</h2>
                    <ul className="list-disc list-inside text-sm text-gray-600 mb-4">
                        <li>
                            <span className="font-semibold">Benign:</span> 
                            A benign skin lesion is non-cancerous and usually harmless.
                        </li>
                        <li>
                            <span className="font-semibold">Malignant:</span> 
                            A malignant lesion is cancerous and may require immediate medical attention.
                        </li>
                    </ul>
                    {diagnosis.toLowerCase() === "benign" && confidence < 90 && (
                        <p className="text-sm text-red-600 font-semibold mb-2">
                            Note: The confidence level for a benign result is below 90%. 
                            It is highly recommended that you consult a dermatologist for further evaluation.
                        </p>
                    )}
                    {diagnosis.toLowerCase() === "malignant" && (
                        <p className="text-sm text-red-600 font-semibold mb-2">
                            Note: A malignant diagnosis could indicate a serious condition. 
                            Please consult a dermatologist as soon as possible for a professional opinion.
                        </p>
                    )}
                    <p className="text-sm text-gray-700">
                        If you are concerned about your results, it is always best to consult a dermatologist. 
                        They can provide a more thorough examination and professional guidance tailored to your needs.
                    </p>
                </div>
                <div className="text-center">
                    <button
                        onClick={() => navigate("/")}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResultPage;
