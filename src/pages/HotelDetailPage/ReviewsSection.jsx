import React, { useState } from "react";
import { Star } from "lucide-react";
import { INITIAL_REVIEWS } from "./data/initialReview";
import { useTranslation } from "react-i18next";

// عرض المراجعة
function ReviewItem({ review, isLast }) {
  const { t } = useTranslation();

  return (
    <article className={`pb-4 ${!isLast ? "border-b border-slate-200" : ""}`}>
      <div className="flex items-center gap-3 mb-1.5">
        <span className="text-[13px] font-medium text-[#202746]">
          {t(review.name)}
        </span>

        <div className="flex items-center gap-1">
          <span className="text-[13px] font-medium text-blue-500">
            {Number(review.rating).toFixed(1).replace(/\.0$/, "")}
          </span>

          <Star
            className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
            strokeWidth={1.5}
          />
        </div>
      </div>

      <p className="text-xs text-[#858da3] leading-[19px] break-words">
        {t(review.comment)}
      </p>
    </article>
  );
}

// النجوم التفاعلية - دعم نصف نجمة
function RatingStars({ rating, onSelectRating }) {
  const { t } = useTranslation();
  const [hoveredRating, setHoveredRating] = useState(null);
  const activeRating = hoveredRating ?? rating;

  return (
    <div className="mb-4">
      <div
        className="flex items-center gap-1.5"
        role="group"
        aria-label={t("Choose your rating")}
        onMouseLeave={() => setHoveredRating(null)}
      >
        {[1, 2, 3, 4, 5].map((star) => {
          const fill = Math.max(0, Math.min(1, activeRating - star + 1));

          return (
            <button
              key={star}
              type="button"
              aria-label={t("Rate {{full}} stars or {{half}} stars", {
                full: star,
                half: star - 0.5,
              })}
              aria-pressed={rating === star || rating === star - 0.5}
              className="
                relative flex items-center justify-center
                w-7 h-8 rounded-[6px]
                transition-transform duration-200
                hover:scale-110 active:scale-95
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-amber-300
              "
            >
              <span className="relative block w-6 h-6 pointer-events-none">
                {/* النجمة غير الممتلئة */}
                <Star
                  className="absolute inset-0 w-6 h-6"
                  fill="#FFF1C2"
                  stroke="#F5C56A"
                  strokeWidth={1.8}
                />

                {/* الجزء الذهبي الممتلئ */}
                <span
                  className="absolute inset-y-0 left-0 overflow-hidden"
                  style={{ width: `${fill * 100}%` }}
                >
                  <Star
                    className="w-6 h-6 max-w-none"
                    fill="#FBBF24"
                    stroke="#F59E0B"
                    strokeWidth={1.8}
                  />
                </span>
              </span>

              {/* النصف الأيسر: نصف نجمة */}
              <span
                className="absolute inset-y-0 left-0 w-1/2 cursor-pointer"
                onMouseEnter={() => setHoveredRating(star - 0.5)}
                onClick={() => onSelectRating(star - 0.5)}
              />

              {/* النصف الأيمن: نجمة كاملة */}
              <span
                className="absolute inset-y-0 right-0 w-1/2 cursor-pointer"
                onMouseEnter={() => setHoveredRating(star)}
                onClick={() => onSelectRating(star)}
              />
            </button>
          );
        })}
      </div>

      {/* قيمة التقييم */}
      <p className="mt-2 text-xs text-slate-500">
        {activeRating > 0 ? (
          <span className="inline-flex items-center gap-1.5">
            <span className="font-semibold text-amber-600">
              {activeRating.toFixed(1).replace(/\.0$/, "")} / 5
            </span>

            <span className="text-slate-400">
              {activeRating === 5
                ? `— ${t("Excellent")}`
                : activeRating >= 4
                ? `— ${t("Very good")}`
                : activeRating >= 3
                ? `— ${t("Good")}`
                : activeRating >= 2
                ? `— ${t("Fair")}`
                : `— ${t("Needs improvement")}`}
            </span>
          </span>
        ) : (
          t("Select your rating")
        )}
      </p>
    </div>
  );
}

// القسم الرئيسي
export default function ReviewsSection() {
  const { t } = useTranslation();

  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const isFormInvalid = rating === 0 || !reviewText.trim();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isFormInvalid) return;

    const newReview = {
      id: Date.now(),
      name: t("Review Name"),
      rating,
      comment: reviewText.trim(),
    };

    setReviews((prevReviews) => [newReview, ...prevReviews]);
    setRating(0);
    setReviewText("");
  };

  return (
    <section
      id="reviews"
      className="w-full bg-[#f8faff] pt-5 sm:pt-6 lg:pt-6 px-4 sm:px-5 lg:px-0"
    >
      {/* عنوان القسم */}
      <h2 className="text-sm font-semibold text-[#202746] mb-7">
        {t("Reviews")}
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-[18px] items-start">
        {/* قائمة المراجعات */}
        <div className="min-w-0 lg:pr-5 lg:border-r-2 lg:border-slate-200 lg:relative">
          <div
            className="
              space-y-4
              lg:max-h-[340px]
              lg:overflow-y-auto
              lg:pr-5
              lg:mr-0
              lg:scrollbar-thin
              lg:scrollbar-thumb-slate-400
              lg:scrollbar-track-slate-100
            "
          >
            {reviews.map((review, index) => (
              <ReviewItem
                key={review.id}
                review={review}
                isLast={index === reviews.length - 1}
              />
            ))}
          </div>
        </div>

        {/* نموذج إضافة مراجعة */}
        <div className="min-w-0">
          <form
            onSubmit={handleSubmit}
            className="
              w-full
              bg-white
              border border-[#dceeff]
              rounded-[6px]
              px-5 py-5
              sm:px-[22px] sm:py-[22px]
              shadow-[0_4px_20px_rgba(37,99,235,0.04)]
              transition-shadow duration-300
              hover:shadow-[0_8px_28px_rgba(37,99,235,0.07)]
            "
          >
            <h3 className="text-sm sm:text-[15px] font-semibold text-[#202746] mb-3">
              {t("Add Review")}
            </h3>

            <p className="text-xs sm:text-[13px] text-[#858da3] leading-5 mb-4">
              {t(
                "Please add review, this will help us to improve your experience"
              )}
            </p>

            {/* النجوم التفاعلية */}
            <RatingStars rating={rating} onSelectRating={setRating} />

            {/* حقل كتابة المراجعة */}
            <textarea
              rows={4}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder={t("Share your experience...")}
              aria-label={t("Write your review")}
              className="
                block
                w-full
                h-[94px]
                min-h-[94px]
                bg-white
                border border-[#cfe3f8]
                rounded-[6px]
                px-3 py-2
                text-xs text-slate-700
                placeholder:text-[#a0a0a0]
                leading-5
                focus:outline-none
                focus:border-sky-400
                focus:ring-2 focus:ring-sky-100
                mb-5
                resize-none
                transition-all duration-200
              "
            />

            {/* زر الإرسال */}
            <button
              type="submit"
              disabled={isFormInvalid}
              className="
                w-full
                h-10
                bg-[#27b5f5]
                hover:bg-[#16a8ec]
                active:bg-[#0799df]
                text-white
                text-xs
                font-semibold
                rounded-[6px]
                shadow-sm shadow-sky-100
                transition-all duration-200
                hover:shadow-md
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              {t("Add Review")}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
