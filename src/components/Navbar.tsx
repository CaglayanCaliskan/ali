"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, QrCode, Sparkles, Menu, X } from "lucide-react";

interface NavbarProps {
  onOpenSearch?: () => void;
}

export default function Navbar({ onOpenSearch }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0d0c0a]/90 backdrop-blur-md border-b border-[#c9a45e]/15 py-3.5 shadow-2xl"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="group flex flex-col items-start focus:outline-none"
        >
          <span className="font-serif text-2xl sm:text-3xl font-light tracking-wider text-[#f5f2eb] group-hover:text-[#c9a45e] transition-colors">
            Ali Sıralıoğlu<span className="text-[#c9a45e]">.</span>
          </span>
          <span className="text-[10px] tracking-[0.28em] uppercase text-[#a69e92] font-sans -mt-1 group-hover:text-[#f5f2eb] transition-colors">
            El Yapımı Tespih Sanatı
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/#galeri"
            className="text-xs uppercase tracking-[0.2em] text-[#a69e92] hover:text-[#c9a45e] transition-colors font-medium"
          >
            Koleksiyon
          </Link>
          <Link
            href="/#zanaat"
            className="text-xs uppercase tracking-[0.2em] text-[#a69e92] hover:text-[#c9a45e] transition-colors font-medium"
          >
            Zanaat & Felsefe
          </Link>
          <Link
            href="/#dogrulama"
            className="text-xs uppercase tracking-[0.2em] text-[#a69e92] hover:text-[#c9a45e] transition-colors font-medium flex items-center gap-1.5"
          >
            <Sparkles className="w-3 h-3 text-[#c9a45e]" />
            Seri No Sorgula
          </Link>
        </nav>

        {/* Quick Action Button / Search Trigger */}
        <div className="flex items-center space-x-3">
          <Link
            href="/#dogrulama"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#c9a45e]/30 bg-[#161411]/80 hover:bg-[#c9a45e] text-[#f5f2eb] hover:text-[#0d0c0a] transition-all text-xs tracking-wider uppercase font-medium backdrop-blur-sm group"
          >
            <QrCode className="w-3.5 h-3.5 text-[#c9a45e] group-hover:text-[#0d0c0a] transition-colors" />
            <span>Sertifika / QR Doğrula</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menü"
            className="md:hidden p-2 text-[#a69e92] hover:text-[#f5f2eb] focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#161411]/95 backdrop-blur-xl border-b border-[#c9a45e]/20 px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <Link
            href="/#galeri"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm uppercase tracking-[0.18em] text-[#a69e92] hover:text-[#c9a45e]"
          >
            Koleksiyon
          </Link>
          <Link
            href="/#zanaat"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm uppercase tracking-[0.18em] text-[#a69e92] hover:text-[#c9a45e]"
          >
            Zanaat & Felsefe
          </Link>
          <Link
            href="/#dogrulama"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm uppercase tracking-[0.18em] text-[#c9a45e]"
          >
            Seri No Doğrula / QR
          </Link>
        </div>
      )}
    </header>
  );
}
