import React from 'react'
import { Routes , Route} from 'react-router-dom'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import ProductDetails from '../pages/ProductDetails'

function RouterConfig() {
  return (
    <Routes>
        <Route  path='/' element={<HomePage/>} />
        <Route  path='/login' element={<LoginPage/>} />
        <Route  path='/signup' element={<RegisterPage/>} />
        <Route  path='/product-details/:productID' element={<ProductDetails/>}/>
    </Routes>

  )
}

export default RouterConfig