"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, Sparkles, QrCode } from "lucide-react";
import SerialSearch from "./SerialSearch";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Image with Cinematic Overlay */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Image
          src="/images/hero.jpg"
          alt="Ali Sıralıoğlu El Yapımı Kehribar Tespih"
          fill
          priority
          className="object-cover object-center scale-105 animate-pulse duration-[10000ms]"
        />
        {/* Multilayered Luxury Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0c0a] via-[#0d0c0a]/60 to-[#0d0c0a]/80" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#0d0c0a]/50 to-[#0d0c0a]/90" />
      </div>

      <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center relative z-10 space-y-8 mt-12">
        {/* Minimal Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c9a45e]/30 bg-[#161411]/80 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c9a45e] animate-ping" />
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#d9bf87] font-medium">
            Özel Üretim · Koleksiyonluk Eserler
          </span>
        </div>

        {/* Hero Title */}
        <div className="space-y-4">
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-[#f5f2eb] leading-[1.08]">
            Zanaatin Sessiz{" "}
            <span className="italic font-normal gold-gradient-text block sm:inline">
              Asaleti.
            </span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-[#a69e92] font-light max-w-xl mx-auto tracking-wide leading-relaxed">
            Her habbe <span className="italic font-normal text-[#c9a45e] block sm:inline">neşe</span>, <span className="italic font-normal text-[#c9a45e] block sm:inline">hüzün</span>, <span className="italic font-normal text-[#c9a45e] block sm:inline">heyecan</span>, <span className="italic font-normal text-[#c9a45e] block sm:inline">huzur</span>, <span className="italic font-normal text-[#c9a45e] block sm:inline">gurur</span>, <span className="italic font-normal text-[#c9a45e] block sm:inline">acı</span>, <span className="italic font-normal text-[#c9a45e] block sm:inline">mutluluk</span> gibi
            duygulara şahit olup, sessiz kalmayı seçer. Kimi zaman bir tespihten
            çok belki de babadan dededen kalma bir mirastır.
            <br />
            <span className="italic font-normal gold-gradient-text block sm:inline">Değeri para ile
              ölçülemez.</span>
          </p>
        </div>



        {/* Bottom CTA / Scroll cue */}
        <div className="pt-10 flex flex-col items-center justify-center space-y-3">
          <Link
            href="#galeri"
            className="text-xs uppercase tracking-[0.24em] text-[#a69e92] hover:text-[#c9a45e] transition-colors flex items-center gap-2"
          >
            <span>Koleksiyonu İncele</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </Link>
        </div>
      </div>
    </section>
  );
}
