import { NextRequest, NextResponse } from "next/server";
import { getAdminLogs } from "@/lib/storage";

function checkAuth(req: NextRequest): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD || "ali123";
  const authHeader = req.headers.get("x-admin-password") || "";
  return authHeader.trim() === adminPassword.trim();
}

// GET /api/logs
export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const logs = await getAdminLogs();
    return NextResponse.json(
      { logs },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  } catch (error) {
    return NextResponse.json({ error: "Loglar yüklenemedi." }, { status: 500 });
  }
}
