import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { X, SlidersHorizontal } from "lucide-react";
import { FILTER_DATA } from "./data/filterData";

export const INITIAL_FILTERS = {
  price: 300,
  guestRating: [],
  starRating: [],
  propertyType: [],
};

export default function FilterSidebar({
  filters = INITIAL_FILTERS,
  onApplyFilters = () => {},
}) {
  const { t, i18n } = useTranslation();

  const isArabic =
    i18n.language?.startsWith("ar") ||
    document.documentElement.dir === "rtl";

  const [isOpen, setIsOpen] = useState(false);
  const [draftFilters, setDraftFilters] = useState(filters);

  useEffect(() => {
    setDraftFilters(filters);
  }, [filters]);

  const applyUpdatedFilters = (updatedFilters) => {
    setDraftFilters(updatedFilters);
    onApplyFilters(updatedFilters);
  };

  const updatePrice = (price) => {
    applyUpdatedFilters({
      ...draftFilters,
      price,
    });
  };

  const toggleOption = (section, value) => {
    const selected = draftFilters[section] || [];

    const updatedFilters = {
      ...draftFilters,
      [section]: selected.includes(value)
        ? selected.filter((item) => item !== value)
        : [...selected, value],
    };

    applyUpdatedFilters(updatedFilters);
  };

  const resetFilters = () => {
    const reset = {
      price: 300,
      guestRating: [],
      starRating: [],
      propertyType: [],
    };

    applyUpdatedFilters(reset);
  };

  const contentProps = {
    filters: draftFilters,
    updatePrice,
    toggleOption,
    onReset: resetFilters,
    isArabic,
  };

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside
        dir={isArabic ? "rtl" : "ltr"}
        className="hidden lg:block w-full max-w-[260px] p-5 rounded-[6px]"
      >
        <FilterContent {...contentProps} />
      </aside>

      {/* MOBILE FILTER BUTTON */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed bottom-5 w-[90%] left-1/2 -translate-x-1/2 z-40 flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-blue-600 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 hover:bg-blue-700 active:scale-95 transition-all duration-200"
      >
        <SlidersHorizontal size={25} />
        <span className="text-[25px]">{t("Filters")}</span>
      </button>

      {/* MOBILE OVERLAY */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-[2px] z-50"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* MOBILE BOTTOM SHEET */}
      <div
        dir={isArabic ? "rtl" : "ltr"}
        aria-hidden={!isOpen}
        className={`lg:hidden fixed left-0 right-0 bottom-0 z-[60] bg-white rounded-t-[6px] shadow-2xl transition-transform duration-300 ease-out max-h-[85vh] overflow-y-auto ${
          isOpen
            ? "translate-y-0"
            : "translate-y-full pointer-events-none"
        }`}
      >
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-slate-300" />
        </div>

        <div className="p-5 pb-8">
          <FilterContent
            {...contentProps}
            isMobile
            onClose={() => setIsOpen(false)}
          />
        </div>
      </div>
    </>
  );
}

function FilterContent({
  filters,
  updatePrice,
  toggleOption,
  onReset,
  isMobile = false,
  onClose,
  isArabic,
}) {
  const { t } = useTranslation();

  return (
    <div
      dir={isArabic ? "rtl" : "ltr"}
      className={`flex flex-col gap-6 ${
        isArabic ? "text-right" : "text-left"
      }`}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-[#26BBFD29] pb-3">
        <h2 className="text-lg font-bold text-slate-800">
          {t("Filter by")}
        </h2>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onReset}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition"
          >
            {t("Reset")}
          </button>

          {isMobile && (
            <button
              type="button"
              onClick={onClose}
              aria-label={t("Close filters")}
              className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-slate-100 text-slate-500 transition"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* PRICE FILTER */}
      <PriceFilter
        price={filters.price}
        setPrice={updatePrice}
        isArabic={isArabic}
      />

      {/* GUEST RATING */}
      <FilterSection
        title="Guest rating"
        items={FILTER_DATA.guestRating}
        selected={filters.guestRating}
        onToggle={(value) => toggleOption("guestRating", value)}
        isArabic={isArabic}
      />

      {/* STAR RATING */}
      <FilterSection
        title="Star rating"
        items={FILTER_DATA.starRating}
        selected={filters.starRating}
        onToggle={(value) => toggleOption("starRating", value)}
        isArabic={isArabic}
      />

      {/* PROPERTY TYPE */}
      <FilterSection
        title="Property type"
        items={FILTER_DATA.propertyType}
        selected={filters.propertyType}
        onToggle={(value) => toggleOption("propertyType", value)}
        isArabic={isArabic}
      />
    </div>
  );
}

function PriceFilter({ price, setPrice, isArabic }) {
  const { t } = useTranslation();

  const percentage = ((price - 10) / 290) * 100;

  return (
    <div
      dir={isArabic ? "rtl" : "ltr"}
      className={`flex flex-col gap-3 ${
        isArabic ? "text-right" : "text-left"
      }`}
    >
      <span className="text-sm font-semibold text-slate-700">
        {t("Price per night")}
      </span>

      <div className="relative pt-1">
        <input
          type="range"
          min="10"
          max="300"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          aria-label={t("Price per night")}
          dir={isArabic ? "rtl" : "ltr"}
          style={{
            direction: isArabic ? "rtl" : "ltr",
            background: isArabic
              ? `linear-gradient(to left, #2563eb 0%, #2563eb ${percentage}%, #dbeafe ${percentage}%, #dbeafe 100%)`
              : `linear-gradient(to right, #2563eb 0%, #2563eb ${percentage}%, #dbeafe ${percentage}%, #dbeafe 100%)`,
          }}
          className="w-full h-1.5 rounded-[6px] appearance-none cursor-pointer accent-blue-600"
        />

        <div
          dir={isArabic ? "rtl" : "ltr"}
          className="flex justify-between text-xs font-semibold mt-2"
        >
          <span className="text-blue-600">${price}</span>
          <span className="text-slate-400">$300</span>
        </div>
      </div>
    </div>
  );
}

function FilterSection({
  title,
  items,
  selected = [],
  onToggle,
  isArabic,
}) {
  const { t } = useTranslation();

  return (
    <div
      dir={isArabic ? "rtl" : "ltr"}
      className={`flex flex-col gap-2.5 ${
        isArabic ? "text-right" : "text-left"
      }`}
    >
      <span className="text-sm font-semibold text-slate-700">
        {t(title)}
      </span>

      {items.map((item) => {
        const value = item.value ?? item.id;

        return (
          <label
            key={item.id}
            className="flex items-center gap-2.5 cursor-pointer text-xs text-slate-500 hover:text-slate-800 transition"
          >
            <input
              type="checkbox"
              checked={selected.includes(value)}
              onChange={() => onToggle(value)}
              className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 accent-blue-600 shrink-0"
            />

            <span>{t(item.label)}</span>
          </label>
        );
      })}
    </div>
  );
}