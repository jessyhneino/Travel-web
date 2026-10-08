import React, { useState } from "react";
import { Plane, Building2, CreditCard, ChevronDown } from "lucide-react";

export default function Hero() {
  const [activeTab, setActiveTab] = useState("hotel");
  const [goingTo, setGoingTo] = useState("Spain");
  const [dateRange, setDateRange] = useState("Oct 23 - Nov 20");
  const [travelers, setTravelers] = useState("1 room, 2 travelers");

  const BACKGROUND_IMAGE_URL = "/images/Rectangle.png";

  return (
    <div
      className="relative w-full overflow-x-hidden min-h-screen lg:overflow-visible top-[-50px]
"
    >
      {/* 1. Background Image Container */}
      <div className="absolute inset-0 z-0 h-[100vh] md:h-[90vh] w-full">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat relative"
          style={{
            backgroundImage: `url(${BACKGROUND_IMAGE_URL})`,
            WebkitClipPath: "url(#heroWaveClip)",
          }}
        >
          {/* حاوية صورة المنحنيات بالأسفل */}
          <div className="absolute bottom-0 left-0 w-full pointer-events-none z-10">
            <img
              src="/images/Group.png"
              alt="Wave curves"
              className="w-full h-auto block object-cover"
            />
          </div>
          {/* <div className="absolute inset-0 bg-sky-900/10 backdrop-brightness-[1.02]" /> */}
        </div>
      </div>

      {/* 2. Main Content Section */}
      <main className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12 sm:pb-16 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mt-10">
          {/* Left Spacer - ينفي وجود المساحة إلا على الشاشات الكبيرة */}
          <div className="hidden lg:block lg:col-span-2"></div>

          {/* Center Search Card */}
          <div className="lg:col-span-7 flex flex-col items-center pt-2 w-full">
            {/* Logo Watermark */}
            <div className="mb-3 opacity-90 transition-all">
              <img
                src="/images/icon.png"
                alt="Logo Watermark"
                className="w-[100px] h-[100px]  object-contain filter drop-shadow"
              />
            </div>

            {/* Search Box Card */}
            <div className="w-full max-w-full sm:max-w-md md:max-w-lg bg-white rounded-2xl p-4 sm:p-6 shadow-lg sm:shadow-sm border border-slate-100/80 backdrop-blur-sm">
              {/* Category Tabs */}
              <div className="flex items-center justify-between sm:justify-center gap-2 sm:gap-6 md:gap-8 mb-5 sm:mb-6">
                <button
                  type="button"
                  onClick={() => setActiveTab("flight")}
                  className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-all rounded-lg flex-1 sm:flex-none ${
                    activeTab === "flight"
                      ? "bg-blue-50 text-blue-600 font-semibold"
                      : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <Plane className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 shrink-0" />
                  <span>Flight</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("hotel")}
                  className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium transition-all rounded-lg flex-1 sm:flex-none ${
                    activeTab === "hotel"
                      ? "bg-blue-50/80 text-blue-600 font-semibold"
                      : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 shrink-0" />
                  <span>Hotel</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("visa")}
                  className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-all rounded-lg flex-1 sm:flex-none ${
                    activeTab === "visa"
                      ? "bg-blue-50 text-blue-600 font-semibold"
                      : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 shrink-0" />
                  <span>Visa</span>
                </button>
              </div>

              {/* Form Controls */}
              <div className="space-y-3">
                {/* Destination Input */}
                <div className="border border-blue-400 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 bg-white flex items-center gap-1.5 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
                  <span className="text-slate-500 text-xs sm:text-sm whitespace-nowrap">
                    Going to:
                  </span>
                  <input
                    type="text"
                    value={goingTo}
                    onChange={(e) => setGoingTo(e.target.value)}
                    className="w-full text-blue-600 font-semibold text-xs sm:text-sm focus:outline-none bg-transparent"
                    placeholder="Spain"
                  />
                </div>

                {/* Dates & Travelers Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Date Input */}
                  <div className="border border-blue-400 rounded-xl px-3.5 sm:px-4 py-2 sm:py-2.5 bg-white flex justify-between items-center cursor-pointer">
                    <div className="w-full">
                      <label className="block text-[10px] sm:text-xs font-normal text-slate-400 mb-0.5">
                        Check in-out:
                      </label>
                      <input
                        type="text"
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                        className="w-full text-blue-600 font-semibold text-xs sm:text-sm focus:outline-none bg-transparent"
                        placeholder="Oct 23 - Nov 20"
                      />
                    </div>
                    <ChevronDown className="w-4 h-4 text-slate-500 shrink-0 ml-1 fill-slate-500" />
                  </div>

                  {/* Travelers Input */}
                  <div className="border border-blue-400 rounded-xl px-3.5 sm:px-4 py-2 sm:py-2.5 bg-white flex justify-between items-center cursor-pointer">
                    <div className="w-full">
                      <label className="block text-[10px] sm:text-xs font-normal text-slate-400 mb-0.5">
                        Travelers
                      </label>
                      <input
                        type="text"
                        value={travelers}
                        onChange={(e) => setTravelers(e.target.value)}
                        className="w-full text-blue-600 font-semibold text-xs sm:text-sm focus:outline-none bg-transparent"
                        placeholder="1 room, 2 travelers"
                      />
                    </div>
                    <ChevronDown className="w-4 h-4 text-slate-500 shrink-0 ml-1 fill-slate-500" />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="button"
                  className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-medium py-3 sm:py-3.5 rounded-xl transition-all text-xs sm:text-sm font-semibold mt-2 cursor-pointer shadow-md shadow-blue-500/20"
                >
                  Find Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Decorative Bottom Leaf - مخفية على الشاشات الصغير والمتوسطة (hidden) وتظهر فقط بداية من الشاشات الكبيرة (lg:block) */}
      <div className="hidden lg:block absolute left-0 top-[130px] z-30 w-96 sm:w-[500px] md:w-[650px] lg:w-[800px] pointer-events-none select-none">
        <img
          src="/images/Isolation_Mode.png"
          alt="Leaf Decorative Art"
          className="w-[300px] h-[624px] transform"
        />
      </div>
    </div>
  );
}
