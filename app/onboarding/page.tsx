"use client";

import Link from "next/link";
import { useState } from "react";
// Uncomment to use the local DB when submitting the form to an action
// import { db } from "@/lib/db";

export default function Onboarding() {
  const [name, setName] = useState("Priya");
  const [gender, setGender] = useState("She / Her");
  const [age, setAge] = useState("26 – 35");

  return (
    <div className="max-w-[480px] mx-auto min-h-screen bg-surface flex flex-col relative overflow-hidden">
      {/* TopNavBar */}
      <nav className="flex justify-between items-center w-full px-6 py-4 max-w-[480px] mx-auto bg-transparent font-headline text-sm font-medium tracking-tight relative z-10">
        <div className="text-lg font-bold text-primary">GiftSense</div>
        <Link href="/" className="text-stone-500 hover:text-primary transition-colors active:scale-95 duration-150">
          Exit
        </Link>
      </nav>

      <div className="bg-[#FAF2EE] h-2 w-full relative z-10"></div>

      <main className="flex-1 flex flex-col relative z-10">
        {/* Header Section */}
        <header className="px-6 pt-8">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-surface-container-high text-on-surface-variant font-label text-xs font-semibold tracking-wide mb-6">
            Step 1 of 7 · About them
          </div>
          <h1 className="font-headline text-3xl font-extrabold text-on-surface tracking-tight leading-tight mb-2">
            Who are you gifting?
          </h1>
          <p className="font-body text-on-surface-variant text-base">
            This personalises everything that follows.
          </p>
        </header>

        <section className="flex-1">
          {/* FIELD 1 - Name */}
          <div className="px-6 pt-8 space-y-2">
            <label className="block font-label text-sm font-semibold text-on-surface">Their first name</label>
            <p className="text-xs text-stone-500 font-body">Just a first name is fine</p>
            <div className="relative">
              <input
                className="w-full h-14 bg-surface-container-lowest border-[#F5E6E0] border-[1.5px] rounded-xl px-4 font-body text-on-surface focus:outline-none focus:border-primary-container focus:ring-0 coral-glow placeholder:italic placeholder:text-stone-400 transition-all shadow-[0_0_0_4px_rgba(255,112,67,0.15)_opacity-[0]] focus:shadow-[0_0_0_4px_rgba(255,112,67,0.15)]"
                placeholder="e.g. Priya, Arjun, Mom, Rahul..."
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          {/* FIELD 2 - Gender */}
          <div className="px-6 mt-7 space-y-2">
            <label className="block font-label text-sm font-semibold text-on-surface">Their gender</label>
            <p className="text-xs text-stone-500 font-body">Helps us use the right words in their profile</p>
            <div className="flex gap-2.5 pt-1">
              {["She / Her", "He / Him", "They / Them"].map((g) => (
                <button
                  key={g}
                  onClick={() => setGender(g)}
                  className={`flex-1 h-12 rounded-full font-semibold text-[15px] active:scale-95 transition-all ${
                    gender === g
                      ? "bg-primary-container text-white font-bold"
                      : "bg-surface-container-lowest border-[#F5E6E0] border-[1.5px] text-stone-500 hover:bg-surface-container"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* FIELD 3 - Age */}
          <div className="px-6 mt-7 space-y-2 pb-12">
            <label className="block font-label text-sm font-semibold text-on-surface">Their approximate age</label>
            <p className="text-xs text-stone-500 font-body">A rough range is fine</p>
            {/* Row 1 */}
            <div className="flex gap-2 pt-1">
              {["Under 18", "18 – 25", "26 – 35"].map((a) => (
                <button
                  key={a}
                  onClick={() => setAge(a)}
                  className={`flex-1 h-12 rounded-full font-semibold text-[15px] active:scale-95 transition-all ${
                    age === a
                      ? "bg-primary-container text-white font-bold"
                      : "bg-surface-container-lowest border-[#F5E6E0] border-[1.5px] text-stone-500 hover:bg-surface-container"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
            {/* Row 2 */}
            <div className="flex justify-center gap-2 pt-1 px-8">
              {["36 – 50", "50+"].map((a) => (
                <button
                  key={a}
                  onClick={() => setAge(a)}
                  className={`flex-1 h-12 rounded-full font-semibold text-[15px] active:scale-95 transition-all ${
                    age === a
                      ? "bg-primary-container text-white font-bold"
                      : "bg-surface-container-lowest border-[#F5E6E0] border-[1.5px] text-stone-500 hover:bg-surface-container"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom Action Area */}
        <footer className="px-6 pb-12 mt-auto">
          {/* Typically forms submit to update db, here we just link to a next step page */}
          <Link
            href="/onboarding/step2"
            className="w-full h-[52px] bg-primary-container text-white font-bold rounded-full shadow-[0_8px_32px_rgba(172,53,9,0.15)] hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            Continue
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </Link>
          <div className="mt-6 flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-stone-400">lock</span>
            <p className="text-xs text-stone-400 font-body text-center">
              We don&apos;t save any personal information.
            </p>
          </div>
        </footer>
      </main>

      {/* Dynamic Decorative Elements */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary-container/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 -left-20 w-48 h-48 bg-secondary-container/10 rounded-full blur-3xl pointer-events-none"></div>
    </div>
  );
}
