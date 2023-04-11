import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";
import { Grid } from "@mui/material";
import AllProducts from "../../src/components/dashboard/AllProducts";
import Product from "../../models/Product";
import mongoose from "mongoose";
import { useState,useEffect } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Allproducts = ({products}) => {
  const Router = useRouter()
  useEffect(() => {
    const adminuser = JSON.parse(localStorage.getItem("adminuser"));
    if(!adminuser){
      toast.error("Only admins are authorized to view this page!", {
        toastId: "error",
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        Router.push(`${process.env.NEXT_PUBLIC_HOST}/admin/login`);
      }, 1000);
    }
  },[])
    
  return (
    <ThemeProvider theme={theme}>
    <ToastContainer/>
      <style jsx global>{`
        footer {
          display: none;
        }
      `}</style>
      <FullLayout>
        <Grid item xs={12} lg={12}>
          <AllProducts products={products} />
        </Grid>
      </FullLayout>
    </ThemeProvider>
  );
};

export default Allproducts;
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(
      "mongodb+srv://aditya:aditya@cluster0.ypoa7js.mongodb.net/ecommerceretryWrites=true&w=majority"
    );
  }
  let products = await Product.find();
  return { props: { products: JSON.parse(JSON.stringify(products)) } };
}
