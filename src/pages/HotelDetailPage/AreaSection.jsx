import React from "react";
import { MapPin } from "lucide-react";
import { NEARBY_PLACES } from "./data/nearby";

export default function AreaSection() {
  return (
    <section id="location" className="w-full px-4 md:px-0 py-6 sm:py-8">
      {/* Top Section: About + Map */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10 items-start">
        {/* Area Information */}
        <div className="min-w-0 lg:col-span-6">
          <h2 className="mb-3 text-base font-bold text-slate-800 sm:text-lg">
            About this area
          </h2>
          <p className="text-xs leading-6 text-gray-500 break-words sm:text-sm">
            Located in Frankfurt Airport Area neighborhood, MY CLOUD Transit
            Hotel is connected to a rail/subway station. Neues Theater Höchst
            and Jahrhunderthalle are cultural highlights, and some of the area's
            landmarks include Hoechst Castle and Henninger Turm. Looking to
            enjoy an event or a game while in town? See what's happening at
            Deutsche Bank Park or Fraport Arena.
          </p>
        </div>

        {/* Map Section */}
        <div className="min-w-0 lg:col-span-6">
          <h2 className="mb-3 text-base font-bold text-slate-800 sm:text-lg">
            Map
          </h2>

          <div className="overflow-hidden rounded-xl border border-gray-100 shadow-sm sm:rounded-2xl">
            <img
              src="/images/Rectan2.png"
              alt="Map showing the hotel's surrounding area"
              loading="lazy"
              className="h-36 w-full bg-slate-100 object-cover"
            />
          </div>

          {/* Address Information */}
          <div className="mt-3 flex flex-col gap-3 text-xs text-gray-500 sm:flex-row sm:items-start sm:justify-between sm:text-sm">
            <div className="flex items-start gap-2 min-w-0">
              <p className="leading-5 break-words min-w-0">
                Terminal 1 / Gate z 25, Frankfurt am Main Airport, Frankfurt,
                Hessen, 60549
              </p>
            </div>

            <a
              href="#map"
              className="self-start font-medium text-blue-600 shrink-0 hover:underline"
            >
              View in a map
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section: Nearby Places Grid (Full Width Underneath) */}
      <div className="mt-8 sm:mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
        {NEARBY_PLACES.map((section) => {
          const Icon = section.icon;

          return (
            <div key={section.title} className="min-w-0">
              <h3 className="mb-4 text-sm font-bold text-slate-800">
                {section.title}
              </h3>

              <ul className="space-y-3">
                {section.items.map((item, index) => (
                  <li
                    key={`${section.title}-${index}`}
                    className="flex items-center justify-between gap-4 text-xs text-gray-500 sm:text-sm"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <Icon className="h-4 w-4 shrink-0 text-gray-500" />
                      <span
                        className="truncate text-gray-600"
                        title={item.name}
                      >
                        {item.name}
                      </span>
                    </div>
                    <span className="shrink-0 text-gray-500 font-normal">
                      {item.time}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
