"use client";
import { useEffect, useState } from "react";
import { fetchOrderHistory } from "@/lib/api";

export default function OrderHistory() {
   const [orders, setOrders] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      async function loadOrders() {
         try {
            const data = await fetchOrderHistory();
            setOrders(data);
         } catch (err) {
            setError("Failed to load order history.");
         } finally {
            setLoading(false);
         }
      }
      loadOrders();
   }, []);

   if (loading) {
      return <div className="text-center text-text">Loading order history...</div>;
   }

   if (error) {
      return <div className="text-red-500">{error}</div>;
   }

   return (
      <div>
         <h2 className="text-2xl font-semibold text-primary mb-4">Order History</h2>
         <ul className="space-y-4">
            {orders.length > 0 ? orders.map(order => (
               <li key={order.id} className="p-4 bg-background-light rounded-lg shadow-md">
                  <p><strong>Order ID:</strong> {order.id}</p>
                  <p><strong>Date:</strong> {order.date}</p>
                  <p><strong>Total:</strong> ${order.total}</p>
                  <ul className="mt-2 list-disc list-inside">
                     {order.items.map((item, index) => (
                        <li key={index}>
                           {item.name} - ${item.price} x {item.quantity}
                        </li>
                     ))}
                  </ul>
               </li>
            )) : <p className="text-center text-text">You have no orders.</p>}
         </ul>
      </div>
   );
}
