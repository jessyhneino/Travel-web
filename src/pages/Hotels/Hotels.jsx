import React from "react";
import SearchBar from "./SearchBar";
import FilterSidebar from "./FilterSidebar";
import HotelCard from "./HotelCard";
import { HOTELS_DATA } from "./data/HotelData";

export default function Hotels() {
  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {/* شريط البحث */}
        <SearchBar />

        {/* المحتوى الرئيسي */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* شريط التصفية والفلترة */}
          <FilterSidebar />

          {/* قائمة الفنادق */}
          <main className="flex-1 flex flex-col gap-4 w-full">
            {HOTELS_DATA.map((hotel) => (
              <HotelCard key={hotel.id} id={hotel.id} imgSrc={hotel.imgSrc} />
            ))}
          </main>
        </div>
      </div>
    </div>
  );
}
