import React from 'react';
import { useState } from 'react';
import style from './ProductDetails.module.css';
import PageTitle from '../../components/pageTitle/PageTitle';
import Navbar from '../../components/navbar/Navbar';
import Footer  from '../../components/footer/Footer';
import Rating from '../../components/Product/Rating';

function ProductDetails() {
  const [userRating, setUserRating] = useState(0);
  
  const handleRatingChange = (newRating) =>{
    setUserRating(newRating);
  }
  return (
    <>
    <PageTitle title = "Product Name-Details"/>
    <Navbar/>
    <div className={style["product-details-container"]}>
      <div className={style["product-detail-container"]}>
        <div className={style["product-image-container"]}>
          <img src="https://cdn.pixabay.com/photo/2023/06/05/17/19/shopping-8042865_640.png" alt="Product Image" className={style["product-detail-image"]}/>
        </div>

        <div className={style["product-info"]}>
          <h2>Product Description</h2>
          <p className={style['product-description']}>product description</p>
          <p className={style["product-price"]}>price: 200/-</p>
          <div className={style["product-rating"]}>
            <Rating value={2} disabled={true}/>
            <span className={style["productCardSpan"]}>(1 review)</span>
          </div>
          <div className={style["stock-status"]}><span className={style["in-stock"]}>In Stock(8 available)</span></div>
          <div className={style["quantity-controls"]}>
            <span className={style["quantity-label"]}>Quantity:</span>
            <button className={style["quantity-button"]}>-</button>
            <input type="number" className={style["quantity-value"]} value={1} readOnly/>
            <button className={style["quantity-button"]}>+</button>
          </div>
           <button className={style['add-to-cart-btn']}>Add to Cart</button>
           <form className={style["review-form"]}>
            <h3>Write a Review</h3>
            <Rating value={0} disabled={false} onRatingChange={handleRatingChange}/>
            <textarea className={style["review-input"]} placeholder="Share your thoughts about this product..."></textarea>
            <button className={style["submit-review-btn"]}>Submit Review</button>
           </form>
      </div>
      </div>
       <div className={style["reviews-container"]}>
        <h3>Customer Reviews</h3>
        <div className={style["reviews-section"]}>
          <div className={style["review-item"]}>
            <div className={style["review-header"]}>
              <Rating value={4} disabled={true}/>
            </div>
            <p className={style["review-comment"]}>Review Comment</p>
            <p className = {style["review-name"]}>By Ankit</p>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default ProductDetails
