"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function OccasionStep() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    setSelected(option);
  };

  const handleNext = () => {
    if (selected) {
      router.push("/onboarding/step3");
    }
  };

  const options = [
    { id: "birthday", emoji: "🎂", title: "Birthday", desc: null },
    { id: "festival", emoji: "🎉", title: "Festival or celebration", desc: "(Diwali, Holi, Christmas, Eid...)" },
    { id: "milestone", emoji: "🏆", title: "A milestone", desc: "(new job, graduation, promotion, new home)" },
    { id: "just-because", emoji: "💛", title: "Just because — no specific occasion", desc: null },
    { id: "gratitude", emoji: "🙏", title: "Gratitude or apology", desc: null },
    { id: "hard-time", emoji: "💔", title: "They are going through something hard", desc: null },
  ];

  return (
    <div className="w-full max-w-[480px] min-h-screen bg-surface flex flex-col mx-auto relative overflow-hidden pb-32">
      {/* Top Navigation Area */}
      <header className="bg-transparent flex justify-between items-center w-full px-6 py-4 relative z-10">
        <Link href="/onboarding" className="flex items-center gap-2 text-stone-500 hover:text-stone-700 transition-colors">
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
          <div className="h-2 w-8 rounded-full bg-gradient-to-r from-[#AC3509] to-[#FF7043]"></div>
          <div className="h-2 w-2 rounded-full bg-surface-container-highest"></div>
          <div className="h-2 w-2 rounded-full bg-surface-container-highest"></div>
          <div className="h-2 w-2 rounded-full bg-surface-container-highest"></div>
          <div className="h-2 w-2 rounded-full bg-surface-container-highest"></div>
        </div>
        <span className="text-primary font-headline text-xs font-bold uppercase tracking-wider">Step 2 of 6</span>
      </div>

      <main className="flex-1 px-6 pt-8 pb-12 overflow-y-auto relative z-10">
        {/* Header Section */}
        <div className="mb-10">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant text-xs font-bold uppercase tracking-widest mb-4">
            The occasion
          </div>
          <h2 className="text-[2rem] leading-tight font-extrabold text-on-surface tracking-tight mb-3">
            What is the occasion for this gift?
          </h2>
          <p className="text-on-surface-variant text-lg font-body leading-relaxed">
            This helps us understand the emotional context.
          </p>
        </div>

        {/* Answer Options */}
        <div className="space-y-3">
          {options.map((opt) => {
            const isSelected = selected === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => handleSelect(opt.id)}
                className={`w-full flex items-center p-5 rounded-2xl transition-all active:scale-[0.98] text-left ${
                  isSelected
                    ? "bg-primary-container shadow-lg border-none"
                    : "bg-surface-container-lowest shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-[#F5E6E0] hover:border-primary-container"
                }`}
              >
                <div className={`flex items-center flex-1 ${isSelected ? 'text-white' : 'text-on-surface'}`}>
                  <span className="text-2xl mr-4">{opt.emoji}</span>
                  <span className="font-semibold text-base leading-snug">
                    {opt.title}
                    {opt.desc && (
                      <>
                        <br />
                        <span className={`font-normal text-sm ${isSelected ? 'text-white/80' : 'text-on-surface-variant'}`}>
                          {opt.desc}
                        </span>
                      </>
                    )}
                  </span>
                </div>
                {isSelected && (
                  <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                )}
              </button>
            );
          })}

          {/* Not Sure */}
          <button 
            onClick={() => handleSelect("not-sure")}
            className={`w-full p-5 rounded-2xl border-2 border-dashed text-center mt-6 transition-all active:scale-[0.98] ${
              selected === "not-sure" 
                ? "bg-primary-container border-primary-container text-white" 
                : "bg-[#FFF3EE] border-[#FFAB91]"
            }`}
          >
            <span className={`italic font-medium ${selected === "not-sure" ? "text-white" : "text-stone-500"}`}>
              Not sure / Other
            </span>
          </button>
        </div>

        {/* Hint */}
        {/* Hint removed to maintain sticky next button pattern */}
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
