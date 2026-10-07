import React from "react";

export default function VisaCard({ country, imageSrc, flagSrc }) {
  return (
    <div className="flex flex-col gap-3 group cursor-pointer transition-transform duration-300 hover:-translate-y-1">
      {/* Container for the image and flag icon */}
      <div className="relative w-full aspect-[16/10] bg-slate-200 rounded-xl md:rounded-2xl overflow-hidden shadow-sm border border-slate-100">
        {/* Main Background Image */}
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={country}
            className="w-full h-full object-cover"
          />
        ) : (
          /* Placeholder display when src is empty */
          <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-slate-400 text-xs text-center p-2">
            <span></span>
          </div>
        )}

        {/* Flag Badge Overlay (Top Right Corner) */}
        <div className="absolute top-2.5 right-2.5 w-10 h-7 rounded overflow-hidden shadow-md border border-white/40 flex items-center justify-center bg-slate-300/80 backdrop-blur-sm">
          {flagSrc ? (
            <img
              src={flagSrc}
              alt={`${country} flag`}
              className="w-full h-full object-cover"
            />
          ) : (
            /* Placeholder for flag */
            <span className="text-[10px] text-slate-600 font-bold"></span>
          )}
        </div>
      </div>

      {/* Country Name */}
      <h3 className="text-slate-800 font-bold text-sm md:text-base px-1">
        {country}
      </h3>
    </div>
  );
}
