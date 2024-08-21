import { env } from "./config/env";
import { AUTH_API } from "./lib/axios";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const access_token = req.cookies.get("access_token")?.value;

  if (path && access_token) {
    AUTH_API.defaults.headers.Authorization = `Bearer ${access_token}`;

    try {
      const response = await AUTH_API.get("/profile");
      if (response.data.verified) {
        return NextResponse.next();
      } else {
        // Redirect to the verify email page if the user is not verified
        return NextResponse.redirect(
          new URL(`${env.NEXT_PUBLIC_AUTH_APP_URL}/verify-email`, req.nextUrl)
        );
      }
    } catch (error) {
      const status = (error as any).response?.status;
      if (status === 401) {
        // Redirect to the login page if the user is unauthorized
        return NextResponse.redirect(
          new URL(`${env.NEXT_PUBLIC_AUTH_APP_URL}/login`, req.nextUrl)
        );
      } else {
        // Handle other errors (e.g., network errors, 500 server errors) by redirecting to a generic error page
        return NextResponse.redirect(
          new URL(`${env.NEXT_PUBLIC_AUTH_APP_URL}/error`, req.nextUrl)
        );
      }
    }
  } else {
    // Redirect to the login page if the user is not authenticated
    return NextResponse.redirect(
      new URL(`${env.NEXT_PUBLIC_AUTH_APP_URL}/login`, req.nextUrl)
    );
  }

  // If no path or access token, proceed with the request
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
