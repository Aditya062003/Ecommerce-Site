import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Care-Leisure.com-Wear the style</title>
        <meta name="description" content="StylesWear" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <img className="bg-cover bg-center m-auto" src="/home2.gif" alt="" />
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-wrap w-full mb-20 flex-col items-center text-center">
            <h1 class="sm:text-3xl text-2xl font-medium font-serif mb-2 text-indigo-800">
              OUR POPULAR PRODUCTS
            </h1>
          </div>
          <div class="flex flex-wrap -m-4">
            <div class="xl:w-1/3 md:w-1/2 p-4">
              <Link
                href={
                  "https://care-leisure-site.vercel.app/product/Men-Printed-Round-Neck-Dark-Blue-T-Shirt-XL"
                }
              >
                <div class="border border-gray-200 cursor-pointer p-6 rounded-lg">
                  <div class="">
                    <img src="https://rukminim1.flixcart.com/image/832/832/xif0q/t-shirt/u/y/7/xxl-fc4060-1-fastcolors-original-imagk5jqbbthenzq.jpeg?q=70"></img>
                  </div>
                  <h2 class="text-lg text-gray-900 font-medium title-font mt-2 mb-2">
                    Men Printed Round Neck Dark Blue T-Shirt
                  </h2>
                  <p class="leading-relaxed text-base">
                    It features a round neckline and short sleeves, with a
                    printed design on the front or back of the shirt.
                  </p>
                </div>
              </Link>
            </div>
            <div class="xl:w-1/3 md:w-1/2 p-4">
              <Link
                href={
                  "https://care-leisure-site.vercel.app/product/Women-Full-Sleeve-Solid-Hooded-Sweatshirt-Black-L"
                }
              >
                <div class="border border-gray-200 cursor-pointer p-6 rounded-lg">
                  <div class="">
                    <img src="https://rukminim1.flixcart.com/image/832/832/ksgehzk0/sweatshirt/c/m/1/l-ch-plain-black-be-savage-original-imag6ymg5kxyuykd.jpeg?q=70"></img>
                  </div>
                  <h2 class="text-lg text-gray-900 font-medium title-font mt-2 mb-2">
                    Women Full Sleeve Solid Hooded Sweatshirt
                  </h2>
                  <p class="leading-relaxed text-base">
                    The sweatshirt is typically loose-fitting and has a relaxed,
                    casual style that makes it perfect for lounging or running
                    errands.
                  </p>
                </div>
              </Link>
            </div>
            <div class="xl:w-1/3 md:w-1/2 p-4">
              <Link
                href={
                  "https://ecommerce-care-leisure.vercel.app/product/Women-Solid-Round-Neck-Red-T-Shirt-S"
                }
              >
                <div class="border border-gray-200 cursor-pointer p-6 rounded-lg">
                  <div class="">
                    <img src="https://rukminim1.flixcart.com/image/832/832/xif0q/t-shirt/i/a/e/m-wtr-s-hero-piyush-original-imafwyfbmdqgptph-bb.jpeg?q=70"></img>
                  </div>
                  <h2 class="text-lg text-gray-900 font-medium title-font mt-2 mb-2">
                  Women Solid Round Neck Red T-Shirt
                  </h2>
                  <p class="leading-relaxed text-base">
                  The round neckline is a classic style that is popular with many women and is flattering to most face shapes.
                  </p>
                </div>
              </Link>
            </div>
            <div class="xl:w-1/3 md:w-1/2 p-4">
              <Link
                href={
                  "https://care-leisure-site.vercel.app/product/Women-Full-Sleeve-Solid-Hooded-Sweatshirt-Black-L"
                }
              >
                <div class="border border-gray-200 cursor-pointer p-6 rounded-lg">
                  <div class="">
                    <img src="https://rukminim1.flixcart.com/image/416/416/krtjgcw0/mug/w/w/9/chai-bina-chain-kaha-re-1-purezento-original-imag5gxp5jzk56ab.jpeg?q=70"></img>
                  </div>
                  <h2 class="text-lg text-gray-900 font-medium title-font mt-2 mb-2">
                    Chai Bina Chain Kaha Re Ceramic Coffee Mug
                  </h2>
                  <p class="leading-relaxed text-base">
                    It is adorned with a design or text, such as the brand name.
                  </p>
                </div>
              </Link>
            </div>
            <div class="xl:w-1/3 md:w-1/2 p-4">
              <Link
                href={
                  "https://ecommerce-care-leisure.vercel.app/product/Men-&-Women-Full-Sleeve-Printed-Reversible-Hooded-Sweatshirt-DarkBlue-XL"
                }
              >
                <div class="border border-gray-200 cursor-pointer p-6 rounded-lg">
                  <div class="">
                    <img src="https://rukminim1.flixcart.com/image/832/832/xif0q/sweatshirt/e/y/b/m-hoodies-s-big-hub-original-imagjjgzxrgy5dcb.jpeg?q=70"></img>
                  </div>
                  <h2 class="text-lg text-gray-900 font-medium title-font mt-2 mb-2">
                  Men & Women Full Sleeve Printed Reversible Hooded Sweatshirt
                  </h2>
                  <p class="leading-relaxed text-base">
                  This particular sweatshirt is "printed" with designs or patterns on both the inside and outside of the garment, which allows it to be worn inside out or right side in, depending on personal preference.
                  </p>
                </div>
              </Link>
            </div>
            <div class="xl:w-1/3 md:w-1/2 p-4">
              <Link
                href={
                  "https://ecommerce-care-leisure.vercel.app/product/Men-Full-Sleeve-Graphic-Print-Hooded-Sweatshirt-L"
                }
              >
                <div class="border border-gray-200 cursor-pointer p-6 rounded-lg">
                  <div class="">
                    <img src="https://rukminim1.flixcart.com/image/832/832/xif0q/sweatshirt/p/f/f/xxl-beard-yfb-original-imagjkh3mzdcb7zv.jpeg?q=70"></img>
                  </div>
                  <h2 class="text-lg text-gray-900 font-medium title-font mt-2 mb-2">
                  Men Full Sleeve Graphic Print Hooded Sweatshirt
                  </h2>
                  <p class="leading-relaxed text-base">
                  Crafted from soft and comfortable fabric, this sweatshirt features a full sleeve design with a trendy graphic print that will make you stand out from the crowd.
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
