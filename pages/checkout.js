import React from "react";
import Link from "next/link";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { useRouter } from "next/router";
import { BsFillBagCheckFill } from "react-icons/bs";
import { v4 as uuidv4 } from "uuid";

// import Head from "next/Head";
// import Script from "next/script";

import { useState, useEffect } from "react";

const Checkout = ({ cart, subtotal, addToCart, removeFromCart }) => {
  const Router = useRouter();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const [pincode, setpincode] = useState("");
  const [disabled, setdisabled] = useState(true);
  const [city, setcity] = useState();
  const [state, setstate] = useState();
  const handleChange = (e) => {
    if (e.target.name == "name") {
      setname(e.target.value);
    }
    if (e.target.name == "email") {
      setemail(e.target.value);
    }
    if (e.target.name == "phone") {
      setphone(e.target.value);
    }
    if (e.target.name == "address") {
      setaddress(e.target.value);
    }
    if (e.target.name == "pincode") {
      setpincode(e.target.value);
    }
    if (name && email && pincode && phone) {
      setdisabled(false);
    }
    // else{
    //   setdisabled(true)
    // }
  };
  // const [txntoken, setTxntoken] = useState(null);
  const oid = uuidv4();
  console.log("og oid", oid);
  const initiatePayment = async (e) => {
    e.preventDefault();
    const data = {
      cart,
      subtotal,
      oid,
      email: email,
      name,
      address: address,
      pincode,
      phone,
    };
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    let response = await res.json();
    localStorage.setItem('oid',response.body.oid)
  };

  //   console.log(response);

  // useEffect(() => {
  //   initiatePayment();
  // }, []);

  // // if (!txntoken) {
  // //   return <div>Loading...</div>;
  // // }

  // var config = {
  //   root: "",
  //   flow: "DEFAULT",
  //   data: {
  //     orderId: oid /* update order id */,
  //     token: txntoken /* update token value */,
  //     tokenType: "TXN_TOKEN",
  //     amount: subtotal /* update amount */,
  //   },
  //   handler: {
  //     notifyMerchant: function (eventName, data) {
  //       console.log("notifyMerchant handler function called");
  //       console.log("eventName => ", eventName);
  //       console.log("data => ", data);
  //     },
  //   },
  // };

  return (
    <div className="container m-auto">
      {/* <Head>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>
      <Script
        type="application/javascript"
        src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`}
        crossorigin="anonymous"
      /> */}
      {/* Render the component after the Promise has resolved */}

      <h1 className="font-bold text-3xl my-6 text-center">Checkout</h1>
      {/* <form onSubmit={initiatePayment} method="POST"> */}
      <h2 className="font-bold mb-2 mx-4">1. Delivery Details </h2>
      <div className="my-4 mx-auto">
        <div class="px-2 flex">
          <div class=" m-2 w-1/2 mb-2">
            <label for="full-name" class="leading-7 text-sm text-gray-600">
              Full Name
            </label>
            <input
              onChange={handleChange}
              value={name}
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
              onChange={handleChange}
              value={email}
              type="email"
              id="email"
              name="email"
              class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div class=" m-4">
          <label for="address" class="leading-7 text-sm text-gray-600">
            Address
          </label>
          <input
            onChange={handleChange}
            value={address}
            id=""
            name="address"
            class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          ></input>
        </div>
        <div class="px-2 flex">
          <div class=" m-2 w-1/2 ">
            <label for="full-name" class="leading-7 text-sm text-gray-600">
              Phone Number
            </label>
            <input
              onChange={handleChange}
              value={phone}
              type="text"
              id="phone"
              name="phone"
              class="w-full bg-gray-100 px-3 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1  leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div class=" m-2 w-1/2">
            <label class="leading-7 text-sm text-gray-600">Pincode</label>
            <input
              onChange={handleChange}
              value={pincode}
              type="text"
              id="pincode"
              name="pincode"
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
              value={state}
              type="text"
              id="state"
              name="state"
              class="w-full bg-gray-100 px-3 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1  leading-8 transition-colors duration-200 ease-in-out"
              readOnly={true}
            />
          </div>
          <div class=" m-2 w-1/2">
            <label for="email" class="leading-7 text-sm text-gray-600">
              City
            </label>
            <input
              value={city}
              type="text"
              id="city"
              name="city"
              readOnly={true}
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
        <button
          onClick={initiatePayment}
          disabled={disabled}
          class="disabled:bg-blue-200 flex my-2 md:my-0 mx-auto text-white bg-indigo-500 border-0 py-3 px-4 focus:outline-none hover:bg-indigo-600 rounded text-sm"
        >
          <BsFillBagCheckFill className="m-1" />
          <Link legacyBehavior href={"/payment"}>
            <a>Pay ₹{subtotal}</a>
          </Link>
        </button>
      </div>
      {/* </form> */}
    </div>
  );
};

export default Checkout;
