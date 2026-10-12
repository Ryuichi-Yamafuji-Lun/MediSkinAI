const CONTACT_EMAIL = "ryuichi.y.lun@gmail.com";

const sections = [
    {
        title: "1. Who runs this site",
        body: "MediSkinAI is a free educational project built and run by Ryuichi Lun. It is not a healthcare provider, and using it does not create a doctor-patient relationship.",
    },
    {
        title: "2. The photo you upload",
        body: "Your photo is sent over an encrypted (HTTPS) connection to our server on Google Cloud Run. It is analyzed in memory and discarded as soon as the result is sent back. It is never written to disk, saved to a database, or used to train the model.",
    },
    {
        title: "3. What is shared with other services",
        body: "To write the plain-language explanation, the result label (benign or malignant) and the confidence score are sent to Google's Gemini API. Your photo is not sent to Gemini. Our hosting providers, Vercel (website) and Google Cloud (server), keep standard request logs that include your IP address and browser details. We do not sell or share your data with anyone else, except where required by law.",
    },
    {
        title: "4. Analytics and cookies",
        body: "We use Google Analytics to understand how the site is used, such as which pages are visited, roughly where visitors are located, and what devices they use. Google Analytics sets cookies to do this. You can block these cookies in your browser settings or with a content blocker, and the site will still work.",
    },
    {
        title: "5. Storage in your browser",
        body: "We store two small items in your own browser: a note that you accepted the terms, so you are not asked again, and your most recent result, so it survives a page refresh. The result is cleared when you close the tab. Neither item is sent to us.",
    },
    {
        title: "6. Your choices",
        body: "Because we do not keep your photos or results, there is no stored data about you to access or delete. You can clear the browser storage described above at any time through your browser settings.",
    },
    {
        title: "7. Changes to this policy",
        body: "If this policy changes, the updated version will be posted on this page with a new date at the top.",
    },
];

const PrivacyPolicyPage = () => {
    return (
        <div className="bg-gray-50 min-h-screen flex flex-col items-center">
            {/* Header Section */}
            <div className="bg-blue-100 w-full py-10 sm:py-16 px-4 text-center">
                <h1 className="text-3xl sm:text-5xl font-bold text-gray-800">Privacy Policy</h1>
                <p className="text-base sm:text-lg text-gray-600 mt-4">
                    Last updated: October 2026
                </p>
            </div>

            {/* Content Section */}
            <div className="w-full max-w-4xl mx-auto px-4 sm:px-8 py-8 sm:py-16">
                <div className="bg-white p-5 sm:p-8 rounded-lg shadow-md space-y-6 sm:space-y-8">
                    {sections.map((section) => (
                        <section key={section.title}>
                            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">{section.title}</h2>
                            <p className="mt-3 text-base sm:text-lg text-gray-600">{section.body}</p>
                        </section>
                    ))}
                    <section>
                        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">8. Contact</h2>
                        <p className="mt-3 text-base sm:text-lg text-gray-600">
                            Questions about this policy? Email{" "}
                            <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-600 underline break-all">
                                {CONTACT_EMAIL}
                            </a>
                            .
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;
