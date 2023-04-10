import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";
import { Grid } from "@mui/material";
import Order from "../../models/Order";
import AllOrdersTable from "../../src/components/dashboard/AllOrdersTable";
import mongoose from "mongoose";

const AllOrders = ({orders}) => {
  
  return (
    <ThemeProvider theme={theme}>
      <style jsx global>{`
        footer {
          display: none;
        }
      `}</style>
      <FullLayout>
        <Grid item xs={12} lg={12}>
          <AllOrdersTable orders = {orders}/>
        </Grid>
      </FullLayout>
    </ThemeProvider>
  );
};

export default AllOrders;

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(
      "mongodb+srv://aditya:aditya@cluster0.ypoa7js.mongodb.net/ecommerceretryWrites=true&w=majority"
    );
  }
  let orders = await Order.find();
  return { props: { orders: JSON.parse(JSON.stringify(orders)) } };
}