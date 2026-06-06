import React, { useState, useEffect } from "react";
import style from "./Products.module.css";
import PageTitle from "../../components/pageTitle/PageTitle";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Product from "../../components/Product/Product";
import Pagination from "../../components/pagination/Pagination";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../../features/products/productSlice";
import Loader from "../../components/loader/Loader";
import { toast } from "react-toastify";
import { removeErrors } from "../../features/products/productSlice";
import { useLocation, useNavigate } from "react-router-dom";
import NoProduct from "../../components/noProduct/NoProduct";

function Products() {
  const {
    loading,
    products,
    error,
    totalPages,
  } = useSelector((state) => state.product);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const categories = [
    "Electronics",
    "Books",
    "Clothing",
    "Home Appliances",
    "Toys",
    "Sports",
    "Beauty",
    "begs",
  ];

  const search = new URLSearchParams(location.search);
  const category = search.get("category") || "";
  const keyword = search.get("keyword") || "";
  const pageFromURL = parseInt(search.get("page"), 10) || 1;

  const [currentPage, setCurrentPage] = useState(pageFromURL);

  useEffect(() => {
    setCurrentPage(pageFromURL);
  }, [pageFromURL]);

 
  useEffect(() => {
    setCurrentPage(1);
  }, [category]);


  useEffect(() => {
    dispatch(getProduct({ keyword, page: currentPage, category }));
  }, [dispatch, keyword, currentPage, category]);

  
  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 3000,
      });

      dispatch(removeErrors());
    }
  }, [error, dispatch]);

  
  const handlePageChange = (page) => {
    if (page !== currentPage) {
      setCurrentPage(page);

      const searchParams = new URLSearchParams(location.search);

      if (page === 1) {
        searchParams.delete("page");
      } else {
        searchParams.set("page", page);
      }

      navigate(`?${searchParams.toString()}`);
    }
  };

  const handleCategoryClick = (cat) => {
    const searchParams = new URLSearchParams(location.search);

    searchParams.set("category", cat);
    searchParams.delete("page"); // reset pagination

    navigate(`?${searchParams.toString()}`);
  };

  return (
    <>
      <PageTitle title="All Products" />
      <Navbar />

      {loading ? (
        <Loader />
      ) : (
        <div className={style["products-layout"]}>
          {/* FILTER SECTION */}
          <div className={style["filter-section"]}>
            <h2 className={style["filter-heading"]}>CATEGORIES</h2>

            <ul>
              {categories.map((cat) => (
                <li
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={
                    category === cat ? style.activeCategory : ""
                  }
                >
                  {cat}
                </li>
              ))}
            </ul>
          </div>

          {/*  PRODUCTS SECTION */}
          <div className={style["products-section"]}>
            {products && products.length > 0 ? (
              <div className={style["products-product-container"]}>
                {products.map((prod) => (
                  <Product key={prod._id} product={prod} />
                ))}
              </div>
            ) : (
              <NoProduct keyword={keyword} />
            )}

            <Pagination
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default Products;