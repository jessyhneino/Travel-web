import { User, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AVATAR_IMAGE_URL =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80";

export default function Header({ isMenuOpen, setIsMenuOpen }) {
  const { t, i18n } = useTranslation();

  const currentLanguage = i18n.resolvedLanguage || i18n.language;
  const isArabic = currentLanguage.startsWith("ar");

  const toggleLanguage = async () => {
    const newLanguage = isArabic ? "en" : "ar";

    await i18n.changeLanguage(newLanguage);

    document.documentElement.lang = newLanguage;
    document.documentElement.dir =
      newLanguage === "ar" ? "rtl" : "ltr";

    setIsMenuOpen(false);
  };

  return (
    <>
      <header
        dir={isArabic ? "rtl" : "ltr"}
        className="relative z-50 w-[95%] mx-auto pt-4 px-2 sm:px-8 flex items-center justify-between"
      >
        {/* Brand Logo */}
        <Link to="/">
          <div className="flex items-center gap-2.5 cursor-pointer select-none">
            <div className="relative w-48 sm:w-55 lg:w-60 flex items-center justify-center transition-all duration-200">
              <img
                src="/images/logo.png"
                alt={t("Travel Tent Logo")}
                className="w-full object-contain"
              />
            </div>
          </div>
        </Link>

        {/* User Profile Button */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={t("Toggle user menu")}
            aria-expanded={isMenuOpen}
            className="bg-[rgba(38,187,253,1)] hover:bg-cyan-400 text-white p-1.5 sm:p-2 rounded-[6px] shadow-sm transition-colors duration-200 flex items-center gap-1 focus:outline-none cursor-pointer"
          >
            <User className="w-4 h-4 sm:w-5 sm:h-5" />
            <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Desktop Dropdown: يظهر فقط فوق 1150px */}
          {isMenuOpen && (
            <div
              dir={isArabic ? "rtl" : "ltr"}
              className={`hidden min-[1151px]:block absolute ${
                isArabic ? "left-0" : "right-0"
              } top-full mt-2 z-50 bg-white rounded-[6px] shadow-xl p-6 border border-slate-100/80 w-[280px] text-slate-800`}
            >
              {/* User Info */}
              <div className="flex items-center gap-3.5 pb-6 border-b border-slate-100">
                <img
                  src={AVATAR_IMAGE_URL}
                  alt={t("John Dou")}
                  className="w-12 h-12 rounded-full object-cover shrink-0"
                />

                <div className="overflow-hidden">
                  <h3 className="font-bold text-slate-900 text-base leading-tight">
                    {t("John Dou")}
                  </h3>

                  <p className="text-xs text-slate-900 truncate mt-1 font-normal">
                    Johndouemail@gmail.com
                  </p>
                </div>
              </div>

              {/* Primary Links */}
              <div className="py-6 space-y-5">
                <a
                  href="#requests"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-slate-800 hover:text-blue-600 font-bold text-sm transition-colors"
                >
                  {t("My Requests")}
                </a>

                <a
                  href="#notifications"
                  onClick={() => setIsMenuOpen(false)}
                  className="inline-flex items-center gap-1 text-slate-800 hover:text-blue-600 font-bold text-sm transition-colors"
                >
                  <span>{t("Notifications")}</span>
                  <span className="w-2 h-2 rounded-full bg-sky-400 -mt-2"></span>
                </a>

                <Link
                  to="/hotels"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-slate-800 hover:text-blue-600 font-bold text-sm transition-colors"
                >
                  {t("About")}
                </Link>

                <a
                  href="#contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-slate-800 hover:text-blue-600 font-bold text-sm transition-colors"
                >
                  {t("Contact")}
                </a>
              </div>

              <hr className="border-slate-100 my-0" />

              {/* Secondary Links */}
              <div className="pt-6 space-y-4">
                <a
                  href="#edit-profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-slate-500 hover:text-slate-600 text-sm font-medium transition-colors"
                >
                  {t("Edit Profile")}
                </a>

                <button
                  type="button"
                  onClick={toggleLanguage}
                  className="block text-slate-500 hover:text-slate-600 text-sm font-medium transition-colors cursor-pointer"
                >
                  {t("Language")} · {isArabic ? "English" : "العربية"}
                </button>

                <a
                  href="#logout"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-slate-500 hover:text-red-500 text-sm font-medium transition-colors"
                >
                  {t("Logout")}
                </a>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Backdrop: يظهر عند 1150px أو أقل */}
      <div
        className={`min-[1151px]:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Sidebar: يظهر عند 1150px أو أقل */}
      <aside
        dir={isArabic ? "rtl" : "ltr"}
        aria-hidden={!isMenuOpen}
        className={`min-[1151px]:hidden fixed top-0 ${
          isArabic ? "left-0" : "right-0"
        } h-full w-[280px] sm:w-[320px] bg-white shadow-2xl z-50 p-6 border-slate-100 flex flex-col justify-between overflow-y-auto transform transition-transform duration-300 ease-in-out ${
          isArabic ? "border-r" : "border-l"
        } ${
          isMenuOpen
            ? "translate-x-0"
            : isArabic
              ? "-translate-x-full"
              : "translate-x-full"
        }`}
      >
        <div>
          {/* Close Button & User Info */}
          <div className="flex items-start justify-between pb-6 border-b border-slate-100">
            <div className="flex items-center gap-3.5">
              <img
                src={AVATAR_IMAGE_URL}
                alt={t("John Dou")}
                className="w-12 h-12 rounded-full object-cover shrink-0"
              />

              <div className="overflow-hidden">
                <h3 className="font-bold text-slate-900 text-base leading-tight">
                  {t("John Dou")}
                </h3>

                <p className="text-xs text-slate-500 truncate mt-1 font-normal">
                  Johndouemail@gmail.com
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              className="text-slate-500 hover:text-slate-600 p-1 rounded-[6px] transition-colors cursor-pointer"
              aria-label={t("Close menu")}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Primary Links */}
          <nav className="py-6 space-y-5">
            <a
              href="#requests"
              onClick={() => setIsMenuOpen(false)}
              className="block text-slate-600 hover:text-blue-600 font-bold text-sm transition-colors"
            >
              {t("My Requests")}
            </a>

            <a
              href="#notifications"
              onClick={() => setIsMenuOpen(false)}
              className="inline-flex items-center gap-1 text-slate-600 hover:text-blue-600 font-bold text-sm transition-colors"
            >
              <span>{t("Notifications")}</span>
              <span className="w-2 h-2 rounded-full bg-sky-400 -mt-2"></span>
            </a>

            <Link
              to="/hotels"
              onClick={() => setIsMenuOpen(false)}
              className="block text-slate-600 hover:text-blue-600 font-bold text-sm transition-colors"
            >
              {t("About")}
            </Link>

            <a
              href="#contact"
              onClick={() => setIsMenuOpen(false)}
              className="block text-slate-600 hover:text-blue-600 font-bold text-sm transition-colors"
            >
              {t("Contact")}
            </a>
          </nav>

          <hr className="border-slate-100 my-0" />

          {/* Secondary Links */}
          <div className="pt-6 space-y-4">
            <a
              href="#edit-profile"
              onClick={() => setIsMenuOpen(false)}
              className="block text-slate-500 hover:text-slate-600 text-sm font-medium transition-colors"
            >
              {t("Edit Profile")}
            </a>

            <button
              type="button"
              onClick={toggleLanguage}
              className="block text-slate-500 hover:text-slate-600 text-sm font-medium transition-colors cursor-pointer"
            >
              {t("Language")} · {isArabic ? "English" : "العربية"}
            </button>

            <a
              href="#logout"
              onClick={() => setIsMenuOpen(false)}
              className="block text-slate-500 hover:text-red-500 text-sm font-medium transition-colors"
            >
              {t("Logout")}
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}