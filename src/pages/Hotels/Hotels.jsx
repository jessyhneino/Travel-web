import React from "react";
import SearchBar from "./SearchBar";
import FilterSidebar from "./FilterSidebar";
import HotelCard from "./HotelCard";

export default function Hotels() {
  const hotelImages = [
    "/images/Rectangle16.png",
    "/images/Rectangle16.png",
    "/images/Rectangle16.png",
    "/images/Rectangle16.png",
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {/* Component 1: Top Search Bar */}
        <SearchBar />

        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Component 2: Left Filter Sidebar */}
          <FilterSidebar />

          {/* Component 3: Hotel Results List */}
          <div className="flex-1 flex flex-col gap-4 w-full">
            {hotelImages.map((img, index) => (
              <HotelCard key={index} imgSrc={img} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
