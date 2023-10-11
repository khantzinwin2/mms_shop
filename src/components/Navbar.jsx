import React from 'react'
import {BiLogoShopify, BiSearch} from "react-icons/bi"
import {PiShoppingCartSimpleFill} from "react-icons/pi"
import { useStateContext } from '../context/StateContext'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const {search, setSearch,state:{cart}} = useStateContext();
  return (
    <div className=' flex items-center justify-between bg-gray-100 rounded shadow-lg px-3 py-2 my-4'>
          <Link to={"/"}>
            <div className=" flex items-center gap-2">
              <BiLogoShopify className=' text-danger text-4xl'/>
              <h1 className=' uppercase text-xl font-semibold tracking-wider '>mms-shop</h1>
            </div>
          </Link>
          <div className=" flex items-center gap-3">
            <Link to="/cart">
              <div className=" flex gap-2 bg-header px-4 py-2 rounded text-white">
                  <PiShoppingCartSimpleFill/>
                  <small>{cart.length}</small>
              </div>
            </Link>
          <div className=" flex items-center border-2 gap-2 px-4 py-2 rounded">
            <BiSearch/>
            <input value={search} onChange={e=>setSearch(e.target.value)} type="search" className=' outline-none bg-transparent '  placeholder=' Search...'/>
          </div>
          </div>
    </div>
  )
}

export default Navbar