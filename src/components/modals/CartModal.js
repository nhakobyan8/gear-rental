"use client";
import { clearCart, removeItemFromCart, increaseQuantity, decreaseQuantity } from "@/features/cartSlice";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import Modal from "./Modal";
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
      <Modal isOpen={isCartOpen} onClose={toggleCart}>
         <div className="max-w-lg flex justify-center items-center">
            {cartItems.length === 0 ? (
               <p className="text-center p-10 text-text-muted">Your cart is empty</p>
            ) : (
               <div className="w-full">
                  <ul role="list" className="divide-y-2 divide-dashed max-h-96 overflow-y-auto py-3">
                     {cartItems.map((item) => (
                        <li key={item._id} className="flex justify-center py-5 border-slate-400/20">
                           <div className="h-24 w-24 flex justify-center items-center overflow-hidden rounded-md border border-slate-400/20">
                              <Image src={item.imageUrl} alt={item.name} width={80} height={80} className="rounded-lg object-cover" />
                           </div>
                           <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                 <div className="flex justify-between text-base font-medium text-text-dark">
                                    <h3>
                                       <Link href={`/products/${item._id}`} passHref>
                                          {item.name}
                                       </Link>
                                    </h3>
                                    <p className="ml-4">${item.totalPrice.toFixed(2)}</p>
                                 </div>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                 <div className="flex items-center space-x-2">
                                    <button
                                       className="text-white"
                                       onClick={() => item.quantity === 1 ? handleRemoveItem(item._id) : handleDecreaseQuantity(item._id)}
                                    >
                                       <CiCircleMinus size={30} />
                                    </button>
                                    <span className="text-text-dark">{item.quantity}</span>
                                    <button
                                       className={`${item.quantity === item.availableQuantity && 'opacity-50 cursor-not-allowed'} text-white`}
                                       disabled={item.quantity === item.availableQuantity}
                                       onClick={() => handleIncreaseQuantity(item._id)}
                                    >
                                       <CiCirclePlus size={30} />
                                    </button>
                                 </div>
                                 <button
                                    type="button"
                                    onClick={() => handleRemoveItem(item._id)}
                                    className="font-medium transition-colors text-primary hover:text-primary-dark"
                                 >
                                    Remove
                                 </button>
                              </div>
                           </div>
                        </li>
                     ))}
                  </ul>
                  <div className="mt-4 flex justify-between items-center">
                     <p className="font-bold text-lg text-text-dark">Subtotal: ${totalAmount}</p>

                  </div>
                  <p className="mt-0.5 text-sm text-gray-400 text-start">Rental prices and term calculated at checkout.</p>
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

      </Modal>
   );
}
