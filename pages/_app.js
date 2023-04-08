import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LoadingBar from "react-top-loading-bar";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  const [cart, setcart] = useState({});
  const [subtotal, setsubtotal] = useState(0);
  const [user, setuser] = useState({ value: null });
  const [key, setkey] = useState(0);
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setProgress(20);
    });
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });
    try {
      if (localStorage.getItem("cart")) {
        setcart(JSON.parse(localStorage.getItem("cart")));
        saveCart(JSON.parse(localStorage.getItem("cart")));
      }
    } catch (error) {
      localStorage.clear();
    }
    const myuser = JSON.parse(localStorage.getItem("myuser"));
    if (myuser) {
      setuser({ value: myuser, email: myuser.email });
      setkey(Math.random());
    }
  }, [router.query]);

  const saveCart = (mycart) => {
    localStorage.setItem("cart", JSON.stringify(mycart));
    let subt = 0;
    let keys = Object.keys(mycart);
    for (let i = 0; i < keys.length; i++) {
      subt += mycart[keys[i]].price * mycart[keys[i]].qty;
    }
    setsubtotal(subt);
  };

  const addToCart = (itemcode, qty, price, name, size, variant) => {
    let newcart = cart;
    if (Object.keys(cart).length == 0) {
      setkey(Math.random());
    }
    if (itemcode in cart) {
      newcart[itemcode].qty = cart[itemcode].qty + qty;
    } else {
      newcart[itemcode] = { qty: 1, price, name, size, variant };
    }

    setcart(newcart);
    saveCart(newcart);
  };

  const clearCart = () => {
    setcart({});
    saveCart({});
  };

  const removeFromCart = (itemcode, qty, price, name, size, variant) => {
    let newcart = cart;
    if (itemcode in cart) {
      newcart[itemcode].qty = cart[itemcode].qty - qty;
    }
    if (newcart[itemcode].qty <= 0) {
      delete newcart[itemcode];
    }
    setcart(newcart);
    saveCart(newcart);
  };

  const buyNow = (itemcode, qty, price, name, size, variant) => {
    let newcart = {};
    newcart[itemcode] = { qty: 1, price, name, size, variant };
    setcart(newcart);
    saveCart(newcart);

    router.push("/checkout");
  };
  const logout = () => {
    localStorage.removeItem("myuser");
    setuser({ value: null });
    setcart({});
    saveCart({});
    setkey(Math.random());
    router.push("/");
  };
  return (
    <div>
      <Head>
        <title>Care Leisure</title>
      </Head>
      <LoadingBar
        color="#2764f2"
        height={3}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Navbar
        logout={logout}
        key={key}
        user={user}
        buyNow={buyNow}
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        subtotal={subtotal}
      />
      <Component
        user={user}
        buyNow={buyNow}
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        subtotal={subtotal}
        {...pageProps}
      />
      <Footer />
    </div>
  );
}
