import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getData } from '../api';
import { AiFillStar } from 'react-icons/ai';
import { useStateContext } from '../context/StateContext';
import Spinner from '../Spinner/Spinner';

const ProductDetail = () => {
    const navigate = useNavigate();
    const {dispatch} = useStateContext();
    const {id} = useParams();
    const [product,setProduct] = useState({});
    const [products,setProducts] = useState([]);

    const getProductDetails = async()=> {
        setProduct(await getData(`/products/${id}`))
    }

    const getProductsByCat = async()=> {
       const data =  await getData(`/products/category/${product.category}`)
       const filterData = data.filter(item=> product.id !==  item.id)
       setProducts(filterData)
    }

    useEffect(()=>{
         getProductDetails()
    },[])

    useEffect(()=>{
        getProductsByCat()
   },[products,product])
  return (
    <>
    {
        products.length >0 ? (<div>
            <div className='flex gap-5 my-20'>
                <img src={product?.image} className=' h-96 border-2 p-10 shadow-lg' alt="" />
                <div className="flex flex-col mt-5 gap-5">
                    <p className=' bg-secondary text-info rounded-full w-40 text-center'>{product?.category}</p>
                    <p className=' text-header font-semibold tracking-wide text-2xl'>{product?.title}</p>
                    <div className="">
                        <p className='text-header font-bold text-lg '>Description</p>
                        <p className='mt-1 text-secondary leading-6 tracking-wider'>{product?.description}</p>
                    </div>
                    <p className='text-header font-semibold flex gap-2 items-center'><AiFillStar className=' text-danger text-xl'/>
                    <small className='text-xl'>{product?.rating?.rate}</small></p>
                    <p className='text-header font-semibold text-xl'>${product?.price}</p>
                    <div>
                    <button onClick={()=>dispatch({type:"ADD_TO_CART",payload: product})} className='bg-info w-40 text-primary py-2 rounded shadow-lg transition transform hover:scale-90 '>Add to Cart</button>
                    <button onClick={()=>navigate('/success')} className='bg-header w-40 text-primary ml-5 py-2 rounded shadow-lg transition transform hover:scale-90 '>Buy Now</button>
                    </div>
                </div>
            </div>
            <div className=" my-10">
                <h1 className=' text-header text-2xl font-bold'>You may also like</h1>
                <div className="flex flex-wrap gap-5" >
                {
                    products.map(pd=>(
                    <Link to={`/product/${pd.id}`} key={pd.id}>
                        <div onClick={()=>setProduct(pd)}  >
                        <img src={pd.image} className=' h-40 border-2 shadow-lg p-3' alt="" />
                        <h1 className='text-secondary font-bold mt-2'>${pd.price}</h1>
                        </div>
                    </Link>
                    ))
                }
                </div>
            </div>
        </div>): 
        (<Spinner/>)
    }
    </>
  )
}

export default ProductDetail