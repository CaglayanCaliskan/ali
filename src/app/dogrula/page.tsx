import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SerialSearch from "@/components/SerialSearch";
import { ShieldCheck, QrCode, Sparkles } from "lucide-react";
import Link from "next/link";
import { getAllProducts } from "@/data/products";

export default function DogrulaPage() {
  const products = getAllProducts();

  return (
    <main className="min-h-screen bg-[#0d0c0a] text-[#f5f2eb]">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 pt-36 pb-24 space-y-16">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c9a45e]/10 border border-[#c9a45e]/25 text-[#c9a45e] text-xs uppercase tracking-[0.2em] font-medium">
            <ShieldCheck className="w-4 h-4" />
            <span>Orijinallik Doğrulama Sistemi</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#f5f2eb]">
            Ali Sıralıoğlu Eser Doğrulama
          </h1>
          <p className="text-sm text-[#a69e92] font-light max-w-lg mx-auto leading-relaxed">
            Satın aldığınız tespihin orijinallik sertifikasında yer alan seri numarasını aşağıya giriniz.
          </p>
        </div>

        <SerialSearch />

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-[#161411] border border-[#c9a45e]/20 space-y-3">
            <div className="flex items-center gap-2 text-[#c9a45e]">
              <QrCode className="w-5 h-5" />
              <h3 className="font-serif text-lg text-[#f5f2eb]">
                Kutudaki QR Kodu Okutun
              </h3>
            </div>
            <p className="text-xs text-[#a69e92] font-light leading-relaxed">
              Her tespih kutusunda bulunan pirinç/ahşap sertifika kartındaki QR kodu akıllı telefonunuzun kamerası ile doğrudan taratarak bu sayfayı otomatik açabilirsiniz.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#161411] border border-[#c9a45e]/20 space-y-3">
            <div className="flex items-center gap-2 text-[#c9a45e]">
              <Sparkles className="w-5 h-5" />
              <h3 className="font-serif text-lg text-[#f5f2eb]">
                Eşsizlik ve Garanti
              </h3>
            </div>
            <p className="text-xs text-[#a69e92] font-light leading-relaxed">
              Kayıtlı her seri numarası, malzemenin menşei, ustanın işçilik notları ve üretim yılı gibi doğrulanmış verileri içerir.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
