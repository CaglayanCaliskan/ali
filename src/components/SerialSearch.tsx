"use client";

import { useState, useRef, FormEvent, KeyboardEvent, ClipboardEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

interface SerialSearchProps {
  compact?: boolean;
}

export default function SerialSearch({ compact = false }: SerialSearchProps) {
  const router = useRouter();
  const [part1, setPart1] = useState("");
  const [part2, setPart2] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const part1Ref = useRef<HTMLInputElement>(null);
  const part2Ref = useRef<HTMLInputElement>(null);

  const cleanVal = (val: string) => {
    return val.toUpperCase().replace(/[^A-Z0-9]/g, "");
  };

  const handlePart1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clean = cleanVal(e.target.value).slice(0, 4);
    if (error) setError(null);
    setPart1(clean);

    // İlk 4 hane dolunca doğrudan 2. kutuya geç
    if (clean.length === 4) {
      part2Ref.current?.focus();
    }
  };

  const handlePart2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clean = cleanVal(e.target.value).slice(0, 4);
    if (error) setError(null);
    setPart2(clean);
  };

  const handlePart1KeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "-" || e.key === "/" || e.key === " " || e.key === "ArrowRight") {
      if (part1.length > 0) {
        e.preventDefault();
        part2Ref.current?.focus();
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handlePart2KeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && part2.length === 0) {
      e.preventDefault();
      part1Ref.current?.focus();
    } else if (e.key === "ArrowLeft") {
      const target = e.target as HTMLInputElement;
      if (target.selectionStart === 0 && target.selectionEnd === 0) {
        e.preventDefault();
        part1Ref.current?.focus();
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const clean = cleanVal(e.clipboardData.getData("text"));
    if (!clean) return;

    if (error) setError(null);
    const p1 = clean.slice(0, 4);
    const p2 = clean.slice(4, 8);

    setPart1(p1);
    setPart2(p2);

    if (p1.length === 4) {
      part2Ref.current?.focus();
    } else {
      part1Ref.current?.focus();
    }
  };

  const handleSubmit = (e?: FormEvent) => {
    if (e) e.preventDefault();

    const p1 = part1.trim().toUpperCase();
    const p2 = part2.trim().toUpperCase();

    if (!p1 && !p2) {
      setError("Lütfen seri numarasını giriniz.");
      part1Ref.current?.focus();
      return;
    }

    if (p1.length < 4 || p2.length < 4) {
      setError("Lütfen 8 haneli seri numarasını eksiksiz giriniz.");
      if (p1.length < 4) part1Ref.current?.focus();
      else part2Ref.current?.focus();
      return;
    }

    const fullSerial = `${p1}-${p2}`;
    setIsLoading(true);
    setError(null);
    router.push(`/urun/${encodeURIComponent(fullSerial)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="flex items-center justify-center gap-2 sm:gap-3">
        {/* İki input ve otomatik slash */}
        <div className="flex items-center bg-[#0a0908] border border-[#c9a45e]/35 focus-within:border-[#c9a45e] focus-within:ring-1 focus-within:ring-[#c9a45e]/40 rounded-xl px-3 py-1.5 transition-all">
          <input
            ref={part1Ref}
            type="text"
            inputMode="text"
            autoCapitalize="characters"
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            maxLength={4}
            value={part1}
            onChange={handlePart1Change}
            onKeyDown={handlePart1KeyDown}
            onPaste={handlePaste}
            placeholder="AS26"
            className="w-16 sm:w-20 text-center bg-transparent text-[#f5f2eb] placeholder-[#736c62] text-base sm:text-lg font-mono font-bold uppercase tracking-wider outline-none py-1.5"
          />

          <span className="text-[#c9a45e] font-mono text-lg font-bold px-1 select-none opacity-80">
            -
          </span>

          <input
            ref={part2Ref}
            type="text"
            inputMode="text"
            autoCapitalize="characters"
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            maxLength={4}
            value={part2}
            onChange={handlePart2Change}
            onKeyDown={handlePart2KeyDown}
            onPaste={handlePaste}
            placeholder="1234"
            className="w-16 sm:w-20 text-center bg-transparent text-[#f5f2eb] placeholder-[#736c62] text-base sm:text-lg font-mono font-bold uppercase tracking-wider outline-none py-1.5"
          />
        </div>

        {/* Doğrula butonu */}
        <button
          type="submit"
          disabled={isLoading}
          className="px-5 py-3 bg-[#c9a45e] hover:bg-[#d9bf87] text-[#0d0c0a] font-semibold text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 shrink-0"
        >
          <span>{isLoading ? "..." : "Doğrula"}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {error && (
        <p className="text-xs text-rose-400 mt-2 text-center animate-in fade-in duration-150">
          {error}
        </p>
      )}
    </form>
  );
}
