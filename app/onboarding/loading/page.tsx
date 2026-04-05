"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { performGiftGeneration } from "@/app/actions";
import { useGiftStore } from "@/store/useGiftStore";

export default function AILoadingStep() {
  const router = useRouter();
  const giftStore = useGiftStore();

  useEffect(() => {
    // Fire the REAL generation request to the Mistral backend Server Action immediately when the page loads
    async function triggerAI() {
      try {
        console.log("Sending prompt to Mistral Model...");
        
        const payloadObject = {
          giftingFor: `${giftStore.recipientName} · ${giftStore.recipientGender} · ${giftStore.recipientAge}`,
          occasion: giftStore.occasion,
          closeness: giftStore.closeness,
          lifeRightNow: giftStore.lifeRightNow,
          personality: giftStore.personality,
          giftIntent: giftStore.giftIntent,
          budget: giftStore.budget,
          refinementContext: giftStore.refinementContext
        };
        
        const result = await performGiftGeneration(payloadObject);
        
        console.log("SUCCESS! Here is what Mistral calculated for us:", result);
        
        // Push payload into session storage since Next state is unmounted across hard nav
        sessionStorage.setItem("ai_gift_payload", JSON.stringify(result));
        
        const isRefined = sessionStorage.getItem("is_refined") === "true";
        router.push(isRefined ? "/refined-results" : "/results"); 

      } catch (error) {
        console.error("Failed to generate with Mistral:", error);
      }
    }

    triggerAI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <div className="w-full max-w-[480px] min-h-screen flex flex-col relative overflow-hidden mx-auto bg-surface text-on-surface">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse-dot {
            0%, 100% { opacity: 0.3; transform: scale(0.8); }
            50% { opacity: 1; transform: scale(1.1); }
        }
        .dot-pulse { animation: pulse-dot 1.4s infinite ease-in-out; }
        .dot-delay-1 { animation-delay: 0.2s; }
        .dot-delay-2 { animation-delay: 0.4s; }

        @keyframes progress-loading {
            0% { width: 0%; }
            50% { width: 65%; }
            100% { width: 100%; }
        }
        .progress-bar-fill { animation: progress-loading 3.5s ease-in-out forwards; }
      `}} />

      {/* Top Nav (Logo focused) */}
      <header className="flex justify-center items-center w-full px-6 py-8 relative z-10">
        <span className="text-lg font-bold text-primary-container font-headline tracking-tight">GiftSense</span>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center px-4 relative z-10">
        
        {/* ANSWER SUMMARY CARD */}
        <section className="w-full bg-surface-container-lowest rounded-xl shadow-[0_8px_32px_rgba(172,53,9,0.04)] border border-[#F5E6E0] p-4 mb-6">
          <div className="flex justify-between items-center mb-5">
            <span className="bg-surface-container-high text-on-surface-variant px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider">Your answers</span>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-stone-500 text-[13px]">Gifting for:</span>
              <span className="text-on-surface font-bold text-[13px] text-right truncate max-w-[200px]">{giftStore.recipientName} · {giftStore.recipientGender}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-stone-500 text-[13px]">Occasion:</span>
              <span className="text-on-surface font-bold text-[13px] text-right truncate max-w-[200px]">{giftStore.occasion}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-stone-500 text-[13px]">Closeness:</span>
              <span className="text-on-surface font-bold text-[13px] text-right">{giftStore.closeness}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-stone-500 text-[13px]">Life right now:</span>
              <span className="text-on-surface font-bold text-[13px] text-right truncate max-w-[200px]">{giftStore.lifeRightNow}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-stone-500 text-[13px]">Personality:</span>
              <span className="text-on-surface font-bold text-[13px] text-right truncate max-w-[200px]">{giftStore.personality}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-stone-500 text-[13px]">Budget:</span>
              <span className="text-on-surface font-bold text-[13px] text-right">{giftStore.budget}</span>
            </div>
          </div>
        </section>

        {/* AI BADGE */}
        <div className="inline-flex items-center gap-2 bg-[#FFF3EE] px-4 py-2 rounded-full mb-8">
          <span className="material-symbols-outlined text-primary-container text-base leading-none">auto_awesome</span>
          <span className="text-primary font-semibold text-[13px]">AI is analysing the profile</span>
        </div>

        {/* LOADING ANIMATION SECTION */}
        <div className="flex flex-col items-center text-center mt-2">
          {/* Large soft circle */}
          <div className="relative w-[110px] h-[110px] bg-[#FFF3EE] rounded-full flex items-center justify-center mb-6 shadow-inner">
            <span className="material-symbols-outlined text-primary-container text-[44px]" style={{ fontVariationSettings: "'FILL' 1" }}>redeem</span>
          </div>

          {/* Pulsing Dots */}
          <div className="flex gap-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-primary-container dot-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-primary-container dot-pulse dot-delay-1"></div>
            <div className="w-2 h-2 rounded-full bg-primary-container dot-pulse dot-delay-2"></div>
          </div>

          <h2 className="text-xl font-extrabold text-on-surface font-headline leading-tight mb-3">Building the Gift Profile…</h2>
          <p className="text-stone-500 text-sm max-w-[260px] leading-relaxed mb-6">
            Our AI is mapping the personality type, understanding the context, and finding the top 3 gifts that would truly resonate right now.
          </p>
        </div>
      </main>

      {/* Progress Bar at bottom */}
      <footer className="mt-auto pb-0 relative z-20">
        <div className="w-full h-1.5 bg-surface-container overflow-hidden">
          <div className="progress-bar-fill h-full bg-gradient-to-r from-primary to-primary-container rounded-r-full"></div>
        </div>
      </footer>

      {/* Decorative Background */}
      <div className="absolute -top-10 -right-20 w-64 h-64 bg-primary-fixed-dim/10 blur-[100px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute bottom-20 -left-20 w-80 h-80 bg-secondary-container/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>
    </div>
  );
}
