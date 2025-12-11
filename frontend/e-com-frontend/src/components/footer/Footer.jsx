import style from './Footer.module.css';
import { Facebook, GitHub, Instagram, LinkedIn, Mail, Phone } from '@mui/icons-material';

function Footer(){
  return (
    <footer className={style.footer}>
      <div className={style["footer-container"]}>
        {/*section 1*/}
        <div className={style["footer-section"]}>
          <h3>Contact us</h3>
          <p><Phone fontSize='small'/>Phone: 9368013396</p>
          <p><Mail fontSize='small'/>Email : ankit0525252@gmail.com</p>
        </div>
        {/*section 2*/}
        <div className={style.social}>
          <h3>Follow us</h3>
           <div className={style["social-links"]}>
            <a href='' target='_blank'><GitHub className={style["social-icon"]}/></a>
            <a href='' target='_blank'><LinkedIn className={style["social-icon"]}/></a>
            <a href='' target='_blank'><Facebook className={style["social-icon"]}/></a>
            <a href='' target='_blank'><Instagram className={style["social-icon"]}/></a>
           </div>
        </div>
        {/*section 3*/}
        <div className={style["footer-section"]}>
          <h3>About Us</h3>
          <p>This is a Ecommerce website project built with mern stack</p>
        </div>
      </div>
      <div className={style["footer-bottom"]}>
        <p>&copy; 2025 Ankit. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer;