
import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { packagesData } from "../Home/data/packagesData";

export default function SpecialPackages() {
  const { t, i18n } = useTranslation();

  const isArabic = i18n.language?.startsWith("ar");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [slideDirection, setSlideDirection] = useState("next");

  const sectionRef = useRef(null);

  // Replay the entrance animation whenever the section enters the viewport.
  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  // Next Package
  const handleNext = () => {
    setSlideDirection("next");

    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % packagesData.length
    );
  };

  // Previous Package
  const handlePrev = () => {
    setSlideDirection("prev");

    setCurrentIndex((prevIndex) =>
      prevIndex === 0
        ? packagesData.length - 1
        : prevIndex - 1
    );
  };

  const currentPackage = packagesData[currentIndex];

  const formatNumber = (num) =>
    num < 10 ? `0${num}` : num;

  const animationClass = isVisible
    ? slideDirection === "next"
      ? "package-slide-next"
      : "package-slide-prev"
    : "package-hidden";

  return (
    <section
      ref={sectionRef}
      dir={isArabic ? "rtl" : "ltr"}
      className="relative w-full overflow-hidden bg-[#FAFBFF] px-4 text-[#1e293b] sm:px-12"
    >
      {/* Background Floating Circle */}
      <div
        className={`pointer-events-none absolute top-1/2 h-36 w-36 -translate-y-1/2 rounded-full border border-sky-300 opacity-60 sm:h-48 sm:w-48 ${
          isArabic
            ? "-left-20 sm:-left-16"
            : "-right-20 sm:-right-16"
        }`}
      />

      {/* Main Title */}
      <div
        className={`relative mb-8 text-center sm:mb-10 lg:mb-12 ${
          isVisible ? "section-title-enter" : "section-title-hidden"
        }`}
      >
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
        <div
          key={currentIndex}
          dir={isArabic ? "rtl" : "ltr"}
          data-language={isArabic ? "ar" : "en"}
          className={`grid w-full grid-cols-1 items-center gap-6 px-5 sm:gap-8 lg:grid-cols-12 lg:gap-10 ${
            isVisible ? animationClass : "package-hidden"
          }`}
        >
          {/* Image Column */}
          <div
            className={`package-image flex w-full items-center justify-center lg:col-span-6 ${
              isArabic
                ? "lg:order-1 lg:justify-start"
                : "lg:order-2 lg:justify-end"
            }`}
          >
            <div className="relative h-[220px] w-full max-w-[260px] drop-shadow-xl xs:max-w-[300px] sm:h-[300px] sm:max-w-[380px] md:h-[340px] lg:h-[380px] lg:max-w-md">
              <img
                src={currentPackage.image}
                alt={t(currentPackage.title)}
                className="h-full w-full object-contain"
              />
            </div>
          </div>

          {/* Text Column */}
          <div
            dir={isArabic ? "rtl" : "ltr"}
            className={`package-text flex w-full flex-col justify-between gap-5 sm:gap-6 lg:col-span-6 ${
              isArabic
                ? "lg:order-2 lg:items-start lg:text-right"
                : "lg:order-1 lg:items-start lg:text-left"
            }`}
          >
            {/* Package Title */}
            <h3 className="w-full text-xl font-bold text-[#1d2753] sm:text-2xl md:text-3xl">
              {t(currentPackage.title)}
            </h3>

            {/* Package Description */}
            <p className="w-full max-w-xl text-sm leading-relaxed text-gray-600 sm:text-[15px] md:text-base">
              {t(currentPackage.description)}
            </p>

            {/* Features */}
            <div className="flex w-full flex-wrap items-center justify-center gap-x-5 gap-y-3 text-sm font-medium sm:gap-x-6 lg:justify-start">
              {currentPackage.features.map((feature, idx) => (
                <div
                  key={idx}
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

                  <span className="text-gray-600">
                    {t(feature)}
                  </span>
                </div>
              ))}
            </div>

            {/* View Details Button */}
            <div className="flex w-full justify-center pt-1 lg:justify-start">
              <button
                type="button"
                className="rounded-[6px] border border-sky-400 px-5 py-2.5 text-sm font-semibold text-sky-600 shadow-sm transition-all duration-300 hover:bg-sky-500 hover:text-white sm:px-6"
              >
                {t("View Details")}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div
        dir={isArabic ? "rtl" : "ltr"}
        className={`relative mx-0 mt-8 flex items-center justify-between border-t border-gray-100 pt-5 text-sm font-medium text-sky-500 sm:mx-4 sm:mt-10 sm:pt-6 min-[755px]:mx-8 lg:mt-12 ${
          isVisible ? "footer-enter" : "footer-hidden"
        }`}
      >
        {/* Previous Button */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label={t("PREVIOUS")}
          className="flex shrink-0 cursor-pointer select-none items-center gap-2 transition-all duration-300 hover:opacity-70"
        >
          <span
            className={`flex h-7 w-7 items-center justify-center rounded-full border border-sky-500 text-sm transition-transform duration-300 hover:scale-110 ${
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
        </button>

        {/* Package Counter */}
        <div
          dir="ltr"
          className="whitespace-nowrap text-center text-[10px] font-semibold tracking-wider text-gray-600 sm:text-xs"
        >
          {t("Showing")} {formatNumber(currentIndex + 1)}/
          {formatNumber(packagesData.length)}
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={handleNext}
          aria-label={t("NEXT")}
          className="flex shrink-0 cursor-pointer select-none items-center gap-2 transition-all duration-300 hover:opacity-70"
        >
          <span
            className={`text-[10px] font-bold sm:text-xs ${
              isArabic ? "" : "uppercase tracking-wider"
            }`}
          >
            {t("NEXT")}
          </span>

          <span
            className={`flex h-7 w-7 items-center justify-center rounded-full border border-sky-500 text-sm transition-transform duration-300 hover:scale-110 ${
              isArabic ? "scale-x-[-1]" : ""
            }`}
          >
            →
          </span>
        </button>
      </div>
    </section>
  );
}
