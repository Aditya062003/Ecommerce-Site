import React from "react";
import Link from "next/link";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";

const Checkout = ({ cart, subtotal, addToCart, removeFromCart }) => {
  return (
    <div className="container m-auto">
      <h1 className="font-bold text-3xl my-6 text-center">Checkout</h1>
      <h2 className="font-bold mb-2 mx-4">1. Delivery Details </h2>
      <div className="my-4 mx-auto">
        <div class="px-2 flex">
          <div class=" m-2 w-1/2 mb-2">
            <label for="full-name" class="leading-7 text-sm text-gray-600">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              class="w-full bg-gray-100 px-3 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1  leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div class=" m-2 w-1/2">
            <label for="email" class="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div class=" m-4">
          <label for="email" class="leading-7 text-sm text-gray-600">
            Address
          </label>
          <textarea
            id=""
            name=""
            cols="20"
            rows="2"
            class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          ></textarea>
        </div>
        <div class="px-2 flex">
          <div class=" m-2 w-1/2 ">
            <label for="full-name" class="leading-7 text-sm text-gray-600">
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              class="w-full bg-gray-100 px-3 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1  leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div class=" m-2 w-1/2">
            <label for="email" class="leading-7 text-sm text-gray-600">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div class="px-2 flex">
          <div class=" m-2 w-1/2">
            <label for="full-name" class="leading-7 text-sm text-gray-600">
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              class="w-full bg-gray-100 px-3 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1  leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div class=" m-2 w-1/2">
            <label for="email" class="leading-7 text-sm text-gray-600">
              Pincode
            </label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
      <h2 className="font-bold mb-2 mx-4">2. Review cart Items </h2>
      <div className=" px-0 py-2 sidecart w-1/2 m-auto bg-gray-100">
        <h2 className="text-center py-2 font-bold text-xl">Shopping Cart</h2>
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
                <div className="flex my-2 text-center">
                  <span className="w-1/2 font-semibold">{cart[k].name}</span>
                  <span className="w-1/2 font-semibold flex items-center justify-center">
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
        <div className="flex justify-center items-center mx-8 ">
          <span className="font-bold my-2 mx-8 py-2">Subtotal</span>
          <span className="font-bold my-2 mx-8 py-2">₹{subtotal}</span>
        </div>
        <Link href={""}>
          <button class="flex my-2 md:my-0 mx-auto text-white bg-indigo-500 border-0 py-3 px-4 focus:outline-none hover:bg-indigo-600 rounded text-sm">
            <BsFillBagCheckFill className="m-1" />
            Pay Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Checkout;
