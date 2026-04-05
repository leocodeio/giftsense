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

export default function RefinedResultsScreen() {
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
      router.push("/onboarding");
    }
  }, [router]);

  if (!data) {
    return <div className="min-h-screen bg-surface flex items-center justify-center text-primary font-headline font-bold">Painting refined details...</div>;
  }

  // Handle fallback rendering safely for array map ops
  const bestMatch = data.gifts && data.gifts.length > 0 ? data.gifts[0] : null;
  const runnerUps = data.gifts && data.gifts.length > 1 ? data.gifts.slice(1) : [];

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
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#E8F5E9] text-[#2E7D32] rounded-full text-[10px] font-bold uppercase tracking-wide">
                  <span className="material-symbols-outlined text-[14px]">check</span>
                  Refined · Peak Confidence
                </div>
              </div>
            </div>
            
            <p className="text-on-surface-variant leading-relaxed text-[15px] font-medium font-body italic">
              "{data.profileSummary}"
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
          
          {/* Top Gift */}
          {bestMatch && (
            <div className="bg-surface-container-lowest rounded-2xl shadow-[0_4px_24px_rgba(172,53,9,0.04)] relative overflow-hidden border-l-4 border-primary">
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <span className="text-primary text-[10px] font-extrabold uppercase tracking-widest font-headline">Best match · Refined</span>
                    <h3 className="font-headline text-xl font-bold leading-tight mt-1">{bestMatch.title}</h3>
                  </div>
                  <button className="text-stone-300 hover:text-primary transition-colors material-symbols-outlined">favorite</button>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary text-sm mt-1">info</span>
                    <p className="text-sm text-on-surface-variant italic font-body">
                      {bestMatch.reasoning}
                    </p>
                  </div>
                  <div className="p-3 bg-primary-container/10 rounded-xl flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>redeem</span>
                    <span className="text-sm font-bold text-primary font-body">{bestMatch.description}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sibling Gifts List View */}
          {runnerUps.map((gift, idx) => (
            <div key={idx} className="bg-surface-container-lowest rounded-2xl shadow-[0_4px_24px_rgba(172,53,9,0.04)] p-6 flex items-center justify-between group hover:bg-surface-container-low transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-surface-container-high flex flex-shrink-0 items-center justify-center text-on-surface-variant font-headline font-bold text-lg">
                  {idx + 2}
                </div>
                <div className="flex flex-col">
                  <h3 className="font-headline font-bold text-on-surface group-hover:text-primary transition-colors">{gift.title}</h3>
                  <span className="text-xs text-on-surface-variant font-body">{gift.priceEstimate}</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-stone-300">chevron_right</span>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col items-center gap-6 py-8">
          <button className="w-full h-[52px] bg-gradient-to-br from-primary to-primary-container rounded-full text-white font-bold font-headline text-base flex items-center justify-center gap-2 shadow-[0_8px_32px_rgba(172,53,9,0.16)] active:scale-95 transition-transform">
            Share these suggestions <span className="material-symbols-outlined text-lg">north_east</span>
          </button>
          
          <Link href="/onboarding" className="text-stone-500 font-semibold font-headline text-sm flex items-center gap-2 hover:text-primary transition-colors active:scale-95">
            <span className="material-symbols-outlined text-lg">refresh</span>
            Start a new gift profile
          </Link>
        </div>
      </main>
    </div>
  );
}
