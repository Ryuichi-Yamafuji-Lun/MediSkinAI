import { Link } from "react-router-dom";
import Icon from "../Icons";

const does = [
  "Screens a photo of a single mole or skin spot as likely benign or likely malignant",
  "Shows how confident the model is in that label",
  "Explains the result in plain language and suggests next steps",
];

const doesNot = [
  "Diagnose skin cancer or name the type of lesion",
  "Rule out melanoma. It can miss cancers, so a benign result is not an all-clear",
  "Replace a dermatologist, who can examine the spot in person and test it",
];

const ScopeSection = () => (
  <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20" data-aos="fade-up">
    <div className="text-center max-w-2xl mx-auto">
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">Know what it can and can&apos;t do</h2>
      <p className="mt-4 text-base sm:text-lg text-slate-600">
        MediSkinAI is a first step that helps you decide whether to get a spot looked at. It is not a medical test.
      </p>
    </div>

    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-xs ring-1 ring-slate-900/5">
        <h3 className="text-lg font-semibold text-slate-800">What it does</h3>
        <ul className="mt-4 space-y-3">
          {does.map((item) => (
            <li key={item} className="flex gap-3 text-slate-600">
              <Icon name="check" className="w-6 h-6 shrink-0 text-green-600" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-xs ring-1 ring-slate-900/5">
        <h3 className="text-lg font-semibold text-slate-800">What it can&apos;t do</h3>
        <ul className="mt-4 space-y-3">
          {doesNot.map((item) => (
            <li key={item} className="flex gap-3 text-slate-600">
              <Icon name="x" className="w-6 h-6 shrink-0 text-amber-600" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>

    <p className="mt-8 text-center">
      <Link to="/about" className="inline-flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-800">
        How the model works and its limits
        <Icon name="arrowRight" className="w-4 h-4" />
      </Link>
    </p>
  </div>
);

export default ScopeSection;
