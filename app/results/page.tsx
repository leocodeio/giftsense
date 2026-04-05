"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

  useEffect(() => {
    // Rehydrate the Mistral API data from Session Storage
    const stored = sessionStorage.getItem("ai_gift_payload");
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as AIGiftPayload;
        setData(parsed);
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
            <div className="bg-[#E8F5E9] px-3 py-1 rounded-full text-[#2E7D32] text-xs font-bold font-headline flex items-center gap-1">
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
            "{data.profileSummary}"
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

        <div className="space-y-4 px-4">
          {data.gifts?.map((gift, index) => {
            const isTopRank = index === 0;

            return (
              <div 
                key={index} 
                className={`bg-surface-container-lowest rounded-[20px] p-5 shadow-[0_8px_32px_rgba(172,53,9,0.06)] relative overflow-hidden ${
                  isTopRank ? "border-l-4 border-[#FF7043]" : ""
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm font-headline ${
                    isTopRank ? "bg-[#FF7043] text-white" : "bg-surface-container-highest text-on-surface-variant"
                  }`}>
                    {index + 1}
                  </div>
                  {isTopRank && (
                    <div className="bg-primary-container/10 text-primary font-bold text-[10px] uppercase tracking-widest px-2 py-1 rounded-md">
                      Best match
                    </div>
                  )}
                </div>

                <h3 className="text-lg font-bold font-headline text-on-surface leading-tight">
                  {gift.title}
                </h3>
                
                <p className="mt-3 text-sm text-on-surface-variant leading-relaxed font-body">
                  {gift.description}
                </p>

                <p className="mt-3 text-sm text-on-surface-variant leading-relaxed font-body">
                  <span className="font-bold text-primary italic">Why AI picked this: </span> 
                  {gift.reasoning}
                </p>

                <div className="mt-4 flex justify-between items-center border-t border-surface-container-highest pt-4">
                  <div className={`font-bold font-headline ${isTopRank ? "text-primary" : "text-on-surface-variant"}`}>
                    {gift.priceEstimate}
                  </div>
                  {isTopRank ? (
                    <div className="bg-[#E8F5E9] text-[#2E7D32] text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                      <span className="material-symbols-outlined text-[12px]">account_balance_wallet</span>
                      Within budget
                    </div>
                  ) : (
                    <span className="material-symbols-outlined text-stone-300">redeem</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section C: Actions */}
      <section className="mt-12 px-6 flex flex-col gap-4">
        <Link href="/refine" className="w-full h-[52px] rounded-full border-2 border-primary text-primary font-bold font-headline flex items-center justify-center gap-2 hover:bg-primary/5 active:scale-[0.96] transition-all">
          <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
          Not the right fit? Refine the suggestions
        </Link>
        
        <Link href="/onboarding" className="w-full py-2 text-stone-500 font-medium text-sm flex items-center justify-center gap-1 hover:text-primary transition-colors active:scale-95">
          <span className="material-symbols-outlined text-sm">refresh</span>
          Start a new gift profile
        </Link>
      </section>
    </div>
  );
}
