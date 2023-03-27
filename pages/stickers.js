import Link from "next/link";
import React from "react";
import Product from "../models/Product";
import connectDb from "../middleware/mongoose";
import mongoose from "mongoose";

const stickers = ({ products }) => {
  console.log(products);
  return (
    <section class="text-gray-600  body-font">
      <div class="container py-12 m-auto ">
        <div class="flex flex-wrap justify-center">
        {Object.keys(products).length===0 && <p>Sorry, all stickers are out of stock. New stock coming soon...Stay Tuned!</p>}
          {Object.keys(products).map((item) => {
            return (
              <Link key={item} legacyBehavior href={`/product/${products[item].slug}`}>
                <div class="lg:w-1/5 cursor-pointer m-4 shadow-md hover:shadow-xl md:w-1/2 p-4 w-full">
                  <a class="block relative rounded overflow-hidden">
                    <img
                      alt="ecommerce"
                      class="h-[36vh] m-auto"
                      src={products[item].img}
                    />
                  </a>
                  <div class="mt-4 text-center">
                    <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">
                      {products[item].category}
                    </h3>
                    <h2 class="text-gray-900 title-font text-lg font-medium">
                      {products[item].title}
                    </h2>
                    <p class="mt-1">₹{products[item].price}</p>
                    <div class="mt-1">
                      {products[item].size.includes('S') && <span className='mx-1 py-2 hover:text-white hover:bg-gray-700 px-1 border border-gray-300'>S</span>}
                      {products[item].size.includes('M') && <span className='mx-1 px-2 py-1 hover:text-white hover:bg-gray-700 border border-gray-300'>M</span>}
                      {products[item].size.includes('L') && <span className='mx-1 px-2 border py-1 hover:text-white hover:bg-gray-700 border-gray-300'>L</span>}
                      {products[item].size.includes('XL') && <span className='mx-1 px-2 border py-1 hover:text-white hover:bg-gray-700 border-gray-300'>XL</span>}
                      {products[item].size.includes('XXL') && <span className='mx-1 px-2 border py-1 hover:text-white hover:bg-gray-700 border-gray-300'>XXL</span>}
                    </div>
                    <div className="mt-1">
                    {products[item].color.includes('Black') && <button class="border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes('Blue') && <button class="border-2 border-gray-300 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes('Red') && <button class="border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes('Green') && <button class="border-2 border-gray-300 ml-1 bg-green-600 rounded-full w-6 h-6 focus:outline-none"></button>}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
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
  let products = await Product.find({ category: "stickers" });
  let stickers = {};
  for (let item of products) {
    if (item.title in stickers) {
      if (
        !stickers[item.title].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        stickers[item.title].color.push(item.color);
      }
      if (
        !stickers[item.title].size.includes(item.size) &&
        item.availableQty > 0
      ) {
        stickers[item.title].size.push(item.size);
      }
    } else {
      stickers[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        stickers[item.title].color = [item.color];
        stickers[item.title].size = [item.size];
      }
    }
  }
  return {
    props: { products: JSON.parse(JSON.stringify(stickers)) },
  };
}

export default stickers;

      //   <Link legacyBehavior href={'/'}>
        
      //   <div class="lg:w-1/5 cursor-pointer m-4 shadow-md hover:shadow-xl md:w-1/2 p-4 w-full">
      //     <a class="block relative rounded overflow-hidden">
      //       <img alt="ecommerce" class=" h-[36vh] m-auto" src="https://m.media-amazon.com/images/I/51yrBJHE+WL._AC_UL480_FMwebp_QL65_.jpg"/>
      //     </a>
      //     <div class=" text-center mt-4">
      //       <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">T-Shirts</h3>
      //       <h2 class="text-gray-900 title-font text-lg font-medium">The Catalyzer</h2>
      //       <p class="mt-1">₹499</p>
      //       <p class="mt-1"> S M L XL XXL</p>
      //     </div>
      //   </div>
      // </Link>
