"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useSession, signOut } from 'next-auth/react';
import { FaRegUserCircle, FaSignOutAlt, FaShoppingCart } from "react-icons/fa";
import CartModal from '@/components/CartModal';

export default function Header() {
  const cartItems = useSelector((state) => state.cart.items);
  const [isMounted, setIsMounted] = useState(false);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const { data: session, status } = useSession();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Set mounted state to true to avoid SSR issues
    setIsMounted(true);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
    if (isCartOpen) setIsCartOpen(false);
  }, [isCartOpen]);

  const toggleCart = useCallback(() => {
    setIsCartOpen((prev) => !prev);
    if (isMenuOpen) setIsMenuOpen(false);
  }, [isMenuOpen]);

  const handleSignOut = useCallback(() => {
    signOut();
  }, []);

  const renderAuthLinks = useCallback(() => {
    if (status === 'loading') return <li>Loading...</li>;

    if (!session) {
      return (
        <Link onClick={handleCloseModal} href="/auth" >
          <ul>
            <li>Auth</li>
          </ul>
        </Link>
      );
    }

    return (
      <ul className="flex justify-between items-center space-x-5">
        <li>
          <Link onClick={handleCloseModal} href={session.user.role === 'admin' ? "/admin" : "/account"} passHref>
            <FaRegUserCircle size={25} />
          </Link>
        </li>
        <li>
          <button onClick={handleSignOut} className="block py-2 rounded-md">
            <FaSignOutAlt size={25} />
          </button>
        </li>
      </ul>
    );
  }, [status, session]);

  const handleCloseModal = useCallback(() => {
    setIsMenuOpen(false);
    setIsCartOpen(false);
  }, []);

  if (!isMounted) return null;

  return (
    <header className="bg-background-light bg-opacity-95 sticky top-0 z-10 text-text shadow-lg">
      <nav className="container mx-auto p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href="/" passHref>
            <Image src="/images/logo.webp" width={500} height={500} className="rounded-full object-cover w-20 h-20" alt="GearRental Logo" />
          </Link>
          <Link href="/" passHref>
            <span className="text-3xl font-extrabold hidden md:block">GearRental</span>
          </Link>
        </div>

        <ul
          className={`md:flex md:border-0 border border-slate-400/20 md:mx-3 w-64 md:w-auto fixed md:static top-0 left-0 right-0 p-4 md:p-0 bg-background-light md:bg-transparent z-30 h-full md:h-auto transition-transform duration-300 ease-in-out transform md:transform-none ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} space-y-5 md:space-y-0 md:space-x-7 items-center`} >
          <li>
            <Link onClick={handleCloseModal} href="/" passHref>
              Home
            </Link>
          </li>
          <li>
            <Link onClick={handleCloseModal} href="/about" passHref>
              About
            </Link>
          </li>
          <li>
            <Link onClick={handleCloseModal} href="/products" passHref>
              Products
            </Link>
          </li>
          <li>
            <Link onClick={handleCloseModal} href="/license" passHref>
              License
            </Link>
          </li>
        </ul>

        <div className="flex items-center space-x-5">
          <button
            onClick={toggleCart}
            className={`relative cursor-pointer ${totalItems && "p-3"}  inline-flex items-center text-center text-white`}
          >
            <span><FaShoppingCart size={25} /></span>
            <div className={`absolute inline-flex ${totalItems === 0 && "hidden"} items-center justify-center w-5 h-5 text-xs font-bold text-white bg-primary border-white rounded-full -top-2 -end-2`}>
              {totalItems}
            </div>

          </button>
          {renderAuthLinks()}
          <button
            onClick={toggleMenu}
            className="focus:outline-none focus:ring-2 focus:ring-primary-light md:hidden"
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
            aria-expanded={isMenuOpen}
          >
            <svg
              className={`w-6 h-6 transition-transform duration-300 ${isMenuOpen ? "rotate-90" : "rotate-0"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              />
            </svg>
          </button>
        </div>
      </nav>
      <CartModal isCartOpen={isCartOpen} toggleCart={toggleCart} />
      {(isMenuOpen || isCartOpen) && (
        <div className="fixed inset-0 cursor-pointer z-10" onClick={handleCloseModal}></div>
      )}
    </header>
  );
}
