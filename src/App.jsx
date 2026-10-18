import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Layout from "./Layout";
import Hotels from "./pages/Hotels/Hotels";
import HotelDetailPage from "./pages/HotelDetailPage/HotelDetailPage";
import "./i18n";
import "./App.css";
import LanguageSync from "./pages/LanguageSync/LanguageSync";
import PageTitle from "./component/PageTitle";

function App() {
  return (
    <BrowserRouter>
      <LanguageSync />
      <PageTitle />

      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/hotels/:id" element={<HotelDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
