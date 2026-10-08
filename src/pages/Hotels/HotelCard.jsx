import React from "react";
import { Star, MapPin, Coffee, Waves } from "lucide-react";

export default function HotelCard({ imgSrc }) {
  return (
    <div className="bg-white rounded-2xl p-0 overflow-hidden flex flex-col md:flex-row gap-5 border border-slate-100 hover:shadow-md transition-shadow">
      {/* Hotel Image Container */}
      <div className="relative w-full md:w-64 h-44 flex-shrink-0">
        <img
          src={imgSrc}
          alt="Hotel"
          className="w-full h-full object-cover rounded-xl"
        />
        {/* Rating Badge */}
        <div className="absolute bottom-2 left-2 bg-white px-2.5 py-1 rounded-md shadow-sm flex items-center gap-1 text-xs font-bold text-slate-700">
          <span>4.5</span>
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
        </div>
      </div>

      {/* Hotel Content */}
      <div className="flex-1 flex flex-col justify-between py-2 pr-4 text-left">
        <div>
          <h3 className="text-base font-bold text-slate-800 mb-2">
            Royal Hotel
          </h3>

          {/* Amenities */}
          <div className="flex items-center gap-4 text-xs text-blue-400 mb-2">
            <div className="flex items-center gap-1">
              <Waves className="w-3.5 h-3.5" />
              <span>Pool</span>
            </div>
            <div className="flex items-center gap-1">
              <Coffee className="w-3.5 h-3.5" />
              <span>Breakfast included</span>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-1 text-xs text-amber-500 mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>30 K.m from the city centre</span>
          </div>

          {/* Description */}
          <p className="text-xs text-slate-400 line-clamp-2 max-w-lg">
            lorem ipsum dolor sit amet, consecte adipiscing elit...
          </p>
        </div>

        {/* Pricing Info */}
        <div className="flex flex-col items-end justify-end mt-2">
          <span className="text-lg font-bold text-blue-600">300 SAR</span>
          <span className="text-[10px] text-slate-400">
            Total for 1 night (incl. VAT)
          </span>
        </div>
      </div>
    </div>
  );
}
