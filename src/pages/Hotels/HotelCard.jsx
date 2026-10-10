import { Link } from "react-router-dom";
import { Star, Waves, Coffee, MapPin } from "lucide-react";

export default function HotelCard({ id, imgSrc }) {
  return (
    <Link
      to={`/hotels/${id}`}
      className="group relative bg-white rounded-2xl p-0 overflow-hidden flex flex-col md:flex-row gap-5 border border-slate-100 hover:border-blue-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out block
    after:content-[''] after:absolute after:bottom-0 after:left-1/2
    after:-translate-x-1/2 after:w-0 after:h-[3px]
    after:bg-blue-600 after:rounded-full
    after:transition-all after:duration-500 after:ease-out
    hover:after:w-full"
    >
      {/* Hotel Image Container */}
      <div className="relative w-full md:w-64 h-44 flex-shrink-0 overflow-hidden rounded-xl">
        <img
          src={imgSrc}
          alt="Hotel"
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Rating Badge */}
        <div className="absolute bottom-2 left-2 bg-white px-2.5 py-1 rounded-md shadow-sm flex items-center gap-1 text-xs font-bold text-slate-700 transition-transform duration-300 group-hover:scale-105">
          <span>4.5</span>
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
        </div>
      </div>

      {/* Hotel Content */}
      <div className="flex-1 flex flex-col justify-between py-2 pr-4 text-left">
        <div>
          <h3 className="text-base font-bold text-slate-800 mb-2 transition-colors duration-300 group-hover:text-blue-600">
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
          <span className="text-lg font-bold text-blue-600 transition-transform duration-300 group-hover:scale-105">
            300 SAR
          </span>

          <span className="text-[10px] text-slate-400">
            Total for 1 night (incl. VAT)
          </span>
        </div>
      </div>
    </Link>
  );
}
