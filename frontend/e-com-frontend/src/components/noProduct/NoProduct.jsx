import React from 'react'
import styles from './NoProduct.module.css';



function NoProduct({keyword}) {
  return (
    <div className={styles['no-products-container']}>
      <div className={styles['no-products-content']}>
        <div className={styles['no-products-icon']}>
         😇
        </div>
        <h2 className={styles['no-products-title']}>No Products Found</h2>
        <p className={styles['no-products-message']}>
          {keyword? `No products found for "${keyword}". Please try a different search term.` : "No products available at the moment. Please check back later."}
        </p>
      </div>
    </div>
  )
}

export default NoProduct
