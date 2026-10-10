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

export const PRODUCTS: Record<string, TesbihProduct> = {};

export function getProductBySerial(serial: string): TesbihProduct | null {
  const normalized = serial.trim().toUpperCase();
  if (PRODUCTS[normalized]) return PRODUCTS[normalized];

  const withDash = normalized.replace(/[/]/g, "-");
  if (PRODUCTS[withDash]) return PRODUCTS[withDash];

  const withSlash = normalized.replace(/[-]/g, "/");
  if (PRODUCTS[withSlash]) return PRODUCTS[withSlash];

  const noSep = normalized.replace(/[-/]/g, "");
  const found = Object.values(PRODUCTS).find(
    (p) => p.serial.toUpperCase().replace(/[-/]/g, "") === noSep
  );
  return found || null;
}

export function getAllProducts(): TesbihProduct[] {
  return Object.values(PRODUCTS);
}
