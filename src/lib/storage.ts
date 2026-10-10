import { getStore } from "@netlify/blobs";
import { PRODUCTS, TesbihProduct } from "@/data/products";
import fs from "fs";
import path from "path";

export interface AdminLogEntry {
  id: string;
  timestamp: string;
  action: "CREATE" | "UPDATE" | "DELETE";
  serial: string;
  productName: string;
  details?: string;
}

const LOCAL_DATA_FILE = path.join(process.cwd(), "src", "data", "dynamic_products.json");
const LOCAL_LOGS_FILE = path.join(process.cwd(), "src", "data", "admin_logs.json");

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

function getLocalLogs(): AdminLogEntry[] {
  try {
    if (fs.existsSync(LOCAL_LOGS_FILE)) {
      const content = fs.readFileSync(LOCAL_LOGS_FILE, "utf-8");
      return JSON.parse(content);
    }
  } catch (e) {
    console.error("Error reading local logs file:", e);
  }
  return [];
}

function saveLocalLogs(logs: AdminLogEntry[]) {
  try {
    const dir = path.dirname(LOCAL_LOGS_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(LOCAL_LOGS_FILE, JSON.stringify(logs, null, 2), "utf-8");
  } catch (e) {
    console.error("Error saving local logs file:", e);
  }
}

export async function getAdminLogs(): Promise<AdminLogEntry[]> {
  try {
    const store = getStore("products-store");
    const logs = await store.get("admin_logs", { type: "json" });
    if (Array.isArray(logs)) {
      return logs as AdminLogEntry[];
    }
  } catch {
    // Ignore in local dev
  }
  return getLocalLogs();
}

export async function addAdminLog(entry: Omit<AdminLogEntry, "id" | "timestamp">): Promise<void> {
  const newLog: AdminLogEntry = {
    id: "LOG-" + Date.now() + "-" + Math.floor(Math.random() * 1000),
    timestamp: new Date().toLocaleString("tr-TR", { timeZone: "Europe/Istanbul" }),
    ...entry,
  };

  try {
    const store = getStore("products-store");
    let logs: AdminLogEntry[] = [];
    const existing = await store.get("admin_logs", { type: "json" });
    if (Array.isArray(existing)) {
      logs = existing as AdminLogEntry[];
    } else {
      logs = getLocalLogs();
    }
    // Prepend newest log first, keep max 100 entries
    logs.unshift(newLog);
    if (logs.length > 100) logs = logs.slice(0, 100);
    await store.setJSON("admin_logs", logs);
  } catch {
    // Local fallback
    const local = getLocalLogs();
    local.unshift(newLog);
    if (local.length > 100) local.slice(0, 100);
    saveLocalLogs(local);
  }
}

export async function getAllProductsData(): Promise<Record<string, TesbihProduct>> {
  // Always try Netlify Blobs first
  try {
    const store = getStore("products-store");
    const data = await store.get("products", { type: "json" });
    if (data && typeof data === "object") {
      return { ...PRODUCTS, ...(data as Record<string, TesbihProduct>) };
    }
  } catch (err) {
    // Netlify Blobs not present or local development
  }

  // Fallback to local file / static seed data
  return getLocalProducts();
}

export async function getProductDataBySerial(serial: string): Promise<TesbihProduct | null> {
  const normalized = serial.trim().toUpperCase();
  const all = await getAllProductsData();

  if (all[normalized]) return all[normalized];

  const withDash = normalized.replace(/[/]/g, "-");
  if (all[withDash]) return all[withDash];

  const withSlash = normalized.replace(/[-]/g, "/");
  if (all[withSlash]) return all[withSlash];

  const noSep = normalized.replace(/[-/]/g, "");
  const found = Object.values(all).find(
    (p) => p.serial.toUpperCase().replace(/[-/]/g, "") === noSep
  );
  return found || null;
}

export async function saveProductData(product: TesbihProduct): Promise<void> {
  const normalizedSerial = product.serial.trim().toUpperCase();
  product.serial = normalizedSerial;

  const currentProducts = await getAllProductsData();
  const isUpdate = !!currentProducts[normalizedSerial];

  let savedToBlobs = false;

  // 1. Try saving to Netlify Blobs
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
    savedToBlobs = true;
  } catch (err) {
    console.warn("Netlify Blobs write attempt:", err);
  }

  // 2. Save locally if local file system is writable (e.g. localhost)
  if (!savedToBlobs) {
    try {
      const current = getLocalProducts();
      current[normalizedSerial] = product;
      saveLocalProducts(current);
    } catch (e) {
      console.warn("Local storage fallback:", e);
    }
  }

  // 3. Log this action
  await addAdminLog({
    action: isUpdate ? "UPDATE" : "CREATE",
    serial: normalizedSerial,
    productName: product.name,
    details: `${product.category} - ${product.specs.material || "Belirtilmedi"}`,
  });
}

export async function deleteProductData(serial: string): Promise<boolean> {
  const normalized = serial.trim().toUpperCase();
  const currentProducts = await getAllProductsData();
  const deletedItem = currentProducts[normalized];

  let deletedFromBlobs = false;

  // 1. Try deleting from Netlify Blobs
  try {
    const store = getStore("products-store");
    const existing = await store.get("products", { type: "json" });
    if (existing && typeof existing === "object") {
      const all = existing as Record<string, TesbihProduct>;
      delete all[normalized];
      await store.setJSON("products", all);
      deletedFromBlobs = true;
    }
  } catch (err) {
    console.warn("Netlify Blobs delete attempt:", err);
  }

  // 2. Fallback to local file delete
  try {
    const current = getLocalProducts();
    if (current[normalized]) {
      delete current[normalized];
      saveLocalProducts(current);
      deletedFromBlobs = true;
    }
  } catch (e) {
    // Ignore local fs errors on read-only serverless environments
  }

  // 3. Log this delete action
  if (deletedFromBlobs || deletedItem) {
    await addAdminLog({
      action: "DELETE",
      serial: normalized,
      productName: deletedItem?.name || "Bilinmeyen Ürün",
      details: "Ürün sistemden ve veritabanından kalıcı olarak silindi.",
    });
  }

  return deletedFromBlobs;
}
