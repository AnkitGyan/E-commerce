import ImageSlider from "../../components/banner/ImageSlider";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import style from './Home.module.css';
import Product from "../../components/Product/Product";
import PageTitle from "../../components/pageTitle/PageTitle";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../../features/products/productSlice";
import { useEffect } from "react";


function Home(){
const { loading, product, productCount, error } = useSelector((state) => { return state.product});
const dispatch = useDispatch();
useEffect(()=>{
  dispatch(getProduct());
},[dispatch])

  return(
    <>
    <PageTitle title="Opulex"/>
      <Navbar></Navbar>
      <div className={style["home-container"]}>
        <ImageSlider/>
        <h2 className={style["home-heading"]}>Welcome to OpuLex</h2>
        <div className={style["home-product-container"]}>
        {product && product.map((prod) => (
          <Product key={prod._id} product={prod} />
        ))}
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}

export default Home;