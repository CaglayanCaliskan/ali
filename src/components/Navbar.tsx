"use client";

import { useState, useEffect } from "react";
import Image from "next/image";


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
          ? "bg-[#0a0908]/90 backdrop-blur-md border-b border-[#c9a45e]/15 py-3.5 shadow-2xl"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group flex items-center gap-3 focus:outline-none cursor-pointer"
          aria-label="Sayfanın en üstüne git"
        >
          <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#c9a45e]/40 shrink-0 group-hover:border-[#c9a45e] transition-all duration-300 bg-[#0d0c0a]">
            <Image
              src="/images/main_logo.jpg"
              alt="Ali Sıralıoğlu Mühür Logo"
              fill
              sizes="36px"
              className="object-cover"
            />
          </div>
          <span className="font-serif text-base sm:text-lg font-light tracking-wider text-[#f5f2eb] group-hover:text-[#c9a45e] transition-colors leading-tight">
            Ali Sıralıoğlu<span className="text-[#c9a45e]">.</span>
          </span>
        </button>

        {/* Nav Links */}
        <nav className="flex items-center gap-6">
          <a
            href="#dogrulama"
            className="text-[11px] uppercase tracking-[0.2em] text-[#a69e92] hover:text-[#c9a45e] transition-colors duration-200"
          >
            Doğrulama
          </a>
        </nav>
      </div>
    </header>
  );
}
