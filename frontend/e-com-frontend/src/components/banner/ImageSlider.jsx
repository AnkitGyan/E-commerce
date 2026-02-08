import { useEffect, useState } from "react";
import style from "./ImageSlider.module.css";

const images = [
  "/images/banner-3.webp",
  "/images/banner-4.webp",
  "/images/banner-1.jpg",
  "/images/banner-2.jpg"
];

function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

 const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused]);


  return (
    <div 
    className={style["image-slider-container"]} onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <div
          className={style["slider-images"]}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((imgSrc, index) => (
            <div key={index} className={style["slider-item"]}>
              <img src={imgSrc} alt={`Slide ${index + 1}`} className={style["slide-image"]} />
            </div>
          ))}
        </div>

      <div className={style["slider-dots"]}>
        {images.map((_, index) => (
          <span
            key={index}
            className={`${style.dot} ${currentIndex === index ? style.active : ""}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>

    </div>
  );
}

export default ImageSlider;
