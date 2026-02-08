import { Link } from "react-router-dom";
import style from "./Product.module.css";
import { useState } from "react";
import Rating from "./Rating";

function Product({ product }) {
    const [rating, setRating] = useState(0);
    const handleRatingChange = (newRating)=>{
        setRating(newRating);
        console.log(`Rating change to ${newRating}`)
    }

  return (
    <Link to={`/product/${product._id}`} className={style.link}>
    <div className={style["product-card"]}>
      <img src={product.images[0].url} alt={product.name}/>
      <div className={style["product-details"]}>
        <h3 className={style["product-title"]}>{product.name}</h3>
        <p className={style["home-price"]}><strong>Price</strong>{product.price}</p>
        <div className={style["rating_container"]}>
          <Rating
          value={product.rating}
          onRatingChange={handleRatingChange}
          disabled={true}/>
        </div>
        <span>
          ({product.noOfReviews} {product.noOfReviews===1? "Review" : "Reviews"})
        </span>
        <button className={style["add-to-cart"]}>View Details</button>
      </div>
    </div>
    </Link>
  );
} 

export default Product;