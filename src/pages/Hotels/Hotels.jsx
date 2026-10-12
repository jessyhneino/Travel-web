import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import SearchBar from "./SearchBar";
import FilterSidebar, { INITIAL_FILTERS } from "./FilterSidebar";
import HotelCard from "./HotelCard";
import { HOTELS_DATA } from "./data/HotelData";
import { FILTER_DATA } from "./data/filterData";

const normalize = (value) =>
  String(value ?? "")
    .toLowerCase()
    .trim()
    .replace(/[_-]/g, " ")
    .replace(/\s+/g, " ");

const getHotelPrice = (hotel) =>
  Number(hotel.price ?? hotel.pricePerNight ?? hotel.nightlyPrice ?? 0);

const getHotelRating = (hotel) =>
  Number(hotel.rating ?? hotel.guestRating ?? 0);

const getHotelStars = (hotel) =>
  Number(hotel.stars ?? hotel.starRating ?? hotel.star_rating ?? 0);

const getHotelType = (hotel) =>
  hotel.propertyType ??
  hotel.property_type ??
  hotel.type ??
  hotel.category ??
  "";

function getOptionDetails(section, selectedValue) {
  const items = FILTER_DATA[section] ?? [];

  const item = items.find(
    (option) =>
      String(option.value ?? option.id) === String(selectedValue)
  );

  return {
    value: selectedValue,
    label: item?.label ?? selectedValue,
  };
}

function matchesNumericFilter(
  hotelValue,
  selectedValues,
  section,
  ratingScale = false
) {
  if (!selectedValues?.length) return true;

  const value = Number(hotelValue);

  if (!Number.isFinite(value)) return false;

  return selectedValues.some((selected) => {
    const option = getOptionDetails(section, selected);
    const text = `${option.value} ${option.label}`;
    const numbers = text.match(/\d+(?:\.\d+)?/g);

    if (!numbers?.length) {
      return normalize(text).includes(normalize(hotelValue));
    }

    const threshold = Number(numbers[0]);

    if (ratingScale && threshold > 5 && value <= 5) {
      return value * 2 >= threshold;
    }

    return value >= threshold;
  });
}

function matchesPropertyType(hotel, selectedValues) {
  if (!selectedValues?.length) return true;

  const hotelType = normalize(getHotelType(hotel));

  return selectedValues.some((selected) => {
    const option = getOptionDetails("propertyType", selected);

    return [option.value, option.label].some((value) => {
      const normalizedValue = normalize(value);

      return (
        normalizedValue === hotelType ||
        normalizedValue.includes(hotelType) ||
        hotelType.includes(normalizedValue)
      );
    });
  });
}

function getHotelLocation(hotel) {
  return normalize([
    hotel.city,
    hotel.location,
    hotel.country,
    hotel.address,
    hotel.destination,
    hotel.name,
  ].filter(Boolean).join(" "));
}

export default function Hotels() {
  const { t } = useTranslation();

  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const [search, setSearch] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    rooms: 2,
    travelers: 4,
    guests: [{ adults: 1, children: 0 }],
  });

  const filteredHotels = useMemo(() => {
    return HOTELS_DATA.filter((hotel) => {
      const price = getHotelPrice(hotel);
      const rating = getHotelRating(hotel);
      const stars = getHotelStars(hotel);

      // PRICE
      const matchesPrice = price <= filters.price;

      // GUEST RATING
      const matchesGuestRating = matchesNumericFilter(
        rating,
        filters.guestRating,
        "guestRating",
        true
      );

      // STAR RATING
      const matchesStarRating = matchesNumericFilter(
        stars,
        filters.starRating,
        "starRating"
      );

      // PROPERTY TYPE
      const matchesType = matchesPropertyType(
        hotel,
        filters.propertyType
      );

      // DESTINATION
      const matchesDestination = search.destination
        ? getHotelLocation(hotel).includes(
            normalize(search.destination)
          )
        : true;

      return (
        matchesPrice &&
        matchesGuestRating &&
        matchesStarRating &&
        matchesType &&
        matchesDestination
      );
    });
  }, [filters, search.destination]);

  const resetFilters = () => {
    setFilters({
      ...INITIAL_FILTERS,
      guestRating: [],
      starRating: [],
      propertyType: [],
    });
  };

  return (
    <div className="min-h-screen bg-slate-50/50 px-7 md:px-20 lg:px-35 py-5 md:py-10 xl:py-13 font-sans">
      <div className="flex flex-col gap-8">
        {/* SEARCH BAR */}
        <SearchBar onSearch={setSearch} />

        {/* MAIN CONTENT */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* FILTER SIDEBAR */}
          <FilterSidebar
            filters={filters}
            onApplyFilters={setFilters}
          />

          {/* HOTELS LIST */}
          <main className="flex-1 flex flex-col gap-4 w-full">
            <p className="text-sm text-slate-500">
              {t("{{count}} hotels found", {
                count: filteredHotels.length,
              })}
            </p>

            {filteredHotels.length > 0 ? (
              filteredHotels.map((hotel) => (
                <HotelCard
                  key={hotel.id}
                  id={hotel.id}
                  imgSrc={hotel.imgSrc ?? hotel.image}
                  name={hotel.name ?? "Royal Hotel"}
                  rating={hotel.rating ?? hotel.guestRating ?? 4.5}
                  price={getHotelPrice(hotel)}
                  currency={hotel.currency ?? "SAR"}
                  stars={getHotelStars(hotel)}
                  propertyType={getHotelType(hotel) || "Hotel"}
                  amenities={hotel.amenities ?? [
                    "Pool",
                    "Breakfast included",
                  ]}
                  distance={hotel.distance ?? 30}
                  description={
                    hotel.description ?? "Hotel description"
                  }
                />
              ))
            ) : (
              <div className="bg-white rounded-2xl border border-slate-100 p-8 text-center">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                  {t("No hotels found")}
                </h3>

                <p className="text-sm text-slate-500 mb-4">
                  {t("Try changing your filters to see more results.")}
                </p>

                <button
                  type="button"
                  onClick={resetFilters}
                  className="px-5 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
                >
                  {t("Reset filters")}
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}