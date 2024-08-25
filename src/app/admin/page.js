"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
   const { data: session, status } = useSession();
   const router = useRouter();
   const [activeTab, setActiveTab] = useState('users');

   if (status === "loading") {
      return <div className="min-h-screen flex items-center justify-center text-text">Loading...</div>;
   }

   if (status === "unauthenticated" || session.user.role !== 'admin') {
      router.push("/auth");
      return null;
   }

   const renderTabContent = () => {
      switch (activeTab) {
         case 'users':
            return <h1>User Management</h1>;
         case 'products':
            return <h1>ProductManagement</h1>;
         case 'orders':
            return <h1>Order Management</h1>;;
         case 'settings':
            return <h1>Settings</h1>;;
         default:
            return null;
      }
   };

   return (
      <div className="min-h-screen flex flex-col bg-background-light text-text">
         <h1 className="text-4xl font-extrabold mb-8 text-white text-center">Admin Dashboard</h1>
         <div className="flex w-full lg:flex-nowrap flex-wrap">
            <div className="bg-background-dark px-0 w-full md:w-1/3 p-6">
               <nav className="space-y-4">
                  <button onClick={() => setActiveTab('users')} className={`block w-full px-3 transition-colors text-left ${activeTab === 'users' ? 'bg-primary text-white' : 'text-gray-400 hover:bg-gray-600'}`}>
                     Users
                  </button>
                  <button onClick={() => setActiveTab('products')} className={`block px-3 w-full transition-colors text-left ${activeTab === 'products' ? 'bg-primary text-white' : 'text-gray-400 hover:bg-gray-600'}`}>
                     Products
                  </button>
                  <button onClick={() => setActiveTab('orders')} className={`block px-3 w-full transition-colors text-left ${activeTab === 'orders' ? 'bg-primary text-white' : 'text-gray-400 hover:bg-gray-600'}`}>
                     Orders
                  </button>
                  <button onClick={() => setActiveTab('settings')} className={`block px-3 w-full transition-colors text-left ${activeTab === 'settings' ? 'bg-primary text-white' : 'text-gray-400 hover:bg-gray-600'}`}>
                     Settings
                  </button>
               </nav>
            </div>
            <div className="w-full p-6">
               {renderTabContent()}
            </div>
         </div>
      </div>
   );
}
