import React from 'react'
import { useNavigate } from 'react-router-dom'
import 'animate.css';

const Success = () => {
    const navigate = useNavigate();
  return (
    <div className='flex justify-center my-32 '>
    <div className=' bg-secondary px-32 py-20 animate__animated animate__backInDown'>
        <h1 className='text-info text-2xl tracking-wider font-semibold mb-5'>Your Pachasing is success</h1>
        <button onClick={()=> navigate('/')} className=' bg-info text-primary px-5 py-2 rounded shadow-lg uppercase transition hover:scale-105 '>Go shopping</button>
    </div>
</div>
  )
}

export default Success