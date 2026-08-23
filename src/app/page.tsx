import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PhotoGallery from "@/components/PhotoGallery";
import CraftSection from "@/components/CraftSection";
import RecentWorks from "@/components/RecentWorks";
import Footer from "@/components/Footer";
import SerialSearch from "@/components/SerialSearch";
import { Sparkles, QrCode } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0d0c0a] text-[#f5f2eb]">
      <Navbar />

      {/* 1. Hero with background & primary search */}
      <Hero />

      {/* 2. Photo Gallery (Lots of photos, minimal text) */}
      <PhotoGallery />

      {/* 3. Artisan Craft & Philosophy */}
      <CraftSection />

      {/* 4. Dedicated Serial & QR Lookup Section */}
      <section id="dogrulama" className="py-24 bg-[#12100d] relative overflow-hidden border-y border-[#c9a45e]/15">
        <div className="absolute inset-0 bg-radial from-[#c9a45e]/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-[11px] uppercase tracking-[0.28em] text-[#c9a45e] font-semibold flex items-center justify-center gap-1.5">
              <QrCode className="w-3.5 h-3.5" />
              Dijital Kimlik Merkezi
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#f5f2eb]">
              Eserinizi Doğrulayın
            </h2>
            <p className="text-xs sm:text-sm text-[#a69e92] font-light leading-relaxed">
              Her Ali Sıralıoğlu tespihi tekildir. Eserinizin kutusundaki QR kodu kameranızla okutabilir veya seri numarasını aşağıdan arayarak tam sertifikasına erişebilirsiniz.
            </p>
          </div>

          <SerialSearch />
        </div>
      </section>

      {/* 5. Masterpieces Showcase */}
      <RecentWorks />

      {/* 6. Footer */}
      <Footer />
    </main>
  );
}
