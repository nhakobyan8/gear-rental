"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import CartModal from '@/components/CartModal';

export default function Header() {
  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleCart = () => {
    if (isCartOpen) {
      setIsOpen(false);
    }
    setIsCartOpen(!isCartOpen);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setIsCartOpen(false);
  };

  if (!isMounted) return;

  return (
    <header className="bg-background-light bg-opacity-95 sticky top-0 z-10 text-text shadow-lg">
      <nav className="container mx-auto p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link className="w-20 h-20" href="/" passHref>
            <Image src="/images/logo.webp" width={500} height={500} className="rounded-full object-cover" alt="GearRental Logo" />
          </Link>
          <Link className="text-3xl font-extrabold" href="/" passHref>
            GearRental
          </Link>
        </div>
        <div>
          <ul
            className={`md:flex md:border-0 md:mx-3 border-r border-slate-400/20 w-64 fixed items-center p-4 h-full md:space-x-5 
            md:static top-0 left-0 right-0 bg-background-light md:bg-transparent z-30 md:z-auto space-y-2 md:space-y-0 md:mt-0 transition-transform duration-300 ease-in-out transform md:transform-none 
            ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
          >
            {[
              { href: "/", label: "Home" },
              { href: "/about", label: "About" },
              { href: "/products", label: "Products" },
            ].map((link) => (
              <li key={link.href}>
                <Link onClick={handleCloseModal} className="block py-2 rounded-md" href={link.href} passHref>
                  {link.label}
                </Link>
              </li>
            ))}
            <li className={`relative cursor-pointer py-2 inline-flex items-center ${totalItems > 0 && "p-3 pl-0"} text-center text-white`} onClick={toggleCart} >
              <span className="flex">Cart</span>
              <div className={`absolute inline-flex ${totalItems === 0 && "hidden"} items-center justify-center w-5 h-5 text-xs font-bold text-white bg-primary border-white rounded-full text-center -top-2 -end-2 dark:border-gray-900`}>{totalItems}</div>
            </li>
          </ul>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="focus:outline-none focus:ring-2 focus:ring-primary-light"
              aria-label={isOpen ? "Close Menu" : "Open Menu"}
              aria-expanded={isOpen}
            >
              <svg
                className={`w-6 h-6 transition-transform duration-300 ${isOpen ? "rotate-90" : "rotate-0"}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
      <CartModal isCartOpen={isCartOpen} toggleCart={toggleCart} />
      {(isOpen || isCartOpen) && (
        <div className="fixed inset-0 cursor-pointer z-10" onClick={handleCloseModal}></div>
      )}
    </header>
  );
}
