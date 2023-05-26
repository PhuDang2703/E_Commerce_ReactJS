import { useEffect, useState } from 'react'
import styles from './ProductList.module.scss'
import { BsFillGridFill } from 'react-icons/bs'
import { FaListAlt } from 'react-icons/fa';
import Search from '../../search/Search';
import ProductItem from '../productItem/ProductItem';
import { useDispatch, useSelector } from 'react-redux';
import { FILTER_BY_SEARCH, SORT_PRODUCTS, selectFilteredProducts } from '../../../redux/slice/filterSlice';
import Pagination from '../../pagination/Pagination';

const ProductList = ({ products }) => {
  const [grid, setGrid] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("lastest");
  const filteredProduct = useSelector(selectFilteredProducts);
  const dispatch = useDispatch();

  //Pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage, setProductsPerPage] = useState(2)
  //Get Current Products
  const indexOfLastProduct = currentPage + productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProduct.slice(indexOfFirstProduct, indexOfLastProduct);

  useEffect(() => {
    dispatch(SORT_PRODUCTS({ products, sort }))
  }, [dispatch, products, sort])

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ products, search }))
  }, [dispatch, products, search])

  return (
    <div className={styles["product-list"]}>
      <div className={styles.top}>
        <div className={styles.icons}>
          <BsFillGridFill size={22} color='orangered' onClick={() => setGrid(true)} />

          <FaListAlt size={22} color='#0066d4' onClick={() => setGrid(false)} />
          <p>
            <b>{filteredProduct.length}</b> Products not found.
          </p>
        </div>

        {/* Search Icon */}
        <div>
          <Search value={search} onChange={(e) => {
            setSearch(e.target.value)
          }} />
        </div>

        {/* Sort Products */}
        <div className={styles.sort}>
          <label>Sort by:</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="lastest">Lastest</option>
            <option value="lowest-price">Lowest Price</option>
            <option value="highest-price">Highest Price</option>
            <option value="a-z">A - Z</option>
            <option value="z-a">Z - A</option>
          </select>
        </div>
      </div>

      {/* Product Item */}
      <div className={grid ? `${styles.grid}` : `${styles.list}`}>
        {products.length === 0 ? (<p>No product found.</p>)
          : (
            <>
              {currentProducts?.map((product) => {
                return (
                  <div key={product.id}>
                    <ProductItem {...product} grid={grid} product={product} />
                  </div>
                )
              })}
            </>
          )
        }
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        productsPerPage={productsPerPage}
        totalProducts={filteredProduct.length} />
    </div>
  )
}

export default ProductList