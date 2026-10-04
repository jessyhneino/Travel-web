import { Outlet } from "react-router-dom";
import Navbar from "./pages/Navbar/Navbar";
import Footer from "./pages/Footer/Footer";


function Layout() {
  return (
    <>
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default Layout;