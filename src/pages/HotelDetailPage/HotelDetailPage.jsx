import React from "react";
import ImageGallery from "./ImageGallery";
import HotelOverview from "./HotelOverview";
import RoomSelection from "./RoomSelection";
import AreaSection from "./AreaSection";
import ReviewsSection from "./ReviewsSection";

export default function HotelDetailPage() {
  return (
    <div className="bg-[#fcfdff] min-h-screen py-6 px-4 md:px-12 lg:px-20 max-w-7xl mx-auto font-sans antialiased text-slate-800">
      {/* Component 1: Image Gallery Grid */}
      <ImageGallery />

      {/* Component 2: Overview & Features */}
      <HotelOverview />

      {/* Component 3: Room Cards Selection */}
      <RoomSelection />

      {/* Component 4: Area Info & Reviews */}
      <AreaSection />

      <ReviewsSection />
    </div>
  );
}
