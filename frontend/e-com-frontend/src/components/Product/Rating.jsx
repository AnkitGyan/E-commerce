import { useState } from "react";
import style from "./Rating.module.css";

const Rating = ({ value = 0, onRatingChange, disabled = false }) => {
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(value);

  // handle star hover
  const handleMouseEnter = (rating) => {
    if (!disabled) {
      setHoveredRating(rating);
    }
  };

  // mouse leave
  const handleMouseLeave = () => {
    if (!disabled) {
      setHoveredRating(0);
    }
  };

  // handle click
  const handleClick = (rating) => {
    if (!disabled) {
      setSelectedRating(rating);
      onRatingChange?.(rating);
    }
  };

  // generate stars
  const generateStar = () => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      const isFilled = i <= (hoveredRating || selectedRating);

      stars.push(
        <span
          key={i}
          className={`${style.star} ${isFilled ? style.filled : ""}`}
          onMouseEnter={() => handleMouseEnter(i)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(i)}
          style={{pointerEvents:disabled? 'none' : 'auto'}}
        >
          ★
        </span>
      );
    }

    return stars;
  };

  return (
    <>
    <div className={style.rating}>
      {generateStar()}
    </div>
    </>
  );
};

export default Rating;
