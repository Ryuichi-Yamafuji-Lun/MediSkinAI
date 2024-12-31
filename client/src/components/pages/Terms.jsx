
const TermsAndConditionsPage = () => {
    return (
        <div className="bg-gray-50 min-h-screen flex flex-col items-center">
            {/* Header Section */}
            <div className="bg-blue-100 w-full py-16 text-center">
                <h1 className="text-5xl font-bold text-gray-800">Terms & Conditions</h1>
                <p className="text-lg text-gray-600 mt-4">
                    Last updated: December 2024
                </p>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-8 py-16">
                <div className="bg-white p-8 rounded-lg shadow-md space-y-8">
                    <h2 className="text-3xl font-semibold text-gray-800">1. Introduction</h2>
                    <p className="text-lg text-gray-600">
                        Welcome to MediSkinAI! These Terms & Conditions ("Terms") govern your use of our website and services. By accessing or using our platform, you agree to comply with and be bound by these Terms. If you do not agree with any part of these Terms, please do not use our services.
                    </p>

                    <h2 className="text-3xl font-semibold text-gray-800">2. User Obligations</h2>
                    <p className="text-lg text-gray-600">
                        You agree to use our platform responsibly and comply with all applicable laws and regulations. You must not upload any content that is illegal, harmful, or violates the rights of others. By using our service, you confirm that any image you upload is yours or that you have permission to use it for the purposes of skin health analysis.
                    </p>

                    <h2 className="text-3xl font-semibold text-gray-800">3. Image Upload and Use</h2>
                    <p className="text-lg text-gray-600">
                        When you upload an image to our platform, it will be used solely for the purpose of analyzing skin lesions for potential cancer. Your image will be automatically deleted once the analysis is complete. We do not store or retain images after processing, and we do not share any user data unless required by law.
                    </p>

                    <h2 className="text-3xl font-semibold text-gray-800">4. Limitations of Liability</h2>
                    <p className="text-lg text-gray-600">
                        MediSkinAI provides a skin health assessment tool based on artificial intelligence. However, we do not offer medical diagnoses. Our service is intended as a first step to raise awareness and encourage users to consult a professional healthcare provider. We are not liable for any medical decisions or outcomes that result from the use of our platform.
                    </p>

                    <h2 className="text-3xl font-semibold text-gray-800">5. Data Privacy</h2>
                    <p className="text-lg text-gray-600">
                        We value your privacy. We do not collect any personal data other than the image you upload for analysis. Your image is processed in real-time and deleted immediately after use. Please refer to our Privacy Policy for more detailed information on how we handle your data.
                    </p>

                    <h2 className="text-3xl font-semibold text-gray-800">6. Prohibited Uses</h2>
                    <p className="text-lg text-gray-600">
                        You are prohibited from using our platform for unlawful, harmful, or malicious purposes. This includes, but is not limited to, uploading images or content that is offensive, defamatory, or infringes upon the rights of others.
                    </p>

                    <h2 className="text-3xl font-semibold text-gray-800">7. Termination</h2>
                    <p className="text-lg text-gray-600">
                        We reserve the right to suspend or terminate your access to our platform at any time if we determine that you have violated these Terms and Conditions.
                    </p>

                    <h2 className="text-3xl font-semibold text-gray-800">8. Modifications</h2>
                    <p className="text-lg text-gray-600">
                        We may update these Terms and Conditions periodically. Any changes will be posted on this page with an updated "Last Updated" date. By continuing to use our platform after such changes, you accept the modified Terms.
                    </p>

                    <h2 className="text-3xl font-semibold text-gray-800">9. Governing Law</h2>
                    <p className="text-lg text-gray-600">
                        These Terms and Conditions are governed by the laws of the United States. Any disputes arising out of or in connection with these Terms shall be resolved in accordance with applicable local laws.
                    </p>

                    {/* <h2 className="text-3xl font-semibold text-gray-800">10. Contact Us</h2>
                    <p className="text-lg text-gray-600">
                        If you have any questions or concerns regarding these Terms and Conditions, please contact us at:
                    </p>
                    <p className="text-lg text-gray-600 font-semibold">
                        Email: <a href="mailto:contact@mediskinai.com" className="text-blue-600">contact@mediskinai.com</a>
                    </p> */}
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditionsPage;
