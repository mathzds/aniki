import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
	const response = await fetch(`${request.nextUrl.origin}/api/auth/me`, {
		headers: {
			Cookie: request.headers.get("cookie") || "",
		},
	});

	const isProtectedPath =
		request.nextUrl.pathname.startsWith("/profile") ||
		request.nextUrl.pathname.startsWith("/dashboard");

	if (!response.ok && isProtectedPath) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/profile/:path*", "/dashboard/:path*"],
};
