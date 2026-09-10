import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    const adminPassword = process.env.ADMIN_PASSWORD || "ali123";

    if (password === adminPassword) {
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: "Hatalı şifre" }, { status: 401 });
  } catch {
    return NextResponse.json({ error: "Geçersiz istek" }, { status: 400 });
  }
}
