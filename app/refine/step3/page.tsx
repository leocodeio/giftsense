"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RefineStepThree() {
  const router = useRouter();
  const [customInput, setCustomInput] = useState("");

  const handleNext = () => {
    // End of the refinement sequence. Time to rebuild the results!
    router.push("/onboarding/loading");
  };

  const isFilled = customInput.trim().length > 0;

  return (
    <div className="w-full max-w-[480px] min-h-screen bg-surface flex flex-col mx-auto relative overflow-hidden pb-32">
      {/* Top Header */}
      <header className="flex justify-between items-center w-full px-6 py-4 max-w-[480px] mx-auto sticky top-0 bg-surface z-40">
        <Link href="/refine/step2" className="flex items-center gap-1 text-primary hover:opacity-80 transition-opacity active:scale-95 duration-150">
          <span className="material-symbols-outlined text-sm">arrow_back</span>
        </Link>
        <span className="font-headline text-xs font-bold uppercase tracking-wider text-primary">
          Question 3 of 3
        </span>
        <div className="w-6"></div> {/* Spacer for balance */}
      </header>

      {/* Separation Logic */}
      <div className="bg-surface-container-low h-2 w-full"></div>

      <main className="flex-1 w-full max-w-[480px] px-6 pt-6 pb-24">
        {/* Info Banner */}
        <section className="bg-[#FFF3EE] border-l-4 border-primary-container px-4 py-3.5 flex items-start gap-3 mb-6">
          <span className="material-symbols-outlined text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
          <p className="text-on-surface-variant text-sm font-medium leading-relaxed font-body">
            Last step! Tell us exactly what should be avoided or definitely included.
          </p>
        </section>

        <div className="flex flex-col gap-3 mb-6">
          <div className="bg-surface-container-highest w-fit px-3 py-1 rounded-full">
            <span className="text-xs font-semibold text-secondary font-body">Refine · Question 3</span>
          </div>
        </div>

        {/* Question Header */}
        <h2 className="font-headline text-2xl font-extrabold text-on-surface leading-tight tracking-tight mb-2">
          Any specific guardrails or custom hints?
        </h2>
        <p className="text-on-surface-variant text-sm font-medium font-body mb-8">
          Are there any allergies, intense dislikes, inside jokes, or crazy themes we should know about? Type anything you want!
        </p>

        {/* Input Field Area */}
        <div className="w-full flex flex-col gap-4">
          <textarea
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="e.g., Nothing excessively large! They live in a tiny apartment. They also hate the color orange."
            className="w-full min-h-[140px] p-5 rounded-2xl bg-surface-container-lowest border-2 border-surface-container-high focus:border-primary-container focus:outline-none focus:ring-4 focus:ring-primary-container/10 transition-all font-body text-base text-on-surface placeholder:text-stone-400 resize-none shadow-[0_4px_12px_rgba(172,53,9,0.02)]"
          ></textarea>
        </div>
      </main>

      {/* Fixed Bottom Action Area */}
      <footer className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] px-6 pb-10 pt-4 bg-gradient-to-t from-surface via-surface to-transparent pointer-events-none z-20">
        <div className="pointer-events-auto">
          <button 
            onClick={handleNext}
            className={`w-full h-[60px] rounded-full font-headline font-bold text-lg transition-all flex items-center justify-center gap-2 ${
              isFilled 
                ? "bg-gradient-to-br from-primary to-primary-container text-white active:scale-95 shadow-[0_8px_32px_rgba(172,53,9,0.2)]" 
                : "bg-surface-container-highest text-primary hover:bg-surface-container shadow-sm active:scale-95"
            }`}
          >
            {isFilled ? "Update AI Generation" : "Skip & Generate"}
            <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
          </button>
        </div>
      </footer>

      {/* Decorative Assets */}
      <div className="fixed top-[20%] -right-12 w-48 h-48 bg-primary-container/5 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="fixed bottom-[10%] -left-12 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10"></div>
    </div>
  );
}
