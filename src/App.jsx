import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Layout from "./Layout";
import Hotels from "./pages/Hotels/Hotels";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<Hotels />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;