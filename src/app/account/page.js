"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import OrderHistory from "@/components/OrderHistory";
import { useState } from "react";
import ChangePassword from "@/components/ChangePassword";

export default function AccountPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('account');

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center text-text">Loading...</div>;
  }

  if (status === "unauthenticated") {
    router.push("/auth");
    return null;
  }

  const handleSignOut = () => {
    signOut({ redirect: false }).then(() => {
      router.push("/auth");
    });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'account':
        return (
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-primary mb-4">User Information</h2>
            <p className="mt-2"><strong>Name:</strong> {session.user.name}</p>
            <p className="mt-2"><strong>Email:</strong> {session.user.email}</p>
          </div>
        );
      case 'orders':
        return <OrderHistory />;
      case 'password':
        return <ChangePassword />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background-light text-text">
      <h1 className="text-5xl font-extrabold mb-8 text-white">My Account</h1>
      <div className="bg-background p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <div className="flex justify-between mb-8 border-b border-gray-600 space-x-2 pb-4">
          <button
            onClick={() => setActiveTab('account')}
            className={`py-2 px-6 rounded-md transition-all duration-300 ${activeTab === 'account' ? 'bg-primary text-white' : 'bg-gray-700 hover:bg-gray-600'}`}
          >
            Account Details
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-2 px-6 rounded-md transition-all duration-300 ${activeTab === 'orders' ? 'bg-primary text-white' : 'bg-gray-700 hover:bg-gray-600'}`}
          >
            Order History
          </button>
          <button
            onClick={() => setActiveTab('password')}
            className={`py-2 px-6 rounded-md transition-all duration-300 ${activeTab === 'password' ? 'bg-primary text-white' : 'bg-gray-700 hover:bg-gray-600'}`}
          >
            Change Password
          </button>
        </div>
        {renderTabContent()}
        <button
          onClick={handleSignOut}
          className="w-full mt-8 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors duration-300 ease-in-out shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
