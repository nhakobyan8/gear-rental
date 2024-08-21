import { NextResponse } from "next/server";

export function middleware(request) {
   const url = request.nextUrl.clone();
   const { pathname } = request.nextUrl;

   const isCheckout = pathname.startsWith('/checkout');
   const isPayment = pathname.startsWith('/payment');

   // Проверка, если пользователь пытается получить доступ к /checkout, не имея товаров в корзине
   if (isCheckout) {
      const cartItems = request.cookies.get('cartItems');
      if (!cartItems || cartItems.length === 0) {
         url.pathname = '/';
         return NextResponse.redirect(url);
      }
   }

   // Проверка, если пользователь пытается получить доступ к /payment, не пройдя этап Checkout
   if (isPayment) {
      const hasCheckedOut = request.cookies.get('hasCheckedOut');
      if (!hasCheckedOut) {
         url.pathname = '/checkout';
         return NextResponse.redirect(url);
      }
   }

   // Разрешить доступ, если проверки пройдены
   return NextResponse.next();
}

export const config = {
   matcher: ['/checkout', '/payment'],
};
