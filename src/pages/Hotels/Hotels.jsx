import React from "react";
import SearchBar from "./SearchBar";
import FilterSidebar from "./FilterSidebar";
import HotelCard from "./HotelCard";
import { HOTELS_DATA } from "./data/HotelData";

export default function Hotels() {
  return (
    <div className="min-h-screen bg-slate-50/50  p-5 md:p-10 xl:p-13 font-sans">
      <div className=" flex flex-col gap-8 sm:px-6 md:px-4 ">
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
