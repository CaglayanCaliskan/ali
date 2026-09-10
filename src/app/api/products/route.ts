import { NextRequest, NextResponse } from "next/server";
import { getAllProductsData, getProductDataBySerial, saveProductData, deleteProductData } from "@/lib/storage";

function checkAuth(req: NextRequest): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD || "ali123";
  const authHeader = req.headers.get("x-admin-password");
  return authHeader === adminPassword;
}

// GET /api/products or /api/products?serial=AS-2024-001
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const serial = searchParams.get("serial");

  if (serial) {
    const product = await getProductDataBySerial(serial);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ product });
  }

  const all = await getAllProductsData();
  return NextResponse.json({ products: Object.values(all) });
}

// POST /api/products (Create or Update Product)
export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    if (!body.serial || !body.name) {
      return NextResponse.json({ error: "Seri numarası ve ürün adı zorunludur." }, { status: 400 });
    }

    await saveProductData(body);
    return NextResponse.json({ success: true, product: body });
  } catch (error) {
    return NextResponse.json({ error: "Ürün kaydedilemedi." }, { status: 500 });
  }
}

// DELETE /api/products?serial=AS-2024-001
export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const serial = searchParams.get("serial");

  if (!serial) {
    return NextResponse.json({ error: "Seri numarası belirtilmedi." }, { status: 400 });
  }

  const deleted = await deleteProductData(serial);
  if (!deleted) {
    return NextResponse.json({ error: "Ürün bulunamadı veya silinemedi." }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
