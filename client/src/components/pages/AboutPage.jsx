import { useEffect } from "react";
import { Link } from "react-router-dom";
import "aos/dist/aos.css"; // Import AOS styles
import AOS from "aos";
import Icon from "../Icons";

const modelFacts = [
    {
        icon: "eye",
        title: "Image classifier",
        body: "A ResNet50 network, pretrained on ImageNet and fine-tuned on the ISIC 2020 Challenge dataset: 33,126 expert-labelled dermoscopic images of skin lesions.",
    },
    {
        icon: "scale",
        title: "Built for a rare outcome",
        body: "Only 584 of those images are malignant, fewer than 2%. Training used a class-weighted loss so the model pays extra attention to malignant cases instead of calling everything benign.",
    },
    {
        icon: "sparkles",
        title: "Plain-language explanation",
        body: "The label and confidence score (never your photo) are sent to Google's Gemini model, which writes a short explanation and suggested next steps.",
    },
];

const limitations = [
    {
        title: "Trained on clinic images, used on phone photos",
        body: "The training images were taken with a dermatoscope, a magnifying camera used in clinics. Phone photos look different, so results on them are less reliable.",
    },
    {
        title: "It can miss melanoma",
        body: "A benign result does not rule out cancer. The model's sensitivity to malignant lesions is still being re-evaluated, so treat every result as a rough estimate.",
    },
    {
        title: "Two labels only",
        body: "It sorts a spot into benign or malignant. It cannot tell you what kind of lesion it is.",
    },
    {
        title: "Confidence is not a medical probability",
        body: "The confidence score reflects how sure the model is of its own label. It is not your chance of having cancer.",
    },
];

const warningSigns = [
    ["A", "Asymmetry", "one half doesn't match the other"],
    ["B", "Border", "edges are irregular, ragged or blurred"],
    ["C", "Color", "uneven, or several shades of brown, black, red, white or blue"],
    ["D", "Diameter", "larger than about 6 mm (a pencil eraser)"],
    ["E", "Evolving", "changing in size, shape or color, or itching or bleeding"],
];

const AboutUsPage = () => {
    useEffect(() => {
        AOS.init({
            duration: 800,
            offset: 120,
            easing: "ease-in-out",
            once: true,
        });
    }, []);

    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <div className="bg-blue-100 text-center py-10 sm:py-16 px-4">
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">About MediSkinAI</h1>
                <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
                    A free screening aid that helps you decide whether a spot is worth showing a dermatologist.
                </p>
            </div>

            <div className="bg-white">
                {/* Why */}
                <section className="max-w-3xl mx-auto px-4 sm:px-8 py-12 sm:py-16" data-aos="fade-up">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Why it exists</h2>
                    <p className="mt-4 text-base sm:text-lg text-gray-600">
                        About 3.3 million people in the U.S. are diagnosed with basal or squamous cell skin cancer each year, according to the{" "}
                        <a
                            href="https://www.cancer.org/cancer/basal-and-squamous-cell-skin-cancer/about/key-statistics.html"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline hover:text-blue-800"
                        >
                            American Cancer Society
                        </a>
                        . Most skin cancers are very treatable when caught early, yet many people put off getting a new or changing spot checked.
                    </p>
                    <p className="mt-4 text-base sm:text-lg text-gray-600">
                        MediSkinAI started as a personal project, inspired by a family history of skin cancer, to explore how AI could help more people notice a worrying spot early and take the next step of seeing a professional.
                    </p>
                </section>

                {/* How the model works */}
                <section className="bg-slate-50 py-12 sm:py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-8">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center">How the model works</h2>
                        <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                            {modelFacts.map((fact) => (
                                <div key={fact.title} className="rounded-2xl bg-white p-6 shadow-xs ring-1 ring-slate-900/5" data-aos="fade-up">
                                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                                        <Icon name={fact.icon} />
                                    </span>
                                    <h3 className="mt-5 text-lg font-semibold text-slate-800">{fact.title}</h3>
                                    <p className="mt-2 text-slate-600">{fact.body}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Limitations */}
                <section className="max-w-4xl mx-auto px-4 sm:px-8 py-12 sm:py-16" data-aos="fade-up">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Limitations you should know</h2>
                    <dl className="mt-6 space-y-5">
                        {limitations.map((item) => (
                            <div key={item.title} className="flex gap-4">
                                <Icon name="warning" className="w-6 h-6 shrink-0 text-amber-600 mt-0.5" />
                                <div>
                                    <dt className="font-semibold text-slate-800">{item.title}</dt>
                                    <dd className="mt-1 text-slate-600">{item.body}</dd>
                                </div>
                            </div>
                        ))}
                    </dl>
                </section>

                {/* When to see a dermatologist */}
                <section className="bg-slate-50 py-12 sm:py-16">
                    <div className="max-w-4xl mx-auto px-4 sm:px-8" data-aos="fade-up">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">When to see a dermatologist</h2>
                        <p className="mt-4 text-base sm:text-lg text-gray-600">
                            Whatever the result, get a spot checked if it shows any of the ABCDE warning signs of melanoma, or if it is new and looks different from your other moles.
                        </p>
                        <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {warningSigns.map(([letter, word, detail]) => (
                                <li key={letter} className="flex gap-3 rounded-xl bg-white p-4 ring-1 ring-slate-900/5">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 font-bold text-blue-700">
                                        {letter}
                                    </span>
                                    <span className="text-slate-600">
                                        <span className="font-semibold text-slate-800">{word}:</span> {detail}
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-8 flex flex-col sm:flex-row gap-3">
                            <a
                                href="https://find-a-derm.aad.org/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-center bg-blue-600 text-white font-semibold py-3 px-5 rounded-lg hover:bg-blue-700"
                            >
                                Find a dermatologist
                            </a>
                            <Link
                                to="/detection"
                                className="text-center bg-white text-slate-800 font-semibold py-3 px-5 rounded-lg ring-1 ring-slate-300 hover:bg-slate-100"
                            >
                                Check a photo
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Disclaimer Section */}
                <div className="text-center py-8 px-4 sm:px-8 bg-blue-100">
                    <p className="text-gray-600 italic text-base sm:text-lg max-w-4xl mx-auto">
                        Disclaimer: MediSkinAI is not a substitute for professional medical advice. Always consult a qualified healthcare provider for accurate diagnoses and treatment.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutUsPage;
