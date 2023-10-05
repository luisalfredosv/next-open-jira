import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	if (request.nextUrl.pathname.startsWith("/api/entries/")) {
		const id = request.nextUrl.pathname.replace("/api/entries/", "");

		const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$");

		if (!checkMongoIDRegExp.test(id)) {
			const url = request.nextUrl.clone();

			url.pathname = "/api/bad-request";
			url.search = `?message=No estas enviando un mongo id válido`;

			return NextResponse.rewrite(url);
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/api/entries/:path*"],
};
