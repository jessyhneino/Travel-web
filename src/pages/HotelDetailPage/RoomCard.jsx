import React from "react";
import { Users, Bed, CheckCircle, Ruler } from "lucide-react";
import { useTranslation } from "react-i18next";

const RoomCard = () => {
  const { t } = useTranslation();

  return (
    <div className="flex h-full w-full min-w-0 flex-col justify-between gap-4 rounded-[6px] border border-gray-100 bg-white p-3 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-3 lg:p-3">
      {/* Room Image */}
      <div className="w-full overflow-hidden rounded-[6px]">
        <img
          src="/images/Rectangle17.png"
          alt={t("Economy Double Room")}
          className="h-40 w-full object-cover transition-transform duration-300 hover:scale-105 xs:h-44 sm:h-48 md:h-44 lg:h-48 xl:h-30"
        />
      </div>

      {/* Room Information */}
      <div className="min-w-0 flex-1">
        <h3 className="mb-3 break-words text-sm font-bold leading-snug text-slate-800 sm:text-base lg:text-sm xl:text-base">
          {t("Economy Double Room, 1 Double Bed, Non Smoking")}
        </h3>

        <div className="mb-4 flex flex-col gap-2 text-xs text-gray-500 sm:text-sm lg:text-xs xl:text-sm">
          <p className="flex items-center gap-2">
            <Ruler className="h-4 w-4 shrink-0 text-gray-400" />
            <span>108 {t("sq ft")}</span>
          </p>

          <p className="flex items-center gap-2">
            <Users className="h-4 w-4 shrink-0 text-gray-400" />
            <span>{t("Sleeps 2")}</span>
          </p>

          <p className="flex items-center gap-2">
            <Bed className="h-4 w-4 shrink-0 text-gray-400" />
            <span>{t("1 Double Bed")}</span>
          </p>

          <div className="flex items-start gap-2 font-medium leading-relaxed text-emerald-600">
            <CheckCircle className="mt-0.5 h-4 w-4 shrink-0" />

            <div className="min-w-0">
              <span>{t("Fully refundable")}</span>

              <span className="block font-normal text-gray-400 sm:ml-1 sm:inline">
                ({t("Before Sat, Oct 22")})
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="text-xs font-semibold text-blue-600 transition hover:underline sm:text-sm"
        >
          {t("More details")}
        </button>
      </div>

      {/* Price and Reserve */}
      <div className="mt-auto flex items-center justify-between gap-3 border-t border-gray-100 pt-3">
        <div className="min-w-0">
          <span className="text-lg font-bold text-blue-600 sm:text-xl">
            $245
          </span>

          <p className="mt-0.5 text-[11px] text-gray-400 sm:text-xs">
            $266 {t("total")}
          </p>
        </div>

        <button
          type="button"
          className="shrink-0 rounded-[6px] bg-blue-600 px-[12px] py-[8px] text-xs font-semibold text-white transition duration-200 hover:bg-blue-700 active:scale-95 sm:px-5 sm:text-sm"
        >
          {t("Reserve")}
        </button>
      </div>
    </div>
  );
};

export default RoomCard;