import React, { useState, useEffect, useRef } from "react";
import {
  MapPin,
  Calendar,
  Users,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Minus,
  Plus,
  X,
} from "lucide-react";

export default function SearchBar() {
  const [activeModal, setActiveModal] = useState(null);
  const [distance, setDistance] = useState(10);
  const [rooms, setRooms] = useState([
    { id: 1, adults: 1, children: 1 },
    { id: 2, adults: 1, children: 1 },
  ]);

  const searchBarRef = useRef(null);

  // إغلاق النافذة المنبثقة عند الضغط خارج شريط البحث
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target)
      ) {
        setActiveModal(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // إدارة أعداد المسافرين
  const updateGuests = (roomId, type, delta) => {
    setRooms((prevRooms) =>
      prevRooms.map((room) => {
        if (room.id === roomId) {
          const newVal = room[type] + delta;
          return {
            ...room,
            [type]: newVal < 0 ? 0 : newVal,
          };
        }
        return room;
      })
    );
  };

  const addRoom = () => {
    setRooms((prevRooms) => [
      ...prevRooms,
      {
        id: Date.now(),
        adults: 1,
        children: 0,
      },
    ]);
  };

  const removeRoom = (id) => {
    if (rooms.length > 1) {
      setRooms((prevRooms) => prevRooms.filter((r) => r.id !== id));
    }
  };

  const totalTravelers = rooms.reduce(
    (acc, r) => acc + r.adults + r.children,
    0
  );

  return (
    <div ref={searchBarRef} className="relative w-full">
      {/* ================= SEARCH BAR ================= */}
      <div className="bg-white p-4 max-lg:p-3 rounded-2xl shadow-sm border border-slate-100 flex flex-wrap lg:flex-nowrap max-lg:flex-col items-center max-lg:items-stretch gap-3 max-lg:gap-2.5 w-full">
        {/* Location Selector */}
        <div
          onClick={() =>
            setActiveModal((prev) => (prev === "location" ? null : "location"))
          }
          className="flex-1 min-w-[240px] max-lg:w-full max-lg:min-w-0 flex items-center gap-3 border border-blue-200 rounded-xl px-4 py-2.5 max-lg:px-3.5 max-lg:py-3 bg-white cursor-pointer select-none hover:border-blue-400 transition-colors"
        >
          <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0" />
          <div className="flex flex-col text-left min-w-0">
            <span className="text-[11px] text-slate-400 font-medium">
              Going to:
            </span>
            <span className="text-sm font-semibold text-blue-600 truncate">
              Berlin (and vicinity), Germany
            </span>
          </div>
        </div>

        {/* Date Selector */}
        <div
          onClick={() =>
            setActiveModal((prev) => (prev === "date" ? null : "date"))
          }
          className="flex-1 min-w-[200px] max-lg:w-full max-lg:min-w-0 flex items-center justify-between border border-blue-200 rounded-xl px-4 py-2.5 max-lg:px-3.5 max-lg:py-3 bg-white cursor-pointer select-none hover:border-blue-400 transition-colors"
        >
          <div className="flex items-center gap-3 min-w-0">
            <Calendar className="w-5 h-5 text-blue-600 flex-shrink-0" />
            <div className="flex flex-col text-left min-w-0">
              <span className="text-[11px] text-slate-400 font-medium">
                Check in-out:
              </span>
              <span className="text-sm font-semibold text-blue-600 truncate">
                Oct 23 - Nov 20
              </span>
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400 ml-2 flex-shrink-0" />
        </div>

        {/* Travelers Selector */}
        <div
          onClick={() =>
            setActiveModal((prev) =>
              prev === "travelers" ? null : "travelers"
            )
          }
          className="flex-1 min-w-[200px] max-lg:w-full max-lg:min-w-0 flex items-center justify-between border border-blue-200 rounded-xl px-4 py-2.5 max-lg:px-3.5 max-lg:py-3 bg-white cursor-pointer select-none hover:border-blue-400 transition-colors"
        >
          <div className="flex items-center gap-3 min-w-0">
            <Users className="w-5 h-5 text-blue-600 flex-shrink-0" />
            <div className="flex flex-col text-left min-w-0">
              <span className="text-[11px] text-slate-400 font-medium">
                Travelers:
              </span>
              <span className="text-sm font-semibold text-blue-600 truncate">
                {rooms.length} room{rooms.length > 1 ? "s" : ""},{" "}
                {totalTravelers} travelers
              </span>
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400 ml-2 flex-shrink-0" />
        </div>

        {/* Search Button */}
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-xl flex flex-col max-lg:flex-row items-center justify-center gap-1 max-lg:gap-2 transition-colors min-w-[120px] max-lg:w-full max-lg:min-w-0">
          <Search className="w-5 h-5" />
          <span className="text-xs font-semibold">Find Now</span>
        </button>
      </div>

      {/* ================= MOBILE MODAL BACKDROP ================= */}
      {activeModal && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          onClick={() => setActiveModal(null)}
        />
      )}

      {/* ================= LOCATION MODAL ================= */}
      {activeModal === "location" && (
        <div
          className="
            absolute top-full left-0
            max-lg:fixed max-lg:top-1/2 max-lg:left-1/2
            max-lg:-translate-x-1/2 max-lg:-translate-y-1/2
            max-lg:w-[80vw] max-lg:max-w-none
            max-lg:max-h-[80vh] max-lg:overflow-y-auto
            max-lg:z-[70]
            mt-2
            w-80
            bg-white rounded-2xl shadow-xl
            border border-slate-100
            p-5
            z-50 text-left
          "
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-800">Location</h3>
            <button
              onClick={() => setActiveModal(null)}
              className="lg:hidden w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-400">
              <span className="opacity-60">🌐 Country</span>
            </div>
            <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-400">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span>Where are you going?</span>
            </div>
          </div>

          <button className="flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:underline mb-4">
            <MapPin className="w-3.5 h-3.5" />
            Set Point On Map
          </button>

          <div className="mb-4">
            <span className="text-xs font-semibold text-slate-700 block mb-2">
              Distance from my location
            </span>
            <input
              type="range"
              min="10"
              max="50"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              className="w-full h-1 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[11px] text-blue-600 font-semibold mt-1">
              <span>{distance} K.m</span>
              <span>50 K.m</span>
            </div>
          </div>

          <div>
            <span className="text-xs font-semibold text-slate-700 block mb-2">
              Results
            </span>
            <div className="space-y-2">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-2 cursor-pointer hover:bg-slate-50 p-1 rounded-lg"
                >
                  <MapPin className="w-3.5 h-3.5 text-slate-500 mt-0.5" />
                  <div>
                    <p className="text-xs font-medium text-slate-700 leading-none">
                      Makkah
                    </p>
                    <p className="text-[10px] text-slate-400">
                      Province, Saudi Arabia
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= DATE MODAL ================= */}
      {activeModal === "date" && (
        <div
          className="
            absolute top-full left-1/4
            max-lg:fixed max-lg:top-1/2 max-lg:left-1/2
            max-lg:-translate-x-1/2 max-lg:-translate-y-1/2
            max-lg:w-[80vw] max-lg:max-w-none
            max-lg:max-h-[80vh] max-lg:overflow-y-auto
            max-lg:z-[70]
            mt-2
            w-[480px]
            bg-white rounded-2xl shadow-xl
            border border-slate-100
            p-6
            z-50 text-left
          "
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-800">Check in-out</h3>
            <button
              onClick={() => setActiveModal(null)}
              className="lg:hidden w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Date Summary */}
          <div className="flex items-center justify-between bg-slate-50/70 rounded-xl p-3 mb-6">
            <div>
              <p className="text-base font-bold text-slate-700">13 Oct</p>
              <p className="text-xs text-slate-400">Thursday</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-sky-400 text-white flex items-center justify-center flex-shrink-0">
              →
            </div>
            <div className="text-right">
              <p className="text-base font-bold text-slate-700">19 Oct</p>
              <p className="text-xs text-slate-400">Saturday</p>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-6 max-sm:gap-8">
            {/* February */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <button className="text-slate-400 hover:text-slate-600">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-semibold text-slate-600">
                  February
                </span>
                <span className="w-4"></span>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-medium text-slate-400 mb-2">
                <span>Mo</span>
                <span>Tu</span>
                <span>We</span>
                <span>Th</span>
                <span>Fr</span>
                <span>Sa</span>
                <span>Su</span>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => (
                  <button
                    key={day}
                    className={`h-7 w-7 rounded-full flex items-center justify-center text-[11px] ${
                      day === 23
                        ? "bg-blue-600 text-white font-bold"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            {/* March */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-4"></span>
                <span className="text-xs font-semibold text-slate-600">
                  March
                </span>
                <button className="text-slate-400 hover:text-slate-600">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-medium text-slate-400 mb-2">
                <span>Mo</span>
                <span>Tu</span>
                <span>We</span>
                <span>Th</span>
                <span>Fr</span>
                <span>Sa</span>
                <span>Su</span>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => (
                  <button
                    key={day}
                    className={`h-7 w-7 rounded-full flex items-center justify-center text-[11px] ${
                      day === 27
                        ? "bg-blue-600 text-white font-bold"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TRAVELERS MODAL ================= */}
      {activeModal === "travelers" && (
        <div
          className="
            absolute top-full right-0
            max-lg:fixed max-lg:top-1/2 max-lg:left-1/2
            max-lg:right-auto
            max-lg:-translate-x-1/2 max-lg:-translate-y-1/2
            max-lg:w-[80vw] max-lg:max-w-none
            max-lg:max-h-[80vh] max-lg:overflow-y-auto
            max-lg:z-[70]
            mt-2
            w-80
            bg-white rounded-2xl shadow-xl
            border border-slate-100
            p-5
            z-50 text-left
          "
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-800">Travelers</h3>
            <button
              onClick={() => setActiveModal(null)}
              className="lg:hidden w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-5 max-h-72 overflow-y-auto pr-1">
            {rooms.map((room, idx) => (
              <div
                key={room.id}
                className="border-b border-slate-100 pb-4 last:border-b-0"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-700">
                    Room {idx + 1}
                  </span>
                  {rooms.length > 1 && (
                    <button
                      onClick={() => removeRoom(room.id)}
                      className="text-red-400 hover:text-red-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Adults */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-500">Adults</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateGuests(room.id, "adults", -1)}
                      className="w-6 h-6 border rounded-md flex items-center justify-center text-slate-400 hover:border-slate-400"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-semibold w-4 text-center">
                      {room.adults}
                    </span>
                    <button
                      onClick={() => updateGuests(room.id, "adults", 1)}
                      className="w-6 h-6 border rounded-md flex items-center justify-center text-blue-600 border-blue-200 hover:border-blue-400"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Children */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-500">Children</p>
                    <p className="text-[9px] text-slate-400">Age: 0-17</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateGuests(room.id, "children", -1)}
                      className="w-6 h-6 border rounded-md flex items-center justify-center text-slate-400 hover:border-slate-400"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-semibold w-4 text-center">
                      {room.children}
                    </span>
                    <button
                      onClick={() => updateGuests(room.id, "children", 1)}
                      className="w-6 h-6 border rounded-md flex items-center justify-center text-blue-600 border-blue-200 hover:border-blue-400"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={addRoom}
            className="w-full mt-3 py-2 text-xs font-semibold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-right"
          >
            + Add Another Room
          </button>
        </div>
      )}
    </div>
  );
}
