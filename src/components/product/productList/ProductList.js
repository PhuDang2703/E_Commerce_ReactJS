import React from 'react'
import styles from './ProductList.module.scss'
import {BsFillGridFill} from 'react-icons/bs'
import { FaListAlt } from 'react-icons/fa';

const ProductList = () => {
const [grid, setGrid] = useState(true);

  return (
    <div className={styles["product-list"]}>
      <div className={styles.top}>
        <div className={styles.icons}>
          <BsFillGridFill size={22} color='orangered' onClick={() => setGrid(true)}/>

          <FaListAlt size={22} color='#0066d4' onClick={() => setGrid(false)}/>
        </div>
      </div>
      </div>
  )
}

export default ProductList