import { Grid } from "@mui/material";

import SalesOverview from "../../src/components/dashboard/SalesOverview";
import DailyActivity from "../../src/components/dashboard/DailyActivity";
import { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

export default function Index() {
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
        <Grid container spacing={0}>
          <Grid item xs={12} lg={12}>
            <SalesOverview />
          </Grid>

          <Grid item xs={12} lg={4}>
            <DailyActivity />
          </Grid>
          <Grid item xs={12} lg={8}></Grid>
          <Grid item xs={12} lg={12}></Grid>
        </Grid>
      </FullLayout>
    </ThemeProvider>
  );
}
