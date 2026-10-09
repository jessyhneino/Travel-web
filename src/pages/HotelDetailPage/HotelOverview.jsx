import React, { useState } from "react";
import {
  Wifi,
  Snowflake,
  CheckCircle2,
  Home,
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
import { features } from "./data/features";

export default function HotelOverview() {
  // حالة فتح وإغلاق النافذة
  const [isModalOpen, setIsModalOpen] = useState(false);

  // حالات الخيارات داخل المودال
  const [selectedExtra, setSelectedExtra] = useState("no-extras");
  const [paymentMethod, setPaymentMethod] = useState("mastercard");

  return (
    <div className="my-6 px-4 md:px-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 pb-3 mb-6 gap-4">
        {/* Navigation Tabs Header */}
        <div className="flex items-center gap-4 sm:gap-8 text-sm font-medium overflow-x-auto no-scrollbar scroll-smooth -mb-3 pb-3">
          <button className="text-blue-600 border-b-2 border-blue-600 pb-3 -mb-3 font-semibold whitespace-nowrap transition-colors">
            Overview
          </button>
          <button className="text-gray-400 hover:text-gray-600 pb-3 -mb-3 whitespace-nowrap transition-colors">
            Rooms
          </button>
          <button className="text-gray-400 hover:text-gray-600 pb-3 -mb-3 whitespace-nowrap transition-colors">
            Location
          </button>
          <button className="text-gray-400 hover:text-gray-600 pb-3 -mb-3 whitespace-nowrap transition-colors">
            Reviews
          </button>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto bg-blue-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-blue-700 active:scale-95 transition-all shadow-sm shrink-0"
        >
          Reserve a room
        </button>
      </div>

      {/* Hotel Title & Rating */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-1">
          My Cloud Transit Hotel
        </h1>
        <div className="flex items-center gap-1 text-sm font-semibold text-slate-700 mb-1">
          <span>4.5</span>
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
        </div>
        <p className="text-sm font-medium text-slate-500">4.2/5 Very Good</p>
        <p className="text-xs text-gray-400 mt-1">
          Guests rated this property 4.0/5 for cleanliness.
        </p>
      </div>

      {/* Features & Small Map Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Features list */}
        <div className="md:col-span-7">
          <h2 className="text-base font-bold text-slate-800 mb-4">Features</h2>
          <div className="grid grid-cols-3 gap-y-3 gap-x-2 text-xs text-slate-600">
            {features.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                {item.icon}
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Small Location Map Preview */}
        <div className="md:col-span-5">
          <h2 className="text-base font-bold text-slate-800 mb-3">Location</h2>
          <div className="rounded-xl overflow-hidden border border-gray-100 shadow-sm mb-2">
            <img
              src="/images/Rectan1.png"
              alt="Map View"
              className="w-full h-36 object-cover bg-slate-100"
            />
          </div>
          <div className="flex justify-between items-start text-[11px] text-gray-500">
            <p>
              Terminal 1 / Gate z 25, frankfurt am Main/ Airport, Frankfurt,
              Hessen, 60549
            </p>
            <a
              href="#map"
              className="text-blue-600 font-medium whitespace-nowrap hover:underline"
            >
              View in a map
            </a>
          </div>
        </div>
      </div>

      {/* ================= Modal الحجز مع خلفية مغبشة ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50  flex items-center justify-center p-4 bg-black/40 backdrop-blur-md overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl my-auto max-h-[90vh] overflow-y-auto p-5 text-slate-800 relative animate-in fade-in duration-200">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <h3 className="text-base font-bold text-slate-800">Reserve</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full bg-sky-100 text-sky-500 hover:bg-sky-200 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Room Image */}
            <div className="rounded-xl overflow-hidden mb-4 h-40 w-full">
              <img
                src="/images/Rectangle18.png"
                alt="Room"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Room Title */}
            <h4 className="font-bold text-slate-800 text-sm mb-2">
              MEconomy Double Room, 1 Double Bed, Non Smoking
            </h4>

            {/* Room Sub-info */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mb-4">
              <span className="flex items-center gap-1">
                <Maximize2 className="w-3.5 h-3.5" /> 108 sq ft
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5" /> Sleeps 2
              </span>
              <span className="flex items-center gap-1">
                <BedDouble className="w-3.5 h-3.5" /> 1 Double Bed
              </span>
            </div>

            {/* Room Amenities */}
            <div className="mb-5">
              <h5 className="text-xs font-bold text-slate-800 mb-2">
                Room Amenities
              </h5>
              <div className="grid  grid-cols-2 sm:grid-cols-3  gap-y-2 text-[11px] text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Wifi className="w-3.5 h-3.5 text-sky-500" /> Free WiFi
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-500" />{" "}
                  Housekeeping
                </div>
                <div className="flex items-center gap-1.5">
                  <Dog className="w-3.5 h-3.5 text-sky-500" /> Pet friendly
                </div>
                <div className="flex items-center gap-1.5">
                  <Snowflake className="w-3.5 h-3.5 text-sky-500" /> Air
                  conditioning
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-sky-500" /> 24/7 front desk
                </div>
                <div className="flex items-center gap-1.5">
                  <Coffee className="w-3.5 h-3.5 text-sky-500" /> Breakfast
                  available
                </div>
              </div>
            </div>

            {/* Check-in / Guest Box */}
            <div className="bg-sky-50/60 rounded-xl p-3.5 mb-5 border border-sky-100">
              <div className="flex justify-between items-start text-xs mb-3">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">
                    Check In - Check Out
                  </span>
                  <span className="font-semibold text-slate-700">
                    15-03 / 22-04
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block font-medium">
                    Country
                  </span>
                  <span className="font-semibold text-slate-700">France</span>
                </div>
              </div>

              <div className="border-t border-dashed border-sky-200 my-2.5" />

              <div className="flex justify-between text-xs text-slate-700 font-medium">
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-sky-500" /> 8 Adults
                </div>
                <div className="flex items-center gap-1.5">
                  <Baby className="w-3.5 h-3.5 text-sky-500" /> 3 Children
                </div>
              </div>
            </div>

            {/* Extras */}
            <div className="mb-5">
              <h5 className="text-xs font-bold text-slate-800 mb-2.5">
                Extras
              </h5>
              <div className="space-y-2">
                <label className="flex items-center justify-between text-xs cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="extras"
                      checked={selectedExtra === "no-extras"}
                      onChange={() => setSelectedExtra("no-extras")}
                      className="accent-sky-500 w-4 h-4"
                    />
                    <span className="text-slate-700 font-medium">
                      No extras
                    </span>
                  </div>
                  <span className="text-slate-400 text-[11px]">+ $0</span>
                </label>

                <label className="flex items-center justify-between text-xs cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="extras"
                      checked={selectedExtra === "breakfast"}
                      onChange={() => setSelectedExtra("breakfast")}
                      className="accent-sky-500 w-4 h-4"
                    />
                    <span className="text-slate-700 font-medium">
                      Breakfast buffet
                    </span>
                  </div>
                  <span className="text-slate-400 text-[11px]">+ $15</span>
                </label>
              </div>
            </div>

            {/* Price Details */}
            <div className="bg-slate-50/80 rounded-xl p-3.5 mb-5 space-y-2 text-xs">
              <h5 className="font-bold text-slate-800 mb-1">Price details</h5>
              <div className="flex justify-between text-slate-500">
                <span>Room</span>
                <span className="text-sky-600 font-medium">960.00</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Fully refundable</span>
                <span className="text-sky-600 font-medium">30.00</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>
                  Extras{" "}
                  <span className="text-[10px] text-slate-400">
                    Breakfast buffet
                  </span>
                </span>
                <span className="text-sky-600 font-medium">25.00</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Taxes</span>
                <span className="text-sky-600 font-medium">30.00</span>
              </div>

              <div className="border-t border-slate-200 my-2 pt-2 flex justify-between items-center">
                <div>
                  <span className="font-bold text-slate-800 text-xs block">
                    Total (incl. VAT)
                  </span>
                  <span className="text-[10px] text-slate-400 block">
                    includes taxes & fees
                  </span>
                </div>
                <span className="font-bold text-sky-500 text-sm">
                  1698.00 SAR
                </span>
              </div>
            </div>

            {/* Payment Method */}
            <div className="mb-6">
              <h5 className="text-xs font-bold text-slate-800 mb-2.5">
                Choose Payment Method
              </h5>
              <div className="space-y-2">
                {/* Mastercard */}
                <label
                  className={`flex items-center justify-between p-2.5 rounded-xl border transition cursor-pointer ${
                    paymentMethod === "mastercard"
                      ? "border-sky-300 bg-sky-50/30"
                      : "border-slate-100 bg-slate-50/50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "mastercard"}
                      onChange={() => setPaymentMethod("mastercard")}
                      className="accent-sky-500 w-4 h-4"
                    />
                    <span className="text-xs font-medium text-slate-700">
                      Master Card
                    </span>
                  </div>
                  <div className="flex -space-x-1.5 items-center">
                    <img className="w-[44px] h-[25px]" src="/images/Mastercard_logo1.png" />

                  </div>
                </label>

                {/* Mada */}
                <label
                  className={`flex items-center justify-between p-2.5 rounded-xl border transition cursor-pointer ${
                    paymentMethod === "mada"
                      ? "border-sky-300 bg-sky-50/30"
                      : "border-slate-100 bg-slate-50/50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "mada"}
                      onChange={() => setPaymentMethod("mada")}
                      className="accent-sky-500 w-4 h-4"
                    />
                    <span className="text-xs font-medium text-slate-700">
                      Mada
                    </span>
                  </div>
                  <div>
                    <img className="w-[44px] h-[14px]" src="/images/Group2109.png" />
                  </div>
                </label>

                {/* Visa */}
                <label
                  className={`flex items-center justify-between p-2.5 rounded-xl border transition cursor-pointer ${
                    paymentMethod === "visa"
                      ? "border-sky-300 bg-sky-50/30"
                      : "border-slate-100 bg-slate-50/50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "visa"}
                      onChange={() => setPaymentMethod("visa")}
                      className="accent-sky-500 w-4 h-4"
                    />
                    <span className="text-xs font-medium text-slate-700">
                      Visa
                    </span>
                  </div>
                  <div>
                    <img className="w-[44px] h-[14px]" src="/images/symbols.png" alt="" />
                  </div>
                </label>
              </div>
            </div>

            {/* Reserve Button */}
            <button className="w-full bg-sky-400 hover:bg-sky-500 text-white font-semibold py-3 rounded-xl transition shadow-sm text-sm active:scale-[0.99]">
              Reserve
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
