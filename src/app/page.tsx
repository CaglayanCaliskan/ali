import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SerialSearch from "@/components/SerialSearch";
import CraftSection from "@/components/CraftSection";
import { ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0908] text-[#f5f2eb] flex flex-col justify-between relative">
      <Navbar />

      {/* Zanaat & Felsefe — üst bölüm */}
      <div className="pt-24">
        <CraftSection />
      </div>

      {/* Hero & Centered Serial Verification */}
      <section id="dogrulama" className="relative py-20 px-6 sm:px-8 flex-1 flex items-center justify-center">
        {/* Subtle background grid & vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(#c9a45e_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.035] pointer-events-none" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#0a0908]/80 to-[#0a0908] pointer-events-none" />

        <div className="max-w-3xl mx-auto w-full relative z-10 space-y-8 text-center">
          {/* Logo Mührü */}
          <div className="mx-auto relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border border-[#c9a45e]/40 shadow-2xl bg-[#12100d] p-1">
            <div className="relative w-full h-full rounded-full overflow-hidden">
              <Image
                src="/images/main_logo.jpg"
                alt="Ali Sıralıoğlu Mühür"
                fill
                priority
                sizes="96px"
                className="object-cover"
              />
            </div>
          </div>

          <div className="space-y-3 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161411] border border-[#c9a45e]/30 text-[#d9bf87] text-[11px] uppercase tracking-[0.25em] font-medium shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-[#c9a45e]" />
              <span>Orijinallik &amp; Eser Doğrulama</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#f5f2eb] tracking-wide leading-tight">
              Ali Sıralıoğlu
            </h1>

            <p className="text-sm sm:text-base text-[#c9a45e] font-serif italic">
              Kişiye ve Koleksiyona Özel Zanaat Eserleri
            </p>

            <p className="text-xs sm:text-sm text-[#a69e92] font-normal leading-relaxed pt-1">
              Eserinizin sertifika kartındaki veya kutusundaki seri numarasını girerek esere ait orijinallik kaydına ve usta detaylarına ulaşabilirsiniz.
            </p>
          </div>

          {/* Dedicated Serial Search Box */}
          <div className="pt-2">
            <SerialSearch />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
