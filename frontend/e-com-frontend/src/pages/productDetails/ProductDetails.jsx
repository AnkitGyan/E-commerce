import React, { useEffect } from 'react';
import { useState } from 'react';
import style from './ProductDetails.module.css';
import PageTitle from '../../components/pageTitle/PageTitle';
import Navbar from '../../components/navbar/Navbar';
import Footer  from '../../components/footer/Footer';
import Rating from '../../components/Product/Rating';
import Loader from '../../components/loader/Loader'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductDetails, removeErrors } from '../../features/products/productSlice';
import { addItemsToCart, removeMessage } from '../../features/cart/cartSlice.js'
import { toast } from 'react-toastify';

function ProductDetails() {
  const [userRating, setUserRating] = useState(0);
  const {error, loading, product} = useSelector((state)=>state.product);
  const {loading:cartLoading,error:cartError,success,message,cartItems}=useSelector((state)=>state.cart);

  const [value, setValue] = useState(1);

 const increaseCartValue = () => {
  if (value >= product?.stock) {
    toast.error(`Only ${product?.stock} items in stock`, {position: 'top-center', autoclose: 3000});
    return;
  }

  setValue(prev => prev + 1);
};
  
 const decreaseCartValue = () => {
  if(value <= 1){
    toast.error('Minimum quantity is 1', {position: 'top-center', autoclose: 3000})
    dispatch(removeErrors());
    return;
  };
  setValue((prev) => prev - 1);
}
  
  const handleRatingChange = (newRating) =>{
    setUserRating(newRating);
  }

  const dispatch = useDispatch();
  const {id} = useParams();

 useEffect(() => {
  if(id){
    dispatch(getProductDetails(id));
  }
}, [dispatch, id]);

useEffect(() => {
  if(error){
    toast.error(error, {position: 'top-center', autoclose: 3000});

    dispatch(removeErrors());
  }
}, [error, dispatch]);

useEffect(() => {
  if (cartError) {
    toast.error(cartError, {position: 'top-center', autoclose: 3000});
    dispatch(removeErrors());
  }

  if (success) {
    toast.success(message, {position: 'top-center', autoclose: 3000});
    dispatch(removeMessage());
  }
}, [cartError, success, message, dispatch]);

const addToCart = () => {
  dispatch(addItemsToCart({
    id,
    quantity: value
  }));
  toast.success('Item added to cart', {position: 'top-center', autoclose: 3000});
  dispatch(removeMessage());
};

    if(loading){
      return(
        <>
         <PageTitle title = "Product Name-Details"/>
        <Navbar/>
        <Loader/>
        <Footer/>
        </>
      )
    }

  return (
    <>
    <PageTitle title = "Product Name-Details"/>
    <Navbar/>
    <div className={style["product-details-container"]}>
      <div className={style["product-detail-container"]}>
        <div className={style["product-image-container"]}>
          <img src = {product?.images?.[0]?.url} alt="Product Image" className={style["product-detail-image"]}/>
        </div>

        <div className={style["product-info"]}>
          <h2>{product?.name}</h2>
          <p className={style['product-description']}>{product?.description}</p>
          <p className={style["product-price"]}>Price: ${product?.price}</p>
          <div className={style["product-rating"]}>
            <Rating value={product?.ratings} disabled={true}/>
            <span className={style["productCardSpan"]}>{product?.noOfReviews} {product?.noOfReviews === 1 ? 'Review' : 'Reviews'}</span>
          </div>
          <div className={style["stock-status"]}><span  className={
            product?.stock > 0 ? 
            style["in-stock"]  
            : style["out-stock"]}>{product?.stock > 0 ? `In Stock (${product?.stock} available)` : 'Out of Stock'}</span></div>
          {product?.stock > 0 && (<><div className={style["quantity-controls"]}>
            <span className={style["quantity-label"]}>Quantity:</span>
            <button className={style["quantity-button"]} onClick={()=>decreaseCartValue}>-</button>
            <input type="number" className={style["quantity-value"]} value={value} readOnly/>
            <button className={style["quantity-button"]} onClick={()=>increaseCartValue}>+</button>
          </div></>)}
           <button className={style['add-to-cart-btn']} onClick={addToCart} disabled={product?.stock < 1 || cartLoading}>
                {cartLoading ? (<>
                    <i className="fa fa-spinner fa-spin"></i> Adding...
                  </>) : (
                  "Add to Cart"
                )}
          </button>
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

        {product?.reviews && product?.reviews?.length > 0 ?(<div className={style["reviews-section"]}>
          {product.reviews.map((review)=>(
            <div className={style["review-item"]}>
              <div className={style["review-header"]}>
                <Rating value={review.rating} disabled={true}/>
              </div>
              <p className={style["review-comment"]}>{review.comment}</p>
            <p className = {style["review-name"]}>By {review.name}</p>
          </div>
          ))}
        </div>) :   (<p className={style["no-reviews"]}>No reviews yet. Be the first to review this product!</p>)}
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default ProductDetails
