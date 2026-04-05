"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useGiftStore } from "@/store/useGiftStore";

export default function IntentStep() {
  const router = useRouter();
  const setField = useGiftStore(state => state.setField);
  const [selected, setSelected] = useState<string | null>(null);

  const options = [
    { 
      id: "see-you", 
      icon: "visibility", 
      title: "I see you — I notice and\nI truly know you" 
    },
    { 
      id: "believe-you", 
      icon: "fitness_center", 
      title: "I believe in you — I am\ncheering for where you are going" 
    },
    { 
      id: "care", 
      icon: "diversity_1", 
      title: "I care about you — I want\nyou to feel looked after" 
    },
    { 
      id: "celebrate", 
      icon: "celebration", 
      title: "Let us celebrate — this\nmoment deserves to be marked" 
    },
    { 
      id: "enjoy", 
      icon: "sentiment_satisfied", 
      title: "Enjoy yourself — just for\nyou, no reason needed" 
    },
    { 
      id: "thank-you", 
      icon: "volunteer_activism", 
      title: "Thank you — my way of\nexpressing real gratitude" 
    },
  ];

  const handleSelect = (option: string) => {
    setSelected(option);
  };

  const handleNext = () => {
    if (selected) {
      if (selected === "not-sure") {
        setField("giftIntent", "Not sure - just wanted it to feel thoughtful");
      } else {
        const title = options.find(o => o.id === selected)?.title || selected;
        setField("giftIntent", title.replace("\n", " "));
      }
      router.push("/onboarding/step7");
    }
  };



  return (
    <div className="w-full max-w-[480px] min-h-screen bg-surface flex flex-col mx-auto relative overflow-hidden pb-32">
      {/* Top Navigation Area */}
      <header className="bg-transparent flex justify-between items-center w-full px-6 py-4 relative z-10">
        <Link href="/onboarding/step5" className="flex items-center gap-2 text-stone-500 hover:text-stone-700 transition-colors">
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
          <div className="h-2 w-8 rounded-full bg-gradient-to-r from-[#AC3509] to-[#FF7043]"></div>
          <div className="h-2 w-2 rounded-full bg-surface-container-highest"></div>
        </div>
        <span className="text-primary font-headline text-xs font-bold uppercase tracking-wider">Step 6 of 7</span>
      </div>

      <main className="flex-1 px-6 pt-10 flex-grow relative z-10">
        {/* Header Section */}
        <div className="mb-10">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant text-xs font-bold uppercase tracking-widest mb-4">
            What you want to say
          </div>
          <h2 className="font-headline text-[2.25rem] font-extrabold leading-[1.1] text-on-surface -tracking-[0.02em] mb-3">
            What do you most want this gift to express?
          </h2>
          <p className="text-on-surface-variant text-lg font-medium leading-relaxed opacity-80">
            Every gift says something. What do you want yours to say?
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
                className={`group flex w-full items-start justify-between p-6 rounded-xl transition-all active:scale-[0.98] duration-150 text-left border-2 ${
                  isSelected
                    ? "bg-primary-container border-primary-container shadow-[0_8px_32px_rgba(172,53,9,0.12)]"
                    : "bg-surface-container-lowest border-transparent hover:bg-surface-container-low border-surface-container-lowest"
                }`}
              >
                <div className="flex-1">
                  <span className={`material-symbols-outlined mb-3 block ${isSelected ? "text-white" : "text-primary"}`} data-icon={opt.icon}>{opt.icon}</span>
                  <h3 className={`font-headline font-bold text-lg leading-tight whitespace-pre-wrap ${isSelected ? "text-white" : "text-on-surface"}`}>
                    {opt.title}
                  </h3>
                </div>
                {isSelected && (
                  <div className="bg-white rounded-full p-1 flex items-center justify-center h-6 w-6 mt-1">
                    <span className="material-symbols-outlined text-primary-container font-bold text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                      check
                    </span>
                  </div>
                )}
              </button>
            );
          })}

          {/* Not Sure Option */}
          <button 
            onClick={() => handleSelect("not-sure")}
            className={`w-full mt-8 p-6 rounded-xl transition-all active:scale-[0.98] duration-150 text-center border-2 border-dashed ${
              selected === "not-sure"
                ? "bg-primary-container border-primary-container text-white"
                : "bg-[#FFF3EE] border-[#FFAB91] hover:bg-surface-container-low"
            }`}
          >
            <span className={`font-body text-[15px] italic leading-snug ${selected === "not-sure" ? "text-white" : "text-stone-500"}`}>
              Not sure — just want it to feel thoughtful
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
    </div>
  );
}
