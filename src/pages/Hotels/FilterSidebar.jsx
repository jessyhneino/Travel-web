import React, { useState } from "react";
import { X, SlidersHorizontal } from "lucide-react";

// قائمة خيارات الفلاتر لسهولة الإدارة والتعديل
const FILTER_DATA = {
  guestRating: [
    { id: "gr-any", label: "Any", checked: true },
    { id: "gr-9", label: "Wonderful 9+", checked: false },
    { id: "gr-8", label: "Very good 8+", checked: false },
    { id: "gr-7", label: "Good 7+", checked: true },
  ],
  starRating: [
    { id: "sr-1", label: "1 Star", checked: true },
    { id: "sr-2", label: "2 Star", checked: false },
    { id: "sr-3", label: "3 Star", checked: false },
    { id: "sr-4", label: "4 Star", checked: true },
  ],
  propertyType: [
    { id: "pt-hotel", label: "Hotel", checked: true },
    { id: "pt-aparthotel", label: "Apart-hotel", checked: false },
    { id: "pt-residence", label: "Residence", checked: false },
  ],
};

export default function FilterSidebar() {
  const [price, setPrice] = useState(200);
  const [isOpen, setIsOpen] = useState(false);

  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* =====================================================
          DESKTOP SIDEBAR
      ====================================================== */}
      <aside className="hidden lg:block w-full max-w-[260px] bg-white p-5 rounded-2xl shadow-sm">
        <FilterContent
          price={price}
          setPrice={setPrice}
          onClose={closeSidebar}
        />
      </aside>

      {/* =====================================================
          MOBILE FILTER BUTTON
      ====================================================== */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed bottom-5 w-[90%] left-1/2 -translate-x-1/2 z-40 flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-blue-600 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 hover:bg-blue-700 active:scale-95 transition-all duration-200"
      >
        <SlidersHorizontal size={25} />
        <span className="text-[25px]">Filters</span>
      </button>

      {/* =====================================================
          MOBILE OVERLAY & BOTTOM SHEET
      ====================================================== */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px]"
          onClick={closeSidebar}
        />
      )}

      <div
        className={`lg:hidden fixed left-0 right-0 bottom-0 z-[60] bg-white rounded-t-3xl shadow-2xl transition-transform duration-300 ease-out max-h-[85vh] overflow-y-auto ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* Drag Indicator */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-slate-300" />
        </div>

        <div className="p-5 pb-8">
          <FilterContent
            price={price}
            setPrice={setPrice}
            onClose={closeSidebar}
            isMobile
          />
        </div>
      </div>
    </>
  );
}

/* =====================================================
    SUB-COMPONENTS (مكونات فرعية لتنظيم الكود)
====================================================== */

// المكون الرئيسي لمحتوى الفلتر
function FilterContent({ price, setPrice, onClose, isMobile = false }) {
  return (
    <div className="flex flex-col gap-6 text-left">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h2 className="text-lg font-bold text-slate-800">Filter by</h2>

        {/* Close Button - Mobile Only */}
        {isMobile && (
          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-slate-100 text-slate-500 transition"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Price Filter */}
      <PriceFilter price={price} setPrice={setPrice} />

      {/* Checkbox Group Filters */}
      <FilterSection title="Guest rating" items={FILTER_DATA.guestRating} />
      <FilterSection title="Star rating" items={FILTER_DATA.starRating} />
      <FilterSection title="Property type" items={FILTER_DATA.propertyType} />
    </div>
  );
}

// مكون فلتر السعر
function PriceFilter({ price, setPrice }) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-sm font-semibold text-slate-700">
        Price per night
      </span>

      <div className="relative pt-1">
        <input
          type="range"
          min="10"
          max="300"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full h-1.5 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />

        <div className="flex justify-between items-center text-xs text-blue-600 font-semibold mt-2">
          <span>$10</span>
          <span>${price}</span>
        </div>
      </div>
    </div>
  );
}

// مكون أقسام الفلتر القابلة للتكرار (Checkboxes)
function FilterSection({ title, items }) {
  return (
    <div className="flex flex-col gap-2.5">
      <span className="text-sm font-semibold text-slate-700">{title}</span>

      {items.map((item) => (
        <label
          key={item.id}
          className="flex items-center gap-2.5 cursor-pointer text-xs text-slate-500 hover:text-slate-800 transition"
        >
          <input
            type="checkbox"
            defaultChecked={item.checked}
            className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 accent-blue-600"
          />
          <span>{item.label}</span>
        </label>
      ))}
    </div>
  );
}
