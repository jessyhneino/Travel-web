import { useState, useEffect, useRef } from "react";
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
import { useTranslation } from "react-i18next";

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

const formatDate = (date, language = "en") => {
  if (!date) return "";

  const [year, month, day] = date.split("-").map(Number);

  return new Date(year, month - 1, day).toLocaleDateString(
    language.startsWith("ar") ? "ar" : "en-US",
    {
      month: "short",
      day: "numeric",
    }
  );
};

export default function Hero() {
  const { t, i18n } = useTranslation();

  const [activeTab, setActiveTab] = useState("hotel");
  const [goingTo, setGoingTo] = useState("Spain");

  const [checkIn, setCheckIn] = useState("2026-10-23");
  const [checkOut, setCheckOut] = useState("2026-11-20");

  const [dateRange, setDateRange] = useState(
    `${formatDate("2026-10-23", i18n.language)} - ${formatDate(
      "2026-11-20",
      i18n.language
    )}`
  );

  const [travelers, setTravelers] = useState(
    `1 ${t("room")}, 2 ${t("travelers")}`
  );

  const [activeDropdown, setActiveDropdown] = useState(null);

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

  useEffect(() => {
    setDateRange(
      `${formatDate(checkIn, i18n.language)} - ${formatDate(
        checkOut,
        i18n.language
      )}`
    );
  }, [i18n.language, checkIn, checkOut]);

  useEffect(() => {
    const totalTravelers = rooms.reduce(
      (sum, room) => sum + room.adults + room.children,
      0
    );

    const roomLabel = rooms.length === 1 ? t("room") : t("rooms");
    const travelerLabel = totalTravelers === 1 ? t("traveler") : t("travelers");

    setTravelers(
      `${rooms.length} ${roomLabel}, ${totalTravelers} ${travelerLabel}`
    );
  }, [rooms, i18n.language, t]);

  const updateDateRange = (newCheckIn, newCheckOut) => {
    setCheckIn(newCheckIn);
    setCheckOut(newCheckOut);

    if (newCheckIn && newCheckOut) {
      setDateRange(
        `${formatDate(newCheckIn, i18n.language)} - ${formatDate(
          newCheckOut,
          i18n.language
        )}`
      );
    } else if (newCheckIn) {
      setDateRange(
        `${formatDate(newCheckIn, i18n.language)} - ${t("Select check-out")}`
      );
    } else {
      setDateRange(t("Select dates"));
    }
  };

  const updateRoom = (roomId, field, amount) => {
    setRooms((previousRooms) =>
      previousRooms.map((room) => {
        if (room.id !== roomId) return room;

        const minVal = field === "adults" ? 1 : 0;
        const updatedValue = Math.max(minVal, room[field] + amount);

        if (amount > 0 && room.adults + room.children >= 8) {
          return room;
        }

        return {
          ...room,
          [field]: updatedValue,
        };
      })
    );
  };

  const addRoom = () => {
    if (rooms.length >= 8) return;

    setRooms((previousRooms) => [
      ...previousRooms,
      { id: Date.now(), adults: 1, children: 0 },
    ]);
  };

  const removeRoom = (roomId) => {
    if (rooms.length <= 1) return;

    setRooms((previousRooms) =>
      previousRooms.filter((room) => room.id !== roomId)
    );
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
              alt={t("Wave curves")}
              className="block object-cover w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 pb-12 sm:pb-16 lg:pb-24 min-[1000px]:-translate-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mt-6 sm:mt-8 lg:mt-10">
          {/* Search Card */}
          <div className="flex flex-col items-center justify-center w-full pt-2 lg:col-span-12">
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
                alt={t("Logo Watermark")}
                className="w-[100px] h-[100px] object-contain filter drop-shadow"
              />
            </motion.div>

            {/* Search Box */}
            <motion.div
              className="w-[93%] sm:max-w-[90%] md:max-w-[450px] bg-white rounded-[6px] p-4 sm:p-6 shadow-lg sm:shadow-sm border border-slate-100/80 backdrop-blur-sm"
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
                    className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm transition-all rounded-[6px] flex-1 sm:flex-none ${
                      activeTab === id
                        ? "bg-blue-50 text-blue-600 font-semibold"
                        : "text-slate-700 hover:text-slate-900 hover:bg-slate-50 font-medium"
                    }`}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 shrink-0" />
                    <span>{t(label)}</span>
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
                    className="w-full cursor-pointer border border-blue-400 rounded-[6px] px-3.5 sm:px-4 py-2.5 sm:py-3 bg-white flex items-center gap-1.5 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all text-left"
                  >
                    <span className="text-xs sm:text-sm text-slate-500 whitespace-nowrap">
                      {t("Going to:")}
                    </span>

                    <span
                      dir={i18n.language.startsWith("ar") ? "rtl" : "ltr"}
                      className={`w-full text-xs font-semibold text-blue-600 sm:text-sm truncate ${
                        i18n.language.startsWith("ar")
                          ? "text-right"
                          : "text-left"
                      }`}
                    >
                      {t(goingTo)}
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
                        className="absolute top-full left-0 right-0 mt-2 z-50 bg-white border border-slate-100 rounded-[6px] shadow-xl p-2 max-h-56 overflow-y-auto"
                      >
                        <p className="px-3 py-2 text-xs font-semibold text-slate-400">
                          {t("Choose your destination")}
                        </p>

                        {DESTINATIONS.map((country) => (
                          <button
                            key={country}
                            type="button"
                            onClick={() => {
                              setGoingTo(country);
                              setActiveDropdown(null);
                            }}
                            className={`w-full text-left px-3 py-2.5 rounded-[6px] text-sm cursor-pointer transition-colors ${
                              goingTo === country
                                ? "bg-blue-50 text-blue-600 font-semibold"
                                : "text-slate-700 hover:bg-slate-50"
                            }`}
                          >
                            {t(country)}
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
                      className={`w-full border border-blue-400 rounded-[6px] px-3.5 sm:px-4 py-2 sm:py-2.5 bg-white flex justify-between items-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all ${
                        i18n.language.startsWith("ar")
                          ? "text-right"
                          : "text-left"
                      }`}
                      dir={i18n.language.startsWith("ar") ? "rtl" : "ltr"}
                    >
                      <div className="w-full min-w-0">
                        <label className="block text-[10px] sm:text-xs text-slate-400 mb-0.5">
                          {t("Check in-out:")}
                        </label>

                        <span className="block w-full truncate text-xs font-semibold text-blue-600 sm:text-sm">
                          {dateRange || t("Select dates")}
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
                          className="absolute top-full left-0 right-0 sm:left-auto sm:right-0 sm:w-80 mt-2 z-50 bg-white border border-slate-100 rounded-[6px] shadow-xl p-4"
                        >
                          <div className="flex items-center gap-2 mb-4">
                            <CalendarDays className="w-5 h-5 text-blue-500" />
                            <h3 className="text-sm font-bold text-slate-800">
                              {t("Select your dates")}
                            </h3>
                          </div>

                          <div className="space-y-3">
                            {/* Check-in Field */}
                            <div>
                              <label className="block text-xs text-slate-500 mb-1.5">
                                {t("Check-in")}
                              </label>

                              <input
                                type="date"
                                value={checkIn}
                                min={new Date().toLocaleDateString("en-CA")}
                                onChange={(e) => {
                                  const newCheckIn = e.target.value;
                                  let newCheckOut = checkOut;

                                  if (
                                    newCheckOut &&
                                    newCheckOut <= newCheckIn
                                  ) {
                                    const nextDay = new Date(
                                      `${newCheckIn}T12:00:00`
                                    );

                                    nextDay.setDate(nextDay.getDate() + 1);

                                    const year = nextDay.getFullYear();
                                    const month = String(
                                      nextDay.getMonth() + 1
                                    ).padStart(2, "0");
                                    const day = String(
                                      nextDay.getDate()
                                    ).padStart(2, "0");

                                    newCheckOut = `${year}-${month}-${day}`;
                                  }

                                  updateDateRange(newCheckIn, newCheckOut);
                                }}
                                className="w-full min-w-0 border border-slate-200 rounded-[6px] px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                              />
                            </div>

                            {/* Check-out Field */}
                            <div>
                              <label className="block text-xs text-slate-500 mb-1.5">
                                {t("Check-out")}
                              </label>

                              <input
                                type="date"
                                value={checkOut}
                                min={
                                  checkIn
                                    ? (() => {
                                        const minOut = new Date(
                                          `${checkIn}T12:00:00`
                                        );

                                        minOut.setDate(minOut.getDate() + 1);

                                        const year = minOut.getFullYear();
                                        const month = String(
                                          minOut.getMonth() + 1
                                        ).padStart(2, "0");
                                        const day = String(
                                          minOut.getDate()
                                        ).padStart(2, "0");

                                        return `${year}-${month}-${day}`;
                                      })()
                                    : new Date().toLocaleDateString("en-CA")
                                }
                                onChange={(e) =>
                                  updateDateRange(checkIn, e.target.value)
                                }
                                className="w-full min-w-0 border border-slate-200 rounded-[6px] px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                              />
                            </div>
                          </div>

                          {/* Date Validation */}
                          {checkIn && checkOut && checkOut <= checkIn && (
                            <p className="text-xs text-red-500 mt-2">
                              ⚠️{" "}
                              {t("Check-out date must be after check-in date.")}
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
                            className="w-full cursor-pointer mt-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-sm font-semibold py-2.5 rounded-[6px] transition-colors"
                          >
                            {t("Apply dates")}
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
                      className={`w-full border border-blue-400 rounded-[6px] px-3.5 sm:px-4 py-2 sm:py-2.5 bg-white flex justify-between items-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all ${
                        i18n.language.startsWith("ar")
                          ? "text-right"
                          : "text-left"
                      }`}
                      dir={i18n.language.startsWith("ar") ? "rtl" : "ltr"}
                    >
                      <div className="w-full min-w-0">
                        <label className="block text-[10px] sm:text-xs text-slate-400 mb-0.5">
                          {t("Travelers")}
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
                          className="absolute top-full left-0 right-0 sm:left-auto sm:right-0 sm:w-80 mt-2 z-50 bg-white border border-slate-100 rounded-[6px] shadow-xl p-4 max-h-80 overflow-y-auto"
                        >
                          <div className="flex items-center gap-2 mb-4">
                            <Users className="w-5 h-5 text-blue-500" />
                            <h3 className="text-sm font-bold text-slate-800">
                              {t("Rooms & travelers")}
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
                                    {t("Room")} {index + 1}
                                  </h4>

                                  {rooms.length > 1 && (
                                    <button
                                      type="button"
                                      onClick={() => removeRoom(room.id)}
                                      aria-label={`${t("Remove room")} ${
                                        index + 1
                                      }`}
                                      className="p-1.5 rounded-[6px] text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  )}
                                </div>

                                {/* Adults */}
                                <div className="flex items-center justify-between gap-2 mb-3">
                                  <div>
                                    <p className="text-sm font-medium text-slate-700">
                                      {t("Adults")}
                                    </p>

                                    <p className="text-[11px] text-slate-400">
                                      {t("Ages 18+")}
                                    </p>
                                  </div>

                                  <div className="flex items-center gap-3">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        updateRoom(room.id, "adults", -1)
                                      }
                                      disabled={room.adults <= 1}
                                      aria-label={t("Decrease adults")}
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
                                      aria-label={t("Increase adults")}
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
                                      {t("Children")}
                                    </p>

                                    <p className="text-[11px] text-slate-400">
                                      {t("Ages 0–17")}
                                    </p>
                                  </div>

                                  <div className="flex items-center gap-3">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        updateRoom(room.id, "children", -1)
                                      }
                                      disabled={room.children <= 0}
                                      aria-label={t("Decrease children")}
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
                                      aria-label={t("Increase children")}
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
                            + {t("Add another room")}
                          </button>

                          <button
                            type="button"
                            onClick={() => setActiveDropdown(null)}
                            className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 rounded-[6px] transition-colors"
                          >
                            {t("Apply")}
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
                  className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-semibold py-3 sm:py-3.5 rounded-[6px] transition-all text-xs sm:text-sm mt-2 cursor-pointer shadow-md shadow-blue-500/20"
                >
                  {t("Find Now")}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Decorative Bottom Leaf */}
      <motion.div
        className={`hidden lg:block absolute top-[130px] z-30 w-96 sm:w-[500px] md:w-[650px] lg:w-[800px] pointer-events-none select-none ${
          i18n.language.startsWith("ar") ? "right-0" : "left-0"
        }`}
        initial={{
          opacity: 0,
          x: i18n.language.startsWith("ar") ? 80 : -80,
          scale: 0.95,
        }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{
          duration: 1.8,
          ease: [0.16, 1, 0.3, 1],
          delay: 0.8,
        }}
      >
        <img
          src="/images/Isolation_Mode.png"
          alt={t("Leaf Decorative Art")}
          className={`w-[300px] h-[624px] transform ${
            i18n.language.startsWith("ar") ? "scale-x-[-1]" : ""
          }`}
        />
      </motion.div>
    </div>
  );
}
