"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RefineStepOne() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    setSelected(option);
  };

  const handleNext = () => {
    if (selected) {
      router.push("/refine/step2"); // Navigate to the 2nd refine step
    }
  };

  const options = [
    { id: "thought", emoji: "💭", label: "The thought behind it" },
    { id: "useful", emoji: "🎯", label: "That it is useful" },
    { id: "experience", emoji: "✨", label: "The experience it creates" },
    { id: "surprise", emoji: "🎁", label: "The surprise element" },
  ];

  return (
    <div className="w-full max-w-[480px] min-h-screen bg-surface flex flex-col mx-auto relative overflow-hidden pb-32">
      {/* Top Header */}
      <header className="flex justify-between items-center w-full px-6 py-4 max-w-[480px] mx-auto sticky top-0 bg-surface z-40">
        <Link href="/results" className="flex items-center gap-1 text-primary hover:opacity-80 transition-opacity active:scale-95 duration-150">
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          <span className="font-headline text-sm font-medium tracking-tight">Back to results</span>
        </Link>
        <div className="text-lg font-bold text-primary-container font-headline">GiftSense</div>
        <Link href="/" className="text-stone-500 font-headline text-sm font-medium tracking-tight hover:opacity-80 transition-opacity active:scale-95 duration-150">
          Exit
        </Link>
      </header>

      {/* Separation Logic */}
      <div className="bg-surface-container-low h-2 w-full"></div>

      <main className="flex-1 pb-12 pt-6">
        {/* Info Banner */}
        <section className="bg-[#FFF3EE] border-l-4 border-primary-container px-4 py-3.5 flex items-start gap-3 mb-6 mx-6">
          <span className="material-symbols-outlined text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
          <p className="text-on-surface-variant text-sm font-medium leading-relaxed font-body">
            Our AI needs 2 more answers to find a better match for them.
          </p>
        </section>

        {/* Question Flow Content */}
        <div className="px-6 flex flex-col items-center">
          {/* AI Badge */}
          <div className="bg-[#FFF3EE] text-primary flex items-center gap-1.5 px-4 py-1.5 rounded-full mb-8">
            <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
            <span className="font-headline text-xs font-bold uppercase tracking-wider">AI Follow-up Question 1 of 2</span>
          </div>

          {/* Intro Headers */}
          <div className="flex flex-col items-center text-center gap-3 mb-10">
            <span className="bg-surface-container text-primary px-3 py-1 rounded-full text-xs font-bold font-headline">
              Refine · Question 1
            </span>
            <h2 className="font-headline text-2xl font-extrabold text-on-surface leading-tight tracking-tight">
              When they receive a gift, what matters more to them?
            </h2>
            <p className="text-on-surface-variant text-sm font-medium font-body">
              Think about how they react to gifts in general.
            </p>
          </div>

          {/* Answer Grid */}
          <div className="w-full flex flex-col gap-2.5">
            {options.map((opt) => {
              const isSelected = selected === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelect(opt.id)}
                  className={`w-full p-5 rounded-xl text-left flex items-center gap-4 transition-all duration-200 active:scale-[0.98] border-l-4 shadow-sm ${
                    isSelected
                      ? "bg-primary-container/10 border-primary-container"
                      : "bg-surface-container-lowest border-transparent hover:border-surface-container-low"
                  }`}
                >
                  <span className="text-2xl">{opt.emoji}</span>
                  <div className="flex flex-col">
                    <span className={`font-headline text-lg font-bold transition-colors ${
                      isSelected ? "text-primary" : "text-on-surface"
                    }`}>
                      {opt.label}
                    </span>
                  </div>
                </button>
              );
            })}

            {/* Not Sure Option */}
            <button
              onClick={() => handleSelect("not-sure")}
              className={`w-full mt-2 p-4 rounded-xl text-center font-headline text-sm font-semibold transition-colors active:scale-95 ${
                selected === "not-sure"
                  ? "bg-surface-container-high text-primary"
                  : "bg-surface-container text-on-surface-variant hover:bg-surface-container-highest"
              }`}
            >
              Not sure how they usually react
            </button>
          </div>
        </div>
      </main>

      {/* Fixed Bottom Action Area (Using standard rule pattern) */}
      <footer className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] px-6 pb-10 pt-4 bg-gradient-to-t from-surface via-surface to-transparent pointer-events-none z-20">
        <div className="pointer-events-auto">
          <button 
            onClick={handleNext}
            disabled={!selected}
            className={`w-full h-[60px] rounded-full font-headline font-bold text-lg transition-all flex items-center justify-center gap-2 ${
              selected 
                ? "bg-gradient-to-br from-primary to-primary-container text-white active:scale-95 cursor-pointer opacity-100 shadow-[0_8px_32px_rgba(172,53,9,0.2)]" 
                : "bg-surface-container-highest text-stone-400 cursor-not-allowed opacity-70 shadow-none border-none"
            }`}
          >
            Next Question
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </button>
        </div>
      </footer>

      {/* Decorative Background Elements */}
      <div className="absolute top-[20%] -right-12 w-48 h-48 bg-primary-container/5 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute bottom-[10%] -left-12 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10"></div>
    </div>
  );
}
