"use client";
import { useState } from 'react';
import ManageUsers from '@/components/admin/ManageUsers';
import ManageProducts from '@/components/admin/ManageProducts';
import ManageOrders from '@/components/admin/ManageOrders';
import { FaUsers, FaBox, FaShoppingCart } from 'react-icons/fa';

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('products');

  return (
    <div className="min-h-screen flex bg-background-dark text-text-dark">
      <aside className="w-64 bg-background-light border border-slate-300/30 py-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 p-3">Admin Dashboard</h2>
        <ul className="space-y-1">
          <li
            className={`p-3 cursor-pointer flex items-center space-x-3 hover:bg-primary-dark ${activeSection === 'products' ? 'bg-primary-dark' : ''}`}
            onClick={() => setActiveSection('products')}
          >
            <FaBox className="text-xl" />
            <span>Manage Products</span>
          </li>
          <li
            className={`p-3 cursor-pointer flex items-center space-x-3 hover:bg-primary-dark ${activeSection === 'users' ? 'bg-primary-dark' : ''}`}
            onClick={() => setActiveSection('users')}
          >
            <FaUsers className="text-xl" />
            <span>Manage Users</span>
          </li>
          <li
            className={`p-3 cursor-pointer flex items-center space-x-3 hover:bg-primary-dark ${activeSection === 'orders' ? 'bg-primary-dark' : ''}`}
            onClick={() => setActiveSection('orders')}
          >
            <FaShoppingCart className="text-xl" />
            <span>Manage Orders</span>
          </li>
        </ul>
      </aside>

      <main className="flex-1 p-8">
        <div className="space-y-6">
          {activeSection === 'users' && (
            <div>
              <h2 className="text-3xl font-bold mb-4 flex items-center">
                <FaUsers className="mr-3" /> Manage Users
              </h2>
              <ManageUsers />
            </div>
          )}
          {activeSection === 'products' && (
            <div>
              <ManageProducts />
            </div>
          )}
          {activeSection === 'orders' && (
            <div>
              <h2 className="text-3xl font-bold mb-4 flex items-center">
                <FaShoppingCart className="mr-3" /> Manage Orders
              </h2>
              <ManageOrders />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
