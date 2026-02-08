import { useState } from "react";
import { Search, ShoppingCart, PersonAdd, Menu, Close } from "@mui/icons-material";
import style from "./Navbar.module.css";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={style.navbar}>
      <div className={style["navbar-container"]}>
        
        {/* LOGO */}
        <div className={style["navbar-logo"]} onClick={()=>setMenuOpen(false)}>
          <Link to="/">OpuLex</Link>
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

          {/* CART */}
          <div className={style["cart-container"]}>
            <Link to={"/cart"}>
            <ShoppingCart className={style.icon} />
            <span className={style["cart-badge"]}>2</span>
            </Link>
          </div>

          {/* USER ICON */}
          <Link to="/register" className={style["register-link"]}>
            <button className={style["register-btn"]}>
              <PersonAdd className={style["icon"]} />
            </button>
          </Link>

          {/* HAMBURGER MENU (MOBILE) */}
          <div
            className={style["navbar-hamburger"]} onClick={toggleMenu}>
            {menuOpen ? <Close className={style["icon"]}/> : <Menu />}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
