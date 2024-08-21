"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function Payment() {
   const [paymentMethod, setPaymentMethod] = useState('');
   const router = useRouter();

   const handlePayment = () => {
      // Здесь должна быть логика для обработки оплаты
      if (paymentMethod) {
         alert(`Payment processed with method: ${paymentMethod}`);
         Cookies.remove('hasCheckedOut'); // Удаляем cookie, чтобы сбросить состояние checkout
         router.push('/thank-you'); // Перенаправление на страницу благодарности или другую страницу после успешной оплаты
      } else {
         alert('Please select a payment method');
      }
   };

   const handlePaymentMethodChange = (e) => {
      setPaymentMethod(e.target.value);
   };

   return (
      <div className="container mx-auto p-8">
         <h1 className="text-4xl font-bold mb-8 text-center">Payment</h1>
         <div className="max-w-lg mx-auto bg-background-light p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Select Payment Method</h2>
            <div className="space-y-4">
               <div className="flex items-center">
                  <input
                     type="radio"
                     id="creditCard"
                     name="paymentMethod"
                     value="Credit Card"
                     onChange={handlePaymentMethodChange}
                     className="mr-2"
                  />
                  <label htmlFor="creditCard" className="text-lg">Credit Card</label>
               </div>
               <div className="flex items-center">
                  <input
                     type="radio"
                     id="cash"
                     name="paymentMethod"
                     value="Cash"
                     onChange={handlePaymentMethodChange}
                     className="mr-2"
                  />
                  <label htmlFor="cash" className="text-lg">Cash</label>
               </div>
               <div className="flex items-center">
                  <input
                     type="radio"
                     id="postPay"
                     name="paymentMethod"
                     value="Post-Pay"
                     onChange={handlePaymentMethodChange}
                     className="mr-2"
                  />
                  <label htmlFor="postPay" className="text-lg">Pay After Rental (Admin Approved)</label>
               </div>
            </div>
            <button
               onClick={handlePayment}
               className="mt-6 w-full px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-transform duration-300 ease-in-out transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-light"
            >
               Complete Payment
            </button>
         </div>
      </div>
   );
}
