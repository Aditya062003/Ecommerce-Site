import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import mongoose from "mongoose";
import Product from "../../models/Product";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Error from "next/error";

const Post = ({ buyNow, addToCart, product, variants, error }) => {
  const router = useRouter();
  const { slug } = router.query;
  const [pin, setpin] = useState();
  const [service, setservice] = useState();
  const checkServicability = async () => {
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
    let pinJson = await pins.json();
    if (Object.keys(pinJson).includes(pin)) {
      setservice(true);
      toast.success("Your Pincode is serviceable!", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      setservice(false);
      toast.error("Sorry, Your Pincode is not serviceable!", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,  
        progress: undefined,
        theme: "light",
      });
    }
  };
  const [color, setcolor] = useState();
  const [size, setsize] = useState();
  useEffect(() => {
    if (!error) {
      setcolor(product.color);
      setsize(product.size);
    }
  }, [router.query]);

  const onChangePin = (e) => {
    setpin(e.target.value);
  };

  const refreshVariants = (newsize, newcolor) => {
    let url = `${process.env.NEXT_PUBLIC_HOST}/product/${variants[newcolor][newsize]["slug"]}`;
    router.push(url);
  };
  if (error == 404) {
    return <Error statusCode={404} />;
  }

  return (
    <>
      <section class="text-gray-600 body-font min-h-screen overflow-hidden">
        <ToastContainer />
        <div class="container px-5 py-12 mx-auto">
          <div class="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              class="lg:w-1/2 w-full lg:h-auto px-6 object-cover object-top rounded"
              src={product.img}
            />
            <div class="lg:w-1/2  w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 class="text-sm title-font text-gray-500 tracking-widest">
                Care-Leisure
              </h2>
              <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">
                {product.title}({product.size}/{product.color})
              </h1>
             
              <p class="leading-relaxed">{product.desc}</p>
              <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div class="flex">
                  <span class="mr-3">Color</span>
                  {Object.keys(variants).includes("White") &&
                    Object.keys(variants["White"]).includes(size) && (
                      <button
                        onClick={() => {
                          refreshVariants(size, "White");
                        }}
                        class={`border-2 ${
                          color == "White" ? "border-black" : "border-gray-500"
                        } mx-1 rounded-full w-6 h-6 focus:outline-none`}
                      ></button>
                    )}
                  {Object.keys(variants).includes("Black") &&
                    Object.keys(variants["Black"]).includes(size) && (
                      <button
                        onClick={() => {
                          refreshVariants(size, "Black");
                        }}
                        class={`border-2 ${
                          color == "Black" ? "border-black" : "border-gray-500"
                        } mx-1 bg-black rounded-full w-6 h-6 focus:outline-none`}
                      ></button>
                    )}
                  {Object.keys(variants).includes("Red") &&
                    Object.keys(variants["Red"]).includes(size) && (
                      <button
                        onClick={() => {
                          refreshVariants(size, "Red");
                        }}
                        class={`border-2 bg-red-600 mx-1 ${
                          color == "Red" ? "border-black" : "border-gray-500"
                        } rounded-full w-6 h-6 focus:outline-none`}
                      ></button>
                    )}
                  {Object.keys(variants).includes("Blue") &&
                    Object.keys(variants["Blue"]).includes(size) && (
                      <button
                        onClick={() => {
                          refreshVariants(size, "Blue");
                        }}
                        class={`border-2 mx-1 bg-indigo-700 ${
                          color == "Blue" ? "border-black" : "border-gray-500"
                        } rounded-full w-6 h-6 focus:outline-none`}
                      ></button>
                    )}
                </div>
                <div class="flex ml-6 items-center">
                  <span class="mr-3">Size</span>
                  <div class="relative">
                    <select
                      value={size}
                      onChange={(e) => {
                        refreshVariants(e.target.value, color);
                      }}
                      class="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                    >
                      {color && Object.keys(variants[color]).includes("S") && (
                        <option>S</option>
                      )}
                      {color && Object.keys(variants[color]).includes("M") && (
                        <option>M</option>
                      )}
                      {color && Object.keys(variants[color]).includes("L") && (
                        <option>L</option>
                      )}
                      {color && Object.keys(variants[color]).includes("XL") && (
                        <option>XL</option>
                      )}
                      {color && Object.keys(variants[color]).includes("XXL") && (
                        <option>XXL</option>
                      )}
                      {color && Object.keys(variants[color]).includes("400ml") && (
                        <option>400ml</option>
                      )}
                      {color && Object.keys(variants[color]).includes("500ml") && (
                        <option>500ml</option>
                      )}
                      {color && Object.keys(variants[color]).includes("600ml") && (
                        <option>600ml</option>
                      )}
                      {color && Object.keys(variants[color]).includes("800ml") && (
                        <option>800ml</option>
                      )}
                      {color && Object.keys(variants[color]).includes("1L") && (
                        <option>1L</option>
                      )}
                    </select>
                    <span class="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        class="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div class="flex">
                {product.availableQty > 0 && (
                  <span class="title-font font-medium text-2xl ml-2 text-gray-900">
                    {" "}
                    ₹{product.price}{" "}
                  </span>
                )}
                {product.availableQty <= 0 && (
                  <span class="title-font font-medium text-2xl ml-2 text-gray-900">
                    {" "}
                    Out of Stock!{" "}
                  </span>
                )}
                <button
                  disabled={product.availableQty <= 0}
                  onClick={() => {
                    buyNow(
                      slug,
                      1,
                      product.price,
                      product.title,
                      product.size,
                      product.color
                    );
                  }}
                  class="disabled:bg-indigo-300 flex ml-14 text-white bg-indigo-500 border-0 text-sm py-2 px-2 md:px-6 focus:outline-none hover:bg-indigo-600 rounded"
                >
                  Buy Now
                </button>
                <button
                  disabled={product.availableQty <= 0}
                  onClick={() => {
                    addToCart(
                      slug,
                      1,
                      product.price,
                      product.title,
                      product.size,
                      product.color
                    );
                  }}
                  class=" disabled:bg-indigo-300 flex ml-6 text-white bg-indigo-500 border-0 text-sm py-2 px-2 md:px-6 focus:outline-none hover:bg-indigo-600 rounded"
                >
                  Add to Cart
                </button>
              </div>
              <div className="flex mt-6 pin">
                <div class="relative">
                  <input
                    type="email"
                    placeholder="Enter Your Pincode"
                    onChange={onChangePin}
                    id="email"
                    name="email"
                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none px-4 text-gray-700 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <button
                  onClick={checkServicability}
                  class="text-white bg-indigo-500 border-0 mx-10 px-4 focus:outline-none hover:bg-indigo-600 rounded text-sm"
                >
                  Check
                </button>
              </div>
              {service && service != null && (
                <div className="mt-3 text-sm text-green-700">
                  Yay ! This pincode is servicable.
                </div>
              )}
              {!service && service != null && (
                <div className="mt-3 text-sm text-red-700">
                  Sorry ! We do not deliver to this pin yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(
      "mongodb+srv://aditya:aditya@cluster0.ypoa7js.mongodb.net/ecommerceretryWrites=true&w=majority"
    );
  }
  let error=null;
  let product = await Product.findOne({ slug: context.query.slug });
  if (product == null) {
    return {
      props: { error: 404 },
    };
  }
  let variants = await Product.find({ title: product.title });
  let colorSizeSlug = {};
  for (let item of variants) {
    if (Object.keys(colorSizeSlug).includes(item.color)) {
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    } else {
      colorSizeSlug[item.color] = {};
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    }
  }

  return {
    props: {
      error: error,
      product: JSON.parse(JSON.stringify(product)),
      variants: JSON.parse(JSON.stringify(colorSizeSlug)),
    },
  };
}

export default Post;
