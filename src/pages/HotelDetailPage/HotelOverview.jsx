import React from "react";
import {
  Wifi,
  Snowflake,
  CheckCircle2,
  Home,
  Dog,
  Coffee,
  Star,
} from "lucide-react";
import { features } from "./data/features";

export default function HotelOverview() {
  

  return (
    <div className="my-6">
      {/* Navigation Tabs Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-6">
        <div className="flex gap-8 text-sm font-medium">
          <button className="text-blue-600 border-b-2 border-blue-600 pb-3 -mb-3 font-semibold">
            Overview
          </button>
          <button className="text-gray-400 hover:text-gray-600">Rooms</button>
          <button className="text-gray-400 hover:text-gray-600">
            Location
          </button>
          <button className="text-gray-400 hover:text-gray-600">Reviews</button>
        </div>
        <button className="bg-blue-600 text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-blue-700 transition">
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
    </div>
  );
}
