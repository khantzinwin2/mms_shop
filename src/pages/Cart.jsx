import React, { useEffect, useState } from 'react'
import { useStateContext } from '../context/StateContext'
import { AiFillDelete } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const {state:{cart},dispatch} = useStateContext();
    const navigate = useNavigate();
    const checkoutHandler = () => {
      dispatch({type:"EMPTY_CART"})
      navigate('/success')
    } 
    const [total,setTotal] = useState();


    // const inc = () => {
    //   if(qty>=1){
    //     setQty(qty+1)
    //   }else{
    //     setQty(qty)
    //   }
    // }

    // const dec = () => {
    //   if(qty>1){
    //     setQty(qty-1)
    //   }else{
    //     setQty(qty)
    //   }
    // }
    
    



    useEffect(()=>{
      const tota = cart.reduce((ini,cv)=> ini + cv.price,0)
      setTotal(tota.toFixed(2))
    },[])

    useEffect(()=>{
      const tota = cart.reduce((ini,cv)=> ini + cv.price,0)
      setTotal(tota.toFixed(2))
    },[checkoutHandler])
    

  return (
    <>
    { cart.length > 0 ? (<div className=' grid grid-cols-4'>
      <div className=' col-span-3'>{
        cart?.map(item=>(
        <div key={item.id} className='flex gap-5 mb-5'>
            <img src={item.image} className=' h-32 border-2 rounded p-4' alt="" />
            <div key={item.id} className='flex flex-col gap-1'>
                <h1>{item.title}</h1>
                <p className=' text-3xl text-secondary font-semibold'>${item.price.toFixed(2)}</p>

                <div key={item.id} className=' flex gap-6 items-center'>
              <div className="flex items-center gap-3 rounded-md shadow-sm" role="group">
                <button onClick={()=> dispatch({type:"DECREASE_QTY",payload:item})}  type="button" className="px-4 py-2  font-semibold text-red-500 bg-white border border-red-500 rounded-l-lg hover:bg-red-500 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-red-500 dark:border-red-500 dark:text-white dark:hover:text-white dark:hover:bg-red-500 dark:focus:ring-blue-500 dark:focus:text-white">
                  -
                </button>
                <p>{item.qty}</p>
                <button onClick={()=> dispatch({type:"INCREASE_QTY",payload:item})} type="button" className="px-4 py-2  font-semibold text-blue-500 bg-white border border-blue-500 rounded-r-md hover:bg-blue-500 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-blue-500 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                  +
                </button>
                <button onClick={()=> dispatch({type:"REMOVE_FROM_CART",payload:item})}><AiFillDelete className=' text-danger text-2xl'/></button>
              </div>

                </div>
                
              

            </div>
        </div>
        ))
    }
    </div>
    <div className=' col-span-1'>
      <div className=' p-10 bg-secondary rounded shadow-lg'>
        <h1 className='text-info text-3xl font-semibold mb-5'>Total Price - ${total} </h1>
        <button onClick={checkoutHandler} className=' px-5 py-2 bg-info text-primary uppercase text-xl font-semibold rounded shadow-lg'>Checkout</button>
      </div>
      <button onClick={()=> dispatch({type:"EMPTY_CART"})} className=' px-5 py-2 bg-danger text-primary uppercase text-xl my-5 font-semibold rounded shadow-lg'>Cart empty</button>
    </div>
    </div>): (
      <div className='flex justify-center my-32'>
      <div className=' bg-secondary px-32 py-20 animate__animated animate__backInDown'>
          <h1 className='text-danger text-2xl tracking-wider font-semibold mb-5'>Your Cart is empty</h1>
          <button onClick={()=> navigate('/')} className=' bg-danger text-primary px-5 py-2 rounded shadow-lg uppercase transition hover:scale-105 '>Go shopping</button>
      </div>
  </div>
    )}
    </>
  )
}

export default Cart