"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useGiftStore } from "@/store/useGiftStore";

export default function PersonalityStep() {
  const router = useRouter();
  const setField = useGiftStore(state => state.setField);
  const [selected, setSelected] = useState<string | null>(null);

  const options = [
    { 
      id: "doing", 
      emoji: "🏃", 
      title: "Always doing", 
      desc: "energetic, goal-driven, loves getting things done" 
    },
    { 
      id: "feeling", 
      emoji: "💛", 
      title: "Deeply feeling", 
      desc: "sentimental, values connections and memories" 
    },
    { 
      id: "exploring", 
      emoji: "🌍", 
      title: "Always exploring", 
      desc: "curious, loves new experiences and adventures" 
    },
    { 
      id: "comfort", 
      emoji: "🏡", 
      title: "Comfort-seeker", 
      desc: "loves home, routines, warmth and simple pleasures" 
    },
    { 
      id: "driven", 
      emoji: "🚀", 
      title: "Driven and ambitious", 
      desc: "aspirational, cares about quality and growth" 
    },
    { 
      id: "creative", 
      emoji: "🎨", 
      title: "Creative free spirit", 
      desc: "non-conformist, artsy, dislikes anything generic" 
    },
  ];

  const handleSelect = (option: string) => {
    setSelected(option);
  };

  const handleNext = () => {
    if (selected) {
      if (selected === "not-sure") {
        setField("personality", "Not sure — a mix of these");
      } else {
        const title = options.find(o => o.id === selected)?.title || selected;
        setField("personality", title);
      }
      router.push("/onboarding/step6");
    }
  };



  return (
    <div className="w-full max-w-[480px] min-h-screen bg-surface flex flex-col mx-auto relative overflow-hidden pb-32">
      {/* Top Navigation Area */}
      <header className="bg-transparent flex justify-between items-center w-full px-6 py-4 relative z-10">
        <Link href="/onboarding/step4" className="flex items-center gap-2 text-stone-500 hover:text-stone-700 transition-colors">
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
          <div className="h-2 w-8 rounded-full bg-gradient-to-r from-[#AC3509] to-[#FF7043]"></div>
          <div className="h-2 w-2 rounded-full bg-surface-container-highest"></div>
          <div className="h-2 w-2 rounded-full bg-surface-container-highest"></div>
        </div>
        <span className="text-primary font-headline text-xs font-bold uppercase tracking-wider">Step 5 of 7</span>
      </div>

      <main className="flex-1 px-6 pt-10 flex-grow relative z-10">
        {/* Header Section */}
        <div className="mb-10">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant text-xs font-bold uppercase tracking-widest mb-4">
            Their personality
          </div>
          <h2 className="font-headline text-[2rem] font-extrabold leading-tight text-on-surface -tracking-[0.02em] mb-3">
            What kind of person are they?
          </h2>
          <p className="text-on-surface-variant text-lg font-medium leading-relaxed">
            Pick the one that feels closest. Trust your gut.
          </p>
        </div>

        {/* Answer Options */}
        <div className="space-y-4">
          {options.map((opt) => {
            const isSelected = selected === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => handleSelect(opt.id)}
                className={`group flex w-full items-start gap-4 p-5 rounded-xl transition-all active:scale-[0.98] duration-150 text-left border-l-4 ${
                  isSelected
                    ? "bg-primary-container shadow-[0_8px_32px_rgba(172,53,9,0.12)] border-primary-container"
                    : "bg-surface-container-lowest border-transparent hover:bg-surface-container-low"
                }`}
              >
                <span className="text-2xl pt-0.5">{opt.emoji}</span>
                <div className="flex-1">
                  <span className={`block font-headline text-base font-bold ${isSelected ? "text-white" : "text-on-surface group-hover:text-primary transition-colors"}`}>
                    {opt.title}
                  </span>
                  <span className={`block font-body text-sm mt-0.5 leading-snug ${isSelected ? "text-primary-fixed" : "text-on-surface-variant"}`}>
                    {opt.desc}
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

          {/* Not Sure Option */}
          <button 
            onClick={() => handleSelect("not-sure")}
            className={`w-full mt-4 p-5 rounded-xl transition-all active:scale-[0.98] duration-150 text-center border-2 border-dashed ${
              selected === "not-sure"
                ? "bg-primary-container border-primary-container text-white"
                : "bg-[#FFF3EE] border-[#FFAB91] text-secondary hover:bg-[#FFE8DE]"
            }`}
          >
            <span className={`font-body text-sm italic leading-snug ${selected === "not-sure" ? "text-white" : "text-secondary"}`}>
              Not sure — they are a mix of these
            </span>
          </button>
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
            Next Question
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </button>
        </div>
      </footer>

      {/* Decorative background glows */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary-container/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="fixed bottom-40 -left-20 w-80 h-80 bg-secondary-container/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
    </div>
  );
}
