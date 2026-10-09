import React, { useState } from "react";
import { Plane, Building2, CreditCard, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

// زيادة مدة الحركة (duration) وإضافة إبطاء أعمق عبر ease
const SLOW_FADE_IN = {
  hidden: { opacity: 0, y: 35, scale: 0.96 },
  visible: (customDelay = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.5, // زادت المدة لتكون أبطأ وأكثر سلاسة
      ease: [0.16, 1, 0.3, 1], // منحنى حركي هادئ
      delay: customDelay,
    },
  }),
};

export default function Hero() {
  const [activeTab, setActiveTab] = useState("hotel");
  const [goingTo, setGoingTo] = useState("Spain");
  const [dateRange, setDateRange] = useState("Oct 23 - Nov 20");
  const [travelers, setTravelers] = useState("1 room, 2 travelers");

  const BACKGROUND_IMAGE_URL = "/images/Rectangle.png";

  const tabs = [
    { id: "flight", label: "Flight", icon: Plane },
    { id: "hotel", label: "Hotel", icon: Building2 },
    { id: "visa", label: "Visa", icon: CreditCard },
  ];

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden lg:overflow-visible -top-[50px]">
      {/* 1. Background Image Container */}
      <div className="absolute inset-0 z-0 h-[100vh] md:h-[90vh] w-full">
        <div
          className="relative w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${BACKGROUND_IMAGE_URL})`,
            WebkitClipPath: "url(#heroWaveClip)",
          }}
        >
          {/* المنحنيات بالأسفل */}
          <div className="absolute bottom-0 left-0 z-10 w-full pointer-events-none">
            <img
              src="/images/Group.png"
              alt="Wave curves"
              className="block object-cover w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* 2. Main Content Section */}
      <main className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12 sm:pb-16 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mt-10">
          {/* Left Spacer */}
          <div className="hidden lg:block lg:col-span-2" />

          {/* Center Search Card */}
          <div className="flex flex-col items-center w-full pt-2 lg:col-span-7">
            {/* Logo Watermark - حركة أبطأ */}
            <motion.div
              className="mb-3 opacity-90"
              initial={{ opacity: 0, scale: 0.75, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 1.4, // تمت زيادة المدة من 0.8 إلى 1.4 ثانية
                ease: [0.16, 1, 0.3, 1],
                delay: 0.3,
              }}
            >
              <img
                src="/images/icon.png"
                alt="Logo Watermark"
                className="w-[100px] h-[100px] object-contain filter drop-shadow"
              />
            </motion.div>

            {/* Search Box Card - حركة أبطأ */}
            <motion.div
              className="w-full max-w-full sm:max-w-md md:max-w-lg bg-white rounded-2xl p-4 sm:p-6 shadow-lg sm:shadow-sm border border-slate-100/80 backdrop-blur-sm"
              variants={SLOW_FADE_IN}
              initial="hidden"
              animate="visible"
              custom={0.6} // تأخير طفيف ليظهر بعد اللوجو بسلاسة
            >
              {/* Category Tabs */}
              <div className="flex items-center justify-between sm:justify-center gap-2 sm:gap-6 md:gap-8 mb-5 sm:mb-6">
                {tabs.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setActiveTab(id)}
                    className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm transition-all rounded-lg flex-1 sm:flex-none ${
                      activeTab === id
                        ? "bg-blue-50 text-blue-600 font-semibold"
                        : "text-slate-700 hover:text-slate-900 hover:bg-slate-50 font-medium"
                    }`}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 shrink-0" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>

              {/* Form Controls */}
              <div className="space-y-3">
                {/* Destination Input */}
                <div className="border border-blue-400 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 bg-white flex items-center gap-1.5 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
                  <span className="text-xs sm:text-sm text-slate-500 whitespace-nowrap">
                    Going to:
                  </span>
                  <input
                    type="text"
                    value={goingTo}
                    onChange={(e) => setGoingTo(e.target.value)}
                    className="w-full text-xs font-semibold text-blue-600 bg-transparent sm:text-sm focus:outline-none"
                    placeholder="Spain"
                  />
                </div>

                {/* Dates & Travelers Grid */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {/* Date Input */}
                  <div className="border border-blue-400 rounded-xl px-3.5 sm:px-4 py-2 sm:py-2.5 bg-white flex justify-between items-center cursor-pointer">
                    <div className="w-full">
                      <label className="block text-[10px] sm:text-xs text-slate-400 mb-0.5">
                        Check in-out:
                      </label>
                      <input
                        type="text"
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                        className="w-full text-xs font-semibold text-blue-600 bg-transparent sm:text-sm focus:outline-none"
                        placeholder="Oct 23 - Nov 20"
                      />
                    </div>
                    <ChevronDown className="w-4 h-4 ml-1 text-slate-500 shrink-0 fill-slate-500" />
                  </div>

                  {/* Travelers Input */}
                  <div className="border border-blue-400 rounded-xl px-3.5 sm:px-4 py-2 sm:py-2.5 bg-white flex justify-between items-center cursor-pointer">
                    <div className="w-full">
                      <label className="block text-[10px] sm:text-xs text-slate-400 mb-0.5">
                        Travelers
                      </label>
                      <input
                        type="text"
                        value={travelers}
                        onChange={(e) => setTravelers(e.target.value)}
                        className="w-full text-xs font-semibold text-blue-600 bg-transparent sm:text-sm focus:outline-none"
                        placeholder="1 room, 2 travelers"
                      />
                    </div>
                    <ChevronDown className="w-4 h-4 ml-1 text-slate-500 shrink-0 fill-slate-500" />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="button"
                  className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-semibold py-3 sm:py-3.5 rounded-xl transition-all text-xs sm:text-sm mt-2 cursor-pointer shadow-md shadow-blue-500/20"
                >
                  Find Now
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Decorative Bottom Leaf - حركة أبطأ */}
      <motion.div
        className="hidden lg:block absolute left-0 top-[130px] z-30 w-96 sm:w-[500px] md:w-[650px] lg:w-[800px] pointer-events-none select-none"
        initial={{ opacity: 0, x: -80, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{
          duration: 1.8, // تمت زيادة المدة من 1.2 إلى 1.8 ثانية
          ease: [0.16, 1, 0.3, 1],
          delay: 0.8,
        }}
      >
        <img
          src="/images/Isolation_Mode.png"
          alt="Leaf Decorative Art"
          className="w-[300px] h-[624px] transform"
        />
      </motion.div>
    </div>
  );
}
