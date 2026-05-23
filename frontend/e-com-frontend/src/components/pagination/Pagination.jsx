import React from 'react'
import style from './Pagination.module.css';
import { useSelector } from 'react-redux'

function Pagination({
  currentPage,
  onPageChange,
  activeClass = "active",
  nextPageText = "Next",
  prevPageText = "Prev",
  firstPageText = "1st",
  LastPageText = "Last",
}) {

  const { products, totalPages } = useSelector((state) => state.product);

  if (products.length === 0 || totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pageNumbers = [];
    const windowPage = 2;

    for (
      let i = Math.max(1, currentPage - windowPage);
      i <= Math.min(totalPages, currentPage + windowPage);
      i++
    ) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div className={style["pagination"]}>

      {currentPage > 1 && (
        <>
          <button
            className={style["pagination-btn"]}
            onClick={() => onPageChange(1)}
          >
            {firstPageText}
          </button>

          <button
            className={style["pagination-btn"]}
            onClick={() => onPageChange(currentPage - 1)}
          >
            {prevPageText}
          </button>
        </>
      )}

      {/* Display Page Numbers */}
      {getPageNumbers().map((number) => (
        <button
          key={number}
          className={`${style["pagination-btn"]} ${
            currentPage === number ? style[activeClass] : ""
          }`}
          onClick={() => onPageChange(number)}
        >
          {number}
        </button>
      ))}

      {/* Next & Last */}
      {currentPage < totalPages && (
        <>
          <button
            className={style["pagination-btn"]}
            onClick={() => onPageChange(currentPage + 1)}
          >
            {nextPageText}
          </button>

          <button
            className={style["pagination-btn"]}
            onClick={() => onPageChange(totalPages)}
          >
            {LastPageText}
          </button>
        </>
      )}

    </div>
  );
}

export default Pagination;