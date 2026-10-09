import React from "react";
import { User, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const AVATAR_IMAGE_URL =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80";

export default function Header({ isMenuOpen, setIsMenuOpen }) {
  return (
    <>
      <header className="relative z-50 w-[95%] mx-auto pt-4 px-2 sm:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-2.5 cursor-pointer select-none">
          <div className="relative w-48 sm:w-55 lg:w-60 flex items-center justify-center transition-all duration-200">
            <img
              src="/images/logo.png"
              alt="Travel Tent Logo"
              className="w-full object-contain"
            />
          </div>
        </div>

        {/* Menu Container / User Profile Button */}
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle user menu"
            className="bg-[rgba(38,187,253,1)] hover:bg-cyan-400 text-white p-1.5 sm:p-2 rounded-lg shadow-sm transition-colors duration-200 flex items-center gap-1 focus:outline-none cursor-pointer"
          >
            <User className="w-4 h-4 sm:w-5 sm:h-5" />
            <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Large Screens (lg+) Dropdown Menu */}
          {isMenuOpen && (
            <div className="hidden lg:block absolute right-0 top-full mt-2 z-50 bg-white rounded-xl shadow-xl p-6 border border-slate-100/80 w-[280px] text-slate-800">
              {/* User Info */}
              <div className="flex items-center gap-3.5 pb-6 border-b border-slate-100">
                <img
                  src={AVATAR_IMAGE_URL}
                  alt="John Dou"
                  className="w-12 h-12 rounded-full object-cover shrink-0"
                />
                <div className="overflow-hidden">
                  <h3 className="font-bold text-slate-900 text-base leading-tight">
                    John Dou
                  </h3>
                  <p className="text-xs text-slate-500 truncate mt-1 font-normal">
                    Johndouemail@gmail.com
                  </p>
                </div>
              </div>

              {/* Primary Nav Links */}
              <div className="py-6 space-y-5">
                <a
                  href="#requests"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-slate-800 hover:text-blue-600 font-bold text-sm transition-colors"
                >
                  My Requests
                </a>
                <a
                  href="#notifications"
                  onClick={() => setIsMenuOpen(false)}
                  className="inline-flex items-center gap-1 text-slate-800 hover:text-blue-600 font-bold text-sm transition-colors"
                >
                  <span>Notifications</span>
                  <span className="w-2 h-2 rounded-full bg-sky-400 -mt-2"></span>
                </a>
                <Link
                  to="/hotels"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-slate-800 hover:text-blue-600 font-bold text-sm transition-colors"
                >
                  About
                </Link>
                <a
                  href="#contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-slate-800 hover:text-blue-600 font-bold text-sm transition-colors"
                >
                  Contact
                </a>
              </div>

              <hr className="border-slate-100 my-0" />

              {/* Secondary Links */}
              <div className="pt-6 space-y-4">
                <a
                  href="#edit-profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-slate-400 hover:text-slate-600 text-sm font-medium transition-colors"
                >
                  Edit Profile
                </a>
                <a
                  href="#language"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-slate-400 hover:text-slate-600 text-sm font-medium transition-colors"
                >
                  Language
                </a>
                <a
                  href="#logout"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-slate-400 hover:text-red-500 text-sm font-medium transition-colors"
                >
                  Logout
                </a>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Backdrop overlay (Small/Medium screens only) */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Sidebar Drawer (Small/Medium screens only) */}
      <aside
        className={`lg:hidden fixed top-0 right-0 h-full w-[280px] sm:w-[320px] bg-white shadow-2xl z-50 p-6 border-l border-slate-100 flex flex-col justify-between overflow-y-auto transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          {/* Close Button & User Info */}
          <div className="flex items-start justify-between pb-6 border-b border-slate-100">
            <div className="flex items-center gap-3.5">
              <img
                src={AVATAR_IMAGE_URL}
                alt="John Dou"
                className="w-12 h-12 rounded-full object-cover shrink-0"
              />
              <div className="overflow-hidden">
                <h3 className="font-bold text-slate-900 text-base leading-tight">
                  John Dou
                </h3>
                <p className="text-xs text-slate-500 truncate mt-1 font-normal">
                  Johndouemail@gmail.com
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Primary Nav Links */}
          <nav className="py-6 space-y-5">
            <a
              href="#requests"
              onClick={() => setIsMenuOpen(false)}
              className="block text-slate-800 hover:text-blue-600 font-bold text-sm transition-colors"
            >
              My Requests
            </a>
            <a
              href="#notifications"
              onClick={() => setIsMenuOpen(false)}
              className="inline-flex items-center gap-1 text-slate-800 hover:text-blue-600 font-bold text-sm transition-colors"
            >
              <span>Notifications</span>
              <span className="w-2 h-2 rounded-full bg-sky-400 -mt-2"></span>
            </a>
            <Link
                  to="/hotels"
              onClick={() => setIsMenuOpen(false)}
              className="block text-slate-800 hover:text-blue-600 font-bold text-sm transition-colors"
            >
              About
            </Link>
            <a
              href="#contact"
              onClick={() => setIsMenuOpen(false)}
              className="block text-slate-800 hover:text-blue-600 font-bold text-sm transition-colors"
            >
              Contact
            </a>
          </nav>

          <hr className="border-slate-100 my-0" />

          {/* Secondary Links */}
          <div className="pt-6 space-y-4">
            <a
              href="#edit-profile"
              onClick={() => setIsMenuOpen(false)}
              className="block text-slate-400 hover:text-slate-600 text-sm font-medium transition-colors"
            >
              Edit Profile
            </a>
            <a
              href="#language"
              onClick={() => setIsMenuOpen(false)}
              className="block text-slate-400 hover:text-slate-600 text-sm font-medium transition-colors"
            >
              Language
            </a>
            <a
              href="#logout"
              onClick={() => setIsMenuOpen(false)}
              className="block text-slate-400 hover:text-red-500 text-sm font-medium transition-colors"
            >
              Logout
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
