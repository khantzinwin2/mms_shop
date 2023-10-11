import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Product from './pages/Product'
import Navbar from './components/Navbar'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Success from './pages/Success'

const App = () => {
  return (
    <div className='container mx-auto'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Product/>} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/success' element={<Success />} />
        <Route path='/product/:id' element={<ProductDetail/>} />
      </Routes>
    </div>
  )
}

export default App