"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaSpinner, FaSearch } from "react-icons/fa";

export default function ManageOrdersPage() {
   const [orders, setOrders] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [searchQuery, setSearchQuery] = useState("");

   useEffect(() => {
      async function fetchOrders() {
         try {
            const response = await fetch("/api/admin/orders");
            if (!response.ok) {
               throw new Error("Failed to fetch orders.");
            }
            const data = await response.json();
            setOrders(data.data);
         } catch (err) {
            setError(err.message);
         } finally {
            setLoading(false);
         }
      }

      fetchOrders();
   }, []);

   const filteredOrders = orders.filter(order =>
      order.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.phoneNumber.includes(searchQuery)
   );

   if (loading) {
      return (
         <div className="flex justify-center items-center h-64">
            <FaSpinner className="animate-spin text-4xl text-text-muted" />
         </div>
      );
   }

   if (error) {
      return <div className="text-red-500 text-center">{error}</div>;
   }

   return (
      <div className="container mx-auto p-8">
         <div className="flex justify-between">
            <h2 className="text-3xl font-bold mb-6 text-text-dark">Manage Orders</h2>

            <div className="flex justify-between items-center mb-4">
               <div className="relative flex items-center w-full">
                  <FaSearch className="absolute left-3 text-text-muted" />
                  <input
                     type="text"
                     placeholder="Search by Name or Phone..."
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     className="pl-10 pr-4 py-2 w-full border border-background-dark rounded-full bg-background-light text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-light"
                  />
               </div>
            </div>
         </div>


         <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {filteredOrders.map((order) => (
               <div key={order._id} className="bg-background-dark border border-slate-400/20 rounded-lg shadow-md p-6">
                  <div className="flex justify-between border-b border-slate-400/20 items-center mb-4">
                     <div className="text-text-dark">
                        <h3 className="text-lg font-semibold">{order.fullName}</h3>
                        <p className="text-text-muted">{order.phoneNumber}</p>
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
                  <div className="text-text-dark mb-4">
                     <p>Total Amount: <span className="font-bold">${order.totalAmount.toFixed(2)}</span></p>
                     <p>Status: <span className="font-bold">{order.status}</span></p>
                  </div>
                  <div className="flex justify-between items-center">
                     <button className="text-primary hover:underline">View</button>
                     <button className="text-red-500 hover:underline">Delete</button>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
}
