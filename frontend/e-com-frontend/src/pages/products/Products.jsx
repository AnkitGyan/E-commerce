import React, { useState } from 'react'
import style from './Products.module.css';
import PageTitle from '../../components/pageTitle/PageTitle';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import Product from '../../components/Product/Product';
import Pagination from '@mui/material/Pagination';
import { useSelector, useDispatch } from 'react-redux';
import { getProduct } from '../../features/products/productSlice';  
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/loader/Loader';
import { toast } from 'react-toastify';
import { removeErrors } from '../../features/products/productSlice';
import { useLocation } from 'react-router-dom';
import NoProduct from '../../components/noProduct/NoProduct';

function Products() {
  const {loading, products, productCount, error, resultsPerPage, totalPages } = useSelector((state) => state.product);
  
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const search = new URLSearchParams(location.search);
    const keyword = search.get("keyword") || "";
    const pageFromURL = parseInt(search.get("page"), 10) || 1;
    const [currentPage, setCurrentPage] = useState(pageFromURL);


    useEffect(() => {
      dispatch(getProduct({keyword, page: currentPage}));
    }, [dispatch, keyword, currentPage]);
  
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

    const handlePageChange = (event, page)=>{
      if(page !== currentPage){
        setCurrentPage(page);
        const searchParams = new URLSearchParams(location.search);
        if(page === 1){
          searchParams.delete("page");
        } else{
          searchParams.set("page", page);
        }
        navigate(`?${searchParams.toString()}`);
      }
    }

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

        {products && products.length>0 ? (<div className={style["products-product-container"]}>
            {products && products.map((prod) => ( <Product key={prod._id} product={prod}/>))}
        </div>) : <NoProduct keyword={keyword}/>}
        <Pagination currentPage= {currentPage} onPageChange={handlePageChange}/>
      </div>
    </div>)}
    <Footer/>
    </>
  )
}

export default Products
