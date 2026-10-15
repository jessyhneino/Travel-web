import React, { useRef, useState } from "react";
import SpecialPackages from "./SpecialPackages";
import VisaCard from "./VisaCard";
import { visaRequirements } from "../Home/data/VisaRequirements";
import MoreForYou from "./MoreForYou";
import Hero from "./Hero";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t, i18n } = useTranslation();

  const currentLanguage = i18n.resolvedLanguage || i18n.language;
  const isArabic = currentLanguage?.startsWith("ar");

  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const dragState = useRef({
    startX: 0,
    scrollLeft: 0,
    moved: false,
    pointerId: null,
  });

  // بدء السحب بالماوس أو اللمس
  const handlePointerDown = (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) {
      return;
    }

    const carousel = carouselRef.current;
    if (!carousel) return;

    dragState.current = {
      startX: e.clientX,
      scrollLeft: carousel.scrollLeft,
      moved: false,
      pointerId: e.pointerId,
    };

    setIsDragging(true);

    if (e.pointerType === "mouse") {
      carousel.setPointerCapture(e.pointerId);
    }
  };

  // تحريك البطاقات مع حركة المؤشر
  const handlePointerMove = (e) => {
    const carousel = carouselRef.current;

    if (!carousel || !isDragging) return;

    const distance = e.clientX - dragState.current.startX;

    if (Math.abs(distance) > 4) {
      dragState.current.moved = true;
    }

    if (dragState.current.moved) {
      carousel.scrollLeft =
        dragState.current.scrollLeft - distance;
    }
  };

  // إنهاء السحب
  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // التنقل باستخدام الأسهم
  const scrollCarousel = (direction) => {
    const carousel = carouselRef.current;

    if (!carousel) return;

    const firstCard = carousel.querySelector("[data-visa-card]");

    const styles = window.getComputedStyle(carousel);
    const gap = parseFloat(styles.columnGap) || 0;

    const cardWidth = firstCard
      ? firstCard.getBoundingClientRect().width + gap
      : carousel.clientWidth * 0.8;

    carousel.scrollBy({
      left: direction * cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <Hero />

      <div className="px-3 md:px-10 lg:px-25">
        <SpecialPackages />
      </div>

      {/* VISA REQUIREMENTS CAROUSEL */}
      <div
        className={
          isArabic
            ? "pl-0 pr-3 md:pr-10 lg:pr-25"
            : "pl-3 md:pl-10 lg:pl-25"
        }
      >
        <section
          className={`py-12 ${
            isArabic
              ? "pl-0 pr-4 sm:pr-12 md:pr-16"
              : "pl-4 sm:pl-12 md:pl-16"
          }`}
        >
          <div className="mx-auto w-full">
            {/* Section Title */}
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-black text-[#1e293b] tracking-wider uppercase">
                {t("VISA REQUIREMENTS")}
              </h2>

              {/* Navigation Arrows */}
              <div
                dir={isArabic ? "rtl" : "ltr"}
                className="flex items-center gap-2 mx-4"
              >
                {/* Previous Button */}
                <button
                  type="button"
                  aria-label={t("Previous visa cards")}
                  onClick={() => scrollCarousel(isArabic ? 1 : -1)}
                  className="w-10 h-10 rounded-full bg-white
                  shadow-sm border border-slate-700
                  flex items-center justify-center text-slate-700
                  hover:bg-[#2563eb] hover:text-white
                  hover:border-[#2563eb]
                  transition-all duration-300 active:scale-90"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={isArabic ? "rotate-180" : ""}
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </button>

                {/* Next Button */}
                <button
                  type="button"
                  aria-label={t("Next visa cards")}
                  onClick={() => scrollCarousel(isArabic ? -1 : 1)}
                  className="w-10 h-10 rounded-full bg-white
                  shadow-sm border border-slate-700
                  flex items-center justify-center text-slate-700
                  hover:bg-[#2563eb] hover:text-white
                  hover:border-[#2563eb]
                  transition-all duration-300 active:scale-90"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={isArabic ? "rotate-180" : ""}
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Carousel Container */}
            <div className="relative">
              <div
                ref={carouselRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                onLostPointerCapture={handlePointerUp}
                onClickCapture={(e) => {
                  if (dragState.current.moved) {
                    e.preventDefault();
                    e.stopPropagation();
                    dragState.current.moved = false;
                  }
                }}
                onDragStart={(e) => e.preventDefault()}
                className={`flex gap-5 md:gap-6 overflow-x-auto
                pb-3 select-none
                [scrollbar-width:none]
                [&::-webkit-scrollbar]:hidden
                ${
                  isDragging
                    ? "cursor-grabbing snap-none"
                    : "cursor-grab snap-x snap-mandatory"
                }`}
                style={{
                  WebkitOverflowScrolling: "touch",
                  scrollBehavior: "auto",
                  touchAction: "pan-y",
                  overscrollBehaviorX: "contain",
                }}
              >
                {visaRequirements.map((item) => (
                  <div
                    key={item.id}
                    data-visa-card
                    className="flex-none w-[80%]
                    sm:w-[calc(50%-10px)]
                    md:w-[calc(33.333%-16px)]
                    lg:w-[calc(25%-18px)]
                    snap-start"
                  >
                    <VisaCard
                      country={item.country}
                      imageSrc={item.imageSrc}
                      flagSrc={item.flagSrc}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Hint */}
            <p className="mt-3 text-xs text-slate-600 sm:hidden">
              {isArabic
                ? "اسحبي لاكتشاف المزيد من الدول ←"
                : "Swipe to discover more countries →"}
            </p>
          </div>
        </section>
      </div>

      <div className="px-3 md:px-10 lg:px-25">
        <MoreForYou />
      </div>
    </div>
  );
}