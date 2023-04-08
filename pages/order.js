import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Order from "../models/Order";
import mongoose from "mongoose";
import Head from "next/head";

const MyOrder = ({ order, clearCart }) => {
  const products = order.products;

  const router = useRouter();
  const [date, setdate] = useState();
  let options;
  useEffect(() => {
    const d = new Date(order.createdAt);
    setdate(d);
    if (router.query.clearCart == 1) {
      clearCart();
    }
  }, []);

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <Head>
        <title>Care-Leisure.com-Wear the style</title>
        <meta name="description" content="StylesWear" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container px-5 py-6 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              Care Leisure
            </h2>
            <h1 className="text-gray-900 text-xl md:text-3xl title-font font-medium mb-4">
              Order Id: #{order.orderID}
            </h1>
            <p className="leading-relaxed mb-4">
              Your Order is successfully placed! Your payment status is :
              <span className="font-bold">{order.status}</span>
            </p>
            <span className="font-semibold">
              Order placed ON :{" "}
              {date &&
                date.toLocaleDateString(
                  "en-IN",
                  (options = {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                )}
            </span>
            <div class="flex mb-4 ">
              <a class="flex-grow text-center border-b-2 border-gray-300 py-2 text-lg px-1">
                Item Description
              </a>
              <a class="flex-grow text-center border-b-2 border-gray-300 py-2 text-lg px-1">
                Quantity
              </a>
              <a class="flex-grow text-center border-b-2 border-gray-300 py-2 text-lg px-1">
                Price
              </a>
            </div>
            {Object.keys(products).map((key) => (
              <div className="flex   border-gray-200 py-2">
                <span className="text-gray-500">
                  {products[key].name}({products[key].size}/
                  {products[key].variant})
                </span>
                <span className="m-auto text-center text-gray-900">
                  {products[key].qty}
                </span>
                <span className="m-auto text-gray-900">
                  {products[key].qty} X {products[key].price}= ₹
                  {products[key].price * products[key].qty}
                </span>
              </div>
            ))}

            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">
                Subtotal : ₹{order.amount}
              </span>
              <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                Track Order
              </button>
            </div>
          </div>
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
            src="https://media.istockphoto.com/id/1011172576/photo/handsome-african-american-man-in-blank-black-t-shirt-standing-against-brick-wall.jpg?b=1&s=170667a&w=0&k=20&c=KNqGXs048M_YqQnNpFe8bbgJC9s6LvgqlyYV2LZVkQM="
          />
        </div>
      </div>
    </section>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(
      "mongodb+srv://aditya:aditya@cluster0.ypoa7js.mongodb.net/ecommerceretryWrites=true&w=majority"
    );
  }
  let order = await Order.findById(context.query.id);

  return {
    props: {
      order: JSON.parse(JSON.stringify(order)),
    },
  };
}

export default MyOrder;
