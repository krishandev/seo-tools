"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-black"
          >
            LinkGuard
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-black transition"
            >
              Home
            </Link>

            <Link
              href="#features"
              className="text-gray-700 hover:text-black transition"
            >
              Features
            </Link>

            <Link
              href="#tools"
              className="text-gray-700 hover:text-black transition"
            >
              Tools
            </Link>

            <Link
              href="#contact"
              className="text-gray-700 hover:text-black transition"
            >
              Contact
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button className="bg-black text-white px-5 py-2 rounded-xl hover:bg-gray-800 transition-all duration-300">
              Start Free Scan
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5m-16.5 5.25h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden py-5 border-t border-gray-200">
            <div className="flex flex-col gap-4">
              
              <Link
                href="/"
                className="text-gray-700 hover:text-black"
              >
                Home
              </Link>

              <Link
                href="#features"
                className="text-gray-700 hover:text-black"
              >
                Features
              </Link>

              <Link
                href="#tools"
                className="text-gray-700 hover:text-black"
              >
                Tools
              </Link>

              <Link
                href="#contact"
                className="text-gray-700 hover:text-black"
              >
                Contact
              </Link>

              <button className="bg-black text-white px-5 py-3 rounded-xl mt-2 hover:bg-gray-800 transition-all duration-300">
                Start Free Scan
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}