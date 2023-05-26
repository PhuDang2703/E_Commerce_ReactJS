import React from 'react'
import style from './CheckoutSummary.module.scss'
import { selectCartItems, selectCartToltalAmount, selectCartToltalQuantity } from '../../redux/slice/cartSlice'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Card from '../card/Card'

const CheckoutSummary = () => {
    const cartItems = useSelector(selectCartItems);
    const cartTotalAmount = useSelector(selectCartToltalAmount);
    const cartTotalQuantity = useSelector(selectCartToltalQuantity);

    return (
        <>
            <h3>CheckoutSummary</h3>
            <div>
                {cartItems.length === 0 ? (
                    <>
                        <p>No item in your cart.</p>
                        <button className='--btn'>
                            <Link to='/#products'>Back To Shop</Link>
                        </button>
                    </>
                ) : (
                    <div>
                        <h4>
                            <b>{`Cart item(s): ${cartTotalQuantity}`}</b>
                        </h4>
                        <div className={style.text}>
                            <h4>Subtotal: </h4>
                            <h3>{cartTotalAmount.toFixed(2)}$</h3>
                        </div>

                        {cartItems.map((item, index) => {
                            const { id, name, price, cartQuantity } = item;
                            return (
                                <Card key={id} cardClass={style.card}>
                                    <h4>Product: {name}</h4>
                                    <p>Quantity: {cartQuantity}</p>
                                    <p>Unit price: {price}</p>
                                    <p>Set price: {price.cartQuantity}</p>
                                </Card>
                            )
                        })}
                    </div>
                )}

            </div>
        </>
    )
}

export default CheckoutSummary