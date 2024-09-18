import { env } from "./config/env";
import { AUTH_API } from "./lib/api/auth";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const accessToken = req.cookies.get("access_token")?.value;

  if (!accessToken) {
    // Redirect to the login page if no access token is found
    return redirectToLogin(req);
  }

  AUTH_API.defaults.headers.Authorization = `Bearer ${accessToken}`;

  try {
    const { data } = await AUTH_API.get("/profile");

    // Proceed if the user is verified, otherwise redirect to the email verification page
    return data.verified ? NextResponse.next() : redirectToVerifyEmail(req);
  } catch (error) {
    const status = (error as any)?.response?.status;

    // Redirect to login page if unauthorized, else handle other errors
    return status === 401 ? redirectToLogin(req) : redirectToLogin(req); // Optionally, handle other error cases differently
  }
}

const redirectToLogin = (req: NextRequest) =>
  NextResponse.redirect(
    new URL(`${env.NEXT_PUBLIC_AUTH_APP_URL}/login`, req.nextUrl)
  );

const redirectToVerifyEmail = (req: NextRequest) =>
  NextResponse.redirect(
    new URL(`${env.NEXT_PUBLIC_AUTH_APP_URL}/verify-email`, req.nextUrl)
  );

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
