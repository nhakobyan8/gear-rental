"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { createOrder } from '@/features/orderSlice';

export default function Payment() {
   const [paymentMethod, setPaymentMethod] = useState('');
   const router = useRouter();
   const dispatch = useDispatch();
   const orderData = JSON.parse(Cookies.get('orderData'));

   const handlePayment = async () => {
      if (paymentMethod) {
         alert(`Payment processed with method: ${paymentMethod}`);

         const orderWithPayment = {
            user: {
               fullName: orderData.fullName,
               phoneNumber: orderData.phoneNumber,
               userId: orderData.userId,
            },
            ...orderData,
            paymentMethod,
         };

         dispatch(createOrder(orderWithPayment)).then(() => {
            Cookies.remove('orderData');
            Cookies.remove('hasCheckedOut');
            router.push('/thank-you');
         }).catch((error) => {
            alert('An error occurred while processing your payment. Please try again.');
         });
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
