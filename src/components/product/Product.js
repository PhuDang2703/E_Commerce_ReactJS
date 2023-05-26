import React, { useEffect, useState } from 'react'
import styles from './Product.module.scss'
import ProductList from './productList/ProductList'
import ProductFilter from './productFilter/ProductFilter'
import ProductItem from './productItem/ProductItem'
import useFetchCollection from '../../customHooks/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux'
import { GET_PRICE_RANGE, STORE_PRODUCTS, selectProduct } from '../../redux/slice/productSlice'
import spinnerImg from '../../assets/loader.gif'
import { FaCogs } from 'react-icons/fa'

const Product = () => {
  const { data, isLoading } = useFetchCollection("products");
  const [showFilter, setShowFilter] = useState(false);
  const products = useSelector(selectProduct);
  // console.log(products);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    )

    dispatch(
      GET_PRICE_RANGE({
        products: data,
      })
    )
    //Nếu data thay đổi thì useEffect sẽ chạy lại để dispatch data
  }, [dispatch, data])

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  }

  return (
    <section>
      <div className={`container ${styles.product}`}>
        <aside className={showFilter ? `${styles.filter} ${styles.show}` : `${styles.filter}`}>
          {isLoading ? null : <ProductFilter />}
        </aside>

        <div className={styles.content}>
          {isLoading ? <img src={spinnerImg} alt='Loading...' style={{ width: '50px' }} className='--center-all' /> : (<ProductList products={products} />)}

          {/* Icon filter responsive */}
          <div className={styles.icon} onClick={toggleFilter}>
            <FaCogs size={20} color='orangered' />
            <p>
              <b>{showFilter ? "Hide Filter" : "ShowFilter"}</b>
            </p>
          </div>
        </div>
        
      </div>

    </section>
  )
}

export default Product