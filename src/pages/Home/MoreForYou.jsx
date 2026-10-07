import React from "react";

import { topCardsData } from "../Home/data/TopCardsData";

export default function MoreForYou() {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 py-12 md:py-16 bg-slate-50/50 min-h-screen flex flex-col justify-center font-sans overflow-hidden">
      {/* Background Decorative Waves (matching subtle lines on edges) */}
      <div className="absolute top-0 -left-12 w-32 h-32 rounded-full border border-sky-300/40 pointer-events-none -z-0" />
      <div className="absolute bottom-0 -right-12 w-48 h-48 rounded-full border border-sky-300/40 pointer-events-none -z-0" />

      <div className="relative z-10 max-w-6xl mx-auto w-full space-y-8">
        {}
        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-bold tracking-wider text-[#1e293b] uppercase">
            MORE FOR YOU
          </h2>
        </div>

        {}
        <div className="space-y-6">
          {/* Top Row: 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topCardsData.map((card) => (
              <div
                key={card.id}
                className="group flex flex-col bg-transparent rounded-2xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image Container */}
                <div className="w-full h-48 sm:h-52 md:h-44 lg:h-52 rounded-2xl overflow-hidden bg-slate-200 border border-slate-100 relative shadow-sm group-hover:shadow-md transition-shadow">
                  <img
                    src={card.imageSrc}
                    alt={card.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Subtle placeholder icon shown when src is empty */}
                  {!card.imageSrc && (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                      <svg
                        className="w-10 h-10 stroke-current opacity-40"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Card Info */}
                <div className="mt-3 px-1">
                  <h3 className="text-base font-bold text-[#334155] leading-snug group-hover:text-blue-600 transition-colors">
                    {card.title}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-slate-500 leading-relaxed max-w-[90%]">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bottom Left Card (Spans 2 columns on desktop) */}
            <div className="md:col-span-2 group relative h-60 sm:h-64 md:h-56 lg:h-64 rounded-2xl overflow-hidden bg-slate-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <img
                src="public/images/Rect4.png"
                alt="Quick Trips"
                className="w-full h-full object-cover"
              />

              {/* Empty state placeholder pattern */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end p-6">
                <h3 className="text-xl sm:text-2xl font-bold text-white drop-shadow-md">
                  Quick Trips
                </h3>
              </div>
            </div>

            {/* Bottom Right Blue Banner Card (Spans 1 column) */}
            <div className="md:col-span-1 bg-[#2563eb] rounded-2xl p-6 sm:p-8 flex flex-col justify-between h-60 sm:h-64 md:h-56 lg:h-64 text-white shadow-md hover:shadow-lg hover:bg-blue-700 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight tracking-tight">
                  Show all the packages, view now
                </h3>
              </div>
              <div>
                <p className="text-blue-100 text-sm sm:text-base font-normal">
                  Discover dream destinations
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
