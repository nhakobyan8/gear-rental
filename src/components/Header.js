"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-background-light bg-opacity-95 sticky top-0 z-10 text-text shadow-lg">
      <nav className="container mx-auto p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link className="w-20 h-20" href="/" passHref>
            <img src="/images/logo.webp" className="rounded-full object-cover" alt="GearRental Logo" />
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
          className={`md:flex w-56 fixed h-full md:space-x-4 md:static top-0 right-0 bg-background-light md:bg-transparent z-10 md:z-auto p-4 md:p-0 space-y-2 md:space-y-0 md:mt-0 transition-transform duration-300 ease-in-out transform md:transform-none ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <li className="md:hidden">
            <button
              onClick={toggleMenu}
              className="block md:hidden text-right w-full text-lg p-2 rounded-md"
              aria-label="Close Menu"
            >
              🗙
            </button>
          </li>
          {[
            { href: "/", label: "Home" },
            { href: "/about", label: "About" },
            { href: "/products", label: "Products" },
          ].map((link) => (
            <li key={link.href}>
              <Link onClick={toggleMenu}
                className="block py-2 px-4 rounded-md hover:text-white border-0 transition-all hover:border-gray-400" href={link.href} passHref>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
