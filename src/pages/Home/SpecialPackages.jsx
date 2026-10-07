import React, { useState } from "react";
import { packagesData } from "../Home/data/packagesData";

export default function SpecialPackages() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % packagesData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? packagesData.length - 1 : prevIndex - 1
    );
  };

  const currentPackage = packagesData[currentIndex];
  const formatNumber = (num) => (num < 10 ? `0${num}` : num);

  return (
    <section className="relative w-full max-w-6xl mx-auto overflow-hidden bg-white text-[#1e293b] px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-14">
      {/* Background Circle */}
      <div className="absolute top-1/2 -right-20 sm:-right-16 -translate-y-1/2 w-36 h-36 sm:w-48 sm:h-48 rounded-full border border-sky-300 opacity-60 pointer-events-none" />

      {/* Main Title */}
      <div className="relative text-center mb-8 sm:mb-10 lg:mb-12">
        <h2 className="text-lg sm:text-xl font-bold tracking-[0.2em] text-[#1d2753] uppercase">
          SPECIAL PACKAGES
        </h2>
      </div>

      {/* Main Content */}
      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-8 items-center w-full">
        {/* Left Column */}
        <div className="lg:col-span-6 w-full flex flex-col items-center lg:items-start justify-center space-y-5 sm:space-y-6 text-center lg:text-left transition-all duration-300">
          <h3 className="text-xl sm:text-2xl font-bold text-[#1d2753] w-full">
            {currentPackage.title}
          </h3>

          <p className="text-gray-500 text-sm sm:text-[15px] leading-relaxed max-w-xl w-full">
            {currentPackage.description}
          </p>

          {/* Features */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 sm:gap-x-6 gap-y-3 text-sm font-medium pt-1 w-full">
            {currentPackage.features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sky-400">
                <svg
                  className="w-4 h-4 shrink-0 stroke-current fill-none stroke-2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-400">{feature}</span>
              </div>
            ))}
          </div>

          {/* View Details Button */}
          <div className="pt-1 sm:pt-2">
            <button className="px-5 sm:px-6 py-2.5 text-sm font-semibold text-sky-600 bg-white border border-sky-300 rounded-lg shadow-sm hover:bg-sky-50 transition-all duration-200">
              View Details
            </button>
          </div>
        </div>

        {/* Right Column - Image */}
        <div className="lg:col-span-6 w-full flex items-center justify-center lg:justify-end relative">
          <div className="relative w-full max-w-[320px] sm:max-w-[380px] lg:max-w-md h-[260px] sm:h-[320px] lg:h-[380px] drop-shadow-xl">
            <img
              src={currentPackage.image}
              alt={currentPackage.title}
              className="w-full h-full object-contain transition-all duration-300"
            />
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="relative flex items-center justify-between gap-4 mt-8 sm:mt-10 lg:mt-12 pt-5 sm:pt-6 border-t border-gray-100 text-sm font-medium text-sky-500 w-full">
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer select-none shrink-0"
        >
          <div className="w-7 h-7 rounded-full border border-sky-400 flex items-center justify-center text-sm">
            &#8592;
          </div>
          <span className="uppercase tracking-wider text-[10px] sm:text-xs font-bold">
            PREVIOUS
          </span>
        </button>

        {/* Counter */}
        <div className="text-gray-400 text-[10px] sm:text-xs tracking-wider font-semibold text-center whitespace-nowrap">
          Showing {formatNumber(currentIndex + 1)}/
          {formatNumber(packagesData.length)}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer select-none shrink-0"
        >
          <span className="uppercase tracking-wider text-[10px] sm:text-xs font-bold">
            NEXT
          </span>
          <div className="w-7 h-7 rounded-full border border-sky-400 flex items-center justify-center text-sm">
            &#8594;
          </div>
        </button>
      </div>
    </section>
  );
}
