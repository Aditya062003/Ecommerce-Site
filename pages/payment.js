import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";

const payment = ({ cart, subtotal }) => {
  const Router = useRouter();
  const checkpayment = async (e) => {
    const oid = localStorage.getItem("oid");
    const txnId = localStorage.getItem("txnId");
    e.preventDefault();
    if (!oid) {
      toast.error("hello", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    let data = { oid, txnId };
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    Router.push("/orders");
  };

  const [accountNumber, setAccountNumber] = useState("");

  function handleAccountNumberChange(event) {
    let input = event.target.value.replace(/\D/g, "");
    input = input.replace(/(\d{4})(?=\d)/g, "$1-");
    setAccountNumber(input);
  }

  return (
    <div>
      <ToastContainer />
      <style jsx global>{`
        footer {
          display: none;
        }
      `}</style>
      <div class="flex justify-center items-center min-h-screen bg-gray-100">
        <div class="h-auto w-80 bg-white p-3 rounded-lg">
          <p class="text-xl font-semibold">Payment Details</p>
          <form action="">
            <div class="input_text mt-6 relative">
              <input
                required
                type="text"
                class="h-12 pl-7 outline-none px-2 focus:border-blue-900 transition-all w-full border-b "
                placeholder="John Row"
              />
              <span class="absolute left-0 text-sm -top-4">
                Cardholder Name
              </span>
              <i class="absolute left-2 top-4 text-gray-400 fa fa-user"></i>
            </div>
            <div class="input_text mt-8 relative">
              <input
                required
                class="h-12 pl-7 outline-none px-2 focus:border-blue-900 transition-all w-full border-b "
                type="text"
                placeholder="0000-0000-0000-0000"
                id="account-number"
                maxLength={19}
                minLength={19}
                name="accountNumber"
                value={accountNumber}
                onChange={handleAccountNumberChange}
                pattern="\d{4}-\d{4}-\d{4}-\d{4}"
              />
              <span class="absolute left-0 text-sm -top-4">Card Number</span>
              <i class="absolute left-2 top-[14px] text-gray-400 text-sm fa fa-credit-card"></i>
            </div>
            <div class="mt-8 flex gap-5 ">
              <div class="input_text relative w-full">
                <input
                  required
                  type="text"
                  class="h-12 pl-7 outline-none px-2 focus:border-blue-900 transition-all w-full border-b "
                  placeholder="mm/yyyy"
                  data-slots="my"
                />
                <span class="absolute left-0 text-sm -top-4">Expiry</span>
                <i class="absolute left-2 top-4 text-gray-400 fa fa-calendar-o"></i>
              </div>
              <div class="input_text relative w-full">
                <input
                  required
                  type="text"
                  class="h-12 pl-7 outline-none px-2 focus:border-blue-900 transition-all w-full border-b "
                  placeholder="000"
                  maxLength={3}
                  minLength={3}
                />
                <span class="absolute left-0 text-sm -top-4">CVV</span>
                <i class="absolute left-2 top-4 text-gray-400 fa fa-lock"></i>
              </div>
            </div>
            <p class="text-lg text-center mt-4 text-gray-600 font-semibold">
              Payment amount:₹{subtotal}
            </p>
            <div class="text-center">
              <button
                onClick={checkpayment}
                class="outline-none pay h-12 bg-indigo-600 text-white mb-3 hover:bg-indigo-700 rounded-lg w-1/2 cursor-pointer transition-all"
              >
                Pay ₹{subtotal}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default payment;
