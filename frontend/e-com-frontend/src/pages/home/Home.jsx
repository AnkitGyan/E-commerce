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