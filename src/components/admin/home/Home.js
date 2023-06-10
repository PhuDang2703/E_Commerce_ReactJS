import React, { useEffect } from 'react'
import styles from './Home.module.scss'
import { AiFillDollarCircle } from 'react-icons/ai'
import InfoBox from '../../infoBox/infoBox'
import { FaCartArrowDown } from 'react-icons/fa'
import { BsCart4 } from 'react-icons/bs'
import { STORE_PRODUCTS, selectProduct } from '../../../redux/slice/productSlice'
import { CALC_TOTAL_ORDER_AMOUNT, STORE_ORDERS, selectOrderHistory, selectTotalOrderAmount } from '../../../redux/slice/orderSlice'
import { useDispatch, useSelector } from 'react-redux'
import useFetchCollection from '../../../customHooks/useFetchCollection'
import Chart from '../../chart/Chart'

//Icon
const earningIcon = <AiFillDollarCircle size={30} color="#b624ff" />
const productIcon = <BsCart4 size={30} color="##1f93ff" />
const orderIcon = <FaCartArrowDown size={30} color="#orangered" />

const Home = () => {
const products = useSelector(selectProduct);
const orders = useSelector(selectOrderHistory);
const totalOrderAmount = useSelector(selectTotalOrderAmount);

const fbProducts = useFetchCollection("products");
const {data} = useFetchCollection("orders");

const dispatch = useDispatch();

useEffect(()=>{

dispatch(STORE_PRODUCTS({
  products: fbProducts.data
}))
dispatch(STORE_ORDERS(data))
dispatch(CALC_TOTAL_ORDER_AMOUNT())

}, [dispatch, data, fbProducts])

  return (
    <div className={styles.home}>
      <h2>Admin Home</h2>
      <div className={styles["info-box"]}>
        <InfoBox cardClass={`${styles.card} ${styles.card1}`}
          title={"Earnings"}
          count={`$${totalOrderAmount}`}
          icon={earningIcon} />
        <InfoBox cardClass={`${styles.card} ${styles.card2}`}
          title={"Products"}
          count={products.length}
          icon={productIcon} />
        <InfoBox cardClass={`${styles.card} ${styles.card3}`}
          title={"Orders"}
          count={orders.length}
          icon={orderIcon} />
      </div>

      <Chart/>
    </div>
  )
}

export default Home