import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { packagesData } from "../Home/data/packagesData";

// تتابع ظهور الميزات بفارق زمني أبطأ وأهدأ
const featuresContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // زيادة الفارق الزمني بين كل ميزة والأخرى
      delayChildren: 0.2,    // تأخير بسيط قبل البدء ليعطي انطباعاً أهدأ
    },
  },
};

const featureItemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } // حركة ظهور الميزات أبطأ
  },
};

// حركة Slide + Fade أبطأ وأكثر انسيابية
const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
    scale: 0.96,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.85, // زيادة زمن الدخول ليكون أبطأ وأكثر فخامة (كان 0.45)
      ease: [0.16, 1, 0.3, 1], // منحنى انسيابي هادئ جداً (Ease Out Cubic)
    },
  },
  exit: (direction) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0,
    scale: 0.96,
    transition: {
      duration: 0.65, // زمن خروج أبطأ (كان 0.35)
      ease: [0.7, 0, 0.84, 0],
    },
  }),
};

export default function SpecialPackages() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % packagesData.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? packagesData.length - 1 : prevIndex - 1
    );
  };

  const currentPackage = packagesData[currentIndex];
  const formatNumber = (num) => (num < 10 ? `0${num}` : num);

  return (
    <section className="relative w-full overflow-hidden bg-white text-[#1e293b] px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-14">
      {/* Background Floating Circle */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 9, // إبطاء نبض الدائرة الخلفية
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 -right-20 sm:-right-16 -translate-y-1/2 w-36 h-36 sm:w-48 sm:h-48 rounded-full border border-sky-300 opacity-60 pointer-events-none"
      />

      {/* Main Title */}
      <div className="relative text-center mb-8 sm:mb-10 lg:mb-12">
        <h2 className="text-lg sm:text-xl font-bold tracking-[0.2em] text-[#1d2753] uppercase">
          SPECIAL PACKAGES
        </h2>
      </div>

      {/* Main Content Area */}
      <div className="relative w-full pl-8 pr-2 min-h-[420px] flex items-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="grid w-full grid-cols-1 items-center gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-10"
          >
            {/* Right Column - Image */}
            <div className="order-1 flex w-full items-center justify-center lg:order-2 lg:col-span-6 lg:justify-end">
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.5, ease: "easeOut" }} // استجابة تحويم أبطأ
                className="relative h-[220px] w-full max-w-[260px] drop-shadow-xl xs:max-w-[300px] sm:h-[300px] sm:max-w-[380px] md:h-[340px] lg:h-[380px] lg:max-w-md"
              >
                <img
                  src={currentPackage.image}
                  alt={currentPackage.title}
                  className="h-full w-full object-contain"
                />
              </motion.div>
            </div>

            {/* Left Column - Text */}
            <div className="order-2 flex w-full flex-col items-center justify-between gap-5 text-center sm:gap-6 lg:order-1 lg:col-span-6 lg:items-start lg:text-left">
              <h3 className="w-full text-xl font-bold text-[#1d2753] sm:text-2xl md:text-3xl">
                {currentPackage.title}
              </h3>

              <p className="w-full max-w-xl text-sm leading-relaxed text-gray-500 sm:text-[15px] md:text-base">
                {currentPackage.description}
              </p>

              {/* Features */}
              <motion.div
                variants={featuresContainerVariants}
                initial="hidden"
                animate="visible"
                className="flex w-full flex-wrap items-center justify-center gap-x-5 gap-y-3 text-sm font-medium sm:gap-x-6 lg:justify-start"
              >
                {currentPackage.features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    variants={featureItemVariants}
                    className="flex items-center gap-2 text-sky-400"
                  >
                    <svg
                      className="h-4 w-4 shrink-0 fill-none stroke-current stroke-2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-400">{feature}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* View Details Button */}
              <div className="flex w-full justify-center pt-1 lg:justify-start">
                <motion.button
                  whileHover={{ scale: 1.03, backgroundColor: "#f0f9ff" }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-lg border border-sky-300 bg-white px-5 py-2.5 text-sm font-semibold text-sky-600 shadow-sm sm:px-6"
                >
                  View Details
                </motion.button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Footer */}
      <div className="relative flex items-center justify-between mx-8 mt-8 sm:mt-10 lg:mt-12 pt-5 sm:pt-6 border-t border-gray-100 text-sm font-medium text-sky-500">
        <motion.button
          onClick={handlePrev}
          whileHover={{ x: -4 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer select-none shrink-0"
        >
          <div className="w-7 h-7 rounded-full border border-sky-400 flex items-center justify-center text-sm">
            &#8592;
          </div>
          <span className="uppercase tracking-wider text-[10px] sm:text-xs font-bold">
            PREVIOUS
          </span>
        </motion.button>

        <div className="text-gray-400 text-[10px] sm:text-xs tracking-wider font-semibold text-center whitespace-nowrap">
          Showing {formatNumber(currentIndex + 1)}/
          {formatNumber(packagesData.length)}
        </div>

        <motion.button
          onClick={handleNext}
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer select-none shrink-0"
        >
          <span className="uppercase tracking-wider text-[10px] sm:text-xs font-bold">
            NEXT
          </span>
          <div className="w-7 h-7 rounded-full border border-sky-400 flex items-center justify-center text-sm">
            &#8594;
          </div>
        </motion.button>
      </div>
    </section>
  );
}