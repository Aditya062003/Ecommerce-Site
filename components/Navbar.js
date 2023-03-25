import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AiFillCloseCircle,
  AiOutlineShoppingCart,
  AiOutlinePlusCircle,
  AiOutlineMinusCircle,
} from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";

const Navbar = ({ cart, addToCart, clearCart, removeFromCart, subtotal }) => {
  console.log(cart, addToCart, clearCart, removeFromCart, subtotal);
  const ref = useRef();
  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else if (!ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.add("translate-x-full");
      ref.current.classList.remove("translate-x-0");
    }
  };
  return (
    <div className="sticky top-0 z-10 bg-white flex justify-center md:flex-row md:justify-start flex-col items-center py-1 mb-1 shadow-md">
      <div className="logo ml-4">
        <Link href={"/"}>
          <Image src="/logo.png" width={70} height={70} alt="" />
        </Link>
      </div>
      <div className="nav mx-auto ">
        <ul className="flex space-x-5 md:space-x-10 md:text-xl text-xs font-bold">
          <Link legacyBehavior href={"/tshirts"}>
            <a className="hover:text-transparent hover:bg-gradient-to-t from-blue-900 to-indigo-300 bg-clip-text">
              <li>T-Shirts</li>
            </a>
          </Link>
          <Link legacyBehavior href={"/hoodies"}>
            <a className="hover:text-transparent hover:bg-gradient-to-t from-blue-900 to-indigo-300 bg-clip-text">
              <li>Hoodies</li>
            </a>
          </Link>
          <Link legacyBehavior href={"/mugs"}>
            <a className="hover:text-transparent hover:bg-gradient-to-t from-blue-900 to-indigo-300 bg-clip-text">
              <li>Mugs</li>
            </a>
          </Link>
          <Link legacyBehavior href={"/stickers"}>
            <a className="hover:text-transparent hover:bg-gradient-to-t from-blue-900 to-indigo-300 bg-clip-text">
              <li>Stickers</li>
            </a>
          </Link>
        </ul>
      </div>
      <div className="cart font-bold absolute right-1 mr-4 cursor-pointer flex">
        <Link href={"/login"}>
          <MdAccountCircle className="text-2xl md:text-3xl mx-2" />
        </Link>
        <AiOutlineShoppingCart
          onClick={toggleCart}
          className="text-2xl md:text-3xl"
        />
      </div>

      <div
        ref={ref}
        className={`w-[36vh] h-[100vh] overflow-y-scroll fixed px-6 py-10 sidecart top-0 right-0 p-10 bg-blue-50 transform transition-transform ${
          Object.keys(cart).length !== 0 ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <h2 className="text-center font-bold text-xl">Shopping Cart</h2>
        <span
          onClick={toggleCart}
          className="absolute top-4 right-2 text-xl text-indigo-600 cursor-pointer"
        >
          <AiFillCloseCircle />
        </span>
        <ol>
          {Object.keys(cart) == 0 && (
            <div className="my-2 text-center font-semibold ">
              {" "}
              Your Cart is Empty.
            </div>
          )}
          {Object.keys(cart).map((k) => {
            return (
              <li key={k}>
                <div className="flex my-4">
                  <span className="w-2/3 font-semibold">
                    {cart[k].name}({cart[k].size}/ {cart[k].variant})
                  </span> 
                  <span className="w-1/3 font-semibold flex items-center justify-center">
                    <AiOutlineMinusCircle
                      className="mx-2 cursor-pointer text-3xl"
                      onClick={() => {
                        removeFromCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].size,
                          cart[k].variant
                        );
                      }}
                    />{" "}
                    {cart[k].qty}{" "}
                    <AiOutlinePlusCircle
                      onClick={() => {
                        addToCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].size,
                          cart[k].variant
                        );
                      }}
                      className="mx-2 text-3xl cursor-pointer"
                    />
                  </span>
                </div>
              </li>
            );
          })}
        </ol>
        <div className="font-bold text-center">Subtotal ₹{subtotal}</div>
        <div className="flex justify-center">
          <Link href={"/checkout"}>
            <button class="flex mx-1  text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-sm">
              <BsFillBagCheckFill className="m-1" />
              Checkout
            </button>
          </Link>
          <button
            onClick={clearCart}
            class="flex mx-1 text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-sm"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
