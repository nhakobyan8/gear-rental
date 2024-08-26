import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request) {
   const url = request.nextUrl.clone();
   const { pathname } = request.nextUrl;

   const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

   const isCheckout = pathname.startsWith('/checkout');
   const isPayment = pathname.startsWith('/payment');
   const isAdminRoute = pathname.startsWith('/admin');
   const isUserRoute = pathname.startsWith('/user');
   const isApiRoute = pathname.startsWith('/api/admin');

   if ((isCheckout || isPayment) && !token) {
      url.pathname = '/auth/';
      return NextResponse.redirect(url);
   }

   if (isCheckout) {
      const cartItems = request.cookies.get('cartItems');
      if (!cartItems || cartItems.value.length === 0) {
         url.pathname = '/';
         return NextResponse.redirect(url);
      }
   }

   if (isPayment) {
      const hasCheckedOut = request.cookies.get('hasCheckedOut');
      if (!hasCheckedOut) {
         url.pathname = '/checkout';
         return NextResponse.redirect(url);
      }
   }

   if ((isAdminRoute || isApiRoute) && token?.role !== 'admin') {
      url.pathname = '/';
      return NextResponse.redirect(url);
   }

   if (isUserRoute && token?.role !== 'user') {
      url.pathname = '/';
      return NextResponse.redirect(url);
   }

   return NextResponse.next();
}

export const config = {
   matcher: ['/checkout', '/payment', '/dashboard', '/admin/:path*', '/user/:path*', '/api/admin/:path*'],
};
