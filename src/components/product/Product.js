import React, { useEffect } from 'react'
import styles from './Product.module.scss'
import ProductList from './productList/ProductList'
import ProductFilter from './productFilter/ProductFilter'
import ProductItem from './productItem/ProductItem'
import useFetchCollection from '../../customHooks/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux'
import { STORE_PRODUCTS, selectProduct } from '../../redux/slice/productSlice'

const Product = () => {
  const { data, isLoading } = useFetchCollection("products");
  const products = useSelector(selectProduct);
  console.log(products);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    )
    //Nếu data thay đổi thì useEffect sẽ chạy lại để dispatch data
  }, [dispatch, data])

  return (
    <section>
      <div className={`container ${styles.product}`}>
        <aside className={styles.filter}>
          <ProductFilter/>
        </aside>
        <div className={styles.content}>
          <ProductList products={products}/>
        </div>
      </div>

      </section>
  )
}

export default Product