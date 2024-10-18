import { AxiosError } from "axios";
import { env } from "./config/env";
import AUTH_API from "./lib/api/auth";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const currentPath = req.nextUrl.pathname;

  try {
    const { data } = await AUTH_API.get("/user/profile");

    if (data.verified) {
      if (data.new_user && currentPath !== "/onboarding") {
        return redirectToOnBoarding(req);
      } else if (!data.new_user && currentPath === "/onboarding") {
        return redirectToHome(req);
      }
    } else {
      return redirectToVerifyEmail(req);
    }
  } catch (error) {
    return handleError(error as AxiosError, req);
  }

  return NextResponse.next();
}

const handleError = (error: AxiosError, req: NextRequest) => {
  const status = error.response?.status;

  if (status === 401 || status === 403) {
    return redirectToLogin(req);
  }

  console.error("Unhandled error:", error);
  return NextResponse.next();
};

const redirectToLogin = (req: NextRequest) =>
  NextResponse.redirect(
    new URL(`${env.NEXT_PUBLIC_AUTH_APP_URL}/login`, req.nextUrl)
  );

const redirectToVerifyEmail = (req: NextRequest) =>
  NextResponse.redirect(
    new URL(`${env.NEXT_PUBLIC_AUTH_APP_URL}/verify-email`, req.nextUrl)
  );

const redirectToOnBoarding = (req: NextRequest) =>
  NextResponse.redirect(new URL("/onboarding", req.nextUrl));

const redirectToHome = (req: NextRequest) =>
  NextResponse.redirect(new URL("/", req.nextUrl));

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|verify-email|.*\\.png$).*)"],
};