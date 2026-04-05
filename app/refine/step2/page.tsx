"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RefineStepTwo() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    setSelected(option);
  };

  const handleNext = () => {
    if (selected) {
      router.push("/refine/step3"); 
    }
  };

  const options = [
    { id: "every-day", icon: "repeat", title: "Every day", desc: "fits into their daily routine, used regularly" },
    { id: "special", icon: "auto_awesome", title: "Special occasion", desc: "saved for meaningful or celebratory moments" },
    { id: "display", icon: "palette", title: "Something they can display", desc: "keep as a memento" },
    { id: "flexible", icon: "alt_route", title: "Any of these", desc: "they are flexible" },
  ];

  return (
    <div className="w-full max-w-[480px] min-h-screen bg-surface flex flex-col mx-auto relative overflow-hidden pb-32 flex-grow">
      {/* Top Header */}
      <header className="flex justify-between items-center w-full px-6 py-4 max-w-[480px] mx-auto sticky top-0 bg-surface z-40">
        <Link href="/refine" className="flex items-center gap-1 text-primary hover:opacity-80 transition-opacity active:scale-95 duration-150">
          <span className="material-symbols-outlined text-sm">arrow_back</span>
        </Link>
        <span className="font-headline text-xs font-bold uppercase tracking-wider text-primary">
          Question 2 of 3
        </span>
        <div className="w-6"></div> {/* Spacer for balance */}
      </header>

      {/* Separation Logic */}
      <div className="bg-surface-container-low h-2 w-full"></div>

      <main className="flex-1 w-full max-w-[480px] px-6 pt-6 pb-24">
        {/* Info Banner */}
        <div className="bg-surface-container-low rounded-xl p-4 mb-8 flex items-start gap-4">
          <div className="bg-primary-container text-white rounded-full p-2 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[18px]">info</span>
          </div>
          <p className="text-on-surface-variant text-sm font-medium leading-relaxed font-body">
            One more question after this.
          </p>
        </div>

        {/* AI Badge & Step Pill Cluster */}
        <div className="flex justify-start gap-3 mb-6">
          <div className="bg-surface-container-highest w-fit px-3 py-1 rounded-full">
            <span className="text-xs font-semibold text-secondary font-body">Refine · Question 2</span>
          </div>
        </div>

        {/* H2 Question Header */}
        <h2 className="text-[2rem] font-extrabold font-headline leading-tight tracking-tight text-on-surface mb-3">
          Do they prefer something they use every day or something for a special occasion?
        </h2>
        
        {/* Subtitle */}
        <p className="text-on-surface-variant text-sm font-medium font-body mb-10">
          No wrong answer — just pick what feels more like them.
        </p>

        {/* Options Container */}
        <div className="flex flex-col gap-4">
          {options.map((opt) => {
            const isSelected = selected === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => handleSelect(opt.id)}
                className={`flex items-center gap-4 w-full p-5 rounded-2xl text-left transition-all active:scale-[0.98] border-l-4 shadow-[0_4px_12px_rgba(172,53,9,0.04)] ${
                  isSelected 
                    ? "bg-primary-container/10 border-primary-container" 
                    : "bg-surface-container-lowest border-transparent hover:bg-surface-container"
                }`}
              >
                <span className={`material-symbols-outlined text-2xl ${isSelected ? "text-primary" : "text-primary/70"}`}>
                  {opt.icon}
                </span>
                <div className="flex flex-col">
                  <span className={`font-headline font-semibold text-base transition-colors ${isSelected ? "text-primary" : "text-on-surface"}`}>
                    {opt.title}
                  </span>
                  <span className="text-on-surface-variant text-sm font-body mt-0.5">
                    {opt.desc}
                  </span>
                </div>
              </button>
            );
          })}

          {/* Not Sure Field */}
          <button 
            onClick={() => handleSelect("not-sure")}
            className={`mt-4 flex items-center justify-center w-full py-4 rounded-xl border-dashed transition-all active:scale-[0.98] border-2 ${
              selected === "not-sure" 
                ? "bg-primary-container/10 border-primary-container text-primary" 
                : "bg-surface-container-lowest border-primary/30 text-stone-500 hover:bg-[#FFF3EE]"
            }`}
          >
            <span className="italic font-medium font-body">Not sure</span>
          </button>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center pb-20">
          <p className="text-[13px] italic text-stone-400 font-body">
            Tap to continue to the final question
          </p>
        </div>
      </main>

      {/* Fixed Bottom Action Area (Consistent with global agent rules) */}
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

      {/* Decorative Floating Elements */}
      <div className="fixed top-1/2 -right-12 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="fixed bottom-1/4 -left-12 w-32 h-32 bg-secondary/5 rounded-full blur-2xl pointer-events-none -z-10"></div>
    </div>
  );
}
