"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ConfidenceModal from "@/components/ConfidenceModal";

// Define the shape based on the updated Mistral schema
interface AIGiftPayload {
  profileSummary: string;
  signals: string[];
  gifts: Array<{
    title: string;
    description: string;
    reasoning: string;
    priceEstimate: string;
  }>;
}

export default function ResultsScreen() {
  const router = useRouter();
  const [data, setData] = useState<AIGiftPayload | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  useEffect(() => {
    // Rehydrate the Mistral API data from Session Storage
    const stored = sessionStorage.getItem("ai_gift_payload");
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as AIGiftPayload;
        // Avoid synchronous state updates during initial render cycle which triggers lint errors
        setTimeout(() => setData(parsed), 0);
      } catch (e) {
        console.error("Failed to parse AI payload", e);
      }
    } else {
      // If someone routes here directly, bounce them back to the start
      router.push("/onboarding");
    }
  }, [router]);

  if (!data) {
    // Prevent hydration flashes or crash if array isn't instantly ready
    return <div className="min-h-screen bg-surface flex items-center justify-center text-primary font-headline font-bold">Unpacking the results...</div>;
  }

  return (
    <div className="max-w-[480px] mx-auto min-h-screen flex flex-col relative pb-32 bg-surface text-on-surface">
      {/* Top Nav (Logo focused) */}
      <header className="flex justify-center items-center w-full px-6 py-6 relative z-10">
        <span className="text-xl font-extrabold text-[#FF7043] font-headline tracking-tight">GiftSense</span>
      </header>

      {/* Section A: AI Personality Profile */}
      <section className="px-4">
        <div className="bg-[#FFF3EE] rounded-[20px] border-l-4 border-[#FF7043] p-5 pl-6 shadow-[0_8px_32px_rgba(172,53,9,0.06)]">
          <div className="flex justify-between items-center">
            <div className="bg-white px-3 py-1 rounded-full border border-[#FF7043] text-[#FF7043] text-xs font-bold font-headline">
              AI Gift Profile
            </div>
            <div 
              onClick={() => setModalOpen(true)}
              className="bg-[#E8F5E9] px-3 py-1 rounded-full text-[#2E7D32] text-xs font-bold font-headline flex items-center gap-1 cursor-pointer hover:bg-[#C8E6C9] active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[14px]">check_circle</span>
              High Confidence
            </div>
          </div>
          
          <div className="mt-3 flex items-center gap-1.5 text-[#FF7043] text-[12px] font-semibold bg-[#FFF3EE]">
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
            Powered by Mistral · Based on answers
          </div>
          
          <div className="mt-4 text-on-surface-variant text-[14px] font-medium">
            Here is how our AI understands them:
          </div>
          
          <p className="mt-2 text-on-surface text-[16px] leading-[1.7] font-normal italic opacity-90 font-body">
            &quot;{data.profileSummary}&quot;
          </p>
          
          {/* Tag Signals loop */}
          <div className="mt-4 flex gap-2 flex-wrap">
            {data.signals?.map((signal, idx) => (
              <span key={idx} className="bg-surface-container-highest px-3 py-1 rounded-full text-xs font-medium text-on-surface-variant font-body">
                {signal}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Section B: Top Gift Suggestions */}
      <section className="mt-10">
        <div className="px-4 mb-4 flex justify-between items-end">
          <div>
            <h3 className="text-xl font-bold font-headline text-on-surface tracking-tight">Top {data.gifts?.length ?? 3} gift ideas</h3>
            <p className="text-stone-500 text-xs font-medium mt-0.5">Dynamically mapped to criteria</p>
          </div>
        </div>

        {/* Gift Cards Grid */}
        <div className="flex flex-col gap-4 px-4">
          {data.gifts?.map((gift, index) => {
            const isExpanded = expandedIndex === index;
            return (
              <div 
                key={index} 
                onClick={() => setExpandedIndex(isExpanded ? null : index)}
                className="bg-surface-container-lowest rounded-2xl p-6 shadow-[0_4px_24px_rgba(172,53,9,0.04)] coral-mist-shadow transition-all overflow-hidden cursor-pointer"
              >
                <div className="flex justify-between items-start">
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 bg-primary-container/10 rounded-xl flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>redeem</span>
                    </div>
                    <div className="flex flex-col">
                      {index === 0 && (
                        <div className="w-fit bg-primary-fixed px-2 py-0.5 mb-1 rounded-full text-primary-fixed-variant text-[10px] font-extrabold uppercase tracking-widest font-headline">
                          Top Match
                        </div>
                      )}
                      <h2 className="font-headline text-lg font-bold select-none leading-tight">{gift.title}</h2>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-stone-400 mt-2 shrink-0">
                    {isExpanded ? "expand_less" : "expand_more"}
                  </span>
                </div>
                
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-surface-container animate-fade-in">
                    <p className="text-sm font-bold text-on-surface mb-2">Est. Cost: <span className="font-normal">{gift.priceEstimate || "Unknown"}</span></p>
                    <p className="text-on-surface-variant text-sm leading-relaxed mb-4 font-body">
                      {gift.description}
                    </p>
                    <div className="bg-[#FFF3EE] p-4 rounded-xl border border-[#FFAB91] border-dashed">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-[#AC3509] text-sm">auto_awesome</span>
                        <span className="text-[#AC3509] text-xs font-bold uppercase tracking-wider font-headline">Why this fits</span>
                      </div>
                      <p className="text-[#852300] text-sm font-medium leading-relaxed font-body">
                        &quot;{gift.reasoning}&quot;
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Section C: Actions */}
      <section className="mt-12 flex flex-col items-center gap-6 px-6">
        <Link href="/refine" className="w-full h-[54px] bg-gradient-to-br from-primary to-primary-container rounded-full text-white font-headline font-bold text-lg flex items-center justify-center gap-2 shadow-[0_8px_32px_rgba(172,53,9,0.16)] active:scale-95 transition-transform hover:opacity-95">
          Refine & Get Better AI Hits
          <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
        </Link>
        <button 
            onClick={() => setModalOpen(true)}
            className="text-stone-500 font-headline font-semibold text-sm flex items-center gap-2 hover:text-primary transition-colors active:scale-95"
        >
          <span className="material-symbols-outlined text-lg">north_east</span>
          Share these suggestions
        </button>
      </section>

      <ConfidenceModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
