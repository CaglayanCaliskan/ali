"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0d0c0a]/90 backdrop-blur-md border-b border-[#c9a45e]/15 py-3.5 shadow-2xl"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3 focus:outline-none"
        >
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#c9a45e]/40 shadow-lg shrink-0 group-hover:border-[#c9a45e] transition-all duration-300 bg-[#0d0c0a]">
            <Image
              src="/images/main_logo.jpg"
              alt="Ali Sıralıoğlu Mühür Logo"
              fill
              sizes="40px"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col items-start">
            <span className="font-serif text-lg sm:text-xl font-light tracking-wider text-[#f5f2eb] group-hover:text-[#c9a45e] transition-colors leading-tight">
              Ali Sıralıoğlu<span className="text-[#c9a45e]">.</span>
            </span>
            <span className="text-[9px] tracking-[0.25em] uppercase text-[#a69e92] font-sans -mt-0.5">
              Özel Eser Sertifikasyon
            </span>
          </div>
        </Link>

        {/* Subtle Authenticity Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#161411]/60 border border-[#c9a45e]/20 text-[#c9a45e] text-[11px] tracking-wider uppercase">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Resmi Doğrulama Portalı</span>
        </div>
      </div>
    </header>
  );
}
