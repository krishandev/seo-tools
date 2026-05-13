import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Top Footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold mb-4">
              LinkGuard
            </h2>

            <p className="text-gray-400 leading-7">
              Professional broken link checker tool for SEO experts,
              agencies, developers, and website owners.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white transition"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="#features"
                  className="text-gray-400 hover:text-white transition"
                >
                  Features
                </Link>
              </li>

              <li>
                <Link
                  href="#tools"
                  className="text-gray-400 hover:text-white transition"
                >
                  SEO Tools
                </Link>
              </li>

              <li>
                <Link
                  href="#contact"
                  className="text-gray-400 hover:text-white transition"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* SEO Tools */}
          <div>
            <h3 className="text-xl font-semibold mb-5">
              SEO Tools
            </h3>

            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Broken Link Checker
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  SEO Audit Tool
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Sitemap Generator
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Robots.txt Generator
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-semibold mb-5">
              Stay Updated
            </h3>

            <p className="text-gray-400 mb-4">
              Get latest SEO tips and updates.
            </p>

            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 rounded-xl bg-white text-black outline-none"
              />

              <button className="bg-white text-black px-4 py-3 rounded-xl font-medium hover:bg-gray-200 transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 mt-14 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          
          <p className="text-gray-500 text-sm text-center md:text-left">
            © 2026 LinkGuard. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="text-gray-500 hover:text-white text-sm transition"
            >
              Privacy Policy
            </Link>

            <Link
              href="#"
              className="text-gray-500 hover:text-white text-sm transition"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}