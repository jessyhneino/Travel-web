// قائمة خيارات الفلاتر لسهولة الإدارة والتعديل
export const FILTER_DATA = {
  guestRating: [
    { id: "gr-any", label: "Any", checked: true },
    { id: "gr-9", label: "Wonderful 9+", checked: false },
    { id: "gr-8", label: "Very good 8+", checked: false },
    { id: "gr-7", label: "Good 7+", checked: true },
  ],
  starRating: [
    { id: "sr-1", label: "1 Star", checked: true },
    { id: "sr-2", label: "2 Star", checked: false },
    { id: "sr-3", label: "3 Star", checked: false },
    { id: "sr-4", label: "4 Star", checked: true },
  ],
  propertyType: [
    { id: "pt-hotel", label: "Hotel", checked: true },
    { id: "pt-aparthotel", label: "Apart-hotel", checked: false },
    { id: "pt-residence", label: "Residence", checked: false },
  ],
};
