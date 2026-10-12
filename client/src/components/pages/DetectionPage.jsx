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
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
    </svg>
);

// The model resizes every image to 224x224, so sending a full-resolution phone photo
// (often 5-10 MB) only slows the upload down on mobile data.
const MAX_UPLOAD_DIMENSION = 1024;
const MAX_INPUT_BYTES = 25 * 1024 * 1024;
const REQUEST_TIMEOUT_MS = 120000;
// The server scales to zero, so the first request after idle can take ~40s.
const SLOW_REQUEST_MS = 8000;

const loadImage = (file) =>
    new Promise((resolve, reject) => {
        const url = URL.createObjectURL(file);
        const img = new Image();
        img.onload = () => {
            URL.revokeObjectURL(url);
            resolve(img);
        };
        img.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error("decode failed"));
        };
        img.src = url;
    });

// Decode any image the browser understands (JPEG, PNG, WebP, HEIC on Safari) and
// re-encode it as a downscaled JPEG.
const prepareImage = async (file) => {
    const img = await loadImage(file);
    const scale = Math.min(1, MAX_UPLOAD_DIMENSION / Math.max(img.naturalWidth, img.naturalHeight));
    const width = Math.round(img.naturalWidth * scale);
    const height = Math.round(img.naturalHeight * scale);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    canvas.getContext("2d").drawImage(img, 0, 0, width, height);

    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.92));
    if (!blob) throw new Error("encode failed");

    const baseName = (file.name || "photo").replace(/\.[^.]+$/, "");
    return new File([blob], `${baseName}.jpg`, { type: "image/jpeg" });
};

const DetectionPage = () => {
    const [file, setFile] = useState(null);
    const [displayName, setDisplayName] = useState("");
    const [preview, setPreview] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isSlow, setIsSlow] = useState(false);
    const [showTerms, setShowTerms] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [dragging, setDragging] = useState(false);
    const navigate = useNavigate();

    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [cameraStream, setCameraStream] = useState(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const fileInputRef = useRef(null);
    const captureInputRef = useRef(null);

    // Phones and tablets get the native camera app (autofocus, flash, full resolution);
    // desktops fall back to an in-page webcam preview.
    const [isTouchDevice] = useState(
        () => typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches
    );

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        let hasAgreed = null;
        try {
            hasAgreed = localStorage.getItem("hasAgreedToTerms");
        } catch {
            // storage can be blocked (e.g. some private browsing modes); just ask again
        }
        if (hasAgreed !== "true") {
            setShowTerms(true);
        }
    }, []);

    const handleAgreeToTerms = () => {
        try {
            localStorage.setItem("hasAgreedToTerms", "true");
        } catch {
            // ignore, the modal will show again next visit
        }
        setShowTerms(false);
    };

    // Free the preview blob whenever it is replaced or the page unmounts
    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    // Make sure the camera light turns off if the user navigates away with the camera open
    useEffect(() => {
        return () => {
            if (cameraStream) cameraStream.getTracks().forEach((track) => track.stop());
        };
    }, [cameraStream]);

    useEffect(() => {
        if (isCameraOpen && cameraStream && videoRef.current) {
            videoRef.current.srcObject = cameraStream;
        }
    }, [isCameraOpen, cameraStream]);

    const clearFile = () => {
        setFile(null);
        setDisplayName("");
        setPreview(null);
    };

    const validateFile = async (selectedFile) => {
        setErrorMessage("");
        if (!selectedFile) return;

        if (selectedFile.type && !selectedFile.type.startsWith("image/")) {
            clearFile();
            setErrorMessage("Please choose a photo (JPG, PNG, WebP or HEIC).");
            return;
        }
        if (selectedFile.size > MAX_INPUT_BYTES) {
            clearFile();
            setErrorMessage("That image is too large. Please choose one under 25 MB.");
            return;
        }

        setProcessing(true);
        try {
            const prepared = await prepareImage(selectedFile);
            setFile(prepared);
            setDisplayName(selectedFile.name || prepared.name);
            setPreview(URL.createObjectURL(prepared));
        } catch {
            clearFile();
            setErrorMessage("We couldn't read that image. Please try a JPG or PNG photo.");
        } finally {
            setProcessing(false);
        }
    };

    const handleFileChange = (e) => {
        validateFile(e.target.files?.[0]);
        // reset so picking the same photo again still fires onChange
        e.target.value = "";
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            validateFile(e.dataTransfer.files[0]);
        }
    };

    const handleDragLeave = (e) => {
        // ignore dragleave events fired when moving over child elements
        if (!e.currentTarget.contains(e.relatedTarget)) setDragging(false);
    };

    const handleUpload = async () => {
        if (!file || loading) return;

        setErrorMessage("");
        setLoading(true);
        setIsSlow(false);
        const slowTimer = setTimeout(() => setIsSlow(true), SLOW_REQUEST_MS);
        const controller = new AbortController();
        const abortTimer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await fetch(`${API_BASE_URL}/detect_skin_lesion`, {
                method: "POST",
                body: formData,
                signal: controller.signal,
            });

            if (response.ok) {
                const result = await response.json();
                try {
                    // lets the result survive a refresh (e.g. pull-to-refresh on mobile)
                    sessionStorage.setItem("lastResult", JSON.stringify(result));
                } catch {
                    // non-essential
                }
                navigate("/result", { state: result });
                return;
            }

            let detail = "";
            try {
                detail = (await response.json())?.detail;
            } catch {
                // response had no JSON body
            }
            if (response.status === 429) {
                setErrorMessage("The analysis limit has been reached for now. Please try again later.");
            } else if ((response.status === 400 || response.status === 413) && typeof detail === "string") {
                setErrorMessage(detail);
            } else {
                setErrorMessage("Analysis failed. Please try another image or try again in a minute.");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            setErrorMessage(
                error.name === "AbortError"
                    ? "The analysis took too long. Please check your connection and try again."
                    : "An error occurred while uploading. Please check your connection and try again."
            );
        } finally {
            clearTimeout(slowTimer);
            clearTimeout(abortTimer);
            setLoading(false);
        }
    };

    const handleOpenCamera = async () => {
        setErrorMessage("");
        if (isTouchDevice) {
            captureInputRef.current?.click();
            return;
        }
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
                setCameraStream(stream);
                setIsCameraOpen(true);
            } catch (err) {
                console.error("Camera access error:", err);
                setErrorMessage("Could not access camera. Please check your browser permissions.");
                setIsCameraOpen(false);
            }
        } else {
            // e.g. insecure context or old browser: fall back to the system picker
            captureInputRef.current?.click();
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
        if (video && canvas && video.videoWidth) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext('2d');
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            canvas.toBlob((blob) => {
                if (blob) {
                    const capturedFile = new File([blob], `capture-${Date.now()}.jpg`, { type: 'image/jpeg' });
                    validateFile(capturedFile);
                }
                handleCloseCamera();
            }, 'image/jpeg', 0.95);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 text-center" role="status" aria-live="polite">
                <svg className="animate-spin h-10 w-10 text-blue-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <h2 className="text-2xl font-semibold text-slate-700">Analyzing Your Image...</h2>
                <p className="text-slate-500 mt-2 max-w-sm">
                    {isSlow
                        ? "Still working. The server may be waking up, which can take up to a minute. Please keep this page open."
                        : "This may take a moment. Please wait."}
                </p>
            </div>
        );
    }

    return (
        <>
            {showTerms && <TermsModal onAgree={handleAgreeToTerms} />}

            {isCameraOpen && (
                <div
                    className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-60 p-4 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))]"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Camera"
                >
                    <video ref={videoRef} autoPlay playsInline muted className="w-full max-w-lg max-h-[70vh] object-contain rounded-lg shadow-xl" />
                    <canvas ref={canvasRef} className="hidden" />
                    <div className="flex gap-4 mt-4">
                        <button type="button" onClick={handleCapture} className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700">
                            Take Picture
                        </button>
                        <button type="button" onClick={handleCloseCamera} className="bg-slate-200 text-slate-800 font-bold py-3 px-6 rounded-lg hover:bg-slate-300">
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            <div className="flex justify-center px-4 py-6 sm:p-6 sm:py-12">
                <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-5 sm:p-8 space-y-5 sm:space-y-6">
                    <div className="text-center">
                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Skin Lesion Analysis</h1>
                        <p className="mt-2 text-slate-500">
                            {isTouchDevice ? "Take a photo or choose one from your library." : "Upload an image or use your camera."}
                        </p>
                    </div>

                    {/* hidden inputs: library picker and native camera */}
                    <input
                        ref={fileInputRef}
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="sr-only"
                        tabIndex={-1}
                    />
                    <input
                        ref={captureInputRef}
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={handleFileChange}
                        className="sr-only"
                        tabIndex={-1}
                        aria-hidden="true"
                    />

                    {processing ? (
                        <div className="flex items-center justify-center h-48 text-slate-500" role="status">
                            Preparing image...
                        </div>
                    ) : preview ? (
                        <div className="flex flex-col items-center space-y-4">
                            <img src={preview} alt="Selected skin lesion" className="max-h-72 max-w-full w-auto rounded-lg shadow-md object-contain" />
                            <div className="text-center w-full">
                                <p className="text-sm font-medium text-slate-700 truncate">{displayName}</p>
                                <button type="button" onClick={clearFile} className="mt-1 px-3 py-2 text-sm text-red-500 hover:text-red-700 font-semibold transition-colors">
                                    Remove Image
                                </button>
                            </div>
                        </div>
                    ) : (
                        <label
                            htmlFor="file-upload"
                            className={`flex flex-col items-center justify-center w-full p-6 sm:p-8 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-200 focus-within:ring-2 focus-within:ring-blue-500 ${
                                dragging ? "border-blue-500 bg-blue-50" : "border-slate-300 hover:border-slate-400"
                            }`}
                            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                            onDragEnter={() => setDragging(true)}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    fileInputRef.current?.click();
                                }
                            }}
                        >
                            <UploadIcon />
                            <p className="mt-4 text-slate-600 text-center">
                                {isTouchDevice ? (
                                    <span className="font-semibold text-blue-600">Tap to choose a photo</span>
                                ) : (
                                    <>
                                        <span className="font-semibold text-blue-600">Click to upload</span> or drag and drop
                                    </>
                                )}
                            </p>
                            <p className="text-xs text-slate-500 mt-1">JPG, PNG, WebP or HEIC</p>
                        </label>
                    )}

                    {!preview && !processing && (
                        <button
                            type="button"
                            onClick={handleOpenCamera}
                            className="w-full inline-flex items-center justify-center py-3 px-4 rounded-lg border border-blue-200 text-blue-700 font-semibold hover:bg-blue-50 transition-colors"
                        >
                            <CameraIcon />
                            {isTouchDevice ? "Take a Photo" : "Use Camera"}
                        </button>
                    )}

                    {errorMessage && (
                        <p className="text-red-500 text-sm text-center font-medium" role="alert">{errorMessage}</p>
                    )}

                    <button
                        type="button"
                        onClick={handleUpload}
                        disabled={!file || processing}
                        className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 disabled:bg-slate-300 disabled:cursor-not-allowed disabled:shadow-none"
                    >
                        Upload and Analyze
                    </button>

                    <ul className="text-xs sm:text-sm text-slate-500 list-disc pl-5 space-y-1">
                        <li>Use good, even lighting and avoid flash glare.</li>
                        <li>Get close so the spot fills most of the frame, and keep it in focus.</li>
                        <li>Photograph one spot at a time.</li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default DetectionPage;
