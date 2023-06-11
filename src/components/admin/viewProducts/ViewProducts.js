import { useEffect, useState } from 'react'
import styles from './ViewProducts.module.scss'
import { toast } from 'react-toastify';
import { deleteDoc, doc} from 'firebase/firestore';
import { db, storage } from '../../../firebase/config';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Loader from '../../loader/Loader';
import { deleteObject, ref } from 'firebase/storage';
import Notiflix from 'notiflix';
import { useDispatch, useSelector } from 'react-redux';
import { STORE_PRODUCTS, selectProduct } from '../../../redux/slice/productSlice';
import useFetchCollection from '../../../customHooks/useFetchCollection';
import { FILTER_BY_SEARCH, selectFilteredProducts } from '../../../redux/slice/filterSlice';
import Search from '../../search/Search';
import Pagination from '../../pagination/Pagination';


const ViewProducts = () => {
  const [search, setSearch] = useState("");
  const { data, isLoading } = useFetchCollection("products");
  const products = useSelector(selectProduct);
  const filteredProduct = useSelector(selectFilteredProducts);
  console.log(products);

  // const [products, setProducts] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  //Pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage, setProductsPerPage] = useState(10)
  //Get Current Products
  const indexOfLastProduct = currentPage + productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProduct.slice(indexOfFirstProduct, indexOfLastProduct);

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ products, search }))
  }, [dispatch, products, search])

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    )
    //Nếu data thay đổi thì useEffect sẽ chạy lại để dispatch data
  }, [dispatch, data])

  // useEffect(() => {
  //   getProducts();
  // }, [])

  // const getProducts = () => {
  //   setIsLoading(true);

  //   try {
  //     setIsLoading(false);
  //     //Example data (search get data)
  //     const productsRef = collection(db, "products");
  //     //Tab order and limit data
  //     const q = query(productsRef, orderBy("createdAt", "desc"), limit(25));

  //     //Listen to multiple documents in a collection (get real time update)
  //     onSnapshot(q, (snapshot) => {
  //       // console.log(snapshot)
  //       const allProducts = snapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data()
  //       }))
  //       console.log(allProducts);
  //       //fetch products
  //       setProducts(allProducts);
  //       setIsLoading(false);
  //       dispatch(
  //         STORE_PRODUCTS({
  //           products: allProducts,
  //         }))
  //     });

  //   } catch (error) {
  //     setIsLoading(false);
  //     toast.error(error.message);
  //   }
  // }


  /** Search npm notiflix (ctrl + F -> comfirm module)*/
  const confirmDelete = (id, imageURL) => {
    Notiflix.Confirm.show(
      'Delete Product!!!',
      'You are about to delete this product',
      'Delete',
      'Cancel',
      function okCb() {
        // alert('Thank you.');
        deleteProduct(id, imageURL);
      },
      function cancelCb() {
        console.log("Delete Canceled")
      },
      {
        width: '320px',
        borderRadius: '5px',
        titleColor: "orangered",
        okButtonBackground: "orangered",
        cssAnimationStyle: "zoom"
        // etc...
      },
    );
  }

  const deleteProduct = async (id, imageURL) => {
    try {
      //Tab delete data (Delete documents)
      await deleteDoc(doc(db, "products", id));
      //Search delete object from storage (tab delete file)
      const storageRef = ref(storage, imageURL);
      await deleteObject(storageRef)
      toast.success("Product deleted successfully.")

    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.table}>
        <h2>All Products</h2>
        {/* Search bar */}
        <div className={styles.search}>
          <p>
            <b>{filteredProduct.length}</b> products found
          </p>
          <Search value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        {/* View Products */}
        {filteredProduct.length === 0 ? (
          <p>No product found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product, index) => {
                const { id, imageURL, name, category, price } = product;
                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>
                      <img src={imageURL} alt={name} width={100} />
                    </td>
                    <td>{name}</td>
                    <td>{category}</td>
                    <td>{`$${price}`}</td>
                    <td className={styles.icon}>
                      <Link to={`/admin/add-products/${id}`}>
                        <FaEdit size={20} color='green' />
                      </Link>
                      &nbsp;
                      <FaTrashAlt size={18} color='red' onClick={() => confirmDelete(id, imageURL)} />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )
        }
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          productsPerPage={productsPerPage}
          totalProducts={filteredProduct.length} />
      </div>
    </>
  )
}

export default ViewProducts