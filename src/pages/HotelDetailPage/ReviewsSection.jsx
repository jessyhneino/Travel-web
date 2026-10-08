import React, { useState } from "react";
import { Star } from "lucide-react";
import { INITIAL_REVIEWS } from "./data/initialReview";


// مكون عرض المراجعة الفردية
function ReviewItem({ review, isLast }) {
  return (
    <article
      className={`pb-4 sm:pb-5 ${!isLast ? "border-b border-gray-100" : ""}`}
    >
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-2">
        <span className="text-sm font-bold text-slate-800">{review.name}</span>

        <div className="flex items-center gap-1">
          <span className="text-xs sm:text-sm font-semibold text-blue-600">
            {review.rating}
          </span>
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
        </div>
      </div>

      <p className="text-xs sm:text-sm text-gray-500 leading-6 break-words">
        {review.comment}
      </p>
    </article>
  );
}

// مكون تقييم النجوم التفاعلي
function RatingStars({ rating, onSelectRating }) {
  const [hoveredRating, setHoveredRating] = useState(0);

  return (
    <div
      className="flex items-center gap-2 mb-4"
      role="group"
      aria-label="Choose your rating"
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = star <= (hoveredRating || rating);

        return (
          <button
            key={star}
            type="button"
            onClick={() => onSelectRating(star)}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            aria-label={`Rate ${star} out of 5 stars`}
            aria-pressed={rating === star}
            className="flex items-center justify-center min-w-8 min-h-8 rounded-md transition-transform duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <Star
              className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors ${
                isFilled
                  ? "fill-amber-400 text-amber-400"
                  : "text-gray-300 hover:text-amber-300"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}

// المكون الرئيسي
export default function ReviewsSection() {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const isFormInvalid = rating === 0 || !reviewText.trim();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isFormInvalid) return;

    console.log({
      rating,
      comment: reviewText.trim(),
    });

    setRating(0);
    setReviewText("");
  };

  return (
    <section className="w-full min-w-0 pt-5 sm:pt-6 lg:pt-8">
      {/* عنوان القسم */}
      <h2 className="mb-5 text-lg sm:text-xl font-bold text-slate-800">
        Reviews
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-6 xl:gap-10 items-start">
        {/* قائمة المراجعات */}
        <div className="min-w-0 lg:col-span-7 lg:border-r lg:border-gray-200 lg:pr-6 xl:pr-8">
          <div className="space-y-4 sm:space-y-5">
            {INITIAL_REVIEWS.map((review, index) => (
              <ReviewItem
                key={review.id}
                review={review}
                isLast={index === INITIAL_REVIEWS.length - 1}
              />
            ))}
          </div>
        </div>

        {/* نموذج إضافة مراجعة */}
        <div className="min-w-0 lg:col-span-5">
          <form
            onSubmit={handleSubmit}
            className="w-full bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 md:p-6 shadow-sm"
          >
            <h3 className="text-sm sm:text-base font-bold text-slate-800 mb-2">
              Add Review
            </h3>

            <p className="text-xs sm:text-sm text-gray-400 leading-5 mb-4">
              Please add review, this will help us to improve your experience.
            </p>

            {/* النجوم التفاعلية */}
            <RatingStars rating={rating} onSelectRating={setRating} />

            {/* حقل النص */}
            <textarea
              rows={4}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Type Here.."
              aria-label="Write your review"
              className="w-full min-h-28 sm:min-h-32 bg-slate-50 border border-gray-200 rounded-xl p-3 sm:p-4 text-sm text-slate-700 placeholder:text-gray-400 leading-6 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent mb-4 resize-y"
            />

            {/* زر الإرسال */}
            <button
              type="submit"
              disabled={isFormInvalid}
              className="w-full min-h-11 bg-sky-400 text-white font-semibold text-sm rounded-xl px-4 py-3 transition-colors duration-200 hover:bg-sky-500 active:bg-sky-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Review
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
