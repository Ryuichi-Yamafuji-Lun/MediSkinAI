import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TermsModal from "../section/TermsModal";

const DetectionPage = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showTerms, setShowTerms] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [dragging, setDragging] = useState(false);
    const navigate = useNavigate();

    const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        validateFile(selectedFile);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);

        const selectedFile = e.dataTransfer.files[0];
        validateFile(selectedFile);
    };

    const validateFile = (file) => {
        if (file && validImageTypes.includes(file.type)) {
            setFile(file);
            setErrorMessage("");
        } else {
            setFile(null);
            setErrorMessage("Please upload a valid image file (JPEG, JPG, PNG).");
        }
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a valid image.");
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await fetch("http://localhost:8000/detect_skin_lesion", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                navigate("/result", { state: result });
            } else {
                alert("Failed to analyze the image.");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (showTerms) {
        return <TermsModal onAgree={() => setShowTerms(false)} />;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            {loading ? (
                <div className="flex flex-col items-center space-y-4">
                    <h2 className="text-2xl font-bold text-blue-600">Analyzing...</h2>
                    <div className="w-64 h-2 bg-gray-300 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-blue-500 rounded-full animate-progress"
                            style={{ width: "100%" }}
                        ></div>
                    </div>
                </div>
            ) : (
                <>
                    <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Upload a Photo of Your Skin</h1>
                    <div
                        className={`border-dashed border-2 rounded-lg w-full max-w-md p-6 text-center ${
                            dragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
                        }`}
                        onDragOver={(e) => {
                            e.preventDefault();
                            setDragging(true);
                        }}
                        onDragLeave={() => setDragging(false)}
                        onDrop={handleDrop}
                    >
                        <p className="text-gray-600 mb-4">Drag & drop your image here</p>
                        <p className="text-gray-500 mb-4">or</p>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                            id="file-upload"
                        />
                        <label
                            htmlFor="file-upload"
                            className="cursor-pointer inline-block bg-blue-500 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-600"
                        >
                            Browse Files
                        </label>
                        {file && (
                            <p className="mt-4 text-sm text-gray-500">Selected file: {file.name}</p>
                        )}
                        {errorMessage && (
                            <p className="text-red-500 text-sm text-center mt-2">{errorMessage}</p>
                        )}
                    </div>
                    <button
                        onClick={handleUpload}
                        className={`bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg mt-4 ${
                            !file ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={!file}
                    >
                        Upload and Analyze
                    </button>
                </>
            )}
        </div>
    );
};

export default DetectionPage;
