import Image from "next/image";
import Link from "next/link";
import { getAllProducts } from "@/data/products";
import { QrCode, ShieldCheck, ArrowRight } from "lucide-react";

export default function RecentWorks() {
  const products = getAllProducts();

  return (
    <section className="py-24 bg-[#0d0c0a] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 pb-6 border-b border-[#c9a45e]/15">
          <div>
            <span className="text-[11px] uppercase tracking-[0.28em] text-[#c9a45e] font-semibold">
              Kayıtlı Eserler
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#f5f2eb] mt-2">
              Öne Çıkan Başyapıtlar
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#a69e92] font-light max-w-sm mt-4 sm:mt-0">
            Sertifikalandırılmış ve arşivlenmiş her eserin üretim kayıtlarına ulaşabilirsiniz.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((p) => (
            <div
              key={p.serial}
              className="group rounded-2xl bg-[#161411] border border-[#c9a45e]/20 overflow-hidden flex flex-col justify-between transition-all duration-500 hover:border-[#c9a45e]/60 hover:shadow-2xl hover:shadow-[#c9a45e]/10"
            >
              {/* Card Image */}
              <div className="relative aspect-square overflow-hidden bg-[#1c1915]">
                <Image
                  src={p.featuredImage}
                  alt={p.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-[#0d0c0a]/80 backdrop-blur-md border border-[#c9a45e]/30 text-[10px] uppercase font-mono tracking-widest text-[#d9bf87]">
                    {p.serial}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full bg-[#c9a45e]/90 text-[#0d0c0a] text-[10px] uppercase font-semibold tracking-wider">
                    {p.category}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-serif text-2xl text-[#f5f2eb] group-hover:text-[#c9a45e] transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-xs text-[#a69e92] font-light line-clamp-2 leading-relaxed">
                    {p.subtitle}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#c9a45e]/10 space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div>
                      <span className="text-[#736c62] block">Ölçü:</span>
                      <span className="text-[#f5f2eb] font-medium">{p.specs.beadSize}</span>
                    </div>
                    <div>
                      <span className="text-[#736c62] block">Tane:</span>
                      <span className="text-[#f5f2eb] font-medium">{p.specs.beadCount}</span>
                    </div>
                  </div>

                  <Link
                    href={`/urun/${p.serial}`}
                    className="w-full mt-2 py-2.5 px-4 rounded-xl bg-[#1c1915] group-hover:bg-[#c9a45e] text-[#d9bf87] group-hover:text-[#0d0c0a] border border-[#c9a45e]/30 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>Sertifikayı İncele</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
