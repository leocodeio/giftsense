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

export default function RefinedResultsScreen() {
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
      router.push("/onboarding");
    }
  }, [router]);

  if (!data) {
    return <div className="min-h-screen bg-surface flex items-center justify-center text-primary font-headline font-bold">Painting refined details...</div>;
  }

  return (
    <div className="bg-surface font-body text-on-surface min-h-screen max-w-[480px] mx-auto pb-32">
      {/* Minimal TopNavBar */}
      <header className="flex justify-between items-center w-full px-6 pt-4 pb-2 max-w-[480px] mx-auto sticky top-0 z-50 bg-surface">
        <Link href="/refine/step3" className="material-symbols-outlined text-[#AC3509] p-2 hover:bg-[#FAF2EE] rounded-full active:scale-90 duration-200">
          arrow_back
        </Link>
        <span className="font-headline text-xs font-bold uppercase tracking-wider text-[#AC3509]">GiftSense</span>
        <Link href="/" className="font-headline text-xs font-bold uppercase tracking-wider text-stone-500 hover:opacity-80 transition-opacity">Exit</Link>
      </header>

      <main className="pt-6 px-4 space-y-6">
        {/* Confidence Upgrade Banner */}
        <section className="bg-[#E8F5E9] border-l-4 border-[#2E7D32] p-4 rounded-xl flex gap-3 items-start">
          <span className="material-symbols-outlined text-[#2E7D32] mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          <p className="text-sm font-medium text-[#2E7D32] leading-relaxed">
            AI confidence upgraded after your answers. These suggestions are strictly personalised against your custom input.
          </p>
        </section>

        {/* Profile Card */}
        <div className="bg-surface-container-lowest rounded-xl shadow-[0_8px_32px_rgba(172,53,9,0.04)] overflow-hidden border border-surface-container-high">
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h1 className="font-headline text-2xl font-extrabold tracking-tight text-on-surface">Updated Profile</h1>
                <div 
                  onClick={() => setModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#E8F5E9] text-[#2E7D32] rounded-full text-[10px] font-bold uppercase tracking-wide cursor-pointer hover:bg-[#C8E6C9] active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined text-[14px]">check</span>
                  Refined · Peak Confidence
                </div>
              </div>
            </div>
            
            <p className="text-on-surface-variant leading-relaxed text-[15px] font-medium font-body italic">
              &quot;{data.profileSummary}&quot;
            </p>
            
            <div className="flex flex-wrap gap-2 pt-2">
              {data.signals?.map((signal, idx) => (
                <span key={idx} className="px-3 py-1.5 bg-surface-container text-secondary text-xs font-semibold rounded-lg font-body">
                  {signal}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Gift Suggestions Array */}
        <div className="space-y-4 pt-4">
          <h2 className="font-headline text-lg font-bold px-2">Refined Recommendations</h2>

          {data.gifts?.map((gift, idx) => {
            const isExpanded = expandedIndex === idx;
            const isTopMatch = idx === 0;

            return (
              <div 
                key={idx} 
                onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                className={`bg-surface-container-lowest rounded-2xl shadow-[0_4px_24px_rgba(172,53,9,0.04)] relative overflow-hidden transition-all cursor-pointer ${isTopMatch ? "border-l-4 border-primary" : ""}`}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                      {!isTopMatch && (
                        <div className="w-12 h-12 rounded-xl bg-surface-container-high flex flex-shrink-0 items-center justify-center text-on-surface-variant font-headline font-bold text-lg">
                          {idx + 1}
                        </div>
                      )}
                      {isTopMatch && (
                        <div className="w-12 h-12 rounded-xl bg-primary-container/10 flex flex-shrink-0 items-center justify-center text-primary font-headline font-bold text-lg">
                          <span className="material-symbols-outlined">redeem</span>
                        </div>
                      )}
                      <div className="space-y-1">
                        {isTopMatch && (
                          <span className="text-primary text-[10px] font-extrabold uppercase tracking-widest font-headline block mb-1">Best match · Refined</span>
                        )}
                        <h3 className={`font-headline font-bold leading-tight ${isTopMatch ? "text-xl" : "text-base"} select-none`}>{gift.title}</h3>
                        {!isTopMatch && !isExpanded && (
                          <span className="text-xs text-on-surface-variant font-body block pt-1">{gift.priceEstimate}</span>
                        )}
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-stone-400 mt-2 shrink-0">
                      {isExpanded ? "expand_less" : "expand_more"}
                    </span>
                  </div>
                  
                  {isExpanded && (
                    <div className={`mt-5 pt-4 border-t border-surface-container space-y-4 animate-fade-in`}>
                      <p className="text-sm font-bold text-on-surface mb-2">Est. Cost: <span className="font-normal">{gift.priceEstimate || "Unknown"}</span></p>
                      <div className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-primary text-sm mt-1">info</span>
                        <p className="text-sm text-on-surface-variant italic font-body">
                          &quot;{gift.reasoning}&quot;
                        </p>
                      </div>
                      <div className="p-3 bg-primary-container/10 rounded-xl flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>redeem</span>
                        <span className="text-sm font-bold text-primary font-body">{gift.description}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col items-center gap-6 py-8">
          <button 
             onClick={() => setModalOpen(true)}
             className="w-full h-[52px] bg-gradient-to-br from-primary to-primary-container rounded-full text-white font-bold font-headline text-base flex items-center justify-center gap-2 shadow-[0_8px_32px_rgba(172,53,9,0.16)] active:scale-95 transition-transform"
          >
            Share these suggestions <span className="material-symbols-outlined text-lg">north_east</span>
          </button>
          
          <Link href="/onboarding" className="text-stone-500 font-semibold font-headline text-sm flex items-center gap-2 hover:text-primary transition-colors active:scale-95">
            <span className="material-symbols-outlined text-lg">refresh</span>
            Start a new gift profile
          </Link>
        </div>
      </main>

      <ConfidenceModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
