import React, { useState, useEffect, useRef } from "react";
import {
  Plane,
  Building2,
  CreditCard,
  ChevronDown,
  Plus,
  Minus,
  Trash2,
  CalendarDays,
  Users,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SLOW_FADE_IN = {
  hidden: { opacity: 0, y: 35, scale: 0.96 },
  visible: (customDelay = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1],
      delay: customDelay,
    },
  }),
};

const DESTINATIONS = [
  "Spain",
  "France",
  "Italy",
  "Netherlands",
  "Germany",
  "Switzerland",
  "United Kingdom",
  "Turkey",
  "Greece",
  "Portugal",
  "Egypt",
  "Lebanon",
  "United Arab Emirates",
  "Saudi Arabia",
  "Japan",
  "Thailand",
  "United States",
  "Canada",
  "Australia",
];

const TABS = [
  { id: "flight", label: "Flight", icon: Plane },
  { id: "hotel", label: "Hotel", icon: Building2 },
  { id: "visa", label: "Visa", icon: CreditCard },
];

const BACKGROUND_IMAGE_URL = "/images/Rectangle.png";

const formatDate = (date) => {
  if (!date) return "";
  const [year, month, day] = date.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

export default function Hero() {
  const [activeTab, setActiveTab] = useState("hotel");
  const [goingTo, setGoingTo] = useState("Spain");
  const [dateRange, setDateRange] = useState("Oct 23 - Nov 20");
  const [travelers, setTravelers] = useState("1 room, 2 travelers");
  const [activeDropdown, setActiveDropdown] = useState(null);

  const [checkIn, setCheckIn] = useState("2026-10-23");
  const [checkOut, setCheckOut] = useState("2026-11-20");
  const [rooms, setRooms] = useState([{ id: 1, adults: 2, children: 0 }]);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const updateDateRange = (newCheckIn, newCheckOut) => {
    setCheckIn(newCheckIn);
    setCheckOut(newCheckOut);

    if (newCheckIn && newCheckOut) {
      setDateRange(`${formatDate(newCheckIn)} - ${formatDate(newCheckOut)}`);
    } else if (newCheckIn) {
      setDateRange(`${formatDate(newCheckIn)} - Select check-out`);
    } else {
      setDateRange("Select dates");
    }
  };

  const updateTravelers = (updatedRooms) => {
    setRooms(updatedRooms);
    const totalTravelers = updatedRooms.reduce(
      (sum, r) => sum + r.adults + r.children,
      0
    );
    setTravelers(
      `${updatedRooms.length} ${
        updatedRooms.length === 1 ? "room" : "rooms"
      }, ${totalTravelers} ${totalTravelers === 1 ? "traveler" : "travelers"}`
    );
  };

  const updateRoom = (roomId, field, amount) => {
    const updatedRooms = rooms.map((room) => {
      if (room.id !== roomId) return room;
      const minVal = field === "adults" ? 1 : 0;
      return { ...room, [field]: Math.max(minVal, room[field] + amount) };
    });
    updateTravelers(updatedRooms);
  };

  const addRoom = () => {
    if (rooms.length >= 8) return;
    updateTravelers([...rooms, { id: Date.now(), adults: 1, children: 0 }]);
  };

  const removeRoom = (roomId) => {
    if (rooms.length <= 1) return;
    updateTravelers(rooms.filter((room) => room.id !== roomId));
  };

  const getMinCheckout = () => {
    if (!checkIn) return new Date().toLocaleDateString("en-CA");
    const next = new Date(`${checkIn}T12:00:00`);
    next.setDate(next.getDate() + 1);
    return next.toISOString().split("T")[0];
  };

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden lg:overflow-visible -top-[50px]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 h-[100vh] md:h-[90vh] w-full">
        <div
          className="relative w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${BACKGROUND_IMAGE_URL})`,
            WebkitClipPath: "url(#heroWaveClip)",
          }}
        >
          <div className="absolute bottom-0 left-0 z-10 w-full pointer-events-none">
            <img
              src="/images/Group.png"
              alt="Wave curves"
              className="block object-cover w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12 sm:pb-16 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mt-10">
          <div className="hidden lg:block lg:col-span-2" />

          {/* Search Card */}
          <div className="flex flex-col items-center w-full pt-2 lg:col-span-7">
            {/* Logo */}
            <motion.div
              className="mb-3 opacity-90"
              initial={{ opacity: 0, scale: 0.75, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 1.4,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.3,
              }}
            >
              <img
                src="/images/icon.png"
                alt="Logo Watermark"
                className="w-[100px] h-[100px] object-contain filter drop-shadow"
              />
            </motion.div>

            {/* Search Box */}
            <motion.div
              className="w-full max-w-full sm:max-w-md md:max-w-lg bg-white rounded-2xl p-4 sm:p-6 shadow-lg sm:shadow-sm border border-slate-100/80 backdrop-blur-sm"
              variants={SLOW_FADE_IN}
              initial="hidden"
              animate="visible"
              custom={0.6}
            >
              {/* Category Tabs */}
              <div className="flex items-center justify-between sm:justify-center gap-2 sm:gap-6 md:gap-8 mb-5 sm:mb-6">
                {TABS.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setActiveTab(id)}
                    className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm transition-all rounded-lg flex-1 sm:flex-none ${
                      activeTab === id
                        ? "bg-blue-50 text-blue-600 font-semibold"
                        : "text-slate-700 hover:text-slate-900 hover:bg-slate-50 font-medium"
                    }`}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 shrink-0" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>

              {/* Form Controls */}
              <div ref={dropdownRef} className="space-y-3">
                {/* Going To */}
                <div className="relative cursor-pointer">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveDropdown(
                        activeDropdown === "destination" ? null : "destination"
                      )
                    }
                    className="w-full cursor-pointer border border-blue-400 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 bg-white flex items-center gap-1.5 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all text-left"
                  >
                    <span className="text-xs sm:text-sm text-slate-500 whitespace-nowrap">
                      Going to:
                    </span>
                    <span className="w-full text-xs font-semibold text-blue-600 sm:text-sm truncate">
                      {goingTo}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${
                        activeDropdown === "destination" ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {activeDropdown === "destination" && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 right-0 mt-2 z-50 bg-white border border-slate-100 rounded-xl shadow-xl p-2 max-h-56 overflow-y-auto"
                      >
                        <p className="px-3 py-2 text-xs font-semibold text-slate-400">
                          Choose your destination
                        </p>
                        {DESTINATIONS.map((country) => (
                          <button
                            key={country}
                            type="button"
                            onClick={() => {
                              setGoingTo(country);
                              setActiveDropdown(null);
                            }}
                            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm cursor-pointer transition-colors ${
                              goingTo === country
                                ? "bg-blue-50 text-blue-600 font-semibold"
                                : "text-slate-700 hover:bg-slate-50"
                            }`}
                          >
                            {country}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Dates & Travelers Grid */}
                <div className="grid grid-cols-1 cursor-pointer gap-3 sm:grid-cols-2">
                  {/* Check-in / Check-out */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === "dates" ? null : "dates"
                        )
                      }
                      className="w-full text-left border border-blue-400 rounded-xl px-3.5 sm:px-4 py-2 sm:py-2.5 bg-white flex justify-between items-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                    >
                      <div className="w-full min-w-0">
                        <label className="block text-[10px] sm:text-xs text-slate-400 mb-0.5">
                          Check in-out:
                        </label>
                        <span className="block w-full truncate text-xs font-semibold text-blue-600 sm:text-sm">
                          {dateRange || "Select dates"}
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 ml-1 text-slate-500 shrink-0 fill-slate-500 transition-transform ${
                          activeDropdown === "dates" ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {activeDropdown === "dates" && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 right-0 sm:left-auto sm:right-0 sm:w-80 mt-2 z-50 bg-white border border-slate-100 rounded-xl shadow-xl p-4"
                        >
                          <div className="flex items-center gap-2 mb-4">
                            <CalendarDays className="w-5 h-5 text-blue-500" />
                            <h3 className="text-sm font-bold text-slate-800">
                              Select your dates
                            </h3>
                          </div>

                          <div className="space-y-3">
                            {/* Check-in Field */}
                            <div>
                              <label className="block text-xs text-slate-500 mb-1.5">
                                Check-in
                              </label>
                              <input
                                type="date"
                                value={checkIn}
                                min={new Date().toLocaleDateString("en-CA")}
                                onChange={(e) => {
                                  const newCheckIn = e.target.value;
                                  // إذا كان تاريخ المغادرة الحالي يسبق أو يساوي تاريخ الوصول الجديد، نقوم بتفريغه أو تحديثه
                                  let newCheckOut = checkOut;
                                  if (
                                    newCheckOut &&
                                    newCheckOut <= newCheckIn
                                  ) {
                                    // اختيارياً: جعل تاريخ المغادرة اليوم التالي تلقائياً لراحة المستخدم
                                    const nextDay = new Date(newCheckIn);
                                    nextDay.setDate(nextDay.getDate() + 1);
                                    newCheckOut =
                                      nextDay.toLocaleDateString("en-CA");
                                  }
                                  updateDateRange(newCheckIn, newCheckOut);
                                }}
                                className="w-full min-w-0 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                              />
                            </div>

                            {/* Check-out Field */}
                            <div>
                              <label className="block text-xs text-slate-500 mb-1.5">
                                Check-out
                              </label>
                              <input
                                type="date"
                                value={checkOut}
                                min={
                                  checkIn
                                    ? (() => {
                                        const minOut = new Date(checkIn);
                                        minOut.setDate(minOut.getDate() + 1);
                                        return minOut.toLocaleDateString(
                                          "en-CA"
                                        );
                                      })()
                                    : new Date().toLocaleDateString("en-CA")
                                }
                                onChange={(e) =>
                                  updateDateRange(checkIn, e.target.value)
                                }
                                className="w-full min-w-0 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                              />
                            </div>
                          </div>

                          {/* تنبيه خطأ في حال تطابق التواريخ أو خطأها */}
                          {checkIn && checkOut && checkOut <= checkIn && (
                            <p className="text-xs text-red-500 mt-2">
                              ⚠️ Check-out date must be after check-in date.
                            </p>
                          )}

                          <button
                            type="button"
                            disabled={
                              !checkIn || !checkOut || checkOut <= checkIn
                            }
                            onClick={() => {
                              if (checkIn && checkOut && checkOut > checkIn) {
                                setActiveDropdown(null);
                              }
                            }}
                            className="w-full cursor-pointer mt-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-sm font-semibold py-2.5 rounded-lg transition-colors"
                          >
                            Apply dates
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Travelers */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === "travelers" ? null : "travelers"
                        )
                      }
                      className="w-full text-left border border-blue-400 rounded-xl px-3.5 sm:px-4 py-2 sm:py-2.5 bg-white flex justify-between items-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                    >
                      <div className="w-full min-w-0">
                        <label className="block text-[10px] sm:text-xs text-slate-400 mb-0.5">
                          Travelers
                        </label>
                        <span className="block w-full truncate text-xs font-semibold text-blue-600 sm:text-sm">
                          {travelers}
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 ml-1 text-slate-500 shrink-0 fill-slate-500 transition-transform ${
                          activeDropdown === "travelers" ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {activeDropdown === "travelers" && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 right-0 sm:left-auto sm:right-0 sm:w-80 mt-2 z-50 bg-white border border-slate-100 rounded-xl shadow-xl p-4 max-h-80 overflow-y-auto"
                        >
                          <div className="flex items-center gap-2 mb-4">
                            <Users className="w-5 h-5 text-blue-500" />
                            <h3 className="text-sm font-bold text-slate-800">
                              Rooms & travelers
                            </h3>
                          </div>

                          <div className="space-y-4">
                            {rooms.map((room, index) => (
                              <div
                                key={room.id}
                                className="pb-4 border-b border-slate-100 last:border-b-0 last:pb-0"
                              >
                                <div className="flex items-center justify-between mb-3">
                                  <h4 className="text-sm font-semibold text-slate-800">
                                    Room {index + 1}
                                  </h4>
                                  {rooms.length > 1 && (
                                    <button
                                      type="button"
                                      onClick={() => removeRoom(room.id)}
                                      aria-label={`Remove room ${index + 1}`}
                                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  )}
                                </div>

                                {/* Adults */}
                                <div className="flex items-center justify-between gap-2 mb-3">
                                  <div>
                                    <p className="text-sm font-medium text-slate-700">
                                      Adults
                                    </p>
                                    <p className="text-[11px] text-slate-400">
                                      Ages 18+
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        updateRoom(room.id, "adults", -1)
                                      }
                                      disabled={room.adults <= 1}
                                      aria-label="Decrease adults"
                                      className="w-7 h-7 flex items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:border-blue-400 hover:text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                    >
                                      <Minus className="w-3.5 h-3.5" />
                                    </button>
                                    <span className="w-4 text-center text-sm font-semibold text-slate-800">
                                      {room.adults}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        updateRoom(room.id, "adults", 1)
                                      }
                                      disabled={
                                        room.adults + room.children >= 8
                                      }
                                      aria-label="Increase adults"
                                      className="w-7 h-7 flex items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:border-blue-400 hover:text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                    >
                                      <Plus className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>

                                {/* Children */}
                                <div className="flex items-center justify-between gap-2">
                                  <div>
                                    <p className="text-sm font-medium text-slate-700">
                                      Children
                                    </p>
                                    <p className="text-[11px] text-slate-400">
                                      Ages 0–17
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        updateRoom(room.id, "children", -1)
                                      }
                                      disabled={room.children <= 0}
                                      aria-label="Decrease children"
                                      className="w-7 h-7 flex items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:border-blue-400 hover:text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                    >
                                      <Minus className="w-3.5 h-3.5" />
                                    </button>
                                    <span className="w-4 text-center text-sm font-semibold text-slate-800">
                                      {room.children}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        updateRoom(room.id, "children", 1)
                                      }
                                      disabled={
                                        room.adults + room.children >= 8
                                      }
                                      aria-label="Increase children"
                                      className="w-7 h-7 flex items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:border-blue-400 hover:text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                    >
                                      <Plus className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          <button
                            type="button"
                            onClick={addRoom}
                            disabled={rooms.length >= 8}
                            className="w-full mt-4 py-2.5 rounded-lg border border-blue-200 text-blue-600 text-sm font-semibold hover:bg-blue-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                          >
                            + Add another room
                          </button>

                          <button
                            type="button"
                            onClick={() => setActiveDropdown(null)}
                            className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors"
                          >
                            Apply
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Find Now */}
                <button
                  type="button"
                  onClick={() => setActiveDropdown(null)}
                  className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-semibold py-3 sm:py-3.5 rounded-xl transition-all text-xs sm:text-sm mt-2 cursor-pointer shadow-md shadow-blue-500/20"
                >
                  Find Now
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Decorative Bottom Leaf */}
      <motion.div
        className="hidden lg:block absolute left-0 top-[130px] z-30 w-96 sm:w-[500px] md:w-[650px] lg:w-[800px] pointer-events-none select-none"
        initial={{ opacity: 0, x: -80, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
      >
        <img
          src="/images/Isolation_Mode.png"
          alt="Leaf Decorative Art"
          className="w-[300px] h-[624px] transform"
        />
      </motion.div>
    </div>
  );
}
