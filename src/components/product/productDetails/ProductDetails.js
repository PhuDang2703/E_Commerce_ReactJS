import { useEffect, useState } from 'react'
import styles from './ProductDetail.module.scss'
import { Link, useParams } from 'react-router-dom'
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../../firebase/config'
import { toast } from 'react-toastify';
import spinnerImg from '../../../assets/loader.gif'

const ProductDetails = () => {

  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProduct();
  }, [])

  //Search get document trong firebase
  //Thêm async cho lỗi docSnap.exists is not a function
  const getProduct = async () => {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docRef);
      console.log("Document data:", docSnap.data());
      const obj = {
        id: id,
        ...docSnap.data()
      }
      setProduct(obj)
    } else {
      toast.error("Product not found")
    }
  }

  return (
    <section>
      <div className={`container ${styles.product}`}>
        <h2>Product Details</h2>
        <div>
          <Link to="#/products">&larr; Back To Products</Link>
        </div>
        {product === null ? (<img src={spinnerImg} alt='Loading' width={50} />) : (
          <>
            <div className={styles.details}>
              <div className={styles.img}>
                <img src={product.imageURL} alt={product.name} />
              </div>
              <div className={styles.content}>
                <h3>{product.name}</h3>
                <p className={styles.price}>{`$${product.price}`}</p>
                <p>{product.desc}</p>
                <p>
                  <b>SKU</b> {product.id}
                </p>
                <p>
                  <b>Brand</b> {product.brand}
                </p>

                <div className={styles.count}>
                  <button className='--btn'>-</button>
                  <p>
                    <b>1</b>
                  </p>
                  <button className='--btn'>+</button>
                </div>
                <button className='--btn --btn-danger'>ADD TO CART</button>
              </div>
            </div>
          </>
        )}

      </div>
    </section>
  )
}

export default ProductDetails