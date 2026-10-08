import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Layout from "./Layout";
import Hotels from "./pages/Hotels/Hotels";
import HotelDetailPage from "./pages/HotelDetailPage/HotelDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<Hotels />} />
          {/* مسار تفاصيل الفندق باستخدام الـ id كمتغير ديناميكي */}
        <Route path="/hotels/:id" element={<HotelDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;