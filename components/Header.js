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

            <div className="relative group">

  <button className="text-gray-700 hover:text-black transition flex items-center gap-1">

    Tools

    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>

  </button>

  {/* Dropdown */}

  <div className="absolute left-0 mt-3 w-64 bg-white border border-gray-200 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">

    <div className="p-3 flex flex-col">

    

      <Link
        href="/tools/broken-link-checker"
        className="px-4 py-3 rounded-xl hover:bg-gray-100 transition"
      >
        Broken Link Checker
      </Link>

      <Link
        href="/tools/domain-age-checker"
        className="px-4 py-3 rounded-xl hover:bg-gray-100 transition"
      >
        Domain Age Checker
      </Link>

      <Link
    href="/tools/link-analyzer"
    className="px-4 py-3 rounded-xl hover:bg-gray-100 transition"
  >
    Link Analyzer
  </Link>

  <Link
    href="/tools/schema-generator"
    className="px-4 py-3 rounded-xl hover:bg-gray-100 transition"
  >
    Schema Generator
  </Link>

  <Link
    href="/tools/intent-checker"
    className="px-4 py-3 rounded-xl hover:bg-gray-100 transition"
  >
    Intent Checker
  </Link>


    </div>

  </div>

</div>

            <Link
href="/tools/meta-generator"
>
Meta Generator
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

              <div className="flex flex-col gap-2">

  <p className="font-semibold text-black">
    Tools
  </p>

  
  <Link
    href="/tools/broken-link-checker"
    className="text-gray-700 hover:text-black pl-2"
  >
    Broken Link Checker
  </Link>

  <Link
    href="/tools/domain-age-checker"
    className="text-gray-700 hover:text-black pl-2"
  >
    Domain Age Checker
  </Link>

  <Link
    href="/tools/link-analyzer"
    className="text-gray-700 hover:text-black pl-2"
  >
    Link Analyzer
  </Link>

  <Link
    href="/tools/schema-generator"
    className="text-gray-700 hover:text-black pl-2"
  >
    Schema Generator
  </Link>

  <Link
    href="/tools/intent-checker"
    className="text-gray-700 hover:text-black pl-2"
  >
    Intent Checker
  </Link>



</div>

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