import React, { useEffect } from 'react'
import Slider from '../../components/slider/Slider'
import Product from '../../components/product/Product'

const Home = () => {
  const url = window.location.href;
  // alert(url);

  const scrollToProduct = () => {
    if(url.includes("#products")){
      console.log("window",window)
      window.scrollTo({
        top: 700,
        behavior: 'smooth'
      })
      return;
    }
  };

  useEffect(() => {
    scrollToProduct();
  }, [])

  return (
    <div>
      <Slider/>
      <Product/>
    </div>
  )
}

export default Home