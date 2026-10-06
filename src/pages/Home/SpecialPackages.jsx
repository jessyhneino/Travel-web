import React, { useState } from "react";

// بيانات الباقات المختلفة
const packagesData = [
  {
    id: 1,
    title: "Packages 2023 - Hajj Deluxe",
    description:
      "Lorem ipsum dolor sit amet consectetur. Diam odio condimentum in justo orci vitae ligula quis. Lacus etiam elit mi lacus scelerisque in consectetur. Feugiat commodo aenean adipiscing maecenas feugiat. Nibh tellus suscipit auctor nam malesuada non.",
    features: ["Hajj Drafts", "Hajj Visa", "Flights to Madinah"],
    image: "/images/Group2311.png", // يمكنك تغيير المسار لكل باقة
  },
  {
    id: 2,
    title: "Packages 2023 - Premium Umrah",
    description:
      "تجرية عمرة فاخرة تشمل الإقامة في فنادق خماسية النجوم بالقرب من الحرم المكي والمدني، مع توفير جميع وسائل الراحة والتنقلات الحديثة للطائفين والركع السجود.",
    features: ["VIP Transport", "5 Star Hotel", "Guided Tour"],
    image: "/images/Rectangle.png",
  },
  {
    id: 3,
    title: "Packages 2024 - Economy Hajj",
    description:
      "باقة الحج الاقتصادية الشاملة لكافة التصاريح والإقامة المريحة مع توفير مرشدين دينيين لمساعدة الحجاج خلال أدائهم للمناسك بكل سهولة ويسر.",
    features: ["Hajj Visa", "Full Board Meals", "Bus Transportation"],
    image: "/images/icon.png",
  },
  {
    id: 4,
    title: "Packages 2024 - Ramadan Umrah",
    description:
      "عمرة شهر رمضان المبارك وخاصة العشر الأواخر، شاملة لتذاكر الطيران، الإقامة المباشرة المطلة على الحرم، وتوفير كافة الخدمات اللوجستية.",
    features: ["Direct Flight", "Iftar & Suhoor", "Free Ziyarat"],
    image: "/images/Group2311.png",
  },
  {
    id: 5,
    title: "Packages 2024 - Family Special",
    description:
      "باقات خاصة للعائلات توفر أجنحة فندقية واسعة وخصومات خاصة للأطفال مع برنامج تنفيذي وتوجيه خاص طوال فترة الرحلة.",
    features: ["Family Suites", "Child Discount", "Private Transport"],
    image: "/images/Group2311.png",
  },
  {
    id: 6,
    title: "Packages 2024 - Custom Tour",
    description:
      "تصميم رحلتك الخاصة بالكامل وفقاً لرغباتك ومواعيدك، مع إمكانية اختيار الفنادق وسيارة التنقل الخاصة وخط السير المناسب لك.",
    features: ["Custom Itinerary", "Private Car", "24/7 Support"],
    image: "/images/Group2311.png",
  },
];

export default function SpecialPackages() {
  // حالة الاندكس الحالي للمجموعة
  const [currentIndex, setCurrentIndex] = useState(0);

  // الانتقال للباقة التالية
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % packagesData.length);
  };

  // الانتقال للباقة السابقة
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? packagesData.length - 1 : prevIndex - 1
    );
  };

  // الباقة الحالية
  const currentPackage = packagesData[currentIndex];

  // تنسيق رقم العداد (مثل 01, 02 ..الخ)
  const formatNumber = (num) => (num < 10 ? `0${num}` : num);

  return (
    <section className="relative w-full max-w-6xl mx-auto py-12 px-6 bg-white overflow-hidden text-[#1e293b]">
      {/* Dynamic Background Circle Accent - On the far right */}
      <div className="absolute top-1/2 -right-16 -translate-y-1/2 w-48 h-48 rounded-full border border-sky-300 opacity-60 pointer-events-none"></div>

      {/* Main Title */}
      <div className="text-center mb-12">
        <h2 className="text-xl font-bold tracking-widest text-[#1d2753] uppercase">
          SPECIAL PACKAGES
        </h2>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[380px]">
        {/* Left Column: Text & Info */}
        <div className="lg:col-span-6 space-y-6 transition-all duration-300">
          <h3 className="text-2xl font-bold text-[#1d2753]">
            {currentPackage.title}
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed max-w-xl">
            {currentPackage.description}
          </p>

          {/* Features List */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 font-medium pt-2">
            {currentPackage.features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sky-400">
                <svg
                  className="w-4 h-4 stroke-current fill-none stroke-2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-400">{feature}</span>
              </div>
            ))}
          </div>

          {/* View Details Button */}
          <div className="pt-2">
            <button className="px-6 py-2.5 text-sm font-semibold text-sky-600 bg-white border border-sky-300 rounded-lg shadow-sm hover:bg-sky-50 transition-all">
              View Details
            </button>
          </div>
        </div>

        {/* Right Column: Image with Wave Mask */}
        <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
          <div className="relative w-full max-w-md h-[380px] drop-shadow-xl">
            <img
              src={currentPackage.image}
              alt={currentPackage.title}
              className="w-full h-full object-contain transition-all duration-300"
            />
          </div>
        </div>
      </div>

      {/* Navigation Controls / Pagination */}
      <div className="flex items-center justify-between mt-12 pt-6 text-sm font-medium text-sky-500 border-t border-gray-100">
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer select-none"
        >
          <div className="w-7 h-7 rounded-full border border-sky-400 flex items-center justify-center">
            &#8592;
          </div>
          <span className="uppercase tracking-wider text-xs font-bold">
            PREVIOUS
          </span>
        </button>

        {/* Counter */}
        <div className="text-gray-400 text-xs tracking-wider font-semibold">
          Showing {formatNumber(currentIndex + 1)}/
          {formatNumber(packagesData.length)}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer select-none"
        >
          <span className="uppercase tracking-wider text-xs font-bold">
            NEXT
          </span>
          <div className="w-7 h-7 rounded-full border border-sky-400 flex items-center justify-center">
            &#8594;
          </div>
        </button>
      </div>
    </section>
  );
}
