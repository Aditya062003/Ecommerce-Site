import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import Footer from "@/components/Footer";
import { useState,useEffect } from "react";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  
  const [cart, setcart] = useState({});
  const [subtotal, setsubtotal] = useState(0);
  const router = useRouter()

  useEffect(() => {
    try {
      if(localStorage.getItem('cart')){
        setcart(JSON.parse(localStorage.getItem('cart')))
        saveCart(JSON.parse(localStorage.getItem('cart')))
      }
    } catch (error) {
      console.error(error)
      localStorage.clear()
    }
  }, []);
  
  const saveCart = (mycart)=>{
    localStorage.setItem("cart",JSON.stringify(mycart))
    let subt=0
    let keys=Object.keys(mycart)
    for(let i=0; i<keys.length;i++){
      console.log(keys)
      subt+=mycart[keys[i]].price*mycart[keys[i]].qty
    }
    setsubtotal(subt)
  }
  
  const addToCart = (itemcode,qty,price,name,size,variant)=>{
    let newcart = cart
    if(itemcode in cart){
      newcart[itemcode].qty = cart[itemcode].qty+qty
    }else{
      newcart[itemcode]={qty:1,price,name,size,variant}
    }
    console.log(newcart)
    setcart(newcart)
    saveCart(newcart)
  }

  const clearCart = () =>{
    setcart({})
    saveCart({})
  }

  const removeFromCart = (itemcode,qty,price,name,size,variant)=>{
    let newcart = cart
    if(itemcode in cart){
      newcart[itemcode].qty = cart[itemcode].qty - qty
    }
    if(newcart[itemcode].qty<=0){
      delete newcart[itemcode]
    }
    setcart(newcart)
    saveCart(newcart)
  }

  const buyNow=(itemcode,qty,price,name,size,variant)=>{
    let newcart = {itemcode:{qty:1,price,name,size,variant}}
    setcart(newcart)
    saveCart(newcart)
    console.log(newcart)
    router.push('/checkout')
  }
  return (
    <div>
      <Navbar buyNow={buyNow} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subtotal={subtotal}/>
      <Component buyNow={buyNow} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subtotal={subtotal} {...pageProps} />
      <Footer />
    </div>
  );
}
