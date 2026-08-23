import Image from "next/image";
import { Sparkles, Hammer, ShieldCheck, Gem } from "lucide-react";

export default function CraftSection() {
  return (
    <section id="zanaat" className="py-24 bg-[#161411]/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Collage */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-[#c9a45e]/25 shadow-2xl">
              <Image
                src="/images/gallery3.jpg"
                alt="Ali Sıralıoğlu Tespih Yapım Süreci"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0c0a] via-transparent to-transparent opacity-60" />
            </div>

            {/* Overlapping Detail Card */}
            <div className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:-right-8 p-4 sm:p-6 rounded-xl bg-[#0d0c0a]/95 border border-[#c9a45e]/30 backdrop-blur-xl shadow-2xl max-w-xs space-y-2">
              <div className="flex items-center gap-2 text-[#c9a45e]">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-xs uppercase tracking-widest font-semibold">
                  Kişiye Özel Kimlik
                </span>
              </div>
              <p className="text-xs text-[#a69e92] font-light leading-relaxed">
                Her tespih kendine ait benzersiz seri numarası ve QR kodlu dijital orijinallik sertifikası ile teslim edilir.
              </p>
            </div>
          </div>

          {/* Right Column: Artisan Manifesto */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <span className="text-[11px] uppercase tracking-[0.28em] text-[#c9a45e] font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" />
                Felsefe & Zanaat
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#f5f2eb] leading-tight">
                Sabrın ve Ustalığın <br />
                <span className="italic gold-gradient-text">Habbelere Yansıması</span>
              </h2>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-[#a69e92] font-light leading-relaxed">
              <p>
                Ali Sıralıoğlu atölyesinde tespih bir seri üretim objesi değil; asırlık ağaçların, fosil kehribarların ve kıymetli taşların sabırla dinlenip el tornasında hayat bulduğu bir sanat disiplinidir.
              </p>
              <p>
                Her habbe, usta tarafından mikron hassasiyetinde el keskileriyle tek tek biçimlendirilir. Denge, ağırlık merkezi ve ipeğin habbe içindeki akışı en yüksek çekim hazzı için milimetrik hesaplanır.
              </p>
            </div>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-[#1c1915]/60 border border-[#c9a45e]/15 space-y-1">
                <div className="flex items-center gap-2 text-[#d9bf87]">
                  <Hammer className="w-4 h-4 text-[#c9a45e]" />
                  <h4 className="text-xs uppercase tracking-wider font-semibold">
                    Geleneksel El Tornası
                  </h4>
                </div>
                <p className="text-xs text-[#736c62] font-light">
                  Otomasyondan uzak, her tanede ustanın birebir el izi ve simetrisi.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#1c1915]/60 border border-[#c9a45e]/15 space-y-1">
                <div className="flex items-center gap-2 text-[#d9bf87]">
                  <Gem className="w-4 h-4 text-[#c9a45e]" />
                  <h4 className="text-xs uppercase tracking-wider font-semibold">
                    Saf ve Doğal Malzeme
                  </h4>
                </div>
                <p className="text-xs text-[#736c62] font-light">
                  Baltık kehribarı, kök ceviz, kuka ve 925 ayar el örmesi gümüş püskül.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
