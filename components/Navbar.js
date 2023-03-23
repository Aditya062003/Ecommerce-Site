import React, { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AiFillCloseCircle, AiOutlineShoppingCart,AiOutlinePlusCircle,AiOutlineMinusCircle } from 'react-icons/ai';
import {BsFillBagCheckFill} from 'react-icons/bs'

const Navbar = () => {
  const ref=useRef()
  const toggleCart=()=>{
    if (ref.current.classList.contains('translate-x-full')){
      ref.current.classList.remove('translate-x-full')
      ref.current.classList.add('translate-x-0')
    }
    else if (!ref.current.classList.contains('translate-x-full')){
      ref.current.classList.add('translate-x-full')
      ref.current.classList.remove('translate-x-0')
    }
  }
  return (
    <div className=' flex justify-center md:flex-row md:justify-start flex-col items-center py-2 mb-1 shadow-md'>
      <div className="logo ml-4">
        <Link href={'/'}><Image src="/logo.png" width={70} height={70} alt=""/></Link>
      </div>
      <div className="nav mx-auto ">
        <ul className='flex space-x-5 md:space-x-10 md:text-xl text-xs font-bold'>
          <Link legacyBehavior href={'/tshirts'}><a className='hover:text-transparent hover:bg-gradient-to-t from-blue-900 to-indigo-300 bg-clip-text'><li>T-Shirts</li></a></Link>
          <Link legacyBehavior href={'/hoodies'}><a className='hover:text-transparent hover:bg-gradient-to-t from-blue-900 to-indigo-300 bg-clip-text'><li>Hoodies</li></a></Link>
          <Link legacyBehavior href={'/mugs'}><a className='hover:text-transparent hover:bg-gradient-to-t from-blue-900 to-indigo-300 bg-clip-text'><li>Mugs</li></a></Link>
          <Link legacyBehavior href={'/stickers'}><a className='hover:text-transparent hover:bg-gradient-to-t from-blue-900 to-indigo-300 bg-clip-text'><li>Stickers</li></a></Link> 
        </ul>
      </div>
      <div onClick={toggleCart} className="cart font-bold absolute right-1 mr-4 cursor-pointer">
        <AiOutlineShoppingCart className='text-2xl md:text-3xl'/>
      </div>

      <div ref={ref} className="w-[40vh] h-full fixed px-6 py-10 sidecart top-0 right-0 p-10 bg-blue-50 transform transition-transform translate-x-full">
        <h2 className="text-center font-bold text-xl">Shopping Cart</h2>
        <span onClick={toggleCart} className="absolute top-4 right-2 text-xl text-indigo-600 cursor-pointer"><AiFillCloseCircle/></span>
        <ol>
          <li>
            <div className="flex my-4">
            <span className='w-2/3 font-semibold'>T-Shirt</span>
            <span className='w-1/3 font-semibold flex items-center justify-center'><AiOutlineMinusCircle className='mx-2 text-3xl'/>1<AiOutlinePlusCircle className='mx-2 text-3xl'/></span>
            </div>
          </li>
          <li>
            <div className="flex my-4">
            <span className='w-2/3 font-semibold'>T-Shirt</span>
            <span className='w-1/3 font-semibold flex items-center justify-center'><AiOutlineMinusCircle className='mx-2 text-3xl'/>1<AiOutlinePlusCircle className='mx-2 text-3xl'/></span>
            </div>
          </li>
          <li>
            <div className="flex my-4">
            <span className='w-2/3 font-semibold'>T-Shirt</span>
            <span className='w-1/3 font-semibold flex items-center justify-center'><AiOutlineMinusCircle className='mx-2 text-3xl'/>1<AiOutlinePlusCircle className='mx-2 text-3xl'/></span>
            </div>
          </li>
          <li>
            <div className="flex my-4">
            <span className='w-2/3 font-semibold'>T-Shirt</span>
            <span className='w-1/3 font-semibold flex items-center justify-center'><AiOutlineMinusCircle className='mx-2 text-3xl'/>1<AiOutlinePlusCircle className='mx-2 text-3xl'/></span>
            </div>
          </li>
          <li>
            <div className="flex my-4">
            <span className='w-2/3 font-semibold'>T-Shirt</span>
            <span className='w-1/3 font-semibold flex items-center justify-center'><AiOutlineMinusCircle className='mx-2 text-3xl'/>1<AiOutlinePlusCircle className='mx-2 text-3xl'/></span>
            </div>
          </li>
        </ol>
        <div className="flex justify-center">
        <button class="flex mx-2  text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-sm"><BsFillBagCheckFill className='m-1'/>Checkout</button>
        <button class="flex mx-2 text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-sm">Clear Cart</button>
        </div>
      </div>
    </div>
   
  )
}

export default Navbar