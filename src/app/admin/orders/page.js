"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaSpinner, FaSearch } from "react-icons/fa";

export default function ManageOrdersPage() {
   const [orders, setOrders] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [searchQuery, setSearchQuery] = useState("");
   const [updatingOrderId, setUpdatingOrderId] = useState(null);

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

   const handleDeleteOrder = async (orderId) => {
      if (!confirm("Are you sure you want to delete this order?")) return;
      try {
         const response = await fetch(`/api/admin/orders/`, {
            method: 'DELETE',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ orderId }),
         });

         if (!response.ok) {
            throw new Error('Failed to delete order');
         }

         setOrders((prevOrders) => prevOrders.filter(order => order._id !== orderId));
      } catch (err) {
         alert('Error deleting order: ' + err.message);
      }
   };


   const handleStatusChange = async (orderId, newStatus) => {
      setUpdatingOrderId(orderId);
      try {
         const response = await fetch(`/api/admin/orders/`, {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: newStatus, orderId: orderId }),
         });

         if (!response.ok) {
            throw new Error('Failed to update order status');
         }

         const updatedOrder = await response.json();
         setOrders((prevOrders) =>
            prevOrders.map((order) => (order._id === orderId ? updatedOrder : order))
         );
      } catch (err) {
         setError(err.message);
      } finally {
         setUpdatingOrderId(null);
      }
   };

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
      <div className="container mx-auto p-4 sm:p-8">
         <div className="flex flex-col md:flex-row justify-between mb-6">
            <h2 className="text-3xl font-bold text-text-dark mb-4 md:mb-0">Manage Orders</h2>
            <div className="flex w-full md:w-auto relative">
               <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" />
               <input
                  type="text"
                  placeholder="Search by Name or Phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full md:w-64 border border-background-dark rounded-full bg-background-light text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-light"
               />
            </div>
         </div>

         <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 gap-6">
            {filteredOrders.map((order) => (
               <div key={order._id} className="bg-background-dark border border-slate-400/20 rounded-lg shadow-md p-4 flex flex-col justify-between">
                  <div className="mb-4">
                     <div className="flex justify-between border-b border-slate-400/20 pb-2 mb-4">
                        <div className="text-text-dark">
                           <h3 className="text-lg font-semibold">{order.fullName}</h3>
                           <p className="text-text-muted">{order.phoneNumber}</p>
                        </div>
                        <div className="text-text-muted">
                           <p className="text-sm">{new Date(order.orderDate).toLocaleDateString()}</p>
                        </div>
                     </div>

                     <div>
                        <h4 className="text-md font-semibold text-text-muted mb-2">Products:</h4>
                        <ul className="text-text-dark max-h-40 overflow-y-auto space-y-2">
                           {order.products.map((item, index) => (
                              <li key={index} className="flex items-center justify-between">
                                 <div className="flex items-center space-x-4">
                                    <div className="h-20 w-20 flex justify-center items-center overflow-hidden rounded-md border border-slate-400/20">
                                       <Image src={item.product.imageUrl} alt={item.name} width={64} height={64} className="rounded-md object-cover" />
                                    </div>
                                    <span className="text-sm">{item.product.name}</span>
                                 </div>
                                 <span className="font-bold text-sm">x{item.quantity}</span>
                              </li>
                           ))}
                        </ul>
                     </div>
                  </div>
                  <div>
                     <div className="text-text-dark mb-4">
                        <p>Total Amount: <span className="font-bold">${order.totalAmount.toFixed(2)}</span></p>
                        <p>
                           Status:{" "}
                           <span className={`font-bold ${order.status === "completed" ? "text-green-500" : order.status === "rented" ? "text-yellow-500" : "text-gray-500"}`}>
                              {order.status}
                           </span>
                        </p>
                     </div>

                     <div className="flex justify-between items-center">
                        <select
                           value={order.status}
                           onChange={(e) => handleStatusChange(order._id, e.target.value)}
                           disabled={updatingOrderId === order._id}
                           className="border p-2 border-background-dark rounded-full bg-background-light text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-light"
                        >
                           <option value="paid">Paid</option>
                           <option value="rented">Rented</option>
                           <option value="completed">Completed</option>
                        </select>
                        <button onClick={() => handleDeleteOrder(order._id)} className="text-red-500 hover:underline">Delete</button>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
}
