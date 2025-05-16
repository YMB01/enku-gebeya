'use client';

import React from 'react';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-lg z-50 transition-all ease-in-out duration-300">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center text-3xl font-extrabold text-green-600">
          <img
            src="/images/enku.png"
            alt="Logo"
            className="w-12 h-12 mr-3"
          />
          <span className="text-2xl text-gray-800">Enku Gebeya</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link href="/" className="text-gray-700 hover:text-orange-600 font-semibold transition duration-300 ease-in-out">
            Home
          </Link>
          <Link href="/products" className="text-gray-700 hover:text-orange-600 font-semibold transition duration-300 ease-in-out">
            Products
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-orange-600 font-semibold transition duration-300 ease-in-out">
            About
          </Link>
           <Link href="/finance" className="text-gray-700 hover:text-orange-600 font-semibold transition duration-300 ease-in-out">
            Finance
          </Link>
          <Link
            href="/signup"
            className="bg-[#FFA500] text-white px-6 py-2 rounded-lg hover:bg-orange-600 font-semibold transition duration-300 ease-in-out"
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg
            className="w-7 h-7 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 transition-all ease-in-out duration-300">
          <div className="container mx-auto px-6 py-6 flex flex-col space-y-4">
            <Link
              href="/"
              className="text-gray-700 hover:text-green-600 font-semibold transition duration-300 ease-in-out"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-gray-700 hover:text-green-600 font-semibold transition duration-300 ease-in-out"
              onClick={toggleMenu}
            >
              Products
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-green-600 font-semibold transition duration-300 ease-in-out"
              onClick={toggleMenu}
            >
              About
            </Link>
            <Link
              href="/login"
              className="bg-[#FFA500] text-white px-6 py-3 rounded-lg text-center hover:bg-orange-600 font-semibold transition duration-300 ease-in-out"
              onClick={toggleMenu}
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
