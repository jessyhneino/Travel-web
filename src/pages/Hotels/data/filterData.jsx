// قائمة خيارات الفلاتر
export const FILTER_DATA = {
  guestRating: [
    { id: "gr-any", value: "any", label: "Any", checked: true },
    { id: "gr-9", value: 9, label: "Wonderful 9+", checked: false },
    { id: "gr-8", value: 8, label: "Very good 8+", checked: false },
    { id: "gr-7", value: 7, label: "Good 7+", checked: true },
  ],

  starRating: [
    { id: "sr-1", value: 1, label: "1 Star", checked: true },
    { id: "sr-2", value: 2, label: "2 Star", checked: false },
    { id: "sr-3", value: 3, label: "3 Star", checked: false },
    { id: "sr-4", value: 4, label: "4 Star", checked: true },
    { id: "sr-5", value: 5, label: "5 Star", checked: false },
  ],

  propertyType: [
    { id: "pt-hotel", value: "hotel", label: "Hotel", checked: true },
    {
      id: "pt-aparthotel",
      value: "apart-hotel",
      label: "Apart-hotel",
      checked: false,
    },
    {
      id: "pt-residence",
      value: "residence",
      label: "Residence",
      checked: false,
    },
  ],
};