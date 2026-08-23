import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://alisiralioglu.com"),
  title: "Ali Sıralıoğlu — El Yapımı Butik Tespih Sanatı",
  description:
    "Gelenekten geleceğe, usta ellerde şekillenen eşsiz kehribar, doğal ağaç ve değerli taş tespihler. QR Kod ve Seri Numaralı Orijinallik Doğrulama Sistemi.",
  keywords: [
    "Ali Sıralıoğlu",
    "Ali Sıralıoğlu Tespih",
    "El Yapımı Tespih",
    "Baltık Kehribar Tespih",
    "Özel Üretim Tespih",
    "Tespih Seri No Doğrulama",
    "Trabzon Kazaziye Püskül",
    "Osmanlı Cevizi Tespih",
    "alisiralioglu.com",
  ],
  authors: [{ name: "Ali Sıralıoğlu" }],
  creator: "Ali Sıralıoğlu",
  openGraph: {
    title: "Ali Sıralıoğlu — El Yapımı Butik Tespih Sanatı",
    description:
      "Minimalist zarafet, usta işçilik ve her esere özel seri no doğrulama sertifikası.",
    url: "https://alisiralioglu.com",
    siteName: "Ali Sıralıoğlu Tespih",
    images: [
      {
        url: "/images/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Ali Sıralıoğlu El Yapımı Tespih",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="tr"
      className={`${cormorant.variable} ${jakarta.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#0d0c0a] text-[#f5f2eb] font-sans antialiased selection:bg-[#c9a45e] selection:text-[#0d0c0a] flex flex-col">
        {children}
      </body>
    </html>
  );
}
