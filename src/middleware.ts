import { auth } from "@/auth";

export default auth((req) => {
  // Redirect to login if not authenticated
  if (!req.auth && req.nextUrl.pathname !== "/auth/login") {
    const newUrl = new URL("/auth/login", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }

  // Redirect to home if authenticated and trying to access auth pages
  if (
    req.nextUrl.pathname.startsWith("/auth") &&
    req.nextUrl.pathname !== "/auth/new" &&
    req.auth
  ) {
    console.log("Redirecting to /dashboard");
    const newUrl = new URL("/dashboard", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }

  // Redirect to /dashboard if authenticated and trying to access /
  if (req.nextUrl.pathname === "/" && req.auth) {
    console.log("Redirecting to /dashboard");
    const newUrl = new URL("/dashboard", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
