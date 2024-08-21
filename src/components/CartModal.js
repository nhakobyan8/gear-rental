"use client";
import { clearCart, removeItemFromCart, increaseQuantity, decreaseQuantity } from "@/features/cartSlice";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import Image from "next/image";

export default function CartModal({ isCartOpen, toggleCart }) {
   const cartItems = useSelector((state) => state.cart.items);
   const dispatch = useDispatch();

   const totalAmount = cartItems.reduce((total, item) => total + item.totalPrice, 0);
   const handleIncreaseQuantity = (id) => {
      dispatch(increaseQuantity(id));
   };

   const handleDecreaseQuantity = (id) => {
      dispatch(decreaseQuantity(id));
   };

   const handleRemoveItem = (id) => {
      dispatch(removeItemFromCart(id));
   };

   return (
      <div
         className={`fixed cursor-pointer bg-black bg-opacity-55 inset-0 z-50 flex justify-center items-center transition-opacity duration-300 ${isCartOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
         onClick={toggleCart}
      >
         <div
            className="relative bg-background p-9 rounded-lg shadow-lg overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
         >
            <button
               className="absolute top-0 p-2 right-0 text-white text-2xl font-bold"
               onClick={toggleCart}
            >
               ×
            </button>
            {cartItems.length === 0 ? (
               <p className="text-center p-10">Your cart is empty</p>
            ) : (
               <div>
                  <ul className="space-y-10 py-3">
                     {cartItems.map((item) => (
                        <li key={item.id} className="flex  justify-between items-center">
                           <div className="flex justify-between space-x-10 items-center w-full">
                              <div className="flex items-center space-x-2">
                                 <Image src={item.imageUrl} alt={item.name} width={80} height={80} className="rounded-lg object-cover" />
                                 <p className="font-semibold text-xl">{item.name} (${item.totalPrice})</p>
                              </div>

                              <div className="flex items-center space-x-2">
                                 <button
                                    className="text-white"
                                    onClick={() => item.quantity === 1 ? handleRemoveItem(item.id) : handleDecreaseQuantity(item.id)}

                                 >
                                    <CiCircleMinus size={30} />
                                 </button>
                                 <span>{item.quantity}</span>
                                 <button
                                    className="text-white"
                                    onClick={() => handleIncreaseQuantity(item.id)}
                                 >
                                    <CiCirclePlus size={30} />
                                 </button>
                              </div>
                           </div>
                        </li>
                     ))}
                  </ul>
                  <div className="mt-4 flex justify-between items-center">
                     <p className="font-bold text-lg">Total: ${totalAmount}</p>
                  </div>
                  <div className="mt-4 flex justify-between text-right">
                     <button
                        onClick={() => dispatch(clearCart())}
                        className="text-sm text-red-500"
                     >
                        Clear Cart
                     </button>
                     <Link onClick={toggleCart} href="/checkout" passHref>
                        <button className="inline-block px-3 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-transform duration-300 ease-in-out transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-light">
                           Proceed to Checkout
                        </button>
                     </Link>
                  </div>
               </div>
            )}
         </div>
      </div>
   );
}
