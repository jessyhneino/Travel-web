import React from "react";
import {IMAGES} from "../HotelDetailPage/data/Images"


export default function ImageGallery() {
  const mainImage = IMAGES[0];
  const secondaryImages = IMAGES.slice(1);

  return (
    <div className="w-full my-6 overflow-hidden rounded-2xl">
      <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-12">
        {/* الصورة الرئيسية الكبيرة */}
        <div className="col-span-2 h-[240px] sm:h-[320px] md:col-span-6 md:h-[340px] lg:h-[400px]">
          <img
            src={mainImage.src}
            alt={mainImage.alt}
            className="block w-full h-full object-cover rounded-xl transition-transform duration-300 hover:scale-[1.02]"
          />
        </div>

        {/* الصور الفرعية */}
        <div className="col-span-2 grid grid-cols-2 gap-2 sm:gap-3 md:col-span-6 md:grid-cols-2 md:grid-rows-2 md:h-[340px] lg:h-[400px]">
          {secondaryImages.map((image, index) => {
            const isLastImage = index === secondaryImages.length - 1;

            return (
              <div
                key={image.src}
                className="relative h-[130px] sm:h-[170px] md:h-auto min-w-0 overflow-hidden rounded-xl"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="block w-full h-full object-cover rounded-xl transition-transform duration-300 hover:scale-105"
                />

                {/* زر عرض المزيد من الصور */}
                {isLastImage && (
                  <button
                    type="button"
                    className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 flex items-center gap-1 rounded-md bg-black/65 px-2 py-1 sm:px-2.5 sm:py-1.5 text-[11px] sm:text-xs font-medium text-white backdrop-blur-md transition hover:bg-black/85 cursor-pointer"
                  >
                    <svg
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>+5</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
