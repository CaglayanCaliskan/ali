"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { QrCode, ArrowRight } from "lucide-react";

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
            placeholder="Seri No girin (Örn: AS26-1234)"
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
      <div className="relative p-6 sm:p-9 rounded-2xl bg-[#14120f] border border-[#c9a45e]/30 shadow-2xl overflow-hidden">
        <div className="text-center mb-6 relative z-10">
          <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#f5f2eb] tracking-wide">
            Eser Seri Numarası
          </h3>
          <p className="text-xs sm:text-sm text-[#b5ada0] mt-1.5 font-normal max-w-lg mx-auto leading-relaxed">
            Sertifika kartınızda veya kutunun üzerindeki seri kodunu giriniz.
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
                placeholder="Örn: AS26-1234"
                className="w-full bg-[#0a0908] border border-[#c9a45e]/35 focus:border-[#c9a45e] focus:ring-1 focus:ring-[#c9a45e]/50 text-[#f5f2eb] placeholder-[#8c8273] text-sm sm:text-base tracking-widest uppercase pl-12 pr-4 py-3.5 rounded-xl outline-none transition-all font-mono"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3.5 bg-[#c9a45e] hover:bg-[#d9bf87] text-[#0d0c0a] font-bold text-xs sm:text-sm tracking-wider uppercase rounded-xl transition-all shadow-md flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>{isLoading ? "Sorgulanıyor..." : "Doğrula"}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {error && (
            <p className="text-xs text-rose-300 bg-rose-950/60 border border-rose-800/60 px-4 py-2.5 rounded-lg text-center font-medium animate-in fade-in duration-200">
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
