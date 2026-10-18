import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { packagesData } from "../Home/data/packagesData";

export default function SpecialPackages() {
  const { t, i18n } = useTranslation();

  const isArabic = (i18n.resolvedLanguage || i18n.language)?.startsWith("ar");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [slideDirection, setSlideDirection] = useState("next");

  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const handleNext = () => {
    setSlideDirection("next");
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % packagesData.length
    );
  };

  const handlePrev = () => {
    setSlideDirection("prev");
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? packagesData.length - 1 : prevIndex - 1
    );
  };

  const currentPackage = packagesData[currentIndex];

  const formatNumber = (num) => String(num).padStart(2, "0");

  const animationClass = isVisible
    ? slideDirection === "next"
      ? "package-slide-next"
      : "package-slide-prev"
    : "package-hidden";

  return (
    <section
      ref={sectionRef}
      dir={isArabic ? "rtl" : "ltr"}
      className="relative isolate w-full overflow-hidden bg-[#FAFBFF] px-4 py-10 text-[#1e293b] sm:px-6 sm:py-12 md:px-8 md:py-14 lg:px-10 lg:py-16 xl:px-16"
    >
      {/* Background Decorative Circle */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute top-[48%] -z-10 h-28 w-28 -translate-y-1/2 rounded-full border border-sky-300 opacity-50 sm:h-40 sm:w-40 md:h-48 md:w-48 ${
          isArabic
            ? "-left-16 sm:-left-20 lg:-left-16"
            : "-right-16 sm:-right-20 lg:-right-16"
        }`}
      />

      {/* Main Title */}
      <div
        className={`relative mx-auto mb-8 w-full max-w-7xl text-center sm:mb-10 md:mb-12 ${
          isVisible ? "section-title-enter" : "section-title-hidden"
        }`}
      >
        <h2
          className={`text-xl font-bold leading-tight text-[#1d2753] sm:text-2xl md:text-3xl lg:text-3xl ${
            isArabic
              ? "tracking-normal"
              : "tracking-[0.12em] uppercase sm:tracking-[0.2em]"
          }`}
        >
          {t("SPECIAL PACKAGES")}
        </h2>
      </div>

      {/* Main Content */}
      <div className="relative mx-auto w-full max-w-7xl">
        <div className="flex min-h-0 w-full items-center lg:min-h-[420px] xl:min-h-[460px]">
          <div
            key={`${currentIndex}-${isArabic ? "ar" : "en"}`}
            dir={isArabic ? "rtl" : "ltr"}
            data-language={isArabic ? "ar" : "en"}
            className={`grid w-full min-w-0 grid-cols-1 items-center gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-10 xl:gap-14 ${
              isVisible ? animationClass : "package-hidden"
            }`}
          >
            {/* Image Column - Centered on Mobile and Tablet */}
            <div
              className={`package-image order-1 flex min-w-0 w-full items-center justify-center ${
                isArabic
                  ? "lg:order-1 lg:justify-start"
                  : "lg:order-2 lg:justify-end"
              }`}
            >
              <div className="relative w-full max-w-[560px] overflow-hidden rounded-[6px] drop-shadow-lg sm:drop-shadow-xl">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[6px]">
                  <img
                    src={currentPackage.image}
                    alt={t(currentPackage.title)}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover object-center"
                  />
                </div>
              </div>
            </div>

            {/* Text Column - Centered on Mobile and Tablet */}
            <div
              dir={isArabic ? "rtl" : "ltr"}
              className={`package-text order-2 flex min-w-0 w-full flex-col items-center justify-center gap-4 text-center sm:gap-5 md:gap-6 ${
                isArabic
                  ? "lg:order-2 lg:items-start lg:text-right"
                  : "lg:order-1 lg:items-start lg:text-left"
              }`}
            >
              {/* Package Title */}
              <h3 className="w-full break-words text-2xl font-bold leading-[1.35] text-[#1d2753] [overflow-wrap:anywhere] sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl 2xl:text-[40px]">
                {t(currentPackage.title)}
              </h3>

              {/* Package Description */}
              <p className="w-full max-w-2xl break-words text-sm leading-7 text-gray-500 sm:text-base sm:leading-8 md:text-lg lg:text-base xl:text-lg">
                {t(currentPackage.description)}
              </p>

              {/* Features - Centered on Mobile and Tablet */}
              <div className="flex w-full flex-wrap items-center justify-center gap-x-4 gap-y-3 sm:gap-x-6 sm:gap-y-4 lg:justify-start">
                {currentPackage.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex min-w-0 items-center justify-center gap-2"
                  >
                    <svg
                      className="h-5 w-5 shrink-0 fill-none stroke-sky-400 stroke-2 sm:h-6 sm:w-6"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>

                    <span className="break-words text-sm leading-6 text-gray-600 sm:text-base">
                      {t(feature)}
                    </span>
                  </div>
                ))}
              </div>

              {/* View Details Button */}
              <div className="flex w-full justify-center pt-1 sm:pt-2 lg:justify-start">
                <button
                  type="button"
                  className="inline-flex min-h-11 max-w-full items-center justify-center rounded-md border border-sky-400 px-6 py-2.5 text-sm font-semibold text-sky-600 shadow-sm transition-colors duration-300 hover:bg-sky-500 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 sm:px-8 sm:text-base"
                >
                  {t("View Details")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div
        dir={isArabic ? "rtl" : "ltr"}
        className={`relative mx-auto mt-9 flex w-full max-w-7xl items-center justify-between gap-2 border-t border-gray-200 pt-5 text-sm font-medium text-sky-600 sm:mt-12 sm:gap-4 sm:pt-6 lg:mt-14 ${
          isVisible ? "footer-enter" : "footer-hidden"
        }`}
      >
        {/* Previous Button */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label={t("PREVIOUS")}
          className="flex min-h-10 min-w-0 shrink items-center gap-1.5 rounded-md py-1 transition-opacity duration-300 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 sm:gap-2"
        >
          <span
            aria-hidden="true"
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-sky-500 text-base transition-transform duration-300 hover:scale-105 sm:h-9 sm:w-9 ${
              isArabic ? "scale-x-[-1]" : ""
            }`}
          >
            ←
          </span>

          <span className="text-[10px] font-bold uppercase tracking-wide sm:text-xs sm:tracking-wider">
            {t("PREVIOUS")}
          </span>
        </button>

        {/* Package Counter */}
        <div
          dir="ltr"
          aria-live="polite"
          className="flex shrink-0 items-center justify-center gap-1 whitespace-nowrap px-1 text-[10px] font-semibold tracking-wide text-gray-500 sm:gap-1.5 sm:text-xs sm:tracking-wider"
        >
          <span>{t("Showing")}</span>
          <span>
            {formatNumber(currentIndex + 1)}/
            {formatNumber(packagesData.length)}
          </span>
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={handleNext}
          aria-label={t("NEXT")}
          className="flex min-h-10 min-w-0 shrink items-center justify-end gap-1.5 rounded-md py-1 transition-opacity duration-300 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 sm:gap-2"
        >
          <span className="text-[10px] font-bold uppercase tracking-wide sm:text-xs sm:tracking-wider">
            {t("NEXT")}
          </span>

          <span
            aria-hidden="true"
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-sky-500 text-base transition-transform duration-300 hover:scale-105 sm:h-9 sm:w-9 ${
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