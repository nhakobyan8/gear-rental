"use client";

import { clearCart, removeItemFromCart } from '@/features/cartSlice';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Header() {
  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItemFromCart(id));
  };

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
        <ul
          className={`md:flex w-56 fixed items-center h-full md:space-x-5 md:static top-0 right-0 bg-background-light md:bg-transparent z-10 md:z-auto p-4 md:p-0 space-y-2 md:space-y-0 md:mt-0 transition-transform duration-300 ease-in-out transform md:transform-none ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <li className="md:hidden">
            <button
              onClick={toggleMenu}
              className="block md:hidden text-right w-full text-3xl p-2 rounded-md"
              aria-label="Close Menu"
            >
              ×
            </button>
          </li>
          <div className="relative">
            <button className={`relative inline-flex items-center ${totalItems > 0 && "p-3 pl-0"} font-medium text-center text-white`} onClick={toggleCart} >
              <span className="flex">Cart</span>
              {totalItems > 0 && <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-primary border-white rounded-full -top-2 -end-2 dark:border-gray-900">{totalItems}</div>}
            </button>
            {isCartOpen && (
              <div className="absolute border border-slate-400/20 right-0 mt-2 w-80 bg-background p-4 rounded-lg shadow-lg z-50">
                {cartItems.length === 0 ? (
                  <p className="text-center">Your cart is empty</p>
                ) : (
                  <div>
                    <ul className="space-y-4">
                      {cartItems.map((item) => (
                        <li key={item.id} className="flex justify-between items-center">
                          <div>
                            <p className="font-semibold">{item.name}</p>
                            <p className="text-sm text-primary">Quantity: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">${item.totalPrice}</p>
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-red-500 text-sm"
                            >
                              Remove
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 flex justify-between">
                      <button
                        onClick={() => dispatch(clearCart())}
                        className="text-sm text-red-500"
                      >
                        Clear Cart
                      </button>
                      <button>
                        <Link className="inline-block px-3 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-transform duration-300 ease-in-out transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-light" href="/checkout" passHref>
                          Proceed to Checkout
                        </Link>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          {[
            { href: "/", label: "Home" },
            { href: "/about", label: "About" },
            { href: "/products", label: "Products" },
          ].map((link) => (
            <li key={link.href}>
              <Link onClick={() => {
                toggleMenu();
                setIsCartOpen(false);
              }}
                className="block py-2 rounded-md" href={link.href} passHref>
                {link.label}
              </Link>
            </li>
          ))}

        </ul>
      </nav>
    </header>
  );
}
