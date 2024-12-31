
const PrivacyPolicyPage = () => {
    return (
        <div className="bg-gray-50 min-h-screen flex flex-col items-center">
            {/* Header Section */}
            <div className="bg-blue-100 w-full py-16 text-center">
                <h1 className="text-5xl font-bold text-gray-800">Privacy Policy</h1>
                <p className="text-lg text-gray-600 mt-4">
                    Effective Date: December 2024
                </p>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-8 py-16">
                <div className="bg-white p-8 rounded-lg shadow-md space-y-8">
                    <h2 className="text-3xl font-semibold text-gray-800">1. Information We Collect</h2>
                    <p className="text-lg text-gray-600">
                        We do not collect any personal information unless you voluntarily provide it. The only data we may collect is the image file you upload to our platform for processing.
                    </p>

                    <h2 className="text-3xl font-semibold text-gray-800">2. How We Use Your Data</h2>
                    <p className="text-lg text-gray-600">
                        The image you upload is used solely to analyze potential skin lesions using our AI model. Once processed, the image is immediately deleted from our servers.
                    </p>

                    <h2 className="text-3xl font-semibold text-gray-800">3. Data Security</h2>
                    <p className="text-lg text-gray-600">
                        We implement appropriate technical measures to ensure your data is secure during processing. However, we cannot guarantee complete security of your data.
                    </p>

                    <h2 className="text-3xl font-semibold text-gray-800">4. Image Retention and Deletion</h2>
                    <p className="text-lg text-gray-600">
                        Once your image is processed, it is automatically deleted from our servers. We do not retain any image data.
                    </p>

                    <h2 className="text-3xl font-semibold text-gray-800">5. Third-Party Services</h2>
                    <p className="text-lg text-gray-600">
                        We do not sell or share your personal data with third parties, except as required by law or for operational purposes (e.g., cloud storage services).
                    </p>

                    <h2 className="text-3xl font-semibold text-gray-800">6. Cookies and Tracking</h2>
                    <p className="text-lg text-gray-600">
                        We do not use cookies or any tracking mechanisms to collect personally identifiable information. Any tracking is for website functionality purposes only.
                    </p>

                    <h2 className="text-3xl font-semibold text-gray-800">7. Your Rights and Choices</h2>
                    <p className="text-lg text-gray-600">
                        You have the right to request access to any data we may have collected. Since we do not retain any images after processing, no data is stored. For any concerns, please contact us.
                    </p>

                    <h2 className="text-3xl font-semibold text-gray-800">8. Changes to This Privacy Policy</h2>
                    <p className="text-lg text-gray-600">
                        We may update this Privacy Policy periodically. Changes will be posted on this page with an updated date at the top.
                    </p>

                    {/* <h2 className="text-3xl font-semibold text-gray-800">9. Contact Us</h2>
                    <p className="text-lg text-gray-600">
                        If you have any questions regarding this Privacy Policy or how we handle your data, please contact us at:
                    </p>
                    <p className="text-lg text-gray-600 font-semibold">
                        Email: <a href="mailto:contact@mediskinai.com" className="text-blue-600">contact@mediskinai.com</a>
                    </p> */}
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;
