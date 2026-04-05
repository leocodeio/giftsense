"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useGiftStore } from "@/store/useGiftStore";

export default function BudgetStep() {
  const router = useRouter();
  const setField = useGiftStore(state => state.setField);
  const [selected, setSelected] = useState<string | null>(null);

  const options = [
    { id: "under-500", emoji: "💸", title: "Under ₹500 — keeping it light" },
    { id: "500-1500", emoji: "💳", title: "₹500 – ₹1,500" },
    { id: "1500-3000", emoji: "🎁", title: "₹1,500 – ₹3,000" },
    { id: "3000-6000", emoji: "💎", title: "₹3,000 – ₹6,000" },
    { id: "above-6000", emoji: "👑", title: "₹6,000 and above" },
  ];

  const handleSelect = (option: string) => {
    setSelected(option);
  };

  const handleNext = () => {
    if (selected) {
      if (selected === "flexible") {
        setField("budget", "Flexible — budget is not the main concern");
      } else {
        const title = options.find(o => o.id === selected)?.title || selected;
        // Strip out the emoji-based subtext for a cleaner prompt, if you want.
        const cleanTitle = title.split(" — ")[0];
        setField("budget", cleanTitle);
      }
      // Directs to the generation step 7
      router.push("/onboarding/loading");
    }
  };



  return (
    <div className="w-full max-w-[480px] min-h-screen bg-surface flex flex-col mx-auto relative overflow-hidden pb-32">
      {/* Top Navigation Area */}
      <header className="bg-transparent flex justify-between items-center w-full px-6 py-4 relative z-10">
        <Link href="/onboarding/step6" className="flex items-center gap-2 text-stone-500 hover:text-stone-700 transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
          <span className="font-headline text-sm font-medium tracking-tight">Back</span>
        </Link>
        <div className="text-primary font-headline text-sm font-bold tracking-tight">GiftSense</div>
        <Link href="/" className="text-primary font-headline text-sm font-medium tracking-tight hover:opacity-80 transition-opacity active:scale-95 duration-150">Exit</Link>
      </header>

      {/* Progress Header */}
      <div className="flex justify-between items-center w-full px-6 pt-4 pb-2 relative z-10">
        <div className="flex gap-1">
          <div className="h-2 w-2 rounded-full bg-surface-container-highest"></div>
          <div className="h-2 w-2 rounded-full bg-surface-container-highest"></div>
          <div className="h-2 w-2 rounded-full bg-surface-container-highest"></div>
          <div className="h-2 w-2 rounded-full bg-surface-container-highest"></div>
          <div className="h-2 w-2 rounded-full bg-surface-container-highest"></div>
          <div className="h-2 w-2 rounded-full bg-surface-container-highest"></div>
          <div className="h-2 w-8 rounded-full bg-gradient-to-r from-[#AC3509] to-[#FF7043]"></div>
        </div>
        <span className="text-primary font-headline text-xs font-bold uppercase tracking-wider">Step 7 of 7</span>
      </div>

      <main className="flex-1 px-6 pt-10 flex-grow relative z-10">
        {/* Header Section */}
        <div className="mb-10">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant text-xs font-bold uppercase tracking-widest mb-4">
            Budget
          </div>
          <h2 className="font-headline text-[2rem] font-extrabold leading-tight text-on-surface -tracking-[0.02em] mb-3">
            What is your rough budget for this gift?
          </h2>
          <p className="text-on-surface-variant text-lg font-medium leading-relaxed">
            No judgment — thoughtfulness matters more than price.
          </p>
        </div>

        {/* Answer Options */}
        <div className="space-y-4 mb-8">
          {options.map((opt) => {
            const isSelected = selected === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => handleSelect(opt.id)}
                className={`group flex w-full items-center justify-between p-5 rounded-xl transition-all active:scale-[0.98] duration-150 text-left border-l-4 ${
                  isSelected
                    ? "bg-primary-container shadow-[0_8px_32px_rgba(172,53,9,0.12)] border-primary-container"
                    : "bg-surface-container-lowest border-transparent hover:bg-surface-container-low"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{opt.emoji}</span>
                  <span className={`block font-headline text-base ${isSelected ? "text-white font-bold" : "text-on-surface font-medium group-hover:text-primary transition-colors"}`}>
                    {opt.title}
                  </span>
                </div>
                {isSelected && (
                  <span className="material-symbols-outlined text-white self-center" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                )}
              </button>
            );
          })}

          {/* Flexible Option */}
          <button 
            onClick={() => handleSelect("flexible")}
            className={`w-full mt-4 p-5 rounded-xl transition-all active:scale-[0.98] duration-150 text-center border-2 border-dashed ${
              selected === "flexible"
                ? "bg-primary-container border-primary-container text-white"
                : "bg-[#FFF3EE] border-[#FFAB91] text-stone-500 hover:bg-[#FFE8DE]"
            }`}
          >
            <span className={`font-body text-sm italic leading-snug font-medium ${selected === "flexible" ? "text-white" : "text-stone-500"}`}>
              Flexible — budget is not the main concern
            </span>
          </button>
        </div>

        {/* Almost done banner */}
        <div className="bg-surface-container-lowest border border-[#F5E6E0] rounded-2xl p-[14px] px-[16px] flex items-center gap-4 mb-2 shadow-[0_8px_32px_rgba(172,53,9,0.06)]">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
          </div>
          <p className="text-on-surface-variant text-sm leading-snug font-medium">
            Almost done. We will <br/> build their profile now.
          </p>
        </div>
      </main>

      {/* Fixed Bottom Action Area */}
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
            Build profile
            <span className="material-symbols-outlined text-lg opacity-90">auto_awesome</span>
          </button>
          <p className="mt-3 text-stone-400 italic text-[11px] font-medium text-center tracking-wide">Takes about 3 seconds</p>
        </div>
      </footer>

      {/* Decorative background glows */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary-container/10 rounded-full blur-3xl pointer-events-none"></div>
    </div>
  );
}
