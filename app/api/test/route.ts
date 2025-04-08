import type { NextRequest } from "next/server";

export function GET(request: NextRequest) {
  const serverId = request.nextUrl.searchParams.get("serverId");
  throw new Error(`Server ${serverId} missing payment`);
}
