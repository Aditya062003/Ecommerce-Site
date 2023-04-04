// const https = require("https");
// const PaytmChecksum = require("paytmchecksum");

import connectDb from "../../middleware/mongoose";
import Product from "../../models/Product";
import Order from "../../models/Order";
// export default async function handler(req, res) {
//   if (req.method == "POST") {
//     var paytmParams = {};

//     paytmParams.body = {
//       requestType: "Payment",
//       mid: process.env.NEXT_PUBLIC_PAYTM_MID,
//       websiteName: "YOUR_WEBSITE_NAME",
//       orderId: req.body.oid,
//       callbackUrl: `${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`,
//       txnAmount: {
//         value: req.body.subtotal,
//         currency: "INR",
//       },
//       userInfo: {
//         custId: req.body.email,
//       },
//     };

//     /*
//      * Generate checksum by parameters we have in body
//      * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
//      */
//     const checkSum = await PaytmChecksum.generateSignature(
//       JSON.stringify(paytmParams.body),
//       process.env.PAYTM_KEY
//     )
//       paytmParams.head = {
//         signature: checkSum,
//       };

//       var post_data = JSON.stringify(paytmParams);

//       const requestAsync = () => {
//         return new Promise((resolve,reject)=>{
//           var options = {
//             /* for Staging */
//             // hostname: "securegw-stage.paytm.in",

//             /* for Production */
//             hostname: "securegw.paytm.in",

//             port: 443,
//             path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_PAYTM_MID}&orderId=${req.body.oid}`,
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               "Content-Length": post_data.length,
//             },
//           };

//           var response = "";
//           var post_req = https.request(options, function (post_res) {
//             post_res.on("data", function (chunk) {
//               response += chunk;
//             });

//             post_res.on("end", function () {
//               console.log("Response: ", response);
//               resolve(response)
//             });
//           });
//         })

//       };
//       let myr = await requestAsync()
//       res.status(200).json(myr)

//       post_req.write(post_data);
//       post_req.end();
//     };
//   }
const handler = async (req, res) => {
  if (req.method == "POST") {
    console.log(req.body);
    let product,
      sumtotal = 0;
    let cart = req.body.cart;
    for (let item in cart) {
      console.log(item);
      sumtotal=cart[item].price*cart[item].qty
      product = await Product.findOne({ slug: item });
      if (product.price != cart[item].price) {
        res.status(200).json({success:false, error: "The price of some items in your cart has been changed!Please try again." });
        return
      }else{
        let order = await new Order({
          email: req.body.email,
          orderID: req.body.oid,
          address: req.body.address,
          amount: req.body.subtotal,
          products: req.body.cart,
        });
        await order.save();
        res.status(200).json({ success:true,body: req.body });
        // res.status(200).json({success:true});
        return
      }
    }
    if(sumtotal!==req.body.subtotal){
      res.status(200).json({success:false, error: "The price of some items in your cart has been changed. Please try again." });
      return
    }else{
      let order = await new Order({
        email: req.body.email,
        orderID: req.body.oid,
        address: req.body.address,
        amount: req.body.subtotal,
        products: req.body.cart,
      });
      await order.save();
      res.status(200).json({ success:true,body: req.body });
    }

    
    //   const {name,email}=req.body
    //   let u = await new User({name,email,password:CryptoJS.AES.encrypt(req.body.password,'secret123').toString()})
    //   await u.save()
    //   res.status(200).json({ success: "success" });
    // } else {
    //   res.status(400).json({ error: "This method is not allowed" });
  }
};

export default connectDb(handler);
