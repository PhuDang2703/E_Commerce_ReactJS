import React, { useState } from 'react'
import styles from './ChangeOrderStatus.module.scss'
import Loader from '../../loader/Loader'
import Card from '../../card/Card'
import { Timestamp, collection, doc, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { db } from '../../../firebase/config'
import { toast } from 'react-toastify'

const ChangeOrderStatus = ({ order, id }) => {
  //Props from OderDetails
  const [status, setStatus] = useState("")
  const [isLoading, setIsLoading] = useState("")
  const navigate = useNavigate();

  const editOrder = (e, id) => {
    e.preventDefault();
    setIsLoading(true);

    const orderConfig = {
      userID: order.userID,
      userEmail: order.userEmail,
      orderDate: order.orderDate,
      orderTime: order.orderTime,
      orderAmount: order.orderAmount,
      orderStatus: status,
      cartItems: order.cartItems,
      shippingAddress: order.shippingAddress,
      createdAt: order.createdAt,
      editedAt:Timestamp.now().toDate(),
    }
    try {
      // Add a new document with a generated id.(search add docs)
      //Đổi collection thành doc vì ta cần cái single unique order documentID trên database cụ thể để edit chứ ko phải là cái order đc collection.
      setDoc(doc(db, "orders", id), orderConfig);
      
      setIsLoading(false);
      toast.success("Order status changes successfully");
      navigate("/admin/orders");
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <>
      {isLoading && <Loader />}

      <div className={styles.status}>
        <Card cardClass={styles.card}>
          <h4>Update Status</h4>
          <form onSubmit={(e) => editOrder(e, id)}>
            <span>
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value='Order Placed...' >-- Order Placed... --</option>
                <option value='Processing...' >-- Processing... --</option>
                <option value='Shipped...' >-- Shipped... --</option>
                <option value='Deliverd...' >-- Deliverd... --</option>
              </select>
            </span>
            <span>
              <button type='submit' className='--btn --btn-primary'>Update Status</button>
            </span>
          </form>
        </Card>
      </div>
    </>
  )
}

export default ChangeOrderStatus