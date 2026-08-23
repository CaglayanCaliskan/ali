"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Search, QrCode, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";
import { PRODUCTS } from "@/data/products";

interface SerialSearchProps {
  compact?: boolean;
}

export default function SerialSearch({ compact = false }: SerialSearchProps) {
  const router = useRouter();
  const [serial, setSerial] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (e?: FormEvent) => {
    if (e) e.preventDefault();
    const cleanSerial = serial.trim().toUpperCase();

    if (!cleanSerial) {
      setError("Lütfen ürün sertifikanızda yer alan seri numarasını giriniz.");
      return;
    }

    setIsLoading(true);
    setError(null);

    // Direct routing to the product verification page
    router.push(`/urun/${encodeURIComponent(cleanSerial)}`);
  };

  const handleQuickSelect = (sn: string) => {
    setSerial(sn);
    setError(null);
    setIsLoading(true);
    router.push(`/urun/${encodeURIComponent(sn)}`);
  };

  if (compact) {
    return (
      <form onSubmit={handleSearch} className="relative w-full max-w-md">
        <div className="relative flex items-center">
          <input
            type="text"
            value={serial}
            onChange={(e) => {
              setSerial(e.target.value);
              if (error) setError(null);
            }}
            placeholder="Seri No girin (Örn: AS-2024-001)"
            className="w-full bg-[#161411]/90 border border-[#c9a45e]/30 focus:border-[#c9a45e] text-[#f5f2eb] placeholder-[#736c62] text-sm tracking-wider uppercase px-4 py-3 pr-24 rounded-lg outline-none transition-all"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="absolute right-1.5 px-4 py-2 bg-[#c9a45e] hover:bg-[#d9bf87] text-[#0d0c0a] text-xs font-semibold uppercase tracking-wider rounded-md transition-colors flex items-center gap-1"
          >
            {isLoading ? "Aranıyor..." : "Sorgula"}
          </button>
        </div>
        {error && <p className="text-xs text-rose-400 mt-1.5">{error}</p>}
      </form>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative p-6 sm:p-10 rounded-2xl bg-gradient-to-b from-[#1c1915]/90 to-[#12100d]/90 border border-[#c9a45e]/25 backdrop-blur-xl shadow-2xl overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#c9a45e]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#c9a45e]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center mb-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c9a45e]/10 border border-[#c9a45e]/20 text-[#c9a45e] text-[11px] uppercase tracking-[0.2em] font-medium mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Orijinallik ve Sertifika Doğrulama</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#f5f2eb] tracking-wide">
            Eserinize Ait Seri Numarasını Giriniz
          </h3>
          <p className="text-xs sm:text-sm text-[#a69e92] mt-2 font-light max-w-lg mx-auto">
            Satın aldığınız tespihin özel kutusundaki kartta veya QR kodun altında yer alan seri kodunu yazarak malzemenin menşeini ve usta işçilik detaylarını görüntüleyebilirsiniz.
          </p>
        </div>

        {/* Search Input Box */}
        <form onSubmit={handleSearch} className="relative z-10 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#c9a45e]">
                <QrCode className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={serial}
                onChange={(e) => {
                  setSerial(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="Örn: AS-2024-001"
                className="w-full bg-[#0d0c0a]/80 border border-[#c9a45e]/30 focus:border-[#c9a45e] focus:ring-1 focus:ring-[#c9a45e]/50 text-[#f5f2eb] placeholder-[#736c62] text-sm sm:text-base tracking-widest uppercase pl-12 pr-4 py-3.5 rounded-xl outline-none transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3.5 bg-gradient-to-r from-[#c9a45e] to-[#b89047] hover:from-[#d9bf87] hover:to-[#c9a45e] text-[#0d0c0a] font-semibold text-xs sm:text-sm tracking-[0.16em] uppercase rounded-xl transition-all shadow-lg hover:shadow-[#c9a45e]/20 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>{isLoading ? "Sorgulanıyor..." : "Detayları Gör"}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {error && (
            <p className="text-xs text-rose-400 bg-rose-950/40 border border-rose-800/40 px-4 py-2 rounded-lg text-center animate-in fade-in duration-200">
              {error}
            </p>
          )}

          {/* Quick Demo Chips */}
          <div className="pt-3 border-t border-[#c9a45e]/10 flex flex-wrap items-center justify-center gap-2 text-xs text-[#a69e92]">
            <span className="text-[#736c62] text-[11px] uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#c9a45e]" />
              Örnek Eserler:
            </span>
            {Object.keys(PRODUCTS).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => handleQuickSelect(key)}
                className="px-2.5 py-1 bg-[#161411] hover:bg-[#c9a45e]/20 border border-[#c9a45e]/20 hover:border-[#c9a45e]/50 text-[#d9bf87] text-[11px] rounded-md transition-all font-mono"
              >
                {key}
              </button>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
}
