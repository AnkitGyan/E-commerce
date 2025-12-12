import { useState } from "react";
import { Search, ShoppingCart, Person, Menu, Close } from "@mui/icons-material";
import style from "./Navbar.module.css";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={style.navbar}>
      <div className={style["navbar-container"]}>
        
        {/* LOGO */}
        <div className={style["navbar-logo"]}>
          <Link to="/">Opulex</Link>
        </div>

        {/* LINKS */}
        <div
          className={`${style["navbar-links"]} ${
            menuOpen ? style.active : ""
          }`}
        >
          <ul>
            <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li><Link to="/products" onClick={() => setMenuOpen(false)}>Products</Link></li>
            <li><Link to="/about-us" onClick={() => setMenuOpen(false)}>About</Link></li>
            <li><Link to="/contact-us" onClick={() => setMenuOpen(false)}>Contact</Link></li>
          </ul>
        </div>

        {/* RIGHT SIDE ICONS */}
        <div className={style["navbar-icons"]}>
          
          {/* SEARCH */}
          <div className={style["search-container"]}>
  <form className={style["search-form"]}>
    <input
      type="text"
      placeholder="Search..."
      className={style["search-item"]}
    />
    <button type="submit" className={style["search-button"]}>
      <Search />
    </button>
  </form>
</div>
          {/* USER ICON */}
          <Link to="/login" className={style["register-link"]}>
            <button className={style["register-btn"]}>
              <Person />
            </button>
          </Link>

          {/* CART */}
          <div className={style["cart-container"]}>
            <ShoppingCart className={style.icon} />
            <span className={style["cart-badge"]}>2</span>
          </div>

          {/* HAMBURGER MENU (MOBILE) */}
          <div
            className={style["navbar-hamburger"]}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <Close /> : <Menu />}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
