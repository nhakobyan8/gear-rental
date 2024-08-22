"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Checkout() {
   const router = useRouter();
   const cartItems = useSelector((state) => state.cart.items);
   const [checkoutItems, setCheckoutItems] = useState([]);
   const [startDate, setStartDate] = useState('');
   const [endDate, setEndDate] = useState('');

   useEffect(() => {
      setCheckoutItems(cartItems.map(item => ({ ...item })));
   }, []);

   console.log(checkoutItems)

   const handleStartDateChange = (e) => {
      setStartDate(e.target.value);
      if (endDate && new Date(e.target.value) > new Date(endDate)) {
         setEndDate('');
      }
   };

   const handleEndDateChange = (e) => {
      setEndDate(e.target.value);
   };

   const totalDays = startDate && endDate ? Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)) : 0;
   const totalAmount = checkoutItems.reduce((total, item) => total + (item.totalPrice * totalDays), 0);

   const handleCheckout = () => {
      Cookies.set('hasCheckedOut', 'true');
      router.push('/payment');
   };

   console.log(checkoutItems);

   return (
      <div className="container mx-auto p-8">
         <h1 className="text-4xl font-bold mb-8 text-center">Checkout</h1>

         {checkoutItems.length === 0 ? (
            <p className="text-center">Your cart is empty</p>
         ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div>
                  <h2 className="text-2xl font-semibold mb-4">Your Items</h2>
                  <ul className="space-y-4">
                     {checkoutItems.map((item) => (
                        <Link href={`/products/${item._id}`} key={item.id} className="flex justify-between items-center p-4 bg-background-light rounded-lg shadow-md">
                           <div className="flex items-center space-x-4">
                              <Image src={item.imageUrl} alt={item.name} width={80} height={80} className="rounded-lg object-cover" />
                              <div>
                                 <p className="font-semibold">{item.name}</p>
                                 <p className="text-primary">Quantity: {item.quantity}</p>
                              </div>
                           </div>
                           <p className="font-bold">${item.totalPrice}</p>
                        </Link>
                     ))}
                  </ul>
                  <div className="mt-4 text-white">
                     <label className="block mb-2">Start Date:</label>
                     <input
                        type="date"
                        value={startDate}
                        onChange={handleStartDateChange}
                        className="w-full cursor-pointer p-3 rounded-lg bg-background-light focus:outline-none focus:ring-2 focus:ring-primary-light"
                        required
                     />
                     <label className="block mt-4 mb-2">End Date:</label>
                     <input
                        type="date"
                        value={endDate}
                        onChange={handleEndDateChange}
                        min={startDate}
                        className="w-full cursor-pointer p-3 rounded-lg bg-background-light focus:outline-none focus:ring-2 focus:ring-primary-light"
                        required
                     />
                  </div>
               </div>
               <div>
                  <h2 className="text-2xl font-semibold mb-4">Shipping Information</h2>
                  <form className="flex flex-col justify-between">
                     <div className="space-y-4">
                        <input type="text" placeholder="Full Name" className="w-full p-3 rounded-lg bg-background-light focus:outline-none focus:ring-2 focus:ring-primary-light" required />
                        <input type="number" placeholder="Phone Number" className="w-full p-3 rounded-lg bg-background-light focus:outline-none focus:ring-2 focus:ring-primary-light" required />
                        <input type="text" placeholder="Address" className="w-full p-3 rounded-lg bg-background-light focus:outline-none focus:ring-2 focus:ring-primary-light" required />

                     </div>
                     <div className="mt-12 flex justify-between">
                        <div>
                           <p className="text-lg font-bold">Total Days: {totalDays}</p>
                           <p className="text-lg font-bold">Total Amount: ${totalAmount.toFixed(2)}</p>
                        </div>
                        <button onClick={handleCheckout} className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-transform duration-300 ease-in-out transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-light">
                           Proceed to Payment
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         )}
      </div>
   );
}
