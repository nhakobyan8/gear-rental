"use client";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserOrders } from '@/features/orderSlice';
import Image from 'next/image';
import { FaSpinner } from 'react-icons/fa';

const UserOrders = () => {
   const dispatch = useDispatch();
   const { orders, loading, error } = useSelector((state) => state.orders);

   useEffect(() => {
      dispatch(fetchUserOrders());
   }, []);

   if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <FaSpinner className="animate-spin text-4xl text-text-muted" />
        </div>
      );
    }


   if (error) {
      return <p>Error: {error}</p>;
   }

   if (orders.length === 0) {
      return <p>You have no completed orders</p>;
   }

   return (
      <div>
         <h2 className="text-2xl font-bold mb-4 p-3">Your Orders</h2>
         <ul className="space-y-4">
            {orders.map((order) => (
               <li key={order._id} className="bg-background-dark border border-slate-400/20 rounded-lg shadow-lg p-6">
                  <div className="flex flex-wrap justify-between border-b border-slate-400/20 items-center mb-4">
                     <div className="text-text-dark">
                        <h3 className="md:text-lg font-semibold text-nowrap">ID: {order._id}</h3>
                     </div>
                     <div className="text-text-muted">
                        <p className="text-sm">{new Date(order.orderDate).toLocaleDateString()}</p>
                     </div>
                  </div>

                  <div className="mb-4">
                     <h4 className="text-md font-semibold text-text-muted mb-2">Products:</h4>
                     <ul className="text-text-dark max-h-56 overflow-y-auto space-y-2">
                        {order.products.map((item, index) => (
                           <li key={index} className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                 <div className="h-24 w-24 flex justify-center items-center overflow-hidden rounded-md border border-slate-400/20">
                                    <Image src={item.product.imageUrl} alt={item.name} width={80} height={80} className="rounded-lg object-cover" />
                                 </div>
                                 <span>{item.product.name}</span>
                              </div>
                              <span>x{item.quantity}</span>
                           </li>
                        ))}
                     </ul>
                  </div>
                  <div className="text-text-dark flex justify-between items-center mb-4">
                     <div className="text-start">
                        <p>Total Amount: <span className="font-bold">${order.totalAmount}</span></p>
                        <p>Status: <span className="font-bold">{order.status}</span></p>
                     </div>
                     <div className="text-end">
                        <p>Start Date: <span className="font-bold">{new Date(order.startDate).toLocaleDateString()}</span></p>
                        <p>End Date: <span className="font-bold">{new Date(order.endDate).toLocaleDateString()}</span></p>
                     </div>
                  </div>
               </li>
            ))}
         </ul>
      </div>
   );
};

export default UserOrders;