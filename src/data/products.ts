export interface CraftStep {
  title: string;
  description: string;
}

export interface ProductSpecification {
  material: string;
  beadCount: string;
  beadCut: string;
  beadSize: string;
  imame: string;
  tassel: string;
  thread: string;
  weight: string;
  productionYear: string;
  origin: string;
}

export interface TesbihProduct {
  serial: string;
  certificateNo: string;
  name: string;
  subtitle: string;
  category: "Kehribar" | "Doğal Ağaç" | "Değerli Taş" | "Özel Koleksiyon";
  craftsman: string;
  edition: string;
  description: string;
  artisanNote: string;
  specs: ProductSpecification;
  craftSteps: CraftStep[];
  highlights: string[];
  images: string[];
  featuredImage: string;
  certificateDate: string;
}

export const PRODUCTS: Record<string, TesbihProduct> = {
  "AS-2024-001": {
    serial: "AS-2024-001",
    certificateNo: "AS-CERT-9401",
    name: "Baltık Güneşi · Damla Kehribar",
    subtitle: "Milyon Yıllık Fosilleşmiş Çam Reçinesi & 925 Ayar Kazaziye",
    category: "Kehribar",
    craftsman: "Ali Sıralıoğlu",
    edition: "Tek ve Eşsiz Parça (1/1)",
    description:
      "Baltık Denizi'nin derinliklerinden çıkarılan milyon yıllık saf fosil kehribar kütlesinden elde oyularak üretilmiştir. Işığa tutulduğunda bal ve konyak tonlarındaki eşsiz iç yansımaları belirginleşir. Elde çekildikçe ısınarak ortama hafif çam kokusu yayar.",
    artisanNote:
      "Bu eserde amacım, doğanın milyonlarca yılda oluşturduğu sıcaklığı, geleneksel Türk tespih sanatının en asil formuyla birleştirmekti. Her habbe elde saatlerce zımparalanıp ipek keçeyle parlatıldı.",
    specs: {
      material: "Doğal Baltık Damla Kehribar",
      beadCount: "33 Habbe",
      beadCut: "Beyzi (Yumurta) Kesim",
      beadSize: "11.5 x 8.5 mm",
      imame: "Yekpare Kehribar & İnce Gümüş Kakma",
      tassel: "925 Ayar Trabzon Kazaziye El Örmesi Gümüş Püskül",
      thread: "Özel Dokuma Japon İpek İpliği (Düğümsüz Gizli Bağlama)",
      weight: "42.8 Gram",
      productionYear: "2024",
      origin: "Baltık Kıyıları / İstanbul Atölyesi",
    },
    craftSteps: [
      {
        title: "Kütle Seçimi ve Dilimleme",
        description:
          "İçinde çatlak ve kusur barındırmayan en berrak ve zengin damarlı kaya kehribar blokları özenle ayrıldı.",
      },
      {
        title: "El Tornasında Şekillendirme",
        description:
          "Klasik torna tezgâhında el keskileri kullanılarak 33 habbenin her biri 0.1 mm toleransla birebir eşit kesildi.",
      },
      {
        title: "İmame ve Hitameler",
        description:
          "Gövdeyle aynı bloktan çıkarılan imame, zarif gümüş kakma motiflerle bezenerek tek parça işlendi.",
      },
      {
        title: "Trabzon Kazaziye Püskül",
        description:
          "0.08 mikron inceliğindeki saf gümüş teller usta ellerde düğüm düğüm örülerek püskül haline getirildi.",
      },
    ],
    highlights: [
      "100% Doğal Baltık Kehribarı",
      "925 Ayar Saf El Örmesi Kazaz Püskül",
      "Kişiye Özel Seri Numaralı ve Sertifikalı",
      "Sürtünmeyle Doğal Çam Kokusu",
    ],
    images: [
      "/images/product1.jpg",
      "/images/hero.jpg",
      "/images/imame_detail.jpg",
      "/images/gallery3.jpg",
    ],
    featuredImage: "/images/product1.jpg",
    certificateDate: "14 Ekim 2024",
  },
  "AS-2024-002": {
    serial: "AS-2024-002",
    certificateNo: "AS-CERT-9402",
    name: "Kudret · Asırlık Osmanlı Cevizi",
    subtitle: "Kök Ceviz Ağacı & El Kakması Telkâri Gümüş Aksesuar",
    category: "Doğal Ağaç",
    craftsman: "Ali Sıralıoğlu",
    edition: "Özel Üretim Koleksiyon Parçası",
    description:
      "Asırlık kuru kök ceviz kütüğünden işlenen bu tespih, ahşabın derin damar dokusunu ve yoğunluğunu hissettirir. Zamanla ve kullanıldıkça elin teriyle birleşerek koyulaşır ve kadifemsi, parlak bir patina kazanır.",
    artisanNote:
      "Ağacın canlı bir nefesi vardır. Bu tespihte ceviz ağacının doğal dalgalarını bozmadan her taneye aynı simetriyi kazandırmak en zorlu ve keyifli aşamaydı.",
    specs: {
      material: "Asırlık Kök Ceviz Ağacı",
      beadCount: "33 Habbe",
      beadCut: "Küre (Yuvarlak) Kesim",
      beadSize: "10.0 x 10.0 mm",
      imame: "Kök Ceviz & Telkâri Gümüş Giydirme",
      tassel: "925 Ayar Oksitli Gümüş Zincir & Çift Habbe Hitame",
      thread: "Mumlanmış Mukavemetli İpek İplik",
      weight: "36.2 Gram",
      productionYear: "2024",
      origin: "Doğu Anadolu Kök Cevizi / İstanbul",
    },
    craftSteps: [
      {
        title: "Kurutulmuş Kök Seçimi",
        description:
          "En az 40 yıl dinlendirilmiş fırınlanmamış doğal kök ceviz parçaları seçildi.",
      },
      {
        title: "Hassas Delik & Eksenleme",
        description:
          "Habbelerin iç delikleri 0.7 mm ipek kılavuzla delinerek kusursuz bir akış sağlandı.",
      },
      {
        title: "Balmumu Cilalama",
        description:
          "Kimyasal vernik yerine saf doğal balmumu ve ceviz yağı ile haftalarca sürtme cila yapıldı.",
      },
    ],
    highlights: [
      "40 Yıllık Doğal Kurutulmuş Kök Ceviz",
      "Kimyasalsız Doğal Balmumu Cilası",
      "925 Ayar Oksitli Gümüş Donanım",
      "Zamanla Kararan ve Parlayan Yaşayan Doku",
    ],
    images: [
      "/images/gallery1.jpg",
      "/images/imame_detail.jpg",
      "/images/gallery3.jpg",
    ],
    featuredImage: "/images/gallery1.jpg",
    certificateDate: "28 Ekim 2024",
  },
  "AS-2024-003": {
    serial: "AS-2024-003",
    certificateNo: "AS-CERT-9403",
    name: "Firuze-i Şahane · Doğal Nişabur Turkuazı",
    subtitle: "Ham Turkuaz Taşları & 24 Ayar Altın Varak İşlemeli Kuka İmame",
    category: "Değerli Taş",
    craftsman: "Ali Sıralıoğlu",
    edition: "Nadir Koleksiyon Eseri (1/1)",
    description:
      "Tarihi Nişabur madenlerinden çıkarılan doğal gök mavisi ve örümcek ağı damarlı turkuaz taşları, kuka ve altın varak işçiliğiyle taçlandırıldı. Ağır, asil ve göz alıcı bir başyapıt.",
    artisanNote:
      "Turkuazın doğadaki serin rengi ile altının asil ışıltısı yan yana geldiğinde ortaya çıkan kontrast, Doğu'nun mistik zarafetini taşır.",
    specs: {
      material: "Doğal Nişabur Turkuaz Taşı",
      beadCount: "33 Habbe",
      beadCut: "Tam Küre Kesim",
      beadSize: "11.0 x 11.0 mm",
      imame: "Brezilya Kukası Üzeri Altın Varak İşleme",
      tassel: "Mikro Firuze Dizimli ve Altın Kaplama Püskül",
      thread: "Çelik Özlü Mukavemetli İpek Kordon",
      weight: "58.4 Gram",
      productionYear: "2024",
      origin: "Nişabur / İstanbul",
    },
    craftSteps: [
      {
        title: "Taş Ayrıştırma & Eşleştirme",
        description:
          "Ton ve damar uyumu gösteren 33 eşsiz turkuaz taşı yüzlerce parça arasından seçildi.",
      },
      {
        title: "Elmas Uçlu Tornalama",
        description:
          "Sert doğal taş elmas uçlu özel mikro tornada su soğutmasıyla milimetrik biçimlendirildi.",
      },
      {
        title: "Altın Varak Kakma",
        description:
          "Kuka imame üzerine geleneksel kalemkâr oyma teknikleriyle motifler açılıp varak işlendi.",
      },
    ],
    highlights: [
      "Doğal Boyasız Nişabur Turkuazı",
      "Kuka ve 24K Altın Varak İmame",
      "Özel İpek Püskül ve Mikro Taş Hitameleri",
      "Eşsiz Damar Haritası",
    ],
    images: [
      "/images/gallery2.jpg",
      "/images/product1.jpg",
      "/images/imame_detail.jpg",
    ],
    featuredImage: "/images/gallery2.jpg",
    certificateDate: "05 Kasım 2024",
  },
  "AS-2024-004": {
    serial: "AS-2024-004",
    certificateNo: "AS-CERT-9404",
    name: "Sıkma Kehribar · Nar Taneleri",
    subtitle: "Özel Formül Fenolik Kehribar & İğne İşi Gümüş İşleme",
    category: "Kehribar",
    craftsman: "Ali Sıralıoğlu",
    edition: "Usta İmzalı Koleksiyon",
    description:
      "Özel döküm eski formül sıkma kehribar bloklarından tornalanmıştır. Derin bordo ve konyak tonlarındaki renk geçişi, çekim hissiyatındaki akıcılık ve tok ses meraklılarına hitap eder.",
    artisanNote:
      "Sıkma kehribarda en önemli unsur habbelerin iç gerilimini alarak tornalamaktır. Bu eser dengeli ağırlığıyla gün boyu elde taşınacak bir yoldaştır.",
    specs: {
      material: "Özel Döküm Sıkma Kehribar",
      beadCount: "33 Habbe",
      beadCut: "Habbeli Arpa Kesim",
      beadSize: "12.0 x 9.0 mm",
      imame: "Boynuz Formlu İnce Boyun Kehribar İmame",
      tassel: "925 Ayar Gümüş Tel Sarmalı Püskül",
      thread: "Çift Kat İpek İplik",
      weight: "39.5 Gram",
      productionYear: "2024",
      origin: "İstanbul Atölyesi",
    },
    craftSteps: [
      {
        title: "Blok Dinlendirme",
        description: "Reçine blokları iç gerilim oluşmaması için kontrollü ortamda bekletildi.",
      },
      {
        title: "Arpa Formu Tornalama",
        description: "Parmak aralarında kayan ergonomik arpa formu el keskisiyle verildi.",
      },
    ],
    highlights: [
      "Yoğun Renk Doygunluğu ve Kadife Çekim",
      "Tok ve Berrak Tane Sesi",
      "925 Ayar Gümüş Hitame",
    ],
    images: [
      "/images/hero.jpg",
      "/images/product1.jpg",
      "/images/gallery3.jpg",
    ],
    featuredImage: "/images/hero.jpg",
    certificateDate: "12 Kasım 2024",
  },
};

export function getProductBySerial(serial: string): TesbihProduct | null {
  const normalized = serial.trim().toUpperCase();
  return PRODUCTS[normalized] || null;
}

export function getAllProducts(): TesbihProduct[] {
  return Object.values(PRODUCTS);
}
