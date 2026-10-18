
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const pageTitles = {
  "/": "Home",
  "/hotels": "Hotels",
};

export default function PageTitle() {
  const { pathname } = useLocation();

  useEffect(() => {
    let title = pageTitles[pathname];

    if (pathname.startsWith("/hotels/")) {
      title = "Hotel Details";
    }

    document.title = `${title || "Travel Web"} | Travel Web`;
  }, [pathname]);

  return null;
}
