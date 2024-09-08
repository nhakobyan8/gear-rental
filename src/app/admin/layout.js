"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUsers, FaBox, FaShoppingCart, FaHome } from "react-icons/fa";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState(router.pathname);

  const handleNavigation = (path) => {
    setActiveSection(path);
    router.push(path);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background-dark text-text-dark">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-background-light border border-slate-300/30 py-6 shadow-lg md:min-h-screen">
        <h2 className="text-2xl font-bold mb-6 p-3 text-center md:text-left">Admin Dashboard</h2>
        <ul className="space-y-1">

          <li
            className={`p-3 cursor-pointer flex items-center justify-center md:justify-start space-x-3 hover:bg-primary-dark ${activeSection === '/admin/products' ? 'bg-primary-dark' : ''}`}
            onClick={() => handleNavigation('/admin/products')}
          >
            <FaBox className="text-xl" />
            <span>Manage Products</span>
          </li>
          <li
            className={`p-3 cursor-pointer flex items-center justify-center md:justify-start space-x-3 hover:bg-primary-dark ${activeSection === '/admin/users' ? 'bg-primary-dark' : ''}`}
            onClick={() => handleNavigation('/admin/users')}
          >
            <FaUsers className="text-xl" />
            <span>Manage Users</span>
          </li>
          <li
            className={`p-3 cursor-pointer flex items-center justify-center md:justify-start space-x-3 hover:bg-primary-dark ${activeSection === '/admin/orders' ? 'bg-primary-dark' : ''}`}
            onClick={() => handleNavigation('/admin/orders')}
          >
            <FaShoppingCart className="text-xl" />
            <span>Manage Orders</span>
          </li>
        </ul>
      </aside>

      <main className="flex-1 px-3 py-5">
        {children}
      </main>
    </div>
  );
}
