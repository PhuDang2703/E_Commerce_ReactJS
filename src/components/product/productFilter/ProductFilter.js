import React, { useEffect, useState } from 'react'
import styles from './ProductFilter.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { selectMaxPrice, selectMinPrice, selectProduct } from '../../../redux/slice/productSlice'
import { FILTER_BY_BRAND, FILTER_BY_CATEGORY, FILTER_BY_PRICE } from '../../../redux/slice/filterSlice'

const ProductFilter = () => {
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [price, setPrice] = useState(3000);
  const products = useSelector(selectProduct);
  const minPrice = useSelector(selectMinPrice);
  const maxPrice = useSelector(selectMaxPrice);

  const dispatch = useDispatch();

  const allCategories = [
    "All",
    ...new Set(products.map(product => product.category))
  ];
  console.log("allCategories", allCategories);

  const allBrand = [
    "All",
    ...new Set(products.map(product => product.brand))
  ];
  console.log("allBrand", allBrand);

  const filterProducts = (cate) => {
    setCategory(cate);
    dispatch(FILTER_BY_CATEGORY({ products, category: cate }));
  };

  useEffect(() => {
    dispatch(FILTER_BY_BRAND({ products, brand }))
  }, [dispatch, products, brand]);

  useEffect(() => {
    dispatch(FILTER_BY_PRICE({ products, price }))
  }, [dispatch, products, price]);

  const clearFilter = () => {
    setCategory("All");
    setBrand("All");
    setPrice(maxPrice);
  };

  return (
    <div className={styles.filter}>
      {/* Filter by category */}
      <h4>ProductFilter</h4>
      <div className={styles.category}>
        {allCategories.map((cate, index) => {
          return (
            <button key={index} type='button' className={`${category}` === cate ? `${styles.active}` : null} onClick={() => filterProducts(cate)}>&#8250; {cate}</button>
          )
        })}

        <button>All</button>
      </div>

      {/* Filter by brand  and price*/}
      <h4>Brand</h4>
      <div className={styles.brand}>
        <select value={brand} onChange={(e) => setBrand(e.target.value)}>
          {allBrand.map((brand, index) => {
            return (
              <option key={index} value={brand}>{brand}</option>
            )
          })}
        </select>
        <h4>Price</h4>
        <p>{`$${price}`}</p>
        <div className={styles.price}>
          <input type='range' value={price} onChange={(e) => setPrice(e.target.value)} name='price' min={minPrice} max={maxPrice} />
        </div>
      </div>
      <br />
      <button className='--btn --btn-danger' onClick={clearFilter}>CLear Filter</button>
    </div>
  )
}

export default ProductFilter