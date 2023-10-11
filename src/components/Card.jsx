import React from 'react'
import {AiFillStar} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useStateContext } from '../context/StateContext'


const Card = ({product}) => {
  const  {dispatch, state: {products,cart}} = useStateContext();
  return (
    <div className=' w-80 border-2 p-5 rounded-lg hover:shadow-lg transition transform hover:scale-105'>
        <img src={product.image} className='text-center h-[200px] mx-auto my-3 ' alt="" />
        <h1 className='  text-xl font-semibold text-header tracking-wider my-3'>{product.title.substring(0,20)}...</h1>
        <div className='flex gap-1 items-center'>
        <AiFillStar className=' text-danger'/>
        <small className=' text-info font-bold'>({product.rating.rate})</small>
        </div>
        <h1 className=' text-header text-xl font-semibold my-3'>${product.price}</h1>
        <button onClick={()=> dispatch({type:"ADD_TO_CART", payload:product})} className=' bg-info text-primary px-5 py-2 rounded-sm shadow-md transform transition hover:scale-90'>Add To Cart</button>
        <Link to={`/product/${product.id}`}>
            <button className=' bg-header text-primary px-5 py-2 roudned-sm ml-5 shadow-md transform transition hover:scale-90'>Details</button>
        </Link>
    </div>
  )
}

export default Card