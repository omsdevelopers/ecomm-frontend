import { useState } from "react";
import { Blog, Categories, Contact, Home, PagesMobile, Portfolio, Shop } from "./Menus";
import Link from "next/link";
const MobileMenu = () => {
  const [activeMenu, setActiveMenu] = useState("");
  const activeMenuSet = (value) =>
      setActiveMenu(activeMenu === value ? "" : value),
    activeLi = (value) =>
      value === activeMenu ? { display: "block" } : { display: "none" };
  return (
    <ul className="navigation clearfix d-block d-lg-none mobile-header">
      <li className="dropdown">
        <a href="/">Home</a>
        {/* <ul style={activeLi("home")}>
          <Home />
        </ul>
        <div className="dropdown-btn" onClick={() => activeMenuSet("home")}>
          <span className="fas fa-chevron-down" />
        </div> */}
      </li>
      <li className="dropdown">
        <a href="/shop">shop</a>
      </li>

      <li className="dropdown">
        <Link href="/categories">
          <a>category</a>
        </Link>
        <ul>
          <Categories />
        </ul>
        <div className="dropdown-btn">
          <span className="fas fa-chevron-down" />
        </div>
      </li>
      <Contact />
    </ul>
  );
};
export default MobileMenu;
