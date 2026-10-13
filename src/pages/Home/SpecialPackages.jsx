import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { packagesData } from "../Home/data/packagesData";

// Features Animation
const featuresContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const featureItemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// Slide + Fade Animation
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
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1],
    },
  },

  exit: (direction) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0,
    scale: 0.96,
    transition: {
      duration: 0.65,
      ease: [0.7, 0, 0.84, 0],
    },
  }),
};

export default function SpecialPackages() {
  const { t, i18n } = useTranslation();

  // Detect Arabic language
  const isArabic = i18n.language?.startsWith("ar");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Next Package
  const handleNext = () => {
    setDirection(isArabic ? -1 : 1);

    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % packagesData.length
    );
  };

  // Previous Package
  const handlePrev = () => {
    setDirection(isArabic ? 1 : -1);

    setCurrentIndex((prevIndex) =>
      prevIndex === 0
        ? packagesData.length - 1
        : prevIndex - 1
    );
  };

  const currentPackage = packagesData[currentIndex];

  const formatNumber = (num) =>
    num < 10 ? `0${num}` : num;

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      className="relative w-full overflow-hidden bg-[#FAFBFF] px-4 text-[#1e293b] sm:px-12"
    >
      {/* Background Floating Circle */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`pointer-events-none absolute top-1/2 h-36 w-36 -translate-y-1/2 rounded-full border border-sky-300 opacity-60 sm:h-48 sm:w-48 ${
          isArabic
            ? "-left-20 sm:-left-16"
            : "-right-20 sm:-right-16"
        }`}
      />

      {/* Main Title */}
      <div className="relative mb-8 text-center sm:mb-10 lg:mb-12">
        <h2
          className={`text-lg font-bold text-[#1d2753] sm:text-xl ${
            isArabic
              ? "tracking-normal"
              : "tracking-[0.2em] uppercase"
          }`}
        >
          {t("SPECIAL PACKAGES")}
        </h2>
      </div>

      {/* Main Content Area */}
      <div className="relative flex min-h-[420px] w-full items-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="grid w-full grid-cols-1 items-center gap-6 px-5 sm:gap-8 lg:grid-cols-12 lg:gap-10"
          >
            {/* Image Column */}
            <div
              className={`order-1 flex w-full items-center justify-center lg:col-span-6 ${
                isArabic
                  ? "lg:order-1 lg:justify-start"
                  : "lg:order-2 lg:justify-end"
              }`}
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                }}
                className="relative h-[220px] w-full max-w-[260px] drop-shadow-xl xs:max-w-[300px] sm:h-[300px] sm:max-w-[380px] md:h-[340px] lg:h-[380px] lg:max-w-md"
              >
                <img
                  src={currentPackage.image}
                  alt={t(currentPackage.title)}
                  className="h-full w-full object-contain"
                />
              </motion.div>
            </div>

            {/* Text Column */}
            <div
              dir={isArabic ? "rtl" : "ltr"}
              className={`order-2 flex w-full flex-col justify-between gap-5 sm:gap-6 lg:col-span-6 ${
                isArabic
                  ? "items-center text-center lg:order-2 lg:items-start lg:text-right"
                  : "items-center text-center lg:order-1 lg:items-start lg:text-left"
              }`}
            >
              {/* Package Title */}
              <h3 className="w-full text-xl font-bold text-[#1d2753] sm:text-2xl md:text-3xl">
                {t(currentPackage.title)}
              </h3>

              {/* Package Description */}
              <p className="w-full max-w-xl text-sm leading-relaxed text-gray-500 sm:text-[15px] md:text-base">
                {t(currentPackage.description)}
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
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>

                    <span className="text-gray-400">
                      {t(feature)}
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              {/* View Details Button */}
              <div className="flex w-full justify-center pt-1 lg:justify-start">
                <motion.button
                  whileHover={{
                    scale: 1.03,
                    backgroundColor: "#f0f9ff",
                  }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-lg border border-sky-300 bg-white px-5 py-2.5 text-sm font-semibold text-sky-600 shadow-sm sm:px-6"
                >
                  {t("View Details")}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Footer */}
      <div
        dir={isArabic ? "rtl" : "ltr"}
        className={`relative mx-0 mt-8 flex items-center justify-between border-t border-gray-100 pt-5 text-sm font-medium text-sky-500 sm:mx-4 sm:mt-10 sm:pt-6 min-[755px]:mx-8 lg:mt-12`}
      >
        {/* Previous Button */}
        <motion.button
          onClick={handlePrev}
          whileHover={{ x: isArabic ? 4 : -4 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
          aria-label={t("PREVIOUS")}
          className="flex shrink-0 cursor-pointer select-none items-center gap-2 transition-opacity hover:opacity-80"
        >
          <span
            className={`flex h-7 w-7 items-center justify-center rounded-full border border-sky-400 text-sm ${
              isArabic ? "scale-x-[-1]" : ""
            }`}
          >
            ←
          </span>

          <span
            className={`text-[10px] font-bold sm:text-xs ${
              isArabic ? "" : "uppercase tracking-wider"
            }`}
          >
            {t("PREVIOUS")}
          </span>
        </motion.button>

        {/* Package Counter */}
        <div
          dir="ltr"
          className="whitespace-nowrap text-center text-[10px] font-semibold tracking-wider text-gray-400 sm:text-xs"
        >
          {t("Showing")} {formatNumber(currentIndex + 1)}/
          {formatNumber(packagesData.length)}
        </div>

        {/* Next Button */}
        <motion.button
          onClick={handleNext}
          whileHover={{ x: isArabic ? -4 : 4 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
          aria-label={t("NEXT")}
          className="flex shrink-0 cursor-pointer select-none items-center gap-2 transition-opacity hover:opacity-80"
        >
          <span
            className={`text-[10px] font-bold sm:text-xs ${
              isArabic ? "" : "uppercase tracking-wider"
            }`}
          >
            {t("NEXT")}
          </span>

          <span
            className={`flex h-7 w-7 items-center justify-center rounded-full border border-sky-400 text-sm ${
              isArabic ? "scale-x-[-1]" : ""
            }`}
          >
            →
          </span>
        </motion.button>
      </div>
    </section>
  );
}