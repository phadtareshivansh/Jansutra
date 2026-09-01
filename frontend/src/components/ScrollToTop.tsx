import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (typeof window.scrollTo === "function") {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
    const main = document.getElementById("main");
    if (main && !main.dataset.focused) {
      main.tabIndex = -1;
      main.focus({ preventScroll: true });
      main.dataset.focused = "true";
    }
  }, [pathname]);
  return null;
}