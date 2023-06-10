import React, { useEffect, useState } from 'react'
import styles from './ReviewProducts.module.scss'
import { selectUserID, selectUserName } from '../../redux/slice/authSlice'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectProduct } from '../../redux/slice/productSlice'
import StarsRating from 'react-star-rate'
import Card from '../../components/card/Card'
import { Timestamp, addDoc, collection } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { toast } from 'react-toastify'
import useFetchDocument from '../../customHooks/useFetchDocument'
import spinnerImg from '../../assets/spinner.jpg'


//npmjs->react-star-rate->copy install
const ReviewProducts = () => {
  const [rate, setRate] = useState(0);
  const [review, setReview] = useState("0");
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const { document } = useFetchDocument("products", id);
  const products = useSelector(selectProduct);
  const userID = useSelector(selectUserID);
  const userName = useSelector(selectUserName);

  useEffect(() => {
    setProduct(document)
  }, [document])

  const submitReview = (e) => {
    e.preventDefault()
    const today = new Date()
    const date = today.toDateString()
    const reviewConfig = {
      userID,
      userName,
      productID: id,
      rate,
      review,
      reviewDate: date,
      createdAt: Timestamp.now().toDate()
    }

    try {
      // Add a new document with a generated id.(search add docs)
      addDoc(collection(db, "reviews"), reviewConfig);
      toast.success("Review submitted succcessfully");
      setRate(0)
      setReview("")
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className={`container ${styles.review}`}>
      <h2>Review Products</h2>
      {product === null ? (
        <img src={spinnerImg} alt='Loading...' style={{ width: '80px' }}/>
      ) : (
        <>
          <p>
            <b>Products name:</b> {product.name}
          </p>
          <img src={product.imageURL} alt={product.name} style={{ width: '150px' }} />
        </>
      )}

      <Card cardClass={styles.card}>
        <form onSubmit={(e) => submitReview(e)}>
          <label>Rating:</label>
          <StarsRating value={rate} onChange={rate => setRate(rate)} />
          <label>Review</label>
          <textarea value={review} required onChange={(e) => setReview(e.target.value)} cols='30' rows='10'></textarea>
          <button type='submit' className='--btn --btn-primary'>Submit Review</button>
        </form>
      </Card>
    </div>
  )
}

export default ReviewProducts