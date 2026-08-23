import Link from "next/link";
import { Sparkles, ShieldCheck, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#070706] border-t border-[#c9a45e]/15 text-[#a69e92] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Col 1: Brand */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-serif text-3xl font-light text-[#f5f2eb]">
                Ali Sıralıoğlu<span className="text-[#c9a45e]">.</span>
              </span>
              <span className="block text-[10px] tracking-[0.3em] uppercase text-[#a69e92]">
                Butik Tespih Sanatı & Atölyesi
              </span>
            </Link>
            <p className="text-xs text-[#736c62] max-w-sm leading-relaxed font-light">
              Doğanın en asil malzemelerini geleneksel el tornasında sanat eserine dönüştüren usta işçilik. Her eser eşsizdir ve dijital sertifikası ile kayıt altındadır.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#c9a45e] font-semibold">
              Hızlı Erişim
            </h4>
            <ul className="space-y-2 text-xs font-light">
              <li>
                <Link href="/#galeri" className="hover:text-[#f5f2eb] transition-colors">
                  Koleksiyon Galerisi
                </Link>
              </li>
              <li>
                <Link href="/#zanaat" className="hover:text-[#f5f2eb] transition-colors">
                  Zanaat & Yapım Aşamaları
                </Link>
              </li>
              <li>
                <Link href="/#dogrulama" className="hover:text-[#f5f2eb] transition-colors">
                  Seri Numarası & QR Sorgulama
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Authenticity */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#c9a45e] font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#c9a45e]" />
              Orijinallik Garantisi
            </h4>
            <p className="text-xs text-[#736c62] leading-relaxed font-light">
              Satın aldığınız tespihin orijinallik kartındaki QR kodu telefonunuzun kamerasıyla okutarak doğrudan eser sayfasına ulaşabilirsiniz.
            </p>
            <div className="pt-2 text-xs text-[#d9bf87] flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#c9a45e]" />
              <span>İzmir, Türkiye</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#c9a45e]/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#736c62] space-y-4 sm:space-y-0">
          <p>© {new Date().getFullYear()} Ali Sıralıoğlu (alisiralioglu.com). Tüm hakları saklıdır.</p>
          <p className="flex items-center gap-1">
            <span>Usta İşi Butik Üretim</span>
            <span className="text-[#c9a45e]">✦</span>
            <span>Ömür Boyu İşçilik Garantisi</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
