import React, { useState } from "react";
import {
  Wifi,
  Snowflake,
  CheckCircle2,
  Dog,
  Coffee,
  Star,
  X,
  Users,
  BedDouble,
  Maximize2,
  Clock,
  User,
  Baby,
} from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useTranslation } from "react-i18next";
import { features } from "./data/features";

export default function HotelOverview() {
  const { t } = useTranslation();

  // حالة فتح وإغلاق نافذة الحجز
  const [isModalOpen, setIsModalOpen] = useState(false);

  // تحديد التبويب النشط
  const [activeTab, setActiveTab] = useState("overview");

  // حالات الخيارات داخل المودال
  const [selectedExtra, setSelectedExtra] = useState("no-extras");
  const [paymentMethod, setPaymentMethod] = useState("mastercard");

  // التبويبات والتنقل بين الأقسام
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "rooms", label: "Rooms" },
    { id: "location", label: "Location" },
    { id: "reviews", label: "Reviews" },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);

    document.getElementById(tabId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div id="overview" className="my-6 px-4 md:px-0 scroll-mt-24">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 mb-6 gap-4">
        {/* Navigation Tabs Header */}
        <div className="flex items-center gap-4 sm:gap-8 text-sm font-medium overflow-x-auto no-scrollbar scroll-smooth -mb-3 pb-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`pb-4 -mb-3 whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "text-blue-600 border-blue-600 font-semibold"
                  : "text-gray-600 border-transparent hover:text-blue-600"
              }`}
            >
              {t(tab.label)}
            </button>
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto bg-blue-600 text-white text-sm font-medium py-[8px] px-[12px] mb-[10px] rounded-[6px] hover:bg-blue-700 active:scale-95 transition-all shadow-sm shrink-0"
        >
          {t("Reserve a room")}
        </button>
      </div>

      {/* Hotel Title & Rating */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-1">
          {t("My Cloud Transit Hotel")}
        </h1>

        <div className="flex items-center gap-1 text-sm font-semibold text-slate-700 mb-1">
          <span>4.5</span>
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
        </div>

        <p className="text-sm font-medium text-slate-500">
          {t("4.2/5 Very Good")}
        </p>

        <p className="text-xs text-gray-600 mt-1">
          {t("Guests rated this property 4.0/5 for cleanliness.")}
        </p>
      </div>

      {/* Features & Small Map Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Features list */}
        <div className="md:col-span-7">
          <h2 className="text-base font-bold text-slate-800 mb-4">
            {t("Features")}
          </h2>

          <div className="grid grid-cols-3 gap-y-3 gap-x-2 text-xs text-slate-600">
            {features.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                {item.icon}
                <span>{t(item.text)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Small Location Map Preview */}
        <div className="md:col-span-5 z-0">
          <h2 className="text-base font-bold text-slate-800 mb-3">
            {t("Location")}
          </h2>
          <div className="rounded-[6px] overflow-hidden border border-gray-100 shadow-sm mb-2">
            <MapContainer
              center={[30.0444, 31.2357]}
              zoom={13}
              scrollWheelZoom={false}
              className="w-full h-36"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <Marker position={[30.0444, 31.2357]}>
                <Popup>{t("Map View")}</Popup>
              </Marker>
            </MapContainer>
          </div>
          <div className="flex justify-between items-start text-[11px] text-gray-600">
            <p>
              {t(
                "Terminal 1 / Gate z 25, frankfurt am Main/ Airport, Frankfurt, Hessen, 60549"
              )}
            </p>

            <a
              href="#map"
              className="text-blue-600 font-medium whitespace-nowrap hover:underline"
            >
              {t("View in a map")}
            </a>
          </div>
        </div>
      </div>

      {/* Reservation Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-blue-600/25 backdrop-blur-[0.25px] overflow-y-auto p-8"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-[6px] shadow-2xl w-full max-w-xl my-auto max-h-[90vh] overflow-y-auto p-5 sm:p-6 lg:p-7 text-[#202747] relative animate-in fade-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#202747]">
                {t("Reserve")}
              </h3>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full bg-[#D9F3FF] text-[#25B9F5] hover:bg-[#C5EDFF] transition"
                aria-label={t("Close reservation")}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Room Image */}
            <div className="rounded-[6px] overflow-hidden mb-6 h-40 sm:h-44 w-full">
              <img
                src="/images/Rectangle18.png"
                alt={t("Room")}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Room Title */}
            <h4 className="font-bold text-lg text-[#202747] mb-3">
              {t("MEconomy Double Room, 1 Double Bed, Non Smoking")}
            </h4>

            {/* Room Sub-info */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-[#8A90A5] mb-7">
              <span className="flex items-center gap-1.5">
                <Maximize2 className="w-4 h-4 text-[#3478FF]" />
                108 {t("sq ft")}
              </span>

              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#3478FF]" />
                {t("Sleeps 2")}
              </span>

              <span className="flex items-center gap-1.5">
                <BedDouble className="w-4 h-4 text-[#3478FF]" />
                {t("1 Double Bed")}
              </span>
            </div>

            {/* Room Amenities */}
            <div className="mb-6">
              <h5 className="text-base font-bold text-[#202747] mb-4">
                {t("Room Amenities")}
              </h5>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-5 text-sm text-[#81879C]">
                <div className="flex items-center gap-1.5">
                  <Wifi className="w-4 h-4 shrink-0 text-[#3478FF]" />
                  {t("Free WiFi")}
                </div>

                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-[#3478FF]" />
                  {t("Housekeeping")}
                </div>

                <div className="flex items-center gap-1.5">
                  <Dog className="w-4 h-4 shrink-0 text-[#3478FF]" />
                  {t("Pet friendly")}
                </div>

                <div className="flex items-center gap-1.5">
                  <Snowflake className="w-4 h-4 shrink-0 text-[#3478FF]" />
                  {t("Air conditioning")}
                </div>

                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 shrink-0 text-[#3478FF]" />
                  {t("24/7 front desk")}
                </div>

                <div className="flex items-center gap-1.5">
                  <Coffee className="w-4 h-4 shrink-0 text-[#3478FF]" />
                  {t("Breakfast available")}
                </div>
              </div>
            </div>

            {/* Check-in / Guest Box */}
            <div className="bg-[#EAF9FE] rounded-[6px] p-4 mb-6">
              <div className="grid grid-cols-2 gap-4 text-sm mb-5">
                <div>
                  <span className="text-sm text-[#818BA2] block mb-1">
                    {t("Check In - Check Out")}
                  </span>

                  <span className="font-semibold text-[#202747]">
                    15-03 / 22-04
                  </span>
                </div>

                <div>
                  <span className="text-sm text-[#818BA2] block mb-1">
                    {t("Country")}
                  </span>

                  <span className="font-semibold text-[#202747]">
                    {t("France")}
                  </span>
                </div>
              </div>

              <div className="border-t-2 border-dashed border-[#6CD7FF] mb-5" />

              <div className="grid grid-cols-2 gap-4 text-sm text-[#202747]">
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-[#25B9F5]" />
                  {t("8 Adults")}
                </div>

                <div className="flex items-center gap-1.5">
                  <Baby className="w-4 h-4 text-[#25B9F5]" />
                  {t("3 Children")}
                </div>
              </div>
            </div>

            {/* Extras */}
            <div className="mb-7">
              <h5 className="text-base font-bold text-[#202747] mb-4">
                {t("Extras")}
              </h5>

              <div className="space-y-4">
                <label className="flex items-center justify-between text-base cursor-pointer">
                  <div className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name="extras"
                      checked={selectedExtra === "no-extras"}
                      onChange={() => setSelectedExtra("no-extras")}
                      className="accent-[#25B9F5] w-5 h-5"
                    />

                    <span className="text-[#202747]">{t("No extras")}</span>
                  </div>

                  <span className="text-[#8A90A5]">+$0</span>
                </label>

                <label className="flex items-center justify-between text-base cursor-pointer">
                  <div className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name="extras"
                      checked={selectedExtra === "breakfast"}
                      onChange={() => setSelectedExtra("breakfast")}
                      className="accent-[#25B9F5] w-5 h-5"
                    />

                    <span className="text-[#202747]">
                      {t("Breakfast buffet")}
                    </span>
                  </div>

                  <span className="text-[#8A90A5]">+$15</span>
                </label>
              </div>
            </div>

            {/* Price Details */}
            <div className="bg-[#F8F9FE] rounded-[6px] p-5 mb-7 space-y-4 text-base">
              <h5 className="font-semibold text-[#202747] mb-6">
                {t("Price details")}
              </h5>

              <div className="flex justify-between items-center gap-3">
                <span className="text-[#303956]">{t("Room")}</span>

                <span className="text-[#3478FF] font-medium">960.00</span>
              </div>

              <div className="flex justify-between items-center gap-3">
                <span className="text-[#303956]">{t("Fully refundable")}</span>

                <span className="text-[#3478FF] font-medium">30.00</span>
              </div>

              <div className="flex justify-between items-center gap-3">
                <span className="text-[#303956]">
                  {t("Extras")}{" "}
                  <span className="text-xs text-[#3478FF] ml-1">
                    {selectedExtra === "breakfast" ? t("Breakfast buffet") : ""}
                  </span>
                </span>

                <span className="text-[#3478FF] font-medium">
                  {selectedExtra === "breakfast" ? "25.00" : "0.00"}
                </span>
              </div>

              <div className="flex justify-between items-center gap-3">
                <span className="text-[#303956]">{t("Taxes")}</span>

                <span className="text-[#3478FF] font-medium">30.00</span>
              </div>

              <div className="border-t border-[#D8E4FF] pt-4 mt-5 flex justify-between items-center gap-3">
                <div>
                  <span className="font-bold text-[#202747] text-base block">
                    {t("Total (incl. VAT)")}
                  </span>

                  <span className="text-sm text-[#81879C] block mt-0.5">
                    {t("includes taxes & fees")}
                  </span>
                </div>

                <span className="font-bold text-[#25B9F5] text-lg whitespace-nowrap">
                  {(1698 + (selectedExtra === "breakfast" ? 25 : -25)).toFixed(
                    2
                  )}{" "}
                  SAR
                </span>
              </div>
            </div>

            {/* Payment Method */}
            <div className="mb-7">
              <h5 className="text-base font-bold text-[#202747] mb-5">
                {t("Choose Payment Method")}
              </h5>

              <div className="space-y-3">
                {/* Mastercard */}
                <label
                  className={`flex items-center justify-between p-3.5 rounded-[6px] border transition cursor-pointer ${
                    paymentMethod === "mastercard"
                      ? "border-transparent bg-[#F8F9FD]"
                      : "border-transparent bg-[#F8F9FD]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "mastercard"}
                      onChange={() => setPaymentMethod("mastercard")}
                      className="accent-[#25B9F5] w-5 h-5"
                    />

                    <span className="text-base text-[#303956]">
                      {t("Master Card")}
                    </span>
                  </div>

                  <img
                    className="w-[55px] h-[31px] object-contain"
                    src="/images/Mastercard_logo1.png"
                    alt="Mastercard"
                  />
                </label>

                {/* Mada */}
                <label
                  className={`flex items-center justify-between p-3.5 rounded-[6px] border transition cursor-pointer ${
                    paymentMethod === "mada"
                      ? "border-transparent bg-[#F8F9FD]"
                      : "border-transparent bg-[#F8F9FD]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "mada"}
                      onChange={() => setPaymentMethod("mada")}
                      className="accent-[#25B9F5] w-5 h-5"
                    />

                    <span className="text-base text-[#303956]">
                      {t("Mada")}
                    </span>
                  </div>

                  <img
                    className="w-[55px] h-[25px] object-contain"
                    src="/images/Group2109.png"
                    alt="Mada"
                  />
                </label>

                {/* Visa */}
                <label
                  className={`flex items-center justify-between p-3.5 rounded-[6px] border transition cursor-pointer ${
                    paymentMethod === "visa"
                      ? "border-transparent bg-[#F8F9FD]"
                      : "border-transparent bg-[#F8F9FD]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "visa"}
                      onChange={() => setPaymentMethod("visa")}
                      className="accent-[#25B9F5] w-5 h-5"
                    />

                    <span className="text-base text-[#303956]">
                      {t("Visa")}
                    </span>
                  </div>

                  <img
                    className="w-[55px] h-[25px] object-contain"
                    src="/images/symbols.png"
                    alt="Visa"
                  />
                </label>
              </div>
            </div>

            {/* Reserve Button */}
            <button className="w-full bg-[#25B9F5] hover:bg-[#13A9E8] text-white font-semibold py-4 rounded-[6px] transition shadow-sm text-base active:scale-[0.99]">
              {t("Reserve")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
