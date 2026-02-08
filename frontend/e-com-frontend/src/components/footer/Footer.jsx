import style from "./Footer.module.css";
import {
  Facebook,
  GitHub,
  Instagram,
  LinkedIn,
  Mail,
  Phone
} from "@mui/icons-material";

function Footer() {
  return (
    <footer className={style.footer}>
      <div className={style.footerContainer}>

        {/* Contact */}
        <div className={style.footerSection}> 
          <h3>Contact Us</h3>
          <p>
            <Phone fontSize="small" /> <span>+91 9368013396</span>
          </p>
          <p>
            <Mail fontSize="small" /> <span>ankit0525252@gmail.com</span>
          </p>
        </div>

        {/* Social */}
        <div className={style.social}>
          <h3>Follow Us</h3>
          <div className={style.socialLinks}>
            <a href="#" target="_blank" rel="noreferrer">
              <GitHub className={style.socialIcon} />
            </a>
            <a href="#" target="_blank" rel="noreferrer">
              <LinkedIn className={style.socialIcon} />
            </a>
            <a href="#" target="_blank" rel="noreferrer">
              <Facebook className={style.socialIcon} />
            </a>
            <a href="#" target="_blank" rel="noreferrer">
              <Instagram className={style.socialIcon} />
            </a>
          </div>
        </div>

        {/* About */}
        <div className={style.footerSection}>
          <h3>About Us</h3>
          <p>
            This is an e-commerce website project built using the MERN stack,
            focused on modern UI and performance.
          </p>
        </div>

      </div>

      <div className={style.footerBottom}>
        <p>© 2025 Ankit. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
