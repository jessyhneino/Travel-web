import { Link } from "react-router-dom";
import { Star, Waves, Coffee, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function HotelCard({
  id,
  imgSrc,
  name = "Royal Hotel",
  rating = 4.5,
  price = 300,
  currency = "SAR",
  stars = 5,
  propertyType = "Hotel",
  amenities = ["Pool", "Breakfast included"],
  distance = 30,
  description = "Hotel description",
}) {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language.startsWith("ar");

  return (
    <Link
      to={`/hotels/${id}`}
      dir="ltr"
      className={`group relative p-0 overflow-hidden
        flex flex-col gap-0 border-none
        hover:border-none hover:shadow-xl hover:-translate-y-1
        transition-all duration-300 ease-out
        after:content-[''] after:absolute after:bottom-0
        after:left-1/2 after:-translate-x-1/2
        after:w-0 after:h-[3px] after:bg-blue-600
        after:rounded-full after:transition-all
        after:duration-500 after:ease-out
        hover:after:w-full `}
    >
      {/* HOTEL CONTENT */}
      <div
        className={`flex flex-col md:flex-row gap-5 ${
          isArabic ? "md:flex-row-reverse" : ""
        }`}
      >
        {/* HOTEL IMAGE */}
        <div className="relative w-full md:w-64 h-44 flex-shrink-0 overflow-hidden  ">
          <img
            src={imgSrc}
            alt={t(name)}
            className="w-full h-full object-cover rounded-[6px] transition-transform duration-500 ease-out group-hover:scale-105 "
          />

          {/* RATING */}
          <div className="absolute bottom-0 left-0 bg-white px-2.5 py-1 shadow-sm flex items-center gap-1 text-xs font-bold text-slate-700 transition-transform duration-300 group-hover:scale-105">
            <span>{Number(rating).toFixed(1)}</span>

            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          </div>
        </div>

        {/* HOTEL DETAILS */}
        <div
          dir={isArabic ? "rtl" : "ltr"}
          className={`flex-1 min-w-0 flex flex-col justify-between pt-2 pb-3 ${
            isArabic ? "px-4 text-right" : "px-4 text-left"
          }`}
        >
          <div>
            {/* HOTEL NAME */}
            <h3 className="text-base font-bold text-slate-800 mb-2 transition-colors duration-300 group-hover:text-blue-600">
              {t(name)}
            </h3>

            {/* PROPERTY TYPE AND STARS */}
            <div className="flex items-center gap-2 mb-2 text-xs text-slate-500">
              <span>{t(propertyType)}</span>

              <span
                dir="ltr"
                className="flex items-center gap-0.5 text-amber-400"
              >
                {Array.from({
                  length: Math.max(0, Math.min(5, Number(stars) || 0)),
                }).map((_, index) => (
                  <Star
                    key={index}
                    size={12}
                    className="fill-amber-400 text-amber-400"
                  />
                ))}
              </span>
            </div>

            {/* AMENITIES */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-blue-400 mb-2">
              {amenities.includes("Pool") && (
                <div className="flex items-center gap-1">
                  <Waves className="w-3.5 h-3.5 shrink-0" />
                  <span>{t("Pool")}</span>
                </div>
              )}

              {amenities.includes("Breakfast included") && (
                <div className="flex items-center gap-1">
                  <Coffee className="w-3.5 h-3.5 shrink-0" />
                  <span>{t("Breakfast included")}</span>
                </div>
              )}
            </div>

            {/* DISTANCE */}
            <div className="flex items-center gap-1 text-xs text-amber-500 mb-3">
              <MapPin className="w-3.5 h-3.5 shrink-0" />

              <span>
                {t("{{distance}} K.m from the city centre", {
                  distance,
                })}
              </span>
            </div>

            {/* DESCRIPTION */}
            <p className="text-xs text-slate-400 line-clamp-2 max-w-lg">
              {t(description)}
            </p>
          </div>

          {/* PRICE */}
          <div className="flex flex-col items-end justify-end mt-2">
            <span
              dir="ltr"
              className="text-lg font-bold text-blue-600 transition-transform duration-300 group-hover:scale-105"
            >
              {price} {currency}
            </span>

            <span className="text-[10px] text-slate-400 text-right">
              {t("Total for 1 night (incl. VAT)")}
            </span>
          </div>
        </div>
      </div>
      {/* FULL-WIDTH HR */}
      <hr className="w-full h-px border-0 bg-[#26BBFD29] m-0" />{" "}
    </Link>
  );
}
