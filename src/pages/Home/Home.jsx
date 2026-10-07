import React from "react";
import SpecialPackages from "./SpecialPackages";
import VisaCard from "./VisaCard";
import { visaRequirements } from "../Home/data/VisaRequirements"; // استيراد المصفوفة من الملف الجديد

// بيانات بطاقات متطلبات التأشيرة

export default function Home() {
  return (
    <>
      <SpecialPackages />

      
      <section className="w-full  bg-[#f8faff] py-12 px-4 sm:px-6 lg:px-12 flex flex-col justify-center">
        <div className="max-w-7xl mx-auto w-full">
          {/* Section Title */}
          <h2 className="text-xl sm:text-2xl font-black text-[#1e293b] tracking-wider uppercase mb-6 sm:mb-8 text-left">
            VISA REQUIREMENTS
          </h2>

          {/* Responsive Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
            {visaRequirements.map((item) => (
              <VisaCard
                key={item.id}
                country={item.country}
                imageSrc={item.imageSrc}
                flagSrc={item.flagSrc}
              />
            ))}
          </div>
        </div>
      </section>{" "}
    </>
  );
}
