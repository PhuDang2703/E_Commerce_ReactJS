import React from 'react'
import Slider from '../../components/slider/Slider'
import AdminOnlyRoute from '../../components/adminOnlyRoute/AdminOnlyRoute'

const Home = () => {
  return (
    <div>
      <Slider/>
      {/* <AdminOnlyRoute/> */}
    </div>
  )
}

export default Home