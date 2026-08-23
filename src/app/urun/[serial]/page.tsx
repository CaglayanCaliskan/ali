"use client";

import { use, useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import confetti from "canvas-confetti";
import {
  ShieldCheck,
  CheckCircle2,
  Share2,
  Printer,
  Sparkles,
  ArrowLeft,
  Calendar,
  Gem,
  Hammer,
  Layers,
  Award,
  ExternalLink,
  Search,
  Copy,
  Check,
} from "lucide-react";
import { getProductBySerial, getAllProducts } from "@/data/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ serial: string }>;
}) {
  const resolvedParams = use(params);
  const serial = decodeURIComponent(resolvedParams.serial || "").toUpperCase();
  const product = getProductBySerial(serial);

  const [selectedImage, setSelectedImage] = useState<string>(
    product?.featuredImage || "/images/product1.jpg"
  );
  const [copied, setCopied] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const certRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (product) {
      // Fire subtle gold/amber celebratory confetti
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ["#c9a45e", "#d9bf87", "#e8d7b3", "#ffffff"],
        });
      } catch {
        // Safe fallback
      }
    }
  }, [product]);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  // ----------------------------------------------------
  // NOT FOUND STATE
  // ----------------------------------------------------
  if (!product) {
    const all = getAllProducts();
    return (
      <main className="min-h-screen bg-[#0d0c0a] text-[#f5f2eb]">
        <Navbar />
        <div className="max-w-3xl mx-auto px-6 pt-36 pb-24 text-center space-y-8">
          <div className="w-16 h-16 rounded-full bg-[#1c1915] border border-[#c9a45e]/30 flex items-center justify-center mx-auto text-[#c9a45e]">
            <Search className="w-7 h-7" />
          </div>

          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#a69e92]">
              Kayıt Bulunamadı
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#f5f2eb]">
              &ldquo;{serial}&rdquo; Numaralı Eser Sistemde Bulunamadı
            </h1>
            <p className="text-sm text-[#736c62] max-w-md mx-auto leading-relaxed">
              Lütfen kutunuzdaki sertifika kartında yer alan seri numarasını kontrol edip tekrar deneyiniz veya aşağıdaki kayıtlı eserleri inceleyiniz.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#161411] border border-[#c9a45e]/20 max-w-md mx-auto space-y-4">
            <p className="text-xs uppercase tracking-wider text-[#d9bf87]">
              Örnek Kayıtlı Seri Numaraları:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {all.map((p) => (
                <Link
                  key={p.serial}
                  href={`/urun/${p.serial}`}
                  className="px-3 py-1.5 rounded-lg bg-[#1c1915] hover:bg-[#c9a45e] hover:text-[#0d0c0a] border border-[#c9a45e]/30 text-xs font-mono text-[#d9bf87] transition-all"
                >
                  {p.serial}
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#a69e92] hover:text-[#c9a45e] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Ana Sayfaya Dön</span>
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  // ----------------------------------------------------
  // VERIFIED PRODUCT VIEW
  // ----------------------------------------------------
  const shareUrl = typeof window !== "undefined" ? window.location.href : `https://alisiralioglu.com/urun/${product.serial}`;

  return (
    <main className="min-h-screen bg-[#0d0c0a] text-[#f5f2eb]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-32 pb-24 space-y-12">
        {/* Breadcrumb & Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#c9a45e]/15">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#a69e92] hover:text-[#c9a45e] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Koleksiyona Dön</span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyLink}
              className="px-3 py-1.5 rounded-lg bg-[#161411] hover:bg-[#1c1915] border border-[#c9a45e]/25 text-xs text-[#d9bf87] hover:text-white transition-colors flex items-center gap-1.5"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Kopyalandı</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Bağlantıyı Kopyala</span>
                </>
              )}
            </button>

            <button
              onClick={() => setShowQRModal(true)}
              className="px-3 py-1.5 rounded-lg bg-[#161411] hover:bg-[#1c1915] border border-[#c9a45e]/25 text-xs text-[#d9bf87] hover:text-white transition-colors flex items-center gap-1.5"
            >
              <QRCodeSVG value={shareUrl} size={14} />
              <span>QR Göster</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-[#c9a45e] hover:bg-[#d9bf87] text-[#0d0c0a] text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5 print:hidden"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Sertifikayı Yazdır</span>
            </button>
          </div>
        </div>

        {/* Verification Certificate Banner */}
        <div
          ref={certRef}
          className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#1c1915] via-[#161411] to-[#1c1915] border border-[#c9a45e]/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#c9a45e]/15 border border-[#c9a45e]/50 flex items-center justify-center shrink-0 text-[#c9a45e]">
              <ShieldCheck className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#c9a45e]">
                  Resmi Orijinallik Kaydı Doğrulandı
                </span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <h2 className="font-serif text-xl sm:text-2xl text-[#f5f2eb]">
                Ali Sıralıoğlu Usta İmzalı Özgün Eser
              </h2>
              <p className="text-xs text-[#a69e92] font-light">
                Sertifika No: <span className="font-mono text-[#d9bf87]">{product.certificateNo}</span> · Düzenleme Tarihi: {product.certificateDate}
              </p>
            </div>
          </div>

          {/* Quick QR Card */}
          <div className="flex items-center gap-4 bg-[#0d0c0a]/80 p-3.5 rounded-xl border border-[#c9a45e]/25">
            <div className="bg-white p-1.5 rounded-md">
              <QRCodeSVG
                value={shareUrl}
                size={64}
                level="M"
                includeMargin={false}
              />
            </div>
            <div className="text-left space-y-0.5">
              <span className="text-[10px] uppercase font-mono text-[#736c62] block">
                Seri No:
              </span>
              <span className="text-xs font-mono font-bold text-[#c9a45e] block">
                {product.serial}
              </span>
              <span className="text-[9px] uppercase tracking-widest text-[#a69e92] block">
                {product.edition}
              </span>
            </div>
          </div>
        </div>

        {/* Main Product Layout: Gallery & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT: Photography Showcase */}
          <div className="lg:col-span-6 space-y-4">
            {/* Main Stage Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#161411] border border-[#c9a45e]/25 shadow-2xl">
              <Image
                src={selectedImage}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-all duration-500 hover:scale-105"
              />
              <div className="absolute bottom-4 left-4">
                <span className="px-3 py-1 rounded-full bg-[#0d0c0a]/85 backdrop-blur-md border border-[#c9a45e]/30 text-xs text-[#d9bf87] font-mono">
                  {product.serial}
                </span>
              </div>
            </div>

            {/* Thumbnail Navigation */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`relative aspect-square rounded-xl overflow-hidden bg-[#161411] border transition-all duration-300 ${
                    selectedImage === img
                      ? "border-[#c9a45e] ring-2 ring-[#c9a45e]/40 shadow-lg scale-102"
                      : "border-[#c9a45e]/20 opacity-70 hover:opacity-100 hover:border-[#c9a45e]/50"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} fotoğraf ${idx + 1}`}
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Highlights List */}
            <div className="p-6 rounded-2xl bg-[#161411]/60 border border-[#c9a45e]/15 space-y-3 mt-6">
              <h4 className="text-xs uppercase tracking-[0.2em] text-[#c9a45e] font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Öne Çıkan Özellikler
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#a69e92]">
                {product.highlights.map((h, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c9a45e]" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT: Detailed Specifications & Craftsmanship */}
          <div className="lg:col-span-6 space-y-8">
            {/* Title & Subtitle */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#c9a45e]/15 border border-[#c9a45e]/30 text-[#c9a45e] text-xs font-semibold uppercase tracking-wider">
                  {product.category}
                </span>
                <span className="text-xs text-[#736c62] font-mono">
                  {product.edition}
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#f5f2eb] leading-tight">
                {product.name}
              </h1>

              <p className="text-sm sm:text-base text-[#d9bf87] font-serif italic">
                {product.subtitle}
              </p>
            </div>

            {/* Narrative Description */}
            <p className="text-sm text-[#a69e92] font-light leading-relaxed">
              {product.description}
            </p>

            {/* Technical Specifications Matrix */}
            <div className="space-y-4 pt-4 border-t border-[#c9a45e]/15">
              <h3 className="text-xs uppercase tracking-[0.2em] text-[#c9a45e] font-semibold flex items-center gap-1.5">
                <Layers className="w-4 h-4" />
                Teknik ve Malzeme Özellikleri
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-[#161411] border border-[#c9a45e]/15">
                  <span className="text-[11px] uppercase tracking-wider text-[#736c62] block">
                    Ana Malzeme
                  </span>
                  <span className="text-sm text-[#f5f2eb] font-medium block mt-0.5">
                    {product.specs.material}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#161411] border border-[#c9a45e]/15">
                  <span className="text-[11px] uppercase tracking-wider text-[#736c62] block">
                    Habbe Sayısı & Kesim
                  </span>
                  <span className="text-sm text-[#f5f2eb] font-medium block mt-0.5">
                    {product.specs.beadCount} · {product.specs.beadCut}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#161411] border border-[#c9a45e]/15">
                  <span className="text-[11px] uppercase tracking-wider text-[#736c62] block">
                    Habbe Ölçüsü
                  </span>
                  <span className="text-sm text-[#f5f2eb] font-medium block mt-0.5">
                    {product.specs.beadSize}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#161411] border border-[#c9a45e]/15">
                  <span className="text-[11px] uppercase tracking-wider text-[#736c62] block">
                    Net Ağırlık
                  </span>
                  <span className="text-sm text-[#f5f2eb] font-medium block mt-0.5">
                    {product.specs.weight}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#161411] border border-[#c9a45e]/15 col-span-2">
                  <span className="text-[11px] uppercase tracking-wider text-[#736c62] block">
                    İmame & Hitame İşçiliği
                  </span>
                  <span className="text-sm text-[#f5f2eb] font-medium block mt-0.5">
                    {product.specs.imame}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#161411] border border-[#c9a45e]/15 col-span-2">
                  <span className="text-[11px] uppercase tracking-wider text-[#736c62] block">
                    Püskül & Donanım
                  </span>
                  <span className="text-sm text-[#f5f2eb] font-medium block mt-0.5">
                    {product.specs.tassel}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#161411] border border-[#c9a45e]/15">
                  <span className="text-[11px] uppercase tracking-wider text-[#736c62] block">
                    Dizim İpliği
                  </span>
                  <span className="text-xs text-[#f5f2eb] font-medium block mt-0.5">
                    {product.specs.thread}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#161411] border border-[#c9a45e]/15">
                  <span className="text-[11px] uppercase tracking-wider text-[#736c62] block">
                    Menşe & Üretim Yılı
                  </span>
                  <span className="text-xs text-[#f5f2eb] font-medium block mt-0.5">
                    {product.specs.productionYear} · {product.specs.origin}
                  </span>
                </div>
              </div>
            </div>

            {/* Step-by-Step Craftsmanship Breakdown */}
            <div className="space-y-4 pt-4 border-t border-[#c9a45e]/15">
              <h3 className="text-xs uppercase tracking-[0.2em] text-[#c9a45e] font-semibold flex items-center gap-1.5">
                <Hammer className="w-4 h-4" />
                Usta İşçilik Süreci
              </h3>

              <div className="space-y-3">
                {product.craftSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#161411]/70 border border-[#c9a45e]/15 flex items-start gap-3.5"
                  >
                    <span className="w-6 h-6 rounded-full bg-[#c9a45e]/20 border border-[#c9a45e]/40 text-[#c9a45e] text-xs font-mono font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <div className="space-y-1">
                      <h4 className="text-xs uppercase tracking-wider text-[#f5f2eb] font-semibold">
                        {step.title}
                      </h4>
                      <p className="text-xs text-[#a69e92] font-light leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Artisan Note */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1c1915] to-[#12100d] border border-[#c9a45e]/30 relative overflow-hidden space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.2em] text-[#c9a45e] font-medium">
                  Ustanın Notu
                </span>
                <span className="font-serif italic text-lg text-[#d9bf87]">
                  Ali Sıralıoğlu
                </span>
              </div>
              <p className="font-serif italic text-sm text-[#e8d7b3] leading-relaxed">
                &ldquo;{product.artisanNote}&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Presentation Modal */}
      {showQRModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="QR Kod Doğrulama Kartı"
          className="fixed inset-0 z-50 bg-[#0d0c0a]/95 backdrop-blur-xl flex items-center justify-center p-6 animate-in fade-in duration-300"
          onClick={() => setShowQRModal(false)}
        >
          <div
            className="bg-[#161411] border border-[#c9a45e]/40 p-8 rounded-3xl max-w-sm w-full text-center space-y-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#c9a45e] font-semibold">
                Orijinallik QR Kodu
              </span>
              <h3 className="font-serif text-2xl text-[#f5f2eb]">
                {product.name}
              </h3>
              <p className="text-xs font-mono text-[#d9bf87]">
                Seri No: {product.serial}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl inline-block shadow-inner">
              <QRCodeSVG value={shareUrl} size={200} level="H" />
            </div>

            <p className="text-xs text-[#a69e92] font-light leading-relaxed">
              Bu QR kod doğrudan <strong>alisiralioglu.com</strong> üzerindeki bu eserin resmi sertifika ve detay sayfasına yönlendirir.
            </p>

            <button
              onClick={() => setShowQRModal(false)}
              className="w-full py-3 bg-[#c9a45e] hover:bg-[#d9bf87] text-[#0d0c0a] font-semibold text-xs uppercase tracking-widest rounded-xl transition-colors"
            >
              Kapat
            </button>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
