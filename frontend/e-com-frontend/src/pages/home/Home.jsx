import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import style from './Home.module.css';

function Home(){
  return(
    <div className={style["home-container"]}>
      <Navbar></Navbar>
      <h1 className={style["home-heading"]}>Welcome to E-Commerce Website</h1>
      <Footer></Footer>
    </div>
  )
}

export default Home;