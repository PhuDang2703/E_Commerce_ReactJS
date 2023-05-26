import { useState } from 'react'
import styles from './CheckoutDetails.module.scss'
import Card from '../../components/card/Card'
import { CountryDropdown } from 'react-country-region-selector'
import { useDispatch } from 'react-redux'
import { SAVE_BILLING_ADDRESS, SAVE_SHIPPING_ADDRESS } from '../../redux/slice/checkoutSlice'
import { useNavigate } from 'react-router-dom'
import CheckoutSummary from '../../components/checkoutSummary/CheckoutSummary'


const initialAddressState = {
    name: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
    phone: ""
}

const CheckoutDetails = () => {
    const [shippingAddress, setShippingAddress] = useState({ ...initialAddressState })
    const [billingAddress, setBillingAddress] = useState({ ...initialAddressState })

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleShipping = (e) => {
        const { name, value } = e.target;
        setShippingAddress({
            ...shippingAddress,
            [name]: value
        })
    }
    const handleBiling = (e) => {
        const { name, value } = e.target;
        setBillingAddress({
            ...billingAddress,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('shippingAddress', shippingAddress)
        console.log(billingAddress)
        dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress));
        dispatch(SAVE_BILLING_ADDRESS(billingAddress));
        navigate('/checkout');
    }

    return (
        <section>
            <div className={`container ${styles.checkout}`}>
                <h2>Checkout Details</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <Card cardClass={styles.card}>
                            <h3>Shipping Address</h3>
                            <label>Recipient Name</label>
                            <input type='text' placeholder='Recipient Name' name='name' required value={shippingAddress.name} onChange={(e) => handleShipping(e)} />

                            <label>Address line 1</label>
                            <input type='text' placeholder='Address line 1' name='line1' required value={shippingAddress.line1} onChange={(e) => handleShipping(e)} />

                            <label>Address line 2</label>
                            <input type='text' placeholder='Address line 2' name='line2' value={shippingAddress.line2} onChange={(e) => handleShipping(e)} />

                            <label>City</label>
                            <input type='text' placeholder='City' name='city' required value={shippingAddress.city} onChange={(e) => handleShipping(e)} />

                            <label>State</label>
                            <input type='text' placeholder='state' name='state' required value={shippingAddress.state} onChange={(e) => handleShipping(e)} />

                            <label>Postal code</label>
                            <input type='text' placeholder='Postal code' name='postal_code' required value={shippingAddress.postal_code} onChange={(e) => handleShipping(e)} />

                            {/* Country Input (npm react-country-region-selector)*/}
                            <CountryDropdown
                                valueType='short'
                                className={styles.select}
                                value={shippingAddress.country}
                                required
                                onChange={(val) => handleShipping({
                                    target: {
                                        name: "country",
                                        value: val
                                    }
                                })}
                            />
                            <label>Phone</label>
                            <input type='text' placeholder='Phone' name='phone' required value={shippingAddress.phone} onChange={(e) => handleShipping(e)} />
                        </Card>

                        {/* Billing Address */}
                        <Card cardClass={styles.card}>
                            <h3>Billing Address</h3>
                            <label>Recipient Name</label>
                            <input type='text' placeholder='Recipient Name' name='name' required value={billingAddress.name} onChange={(e) => handleBiling(e)} />

                            <label>Address line 1</label>
                            <input type='text' placeholder='Address line 1' name='line1' required value={billingAddress.line1} onChange={(e) => handleBiling(e)} />

                            <label>Address line 2</label>
                            <input type='text' placeholder='Address line 2' name='line2' value={billingAddress.line2} onChange={(e) => handleBiling(e)} />

                            <label>City</label>
                            <input type='text' placeholder='City' name='city' required value={billingAddress.city} onChange={(e) => handleBiling(e)} />

                            <label>State</label>
                            <input type='text' placeholder='state' name='state' required value={billingAddress.state} onChange={(e) => handleBiling(e)} />

                            <label>Postal code</label>
                            <input type='text' placeholder='Postal code' name='postal_code' required value={billingAddress.postal_code} onChange={(e) => handleBiling(e)} />

                            {/* Country Input (npm react-country-region-selector)*/}
                            <CountryDropdown
                                valueType='short'
                                className={styles.select}
                                required
                                value={billingAddress.country}
                                onChange={(val) => handleBiling({
                                    target: {
                                        name: "country",
                                        value: val
                                    }
                                })}
                            />
                            <label>Phone</label>
                            <input type='text' placeholder='Phone' name='phone' required value={billingAddress.phone} onChange={(e) => handleBiling(e)} />
                            <button type='submit' className='--btn --btn-primary'>Proceed To Checkout</button>
                        </Card>
                    </div>
                    {/* Checkout Summary */}
                    <div>
                        <Card cardClass={styles.card}>
                            <CheckoutSummary />
                        </Card>
                    </div>
                </form>

            </div>
        </section>

    )
}

export default CheckoutDetails