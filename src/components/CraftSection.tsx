import { Sparkles, Hammer, Gem } from "lucide-react";

export default function CraftSection() {
  return (
    <section id="zanaat" className=" md:py-20 border-b border-[#c9a45e]/10 relative">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 text-center space-y-10">

        {/* Label */}
        <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.28em] text-[#c9a45e] font-semibold">
          <Sparkles className="w-3 h-3" />
          Zanaat&amp; Felsefe
        </span>
        <div className="space-y-3">
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#f5f2eb] leading-snug">
            <span className="italic text-[#c9a45e]">Zanaatin</span> sessiz Asaleti

          </h2>
        </div>
        {/* Pull Quote */}
        <div className="relative mx-auto max-w-2xl px-6 py-8">
          {/* Decorative opening quote */}
          <span
            aria-hidden="true"
            className="absolute -top-4 left-2 font-serif text-8xl leading-none text-[#c9a45e]/20 select-none pointer-events-none"
          >
            &ldquo;
          </span>

          <blockquote className="relative z-10 space-y-3 text-center">
            <p className="font-serif italic text-base sm:text-lg text-[#d9bf87] leading-relaxed">
              Her habbe; neşe, hüzün, heyecan, huzur, gurur, acı, mutluluk
              gibi duygulara şahit olup,{" "}
              <span className="text-[#f5f2eb] not-italic">sessiz kalmayı seçer.</span>
            </p>
            <p className="font-serif italic text-sm sm:text-base text-[#a69e92] leading-relaxed">
              Kimi zaman bir tesbihten çok, belki de{" "}
              <span className="text-[#c9a45e] not-italic font-normal">
                babadan, dededen kalma bir mirastır.
              </span>{" "}
              Değeri para ile ölçülmez.
            </p>
          </blockquote>

          {/* Decorative closing ornament */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#c9a45e]/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#c9a45e]/60" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#c9a45e]/50" />
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-3">
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#f5f2eb] leading-snug">
            Sabrın ve Ustalığın{" "}
            <span className="italic text-[#c9a45e]">Habbelere Yansıması</span>
          </h2>
        </div>



        {/* Body */}
        <div className="space-y-4 text-sm text-[#a69e92] font-light leading-relaxed text-left">
          <p>
            Ali Sıralıoğlu atölyesinde tespih bir seri üretim objesi değil; asırlık ağaçların, kehribarların ve kıymetli özel dökümlerin özenle seçilerek el tornasında hayat bulduğu bir disiplin ürünüdür.
          </p>
          <p>
            Her bir habbe, usta tarafından hassasiyet ve keyif ile tek tek biçimlendirilir. Çekim hazzı en iyi olacak şekilde şekillendirilir. Usta eserin, hammadde kesim aşamasından ipe dizim aşamasına kadar tüm süreç ustanın elinden çıkmaktadır.
          </p>
          <p>
            İdealist yaklaşımla doğru döküm, doğal ürün ya da her tür hammadde ustanın süzgecinden geçerek koleksiyonere ulaştırmayı hedefler.
          </p>
        </div>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1c1915]/60 border border-[#c9a45e]/15 text-[#d9bf87]">
            <Hammer className="w-3.5 h-3.5 text-[#c9a45e]" />
            <span className="text-xs tracking-wide">Geleneksel El Tornası</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1c1915]/60 border border-[#c9a45e]/15 text-[#d9bf87]">
            <Gem className="w-3.5 h-3.5 text-[#c9a45e]" />
            <span className="text-xs tracking-wide">Saf &amp; Doğal Malzeme</span>
          </div>
        </div>

      </div>
    </section>
  );
}
