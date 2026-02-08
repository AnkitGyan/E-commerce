import ImageSlider from "../../components/banner/ImageSlider";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import style from './Home.module.css';
import Product from "../../components/Product/Product";
import PageTitle from "../../components/pageTitle/PageTitle";
import { useEffect } from "react";

const product = [{
  "_id": "prod1",
  "name": "Wireless Bluetooth Headphones",
  "description": "High-quality wireless headphones with noise cancellation and long battery life.",
  "price": 2499,
  "noOfReviews" : 5,
  "rating": 4.5,
  "images": [
    {
      "public_id": "prod1_img1",
      "url": "https://img.freepik.com/free-photo/still-life-wireless-cyberpunk-headphones_23-2151072230.jpg?semt=ais_hybrid&w=740&q=80"
    }
  ],
  "category": "Electronics",
  "stock": 35
}]; 

function Home(){
// const {loading, errors, product, productCount} =  useSelector((state)=>console.log(state.product));
// useDispatch();
// useEffect(()=>{
// dispatch(getProduct());
// },[dispatch])

  return(
    <>
    <PageTitle title="Opulex"/>
      <Navbar></Navbar>
      <div className={style["home-container"]}>
        <ImageSlider/>
        <h2>Welcome to OpuLex</h2>
        {product.map((prod, index) => (
          <Product key={index} product={prod} />
        ))}
      </div>
      <Footer></Footer>
    </>
  )
}

export default Home;