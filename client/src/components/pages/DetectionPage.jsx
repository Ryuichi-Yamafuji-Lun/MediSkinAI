import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import TermsModal from "../section/TermsModal";

// --- Icons ---
const UploadIcon = () => (
    <svg className="w-12 h-12 mx-auto text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);
const CameraIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
    </svg>
);

const DetectionPage = () => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null); 
    const [loading, setLoading] = useState(false);
    const [showTerms, setShowTerms] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [dragging, setDragging] = useState(false);
    const navigate = useNavigate();

    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [cameraStream, setCameraStream] = useState(null);
    const [cameraError, setCameraError] = useState("");
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];

    useEffect(() => {
        const hasAgreed = localStorage.getItem("hasAgreedToTerms");
        if (hasAgreed !== "true") {
            setShowTerms(true);
        }
    }, []);

    const handleAgreeToTerms = () => {
        localStorage.setItem("hasAgreedToTerms", "true");
        setShowTerms(false);
    };

    const validateFile = (selectedFile) => {
        setErrorMessage("");
        if (selectedFile && validImageTypes.includes(selectedFile.type)) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        } else {
            setFile(null);
            setPreview(null);
            setErrorMessage("Please upload a valid image file (JPEG, JPG, PNG).");
        }
    };

    const handleFileChange = (e) => {
        validateFile(e.target.files[0]);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            validateFile(e.dataTransfer.files[0]);
        }
    };
    
    const handleRemoveFile = () => {
        setFile(null);
        if (preview) {
            URL.revokeObjectURL(preview);
            setPreview(null);
        }
    };

    const handleUpload = async () => {
        if (!file) return; 

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await fetch(`${API_BASE_URL}/detect_skin_lesion`, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                navigate("/result", { state: result });
            } else {
                setErrorMessage("Analysis failed. Please try another image or contact support.");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            setErrorMessage("An error occurred while uploading. Please check your connection and try again.");
        } finally {
            setLoading(false);
        }
    };
    
    const handleOpenCamera = async () => {
        setCameraError("");
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
                setCameraStream(stream);
                setIsCameraOpen(true);
            } catch (err) {
                console.error("Camera access error:", err);
                setCameraError("Could not access camera. Please check your browser permissions.");
                setIsCameraOpen(false);
            }
        } else {
            setCameraError("Your browser does not support camera access.");
        }
    };

    const handleCloseCamera = () => {
        if (cameraStream) {
            cameraStream.getTracks().forEach(track => track.stop());
        }
        setIsCameraOpen(false);
        setCameraStream(null);
    };

    const handleCapture = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (video && canvas) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext('2d');
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            
            canvas.toBlob((blob) => {
                const capturedFile = new File([blob], `capture-${Date.now()}.png`, { type: 'image/png' });
                validateFile(capturedFile);
                handleCloseCamera();
            }, 'image/png');
        }
    };

    useEffect(() => {
        if (isCameraOpen && cameraStream && videoRef.current) {
            videoRef.current.srcObject = cameraStream;
        }
    }, [isCameraOpen, cameraStream]);

    if (showTerms) {
        return <TermsModal onAgree={handleAgreeToTerms} />;
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 p-6 text-center">
                <svg className="animate-spin h-10 w-10 text-blue-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <h2 className="text-2xl font-semibold text-slate-700">Analyzing Your Image...</h2>
                <p className="text-slate-500 mt-2">This may take a moment. Please wait.</p>
            </div>
        );
    }

    return (
        <>
            {isCameraOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center z-50 p-4">
                    <video ref={videoRef} autoPlay playsInline className="w-full max-w-lg rounded-lg shadow-xl" />
                    <canvas ref={canvasRef} className="hidden" />
                    <div className="flex gap-4 mt-4">
                        <button onClick={handleCapture} className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700">
                            Take Picture
                        </button>
                        <button onClick={handleCloseCamera} className="bg-slate-200 text-slate-800 font-bold py-3 px-6 rounded-lg hover:bg-slate-300">
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            <div className="flex items-center justify-center min-h-screen bg-slate-100 p-4 sm:p-6">
                <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-6 sm:p-8 space-y-6">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-slate-800">Skin Lesion Analysis</h1>
                        <p className="mt-2 text-slate-500">Upload an image or use your camera.</p>
                    </div>

                    {preview ? (
                        <div className="flex flex-col items-center space-y-4">
                            <img src={preview} alt="Selected skin lesion" className="max-h-60 w-auto rounded-lg shadow-md" />
                            <div className="text-center">
                               <p className="text-sm font-medium text-slate-700 truncate max-w-xs">{file.name}</p>
                               <button onClick={handleRemoveFile} className="text-sm text-red-500 hover:text-red-700 font-semibold transition-colors">
                                   Remove Image
                               </button>
                            </div>
                        </div>
                    ) : (
                        <div
                            className={`relative flex flex-col items-center justify-center w-full p-8 border-2 border-dashed rounded-lg transition-colors duration-200 ${
                                dragging ? "border-blue-500 bg-blue-50" : "border-slate-300 hover:border-slate-400"
                            }`}
                            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                            onDragEnter={() => setDragging(true)}
                            onDragLeave={() => setDragging(false)}
                            onDrop={handleDrop}
                        >
                            <UploadIcon />
                            <p className="mt-4 text-slate-600">
                                <span className="font-semibold text-blue-600">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-slate-500 mt-1">PNG, JPG, or JPEG</p>
                            <input type="file" accept="image/png, image/jpeg, image/jpg" onChange={handleFileChange} className="hidden" id="file-upload" />
                            <label htmlFor="file-upload" className="absolute inset-0 cursor-pointer" />
                            
                            <div className="mt-4 border-t border-slate-200 w-full pt-4 flex justify-center">
                                <button
                                    onClick={handleOpenCamera}
                                    className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors z-10 relative"
                                >
                                    <CameraIcon />
                                    Use Camera
                                </button>
                            </div>
                        </div>
                    )}
                    
                    {(errorMessage || cameraError) && (
                        <p className="text-red-500 text-sm text-center font-medium">{errorMessage || cameraError}</p>
                    )}
                    
                    <button
                        onClick={handleUpload}
                        disabled={!file}
                        className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 disabled:bg-slate-300 disabled:cursor-not-allowed disabled:shadow-none"
                    >
                        Upload and Analyze
                    </button>
                </div>
            </div>
        </>
    );
};

export default DetectionPage;