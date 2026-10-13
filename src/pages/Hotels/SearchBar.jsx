import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
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
  const { t, i18n } = useTranslation();

  const isRTL = i18n.language?.startsWith("ar");

  const COUNTRIES = [
    "Germany",
    "Saudi Arabia",
    "United Arab Emirates",
    "Turkey",
    "France",
    "Italy",
    "Spain",
    "United Kingdom",
    "United States",
    "Romania",
    "Switzerland",
    "Austria",
    "Egypt",
    "Qatar",
    "Kuwait",
    "Bahrain",
    "Oman",
    "Jordan",
    "Lebanon",
    "Japan",
    "Thailand",
    "Malaysia",
    "Maldives",
  ];

  const [selectedCountry, setSelectedCountry] = useState("Germany");
  const [showCountries, setShowCountries] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [distance, setDistance] = useState(10);

  const [rooms, setRooms] = useState([
    { id: 1, adults: 1, children: 1 },
    { id: 2, adults: 1, children: 1 },
  ]);

  const searchBarRef = useRef(null);

  // Close popups when clicking outside the search bar
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target)
      ) {
        setActiveModal(null);
        setShowCountries(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Update travelers
  const updateGuests = (roomId, type, delta) => {
    setRooms((prevRooms) =>
      prevRooms.map((room) => {
        if (room.id === roomId) {
          const newVal = room[type] + delta;

          // Keep at least one adult in each room
          if (type === "adults" && newVal < 1) {
            return room;
          }

          return {
            ...room,
            [type]: Math.max(0, newVal),
          };
        }

        return room;
      })
    );
  };

  // Add a room
  const addRoom = () => {
    if (rooms.length >= 8) return;

    setRooms((prevRooms) => [
      ...prevRooms,
      {
        id: Date.now(),
        adults: 1,
        children: 0,
      },
    ]);
  };

  // Remove a room
  const removeRoom = (id) => {
    setRooms((prevRooms) => {
      if (prevRooms.length <= 1) return prevRooms;
      return prevRooms.filter((room) => room.id !== id);
    });
  };

  const totalTravelers = rooms.reduce(
    (acc, room) => acc + room.adults + room.children,
    0
  );

  const closeModal = () => {
    setActiveModal(null);
    setShowCountries(false);
  };

  const popupPosition = `
    max-lg:fixed
    max-lg:top-1/2
    max-lg:left-1/2
    max-lg:right-auto
    max-lg:-translate-x-1/2
    max-lg:-translate-y-1/2
    max-lg:w-[80vw]
    max-lg:max-w-none
    max-lg:max-h-[80vh]
    max-lg:overflow-y-auto
    max-lg:z-[70]
  `;

  const arrowClass = isRTL ? "rotate-180" : "";

  return (
    <div
      ref={searchBarRef}
      dir={isRTL ? "rtl" : "ltr"}
      className="relative w-full"
    >
      {/* ================= SEARCH BAR ================= */}
      <div
        className={`
          bg-white p-4
          flex items-center justify-center
          flex-wrap lg:flex-nowrap
          max-lg:flex-col max-lg:items-stretch
          gap-3 max-lg:gap-2.5
          shadow-sm
          border border-[#26BBFD29]
          rounded-l-[6px]
          w-full max-lg:p-3
        `}
      >
        {/* Location Selector */}
        <button
          type="button"
          onClick={() =>
            setActiveModal((prev) => {
              if (prev === "location") return null;
              setShowCountries(false);
              return "location";
            })
          }
          aria-expanded={activeModal === "location"}
          className="
            flex-1 min-w-[240px]
            max-lg:w-full max-lg:min-w-0
            flex items-center gap-3
            rounded-[6px]
            border border-blue-200
            px-4 py-2.5
            max-lg:px-3.5 max-lg:py-3
            bg-white
            cursor-pointer select-none
            hover:border-blue-400
            transition-colors
            text-start
          "
        >
          <MapPin className="w-5 h-5 text-blue-600 shrink-0" />

          <div className="flex flex-col text-start min-w-0 flex-1">
            <span className="text-[11px] text-slate-400 font-medium">
              {t("Going to:")}
            </span>

            <span className="text-sm font-semibold text-blue-600 truncate">
              {t("Berlin (and vicinity), Germany")}
            </span>
          </div>
        </button>

        {/* Date Selector */}
        <button
          type="button"
          onClick={() =>
            setActiveModal((prev) => (prev === "date" ? null : "date"))
          }
          aria-expanded={activeModal === "date"}
          className="
            flex-1 min-w-[200px]
            max-lg:w-full max-lg:min-w-0
            rounded-[6px]
            flex items-center justify-between gap-3
            border border-blue-200
            px-4 py-2.5
            max-lg:px-3.5 max-lg:py-3
            bg-white
            cursor-pointer select-none
            hover:border-blue-400
            transition-colors
            text-start
          "
        >
          <div className="flex items-center gap-3 min-w-0">
            <Calendar className="w-5 h-5 text-blue-600 shrink-0" />

            <div className="flex flex-col text-start min-w-0">
              <span className="text-[11px] text-slate-400 font-medium">
                {t("Check in-out:")}
              </span>

              <span className="text-sm font-semibold text-blue-600 truncate">
                {t("Oct 23 - Nov 20")}
              </span>
            </div>
          </div>

          <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
        </button>

        {/* Travelers Selector */}
        <button
          type="button"
          onClick={() =>
            setActiveModal((prev) =>
              prev === "travelers" ? null : "travelers"
            )
          }
          aria-expanded={activeModal === "travelers"}
          className="
            flex-1 min-w-[200px]
            max-lg:w-full max-lg:min-w-0
            rounded-[6px]
            flex items-center justify-between gap-3
            border border-blue-200
            px-4 py-4.5
            max-lg:px-3.5 max-lg:py-3
            bg-white
            cursor-pointer select-none
            hover:border-blue-400
            transition-colors
            text-start
          "
        >
          <div className="flex items-center gap-3 min-w-0">
            <Users className="w-5 h-5 text-blue-600 shrink-0" />

            <div className="flex flex-col text-start min-w-0">
              <span className="text-[11px] text-slate-400 font-medium">
                {t("Travelers:")}
              </span>

              <span className="text-sm font-semibold text-blue-600 truncate">
                {t("{{count}} room", { count: rooms.length })}{" "}
                {t("{{count}} travelers", {
                  count: totalTravelers,
                })}
              </span>
            </div>
          </div>

          <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
        </button>

        {/* Search Button */}
        <button
          type="button"
          className="
            bg-blue-600 hover:bg-blue-700
            text-white font-medium
            rounded-[6px]
            px-8 py-2
            flex flex-col max-lg:flex-row
            items-center justify-center gap-1 max-lg:gap-2
            transition-colors
            min-w-[120px]
            max-lg:w-full max-lg:min-w-0
          "
        >
          <Search className="w-5 h-5" />

          <span className="text-xs font-semibold">
            {t("Find Now")}
          </span>
        </button>
      </div>

      {/* ================= MOBILE BACKDROP ================= */}
      {activeModal && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          onClick={closeModal}
          aria-hidden="true"
        />
      )}

      {/* ================= LOCATION MODAL ================= */}
      {activeModal === "location" && (
        <div
          dir={isRTL ? "rtl" : "ltr"}
          className={`
            absolute top-full
            ${isRTL ? "right-0" : "left-0"}
            mt-2 w-80
            ${popupPosition}
            bg-white rounded-[6px] shadow-xl
            border border-slate-100
            p-5 z-50 text-start
          `}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-800">
              {t("Location")}
            </h3>

            <button
              type="button"
              aria-label={t("Close")}
              onClick={closeModal}
              className="
                lg:hidden w-8 h-8 rounded-full
                bg-slate-100 flex items-center justify-center
                text-slate-500 hover:bg-slate-200
                transition-colors
              "
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2 mb-4">
            {/* Country Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowCountries((prev) => !prev)}
                aria-expanded={showCountries}
                className="
                  w-full flex items-center justify-between gap-2
                  border border-slate-200 rounded-[6px]
                  px-3 py-3 text-xs text-slate-600
                  hover:border-blue-400 transition-colors
                  text-start
                "
              >
                <span className="flex items-center gap-2 min-w-0">
                  <span className="shrink-0">🌐</span>

                  <span className="text-slate-400 shrink-0">
                    {t("Country")}
                  </span>

                  <span className="font-semibold text-blue-600 truncate">
                    {t(selectedCountry)}
                  </span>
                </span>

                <ChevronDown
                  className={`
                    w-4 h-4 text-slate-400 shrink-0
                    transition-transform
                    ${showCountries ? "rotate-180" : ""}
                  `}
                />
              </button>

              {showCountries && (
                <div
                  className="
                    absolute top-full start-0 end-0 mt-1
                    bg-white border border-slate-200
                    rounded-[6px] shadow-xl z-[80]
                    max-h-52 overflow-y-auto
                  "
                >
                  {COUNTRIES.map((country) => (
                    <button
                      key={country}
                      type="button"
                      onClick={() => {
                        setSelectedCountry(country);
                        setShowCountries(false);
                      }}
                      className={`
                        w-full text-start
                        px-4 py-2.5 text-sm
                        transition-colors hover:bg-blue-50
                        ${
                          selectedCountry === country
                            ? "bg-blue-50 text-blue-600 font-semibold"
                            : "text-slate-700"
                        }
                      `}
                    >
                      <span className="flex items-center justify-between gap-2">
                        <span className="truncate">{t(country)}</span>

                        {selectedCountry === country && (
                          <span className="text-blue-600 shrink-0">
                            ✓
                          </span>
                        )}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Destination Input */}
            <button
              type="button"
              className="
                w-full flex items-center gap-2
                border border-slate-200 rounded-[6px]
                px-3 py-2.5 text-xs text-slate-400
                hover:border-blue-400 transition-colors
                text-start
              "
            >
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />

              <span>{t("Where are you going?")}</span>
            </button>
          </div>

          {/* Set Point On Map */}
          <button
            type="button"
            className="
              flex items-center gap-1.5
              text-xs font-medium text-blue-600
              hover:underline mb-4
            "
          >
            <MapPin className="w-3.5 h-3.5 shrink-0" />

            {t("Set Point On Map")}
          </button>

          {/* Distance Slider */}
          <div className="mb-4">
            <span className="text-xs font-semibold text-slate-700 block mb-2">
              {t("Distance from my location")}
            </span>

            <input
              type="range"
              min="10"
              max="50"
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
              aria-label={t("Distance from my location")}
              style={{
                background: isRTL
                  ? `linear-gradient(
                      to left,
                      #2563eb 0%,
                      #2563eb ${((distance - 10) / 40) * 100}%,
                      #dbeafe ${((distance - 10) / 40) * 100}%,
                      #dbeafe 100%
                    )`
                  : `linear-gradient(
                      to right,
                      #2563eb 0%,
                      #2563eb ${((distance - 10) / 40) * 100}%,
                      #dbeafe ${((distance - 10) / 40) * 100}%,
                      #dbeafe 100%
                    )`,
              }}
              className="
                w-full h-1.5 rounded-[6px]
                appearance-none cursor-pointer accent-blue-600
              "
            />

            <div className="flex justify-between text-[11px] text-blue-600 font-semibold mt-1">
              <span>{t("{{distance}} Km", { distance })}</span>

              <span>{t("{{distance}} Km", { distance: 50 })}</span>
            </div>
          </div>

          {/* Results */}
          <div>
            <span className="text-xs font-semibold text-slate-700 block mb-2">
              {t("Results")}
            </span>

            <div className="space-y-2">
              {[1, 2, 3].map((item) => (
                <button
                  key={item}
                  type="button"
                  className="
                    w-full flex items-start gap-2
                    cursor-pointer hover:bg-slate-50
                    p-2 rounded-[6px] text-start
                  "
                >
                  <MapPin className="w-3.5 h-3.5 text-slate-500 mt-0.5 shrink-0" />

                  <div className="min-w-0">
                    <p className="text-xs font-medium text-slate-700">
                      {t("Makkah")}
                    </p>

                    <p className="text-[10px] text-slate-400">
                      {t("Province, Saudi Arabia")}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= DATE MODAL ================= */}
      {activeModal === "date" && (
        <div
          dir={isRTL ? "rtl" : "ltr"}
          className={`
            absolute top-full
            ${isRTL ? "right-1/4" : "left-1/4"}
            mt-2 w-[480px]
            ${popupPosition}
            bg-white rounded-[6px] shadow-xl
            border border-slate-100
            p-6 z-50 text-start
          `}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-800">
              {t("Check in-out")}
            </h3>

            <button
              type="button"
              aria-label={t("Close")}
              onClick={closeModal}
              className="
                lg:hidden w-8 h-8 rounded-full
                bg-slate-100 flex items-center justify-center
                text-slate-500 hover:bg-slate-200
                transition-colors
              "
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Date Summary */}
          <div className="flex items-center justify-between gap-2 bg-slate-50/70 rounded-[6px] p-3 mb-6">
            <div className="text-start">
              <p className="text-base font-bold text-slate-700">
                {t("13 Oct")}
              </p>

              <p className="text-xs text-slate-400">
                {t("Thursday")}
              </p>
            </div>

            <div
              className={`
                w-8 h-8 rounded-full bg-sky-400
                text-white flex items-center justify-center
                shrink-0 ${arrowClass}
              `}
            >
              →
            </div>

            <div className="text-end">
              <p className="text-base font-bold text-slate-700">
                {t("19 Oct")}
              </p>

              <p className="text-xs text-slate-400">
                {t("Saturday")}
              </p>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-6 max-sm:gap-8">
            {/* February */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <button
                  type="button"
                  aria-label={t("Previous month")}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <ChevronLeft
                    className={`w-4 h-4 ${arrowClass}`}
                  />
                </button>

                <span className="text-xs font-semibold text-slate-600">
                  {t("February")}
                </span>

                <span className="w-4" />
              </div>

              {/* Keep weekday order consistent in both languages */}
              <div
                dir="ltr"
                className="
                  grid grid-cols-7 gap-1 text-center
                  text-[10px] font-medium text-slate-400 mb-2
                "
              >
                {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map(
                  (day) => (
                    <span key={day}>{t(day)}</span>
                  )
                )}
              </div>

              <div
                dir="ltr"
                className="grid grid-cols-7 gap-1 text-center text-xs"
              >
                {Array.from({ length: 28 }, (_, i) => i + 1).map(
                  (day) => (
                    <button
                      type="button"
                      key={day}
                      className={`
                        h-7 w-7 rounded-full
                        flex items-center justify-center
                        text-[11px]
                        ${
                          day === 23
                            ? "bg-blue-600 text-white font-bold"
                            : "text-slate-600 hover:bg-slate-100"
                        }
                      `}
                    >
                      {day}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* March */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-4" />

                <span className="text-xs font-semibold text-slate-600">
                  {t("March")}
                </span>

                <button
                  type="button"
                  aria-label={t("Next month")}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <ChevronRight
                    className={`w-4 h-4 ${arrowClass}`}
                  />
                </button>
              </div>

              <div
                dir="ltr"
                className="
                  grid grid-cols-7 gap-1 text-center
                  text-[10px] font-medium text-slate-400 mb-2
                "
              >
                {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map(
                  (day) => (
                    <span key={day}>{t(day)}</span>
                  )
                )}
              </div>

              <div
                dir="ltr"
                className="grid grid-cols-7 gap-1 text-center text-xs"
              >
                {Array.from({ length: 28 }, (_, i) => i + 1).map(
                  (day) => (
                    <button
                      type="button"
                      key={day}
                      className={`
                        h-7 w-7 rounded-full
                        flex items-center justify-center
                        text-[11px]
                        ${
                          day === 27
                            ? "bg-blue-600 text-white font-bold"
                            : "text-slate-600 hover:bg-slate-100"
                        }
                      `}
                    >
                      {day}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TRAVELERS MODAL ================= */}
      {activeModal === "travelers" && (
        <div
          dir={isRTL ? "rtl" : "ltr"}
          className={`
            absolute top-full
            ${isRTL ? "left-0" : "right-0"}
            mt-2 w-80
            ${popupPosition}
            bg-white rounded-[6px] shadow-xl
            border border-slate-100
            p-5 z-50 text-start
          `}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-800">
              {t("Travelers")}
            </h3>

            <button
              type="button"
              aria-label={t("Close")}
              onClick={closeModal}
              className="
                lg:hidden w-8 h-8 rounded-full
                bg-slate-100 flex items-center justify-center
                text-slate-500 hover:bg-slate-200
                transition-colors
              "
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Rooms */}
          <div className="space-y-5 max-h-72 overflow-y-auto pe-1">
            {rooms.map((room, idx) => (
              <div
                key={room.id}
                className="border-b border-slate-100 pb-4 last:border-b-0"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-700">
                    {t("Room {{number}}", {
                      number: idx + 1,
                    })}
                  </span>

                  {rooms.length > 1 && (
                    <button
                      type="button"
                      aria-label={t("Remove room {{number}}", {
                        number: idx + 1,
                      })}
                      onClick={() => removeRoom(room.id)}
                      className="text-red-400 hover:text-red-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Adults */}
                <div className="flex items-center justify-between gap-3 mb-2">
                  <span className="text-xs text-slate-500">
                    {t("Adults")}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-label={t("Decrease adults")}
                      disabled={room.adults <= 1}
                      onClick={() =>
                        updateGuests(room.id, "adults", -1)
                      }
                      className="
                        w-6 h-6 border rounded-[6px]
                        flex items-center justify-center
                        text-slate-400
                        hover:border-slate-400
                        disabled:opacity-40 disabled:cursor-not-allowed
                      "
                    >
                      <Minus className="w-3 h-3" />
                    </button>

                    <span className="text-xs font-semibold w-4 text-center">
                      {room.adults}
                    </span>

                    <button
                      type="button"
                      aria-label={t("Increase adults")}
                      onClick={() =>
                        updateGuests(room.id, "adults", 1)
                      }
                      className="
                        w-6 h-6 border rounded-[6px]
                        flex items-center justify-center
                        text-blue-600 border-blue-200
                        hover:border-blue-400
                      "
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Children */}
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs text-slate-500">
                      {t("Children")}
                    </p>

                    <p className="text-[9px] text-slate-400">
                      {t("Age: 0-17")}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-label={t("Decrease children")}
                      disabled={room.children <= 0}
                      onClick={() =>
                        updateGuests(room.id, "children", -1)
                      }
                      className="
                        w-6 h-6 border rounded-[6px]
                        flex items-center justify-center
                        text-slate-400 hover:border-slate-400
                        disabled:opacity-40 disabled:cursor-not-allowed
                      "
                    >
                      <Minus className="w-3 h-3" />
                    </button>

                    <span className="text-xs font-semibold w-4 text-center">
                      {room.children}
                    </span>

                    <button
                      type="button"
                      aria-label={t("Increase children")}
                      onClick={() =>
                        updateGuests(room.id, "children", 1)
                      }
                      className="
                        w-6 h-6 border rounded-[6px]
                        flex items-center justify-center
                        text-blue-600 border-blue-200
                        hover:border-blue-400
                      "
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add Room */}
          <button
            type="button"
            onClick={addRoom}
            disabled={rooms.length >= 8}
            className="
              w-full mt-3 py-2
              text-xs font-semibold text-blue-600
              hover:bg-blue-50 rounded-[6px]
              transition-colors text-start
              disabled:opacity-40 disabled:cursor-not-allowed
            "
          >
            + {t("Add Another Room")}
          </button>
        </div>
      )}
    </div>
  );
}