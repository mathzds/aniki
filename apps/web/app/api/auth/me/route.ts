import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	try {
		const authHeader = `Basic ${btoa("admin:admin")}`;
		const response = await fetch("http://localhost:3001/user/profile", {
			credentials: "include",
			headers: {
				Cookie: request.headers.get("cookie") || "",
				Authorization: authHeader,
			},
		});

		if (!response.ok) {
			return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
				status: 401,
			});
		}

		const user = await response.json();
		return NextResponse.json(user);
	} catch (error) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}
}
