import React from "react";
import RoomCard from "./RoomCard";

export default function RoomSelection() {
  return (
    <section className="w-full my-6 sm:my-8 lg:my-10 px-3 sm:px-4 lg:px-0">
      {/* Section Title */}
      <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-4 sm:mb-5">
        Choose your room
      </h2>

      {/* Date Selectors */}
      <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {[1, 2, 3].map((_, idx) => (
          <button
            key={idx}
            type="button"
            className="w-full min-w-0 bg-slate-50 border border-gray-200 rounded-xl p-3 sm:p-3.5 flex justify-between items-center gap-3 text-left transition-all duration-200 hover:border-blue-300 hover:bg-blue-50/50 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            <div className="min-w-0">
              <span className="text-[11px] sm:text-xs text-gray-400 block mb-1">
                Check in:
              </span>
              <span className="font-semibold text-blue-600 text-sm sm:text-base">
                Oct 23
              </span>
            </div>

            <span className="text-gray-400 text-xs shrink-0">▼</span>
          </button>
        ))}
      </div>

      {/* Room Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 6 }, (_, i) => (
          <RoomCard key={i} />
        ))}
      </div>
    </section>
  );
}
