import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function LanguageSync() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const updateDirection = (language) => {
      const lang = language?.split("-")[0] || "en";

      document.documentElement.lang = lang;
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    };

    updateDirection(i18n.resolvedLanguage || i18n.language);

    i18n.on("languageChanged", updateDirection);

    return () => {
      i18n.off("languageChanged", updateDirection);
    };
  }, [i18n]);

  return null;
}