import React, { useState } from "react";
// 1. استدعاء المكونات الفرعية من نفس المجلد
import Header from "./Header";
import Hero from "./Hero";

export default function Navbar() {
  // 2. إدارة حالة القائمة الجانبية في المكون الأب لنقلها بين Header و Hero
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  return (
    <div className="min-h-screen relative font-sans bg-white overflow-hidden text-slate-800">
      {/* 3. تمرير الحالة والدالة الخاصة بها كـ Props إلى Header */}
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      {/* 4. تمرير حالة القائمة إلى Hero لإظهار أو إخفاء القائمة الجانبية */}
      <Hero isMenuOpen={isMenuOpen} />
    </div>
  );
}