import React, { useEffect, useState } from 'react'
import { useStateContext } from '../context/StateContext'
import Card from '../components/Card';
import Spinner from '../Spinner/Spinner';


const Product = () => {
    const {state: {products}} = useStateContext();
  return (
    <>
    {
      products.length > 0 ? (
        <div className='flex flex-wrap gap-5 justify-center'>
        {products?.map(product=><Card key={product.id} product={product} />)}
    </div>
      ) : <Spinner/> 
    }
    </>
  )
}

export default Product