import { getStore } from "@netlify/blobs";
import { PRODUCTS, TesbihProduct } from "@/data/products";
import fs from "fs";
import path from "path";

const LOCAL_DATA_FILE = path.join(process.cwd(), "src", "data", "dynamic_products.json");

// Helper to get products from local file (for local dev or fallback)
function getLocalProducts(): Record<string, TesbihProduct> {
  try {
    if (fs.existsSync(LOCAL_DATA_FILE)) {
      const content = fs.readFileSync(LOCAL_DATA_FILE, "utf-8");
      return JSON.parse(content);
    }
  } catch (e) {
    console.error("Error reading local products file:", e);
  }
  return { ...PRODUCTS };
}

// Helper to save products locally
function saveLocalProducts(data: Record<string, TesbihProduct>) {
  try {
    const dir = path.dirname(LOCAL_DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(LOCAL_DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {
    console.error("Error saving local products file:", e);
  }
}

export async function getAllProductsData(): Promise<Record<string, TesbihProduct>> {
  // Check if we are running in Netlify with Netlify Blobs available
  if (process.env.NETLIFY || process.env.NETLIFY_BLOBS_CONTEXT || process.env.SITE_ID) {
    try {
      const store = getStore("products-store");
      const data = await store.get("products", { type: "json" });
      if (data && typeof data === "object") {
        return { ...PRODUCTS, ...(data as Record<string, TesbihProduct>) };
      }
    } catch (err) {
      console.warn("Netlify Blobs read failed, falling back:", err);
    }
  }

  // Fallback to local file / seed data
  return getLocalProducts();
}

export async function getProductDataBySerial(serial: string): Promise<TesbihProduct | null> {
  const normalized = serial.trim().toUpperCase();
  const all = await getAllProductsData();
  return all[normalized] || null;
}

export async function saveProductData(product: TesbihProduct): Promise<void> {
  const normalizedSerial = product.serial.trim().toUpperCase();
  product.serial = normalizedSerial;

  // Try Netlify Blobs first if in Netlify environment
  if (process.env.NETLIFY || process.env.NETLIFY_BLOBS_CONTEXT || process.env.SITE_ID) {
    try {
      const store = getStore("products-store");
      let all: Record<string, TesbihProduct> = {};
      const existing = await store.get("products", { type: "json" });
      if (existing && typeof existing === "object") {
        all = existing as Record<string, TesbihProduct>;
      } else {
        all = { ...PRODUCTS };
      }
      all[normalizedSerial] = product;
      await store.setJSON("products", all);
      return;
    } catch (err) {
      console.warn("Netlify Blobs write failed, saving locally:", err);
    }
  }

  // Fallback local save
  const current = getLocalProducts();
  current[normalizedSerial] = product;
  saveLocalProducts(current);
}

export async function deleteProductData(serial: string): Promise<boolean> {
  const normalized = serial.trim().toUpperCase();

  if (process.env.NETLIFY || process.env.NETLIFY_BLOBS_CONTEXT || process.env.SITE_ID) {
    try {
      const store = getStore("products-store");
      const existing = await store.get("products", { type: "json" });
      if (existing && typeof existing === "object") {
        const all = existing as Record<string, TesbihProduct>;
        delete all[normalized];
        await store.setJSON("products", all);
        return true;
      }
    } catch (err) {
      console.warn("Netlify Blobs delete failed:", err);
    }
  }

  const current = getLocalProducts();
  if (current[normalized]) {
    delete current[normalized];
    saveLocalProducts(current);
    return true;
  }
  return false;
}
