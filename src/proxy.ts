import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// These paths are not subject to i18n routing
const PUBLIC_PATHS = [
  "/favicon.gif",
  "/og-image.jpg",
  "/robots.txt",
  "/placeholder.svg",
  "/videos",
  "/_next",
  "/api",
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip public assets and Next.js internals
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // All /nl/* paths are handled by the [lang] dynamic segment — pass through
  if (pathname.startsWith("/nl")) {
    return NextResponse.next();
  }

  // English paths pass through as normal
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon|og-image|robots|placeholder|videos).*)",
  ],
};
