import React, { useState } from "react";
// 1. استدعاء المكونات الفرعية من نفس المجلد
import Header from "./Header";

export default function Navbar() {
  // 2. إدارة حالة القائمة الجانبية في المكون الأب لنقلها بين Header و Hero
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  return (
    <div className=" relative font-sans bg-white text-slate-800">
      {/* 3. تمرير الحالة والدالة الخاصة بها كـ Props إلى Header */}
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </div>
  );
}