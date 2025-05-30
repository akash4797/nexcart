import { withAuth } from "next-auth/middleware";

export default withAuth(function middleware() {}, {
  callbacks: {
    authorized: ({ req, token }) => {
      if (req.nextUrl.pathname.startsWith("/admin")) {
        return token?.role === "admin";
      }
      return true;
    },
  },
});

export const config = {
  matcher: ["/admin/:path*"],
};
