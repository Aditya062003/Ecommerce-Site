import React from "react";
import Link from "next/link";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { useRouter } from "next/router";
import { BsFillBagCheckFill } from "react-icons/bs";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";

import { useState, useEffect } from "react";

const Checkout = ({ cart, clearCart, subtotal, addToCart, removeFromCart }) => {
  const Router = useRouter();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const [pincode, setpincode] = useState("");
  const [disabled, setdisabled] = useState(true);
  const [city, setcity] = useState();
  const [state, setstate] = useState();
  const [user, setuser] = useState();

  const handleChange = async (e) => {
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
      if (e.target.value.length == 6) {
        getPincode(e.target.value);
      } else {
        setstate("");
        setcity("");
      }
    }
  };

  useEffect(() => {
    if (name && pincode && phone && address) {
      setdisabled(false);
    } else {
      setdisabled(true);
    }
  }, [name, pincode, phone, address]);

  const oid = uuidv4();
  const txnId = uuidv4();
  const initiatePayment = async (e) => {
    e.preventDefault();
    const data = {
      cart,
      subtotal,
      oid,
      txnId,
      email,
      name,
      address: address,
      pincode,
      phone,
      city,
      state,
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
    if (response.success == true) {
      localStorage.setItem("oid", response.body.oid);
      localStorage.setItem("txnId", response.body.txnId);
      Router.push("/payment");
    }
    if (response.success == false) {
      if (response.cartclear) {
        clearCart();
      }
      toast.error(response.error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const fetchData = async (token) => {
    let data = { token: token };

    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let response = await res.json();

    setname(response.name);
    setaddress(response.address);
    setpincode(response.pincode);
    setphone(response.phone);
    getPincode(response.pincode);
  };
  const getPincode = async (pin) => {
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
    let pinJson = await pins.json();
    if (Object.keys(pinJson).includes(pin)) {
      setcity(pinJson[pin][0]);
      setstate(pinJson[pin][1]);
    } else {
      setstate("");
      setcity("");
    }
  };
  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem("myuser"));
    if (myuser && myuser.token) {
      setuser(myuser);
      setemail(myuser.email);
      fetchData(myuser.token);
    } else {
      toast.error("Please Signup before ordering!", {
        toastId: "error",
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        Router.push("/signup");
      }, 3000);
    }
  }, []);

  return (
    <div className="container m-auto">
      <ToastContainer />
      <style jsx global>{`
        footer {
          display: none;
        }
      `}</style>
      <Head>
        <title>Care-Leisure.com-Wear the style</title>
        <meta name="description" content="StylesWear" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="font-bold text-3xl my-6 text-center">Checkout</h1>

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
            {user && user.value ? (
              <input
                onChange={handleChange}
                value={user.email}
                type="email"
                id="email"
                name="email"
                readOnly
                class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            ) : (
              <input
                onChange={handleChange}
                value={email}
                type="email"
                id="email"
                name="email"
                class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            )}
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
              onChange={handleChange}
              value={state}
              type="text"
              id="state"
              name="state"
              class="w-full bg-gray-100 px-3 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1  leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div class=" m-2 w-1/2">
            <label for="email" class="leading-7 text-sm text-gray-600">
              District
            </label>
            <input
              onChange={handleChange}
              value={city}
              type="text"
              id="city"
              name="city"
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
          Pay ₹{subtotal}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
