import React from "react";
import { Plane, Palmtree, Landmark, Globe, Compass } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-white text-gray-600 font-sans py-12 px-4 sm:px-12 md:px-16 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Logo Header Section */}
        <div className="mb-8">
          <div className="w-56">
            <img
              src="/images/logo.png"
              alt="Travel Tent Logo"
              className="w-full object-contain"
            />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-gray-100">
          {/* Column 1: Info Sections (Travel With Us & Partner With Us) */}
          <div className="lg:col-span-5 space-y-6 text-sm">
            {/* Travel With Us Section */}
            <div>
              <div className="flex items-center gap-2 mb-2 font-bold text-[#3B82F6] uppercase tracking-wide text-xs">
                <span className="h-2 w-2 rounded-full bg-[#3B82F6] inline-block"></span>
                <span>TRAVEL WITH US</span>
              </div>
              <p className="text-gray-400 text-[13px] leading-relaxed pl-4 max-w-sm">
                No matter who you are, or where you are going, our travel brands
                help every type of traveler not only find the trip that's right
                for them, but get the best value every time.
              </p>

              {/* Category Icons Row */}
              <div className="flex items-center gap-4 mt-3 pl-4 text-[#00AEFF]">
                <Plane className="w-5 h-5 cursor-pointer hover:opacity-80 transition-opacity" />
                <Palmtree className="w-5 h-5 cursor-pointer hover:opacity-80 transition-opacity" />
                <Landmark className="w-5 h-5 cursor-pointer hover:opacity-80 transition-opacity" />
                <Globe className="w-5 h-5 cursor-pointer hover:opacity-80 transition-opacity" />
                <Compass className="w-5 h-5 cursor-pointer hover:opacity-80 transition-opacity" />
              </div>
            </div>

            {/* Partner With Us Section */}
            <div>
              <div className="flex items-center gap-2 mb-2 font-bold text-[#3B82F6] uppercase tracking-wide text-xs">
                <span className="h-2 w-2 rounded-full bg-[#3B82F6] inline-block"></span>
                <span>PARTNER WITH US</span>
              </div>
              <p className="text-gray-400 text-[13px] leading-relaxed pl-4 max-w-sm">
                We connect partners big and small to the universe of travelers,
                giving access to data, tools and technology that empowers,
                maximizes potential and builds their business.
              </p>
            </div>
          </div>

          {/* Column 2: Company */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-bold text-sky-600 uppercase tracking-wider text-xs mb-4">
              COMPANY
            </h3>
            <ul className="space-y-2.5 text-xs text-gray-500">
              <li>
                <a href="#" className="hover:text-cyan-500 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-500 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-500 transition-colors">
                  Share
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-500 transition-colors">
                  Help
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-500 transition-colors">
                  Language
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Policies */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-bold text-sky-600 uppercase tracking-wider text-xs mb-4">
              POLICIES
            </h3>
            <ul className="space-y-2.5 text-xs text-gray-500">
              <li>
                <a href="#" className="hover:text-cyan-500 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-500 transition-colors">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Connect With Us */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-bold text-sky-600 uppercase tracking-wider text-xs mb-4">
              CONNECT WITH US
            </h3>
            <ul className="space-y-2.5 text-xs text-gray-500">
              <li>
                <a href="#" className="hover:text-cyan-500 transition-colors">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-500 transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-500 transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-500 transition-colors">
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Gateways */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© 2023 Travel Tent. All rights reserved.</p>

          {/* Payment Badges */}
          <div className="flex items-center gap-2 flex-wrap">
           <img className="h-6 w-auto object-contain" src="/images/Group2.png" />
          </div>
        </div>
      </div>
    </footer>
  );
}
