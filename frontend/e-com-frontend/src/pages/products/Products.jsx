import React from 'react'
import style from './Products.module.css';
import PageTitle from '../../components/pageTitle/PageTitle';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import Product from '../../components/Product/Product';
import { useSelector, useDispatch } from 'react-redux';
import { getProduct } from '../../features/products/productSlice';  
import { useEffect } from 'react';
import Loader from '../../components/loader/Loader';
import { toast } from 'react-toastify';
import { removeErrors } from '../../features/products/productSlice';
import { useLocation } from 'react-router-dom';

function Products() {
  const {loading, products, productCount, error } = useSelector((state) => state.product);
  
    const dispatch = useDispatch();
    const location = useLocation();
    const search = new URLSearchParams(location.search);
    const keyword = search.get("keyword") || "";

    useEffect(() => {
      dispatch(getProduct({keyword}));
    }, [dispatch, keyword]);
  
    useEffect(() => {
      if(error){
        toast.error(error, {
          position: 'top-center',
          autoClose: 3000,
          // theme: 'colored'
        });
  
        dispatch(removeErrors());
      }
    }, [error, dispatch]);

  return (
    <>
    <PageTitle title="All Products"/>
    <Navbar/>
    {loading ? (<Loader/>) : (
      <div className={style["products-layout"]}>
        <div className={style["filter-section"]}>
          <h2 className={style["filter-heading"]}>CATEGORIES</h2>
          {/*RENDER CATEGORIED */}
        </div>
        <div className={style["products-section"]}>
        <div className={style["products-product-container"]}>
            {products && products.map((prod) => ( <Product key={prod._id} product={prod}/>))}
        </div>
      </div>
    </div>)}
    <Footer/>
    </>
  )
}

export default Products
