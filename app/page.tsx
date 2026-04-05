import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Top Navigation Bar */}
      <header className="absolute top-0 left-0 right-0 z-50 bg-transparent flex justify-between items-center w-full px-6 py-4 max-w-[480px] mx-auto">
        <div className="text-lg font-bold text-[#FF7043]">GiftSense</div>
        <Link href="#how-it-works" className="font-headline text-sm font-medium tracking-tight text-stone-500 hover:text-primary transition-colors cursor-pointer">
          How it works
        </Link>
      </header>

      <div className="bg-[#FAF2EE] h-2 w-full max-w-[480px] mx-auto mt-[60px]"></div>

      <main className="max-w-[480px] mx-auto pb-32">
        {/* Hero Section */}
        <section className="px-6 pt-12 pb-12 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFAB91] bg-opacity-20 text-[#AC3509] font-bold text-[11px] uppercase tracking-widest mb-8">
            <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
            AI-powered gift thinking
          </div>
          <h1 className="text-4xl font-extrabold text-on-surface tracking-tight leading-[1.1] mb-6">
            Know exactly what to give.<br />Feel completely confident.
          </h1>
          <p className="text-stone-500 text-base leading-relaxed max-w-[320px] mb-10">
            Answer 6 quick questions about the person you are gifting. GiftSense builds their profile, understands their personality, and gives you the top 3 gifts that would truly resonate.
          </p>
          <Link href="/onboarding" className="group relative flex items-center justify-center gap-2 h-[56px] w-full max-w-[280px] rounded-full bg-gradient-to-br from-primary to-primary-container text-white font-bold text-lg shadow-[0_8px_32px_rgba(172,53,9,0.2)] active:scale-95 transition-all">
            Find the right gift
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
          <p className="mt-4 text-xs font-medium text-stone-400 tracking-wide">
            2 minutes · No sign-up needed
          </p>
        </section>

        {/* Visual Decorative Break */}
        <div className="px-6 py-4">
          <div className="h-64 w-full rounded-3xl overflow-hidden relative shadow-lg">
            <Image
              className="w-full h-full object-cover"
              alt="Modern minimalist aesthetic of aesthetic gift wrapping"
              src="/images/hero-gift.jpeg"
              fill
              sizes="(max-width: 480px) 100vw, 480px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </div>
        </div>

        {/* How It Works Section */}
        <section id="how-it-works" className="px-6 py-12 bg-surface-container-low rounded-t-[40px] mt-8">
          <h2 className="text-2xl font-bold text-on-surface mb-8 px-2">How it works</h2>
          <div className="space-y-4">
            {/* Card 1 */}
            <div className="bg-surface-container-lowest p-6 rounded-[24px] flex gap-5 items-start">
              <div className="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined">chat</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-on-surface mb-1">Tell us about them</h3>
                <p className="text-sm text-stone-500 leading-relaxed">Name, age, gender and 6 quick questions</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-surface-container-lowest p-6 rounded-[24px] flex gap-5 items-start border-l-4 border-primary">
              <div className="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined">auto_awesome</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-on-surface mb-1">AI builds their profile</h3>
                <p className="text-sm text-stone-500 leading-relaxed">We understand their personality even from partial answers</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-surface-container-lowest p-6 rounded-[24px] flex gap-5 items-start">
              <div className="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined">redeem</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-on-surface mb-1">Get your top 3 gifts</h3>
                <p className="text-sm text-stone-500 leading-relaxed">Real suggestions with reasoning, not generic lists</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 py-12 text-center border-t border-stone-100 mt-8">
          <p className="text-stone-400 font-medium text-sm tracking-tight">
            GiftSense · Built for thoughtful givers
          </p>
        </footer>
      </main>


    </>
  );
}
