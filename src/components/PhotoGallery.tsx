"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Maximize2, X, ArrowUpRight, Sparkles } from "lucide-react";

interface GalleryPhoto {
  id?: string;
  src: string;
  title: string;
  category: string;
  serial: string;
  aspect: "tall" | "wide" | "square";
}

const GALLERY_ITEMS: GalleryPhoto[] = [
  {
    src: "/images/product1.jpg",
    title: "Baltık Damla Kehribar",
    category: "33 Habbe · 925 Ayar Kazaz Püskül",
    serial: "AS-2024-001",
    aspect: "square",
  },
  {
    src: "/images/imame_detail.jpg",
    title: "El İşi Gümüş İmame & Hitame",
    category: "Geleneksel Telkâri & Gravür İşçiliği",
    serial: "AS-2024-001",
    aspect: "wide",
  },
  {
    src: "/images/gallery1.jpg",
    title: "Asırlık Kök Ceviz Ağacı",
    category: "Küre Kesim · Balmumu Cilalı",
    serial: "AS-2024-002",
    aspect: "tall",
  },
  {
    src: "/images/gallery2.jpg",
    title: "Doğal Nişabur Turkuazı",
    category: "24K Varaklı Kuka İmame",
    serial: "AS-2024-003",
    aspect: "tall",
  },

  {
    src: "/images/hero.jpg",
    title: "Sıkma Kehribar · Nar Taneleri",
    category: "Arpa Kesim · Özel Döküm",
    serial: "AS-2024-004",
    aspect: "wide",
  },
];

export default function PhotoGallery() {
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);

  return (
    <section id="galeri" className="py-24 bg-[#0d0c0a] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#c9a45e]/15">
          <div className="space-y-3">
            <span className="text-[11px] uppercase tracking-[0.28em] text-[#c9a45e] font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" />
              Koleksiyon Galerisi
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#f5f2eb]">
              Ustanın Bazı Çalışmaları
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#a69e92] font-light max-w-md mt-4 md:mt-0 leading-relaxed">
            Kelimelerin ötesinde, her malzemenin kendine has dokusu, rengi ve ışığı. Görsellere tıklayarak detaylı inceleyebilirsiniz.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
          {GALLERY_ITEMS.map((item, idx) => {
            // 5 görsel için dengeli grid yerleşimi:
            // 1. satır: 3 + 3 (veya ilk 2 item geniş/dengeli)
            // 2. satır: 2 + 2 + 2 (3 item)
            const spanClass =
              idx === 0
                ? "lg:col-span-3 sm:col-span-1 aspect-[4/3] sm:aspect-[4/3] lg:aspect-[16/11]"
                : idx === 1
                  ? "lg:col-span-3 sm:col-span-1 aspect-[4/3] sm:aspect-[4/3] lg:aspect-[16/11]"
                  : "lg:col-span-2 sm:col-span-1 aspect-[4/5]";

            return (
              <div
                key={item.src + idx}
                className={`group relative overflow-hidden rounded-2xl bg-[#161411] border border-[#c9a45e]/20 transition-all duration-500 hover:border-[#c9a45e]/60 hover:shadow-2xl hover:shadow-[#c9a45e]/10 ${spanClass}`}
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />

                {/* Gradient Shade on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0c0a] via-[#0d0c0a]/30 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

                {/* Photo Meta & Actions Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300">
                  <div className="flex justify-between items-start">
                    <span className="px-2.5 py-1 rounded-full bg-[#0d0c0a]/80 backdrop-blur-md border border-[#c9a45e]/30 text-[10px] uppercase font-mono tracking-widest text-[#d9bf87]">
                      {item.serial}
                    </span>
                    <button
                      onClick={() => setActivePhoto(item)}
                      aria-label="Tam ekran görüntüle"
                      className="p-2 rounded-full bg-[#0d0c0a]/80 hover:bg-[#c9a45e] text-[#f5f2eb] hover:text-[#0d0c0a] transition-colors border border-[#c9a45e]/30 backdrop-blur-md"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[11px] text-[#c9a45e] uppercase tracking-widest font-medium">
                      {item.category}
                    </p>
                    <h3 className="font-serif text-xl sm:text-2xl text-[#f5f2eb] font-normal">
                      {item.title}
                    </h3>
                    <Link
                      href={`/urun/${item.serial}`}
                      className="inline-flex items-center gap-1 text-xs text-[#d9bf87] hover:text-white uppercase tracking-wider font-semibold pt-1 transition-colors"
                    >
                      <span>Sertifika & İşçilik Detayı</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.title}
          className="fixed inset-0 z-50 bg-[#0d0c0a]/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-300"
          onClick={() => setActivePhoto(null)}
        >
          <button
            onClick={() => setActivePhoto(null)}
            aria-label="Kapat"
            className="absolute top-6 right-6 p-3 rounded-full bg-[#161411] text-[#f5f2eb] hover:text-[#c9a45e] border border-[#c9a45e]/30 transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            className="relative max-w-5xl w-full max-h-[85vh] h-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[60vh] sm:h-[70vh] rounded-xl overflow-hidden border border-[#c9a45e]/30 bg-[#0d0c0a]">
              <Image
                src={activePhoto.src}
                alt={activePhoto.title}
                fill
                sizes="(max-width: 1280px) 90vw, 1200px"
                className="object-contain"
              />
            </div>
            <div className="w-full mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div>
                <h3 className="font-serif text-2xl text-[#f5f2eb]">
                  {activePhoto.title}
                </h3>
                <p className="text-xs text-[#a69e92]">
                  {activePhoto.category} · Seri No:{" "}
                  <span className="font-mono text-[#c9a45e]">
                    {activePhoto.serial}
                  </span>
                </p>
              </div>
              <Link
                href={`/urun/${activePhoto.serial}`}
                className="px-5 py-2.5 rounded-lg bg-[#c9a45e] hover:bg-[#d9bf87] text-[#0d0c0a] text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-2"
              >
                <span>Detaylı Sayfaya Git</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
