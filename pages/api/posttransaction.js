
import connectDb from "../../middleware/mongoose";
import Product from "../../models/Product";
import Order from "../../models/Order";
import pincode from "../../pincodes.json";

const handler = async (req, res) => {
  if (req.method == "POST") {
    let product,
      sumtotal = 0;
    let cart = req.body.cart;
    if (req.body.subtotal <= 0) {
      res
        .status(200)
        .json({
          success: false,
          error:
            "Your cart is empty! Please add items to your cart and try again.",clearcart:false
        });
      return;
    }
    if (!Object.keys(pincode).includes(req.body.pincode)) {
      res
        .status(200)
        .json({
          success: false,
          error: "The pincode you have entered is not servicable.",clearcart:false
        });
      return;
    }
    for (let item in cart) {
      sumtotal = cart[item].price * cart[item].qty;
      product = await Product.findOne({ slug: item });
      if (product.availableQty < cart[item].qty) {
        res
          .status(200)
          .json({
            success: false,
            error:
              "Some items in your cart went out of stock. Please try again.",clearcart:false
          });
        return;
      }
      if (product.price != cart[item].price) {
        res
          .status(200)
          .json({
            success: false,
            error:
              "The price of some items in your cart has been changed. Please try again.",clearcart:true
          });
        return;
      }
    }
    if (
      req.body.phone.length !== 10 ||
      !Number.isInteger(Number(req.body.phone))
    ) {
      res
        .status(200)
        .json({
          success: false,
          error: "Please enter your 10 digit phone number.",clearcart:false
        });
      return;
    }
    if (
      req.body.pincode.length !== 6 ||
      !Number.isInteger(Number(req.body.pincode))
    ) {
      res
        .status(200)
        .json({ success: false, error: "Please enter your 6 digit pincode.",clearcart:false });
      return;
    }
    if (sumtotal !== req.body.subtotal) {
      res
        .status(200)
        .json({
          success: false,
          error:
            "The price of some items in your cart has been changed. Please try again.",clearcart:true
        });
      return;
    }
    let order = await new Order({
      email: req.body.email,
      orderID: req.body.oid,
      address: req.body.address,
      name:req.body.name,
      city: req.body.city,
      state: req.body.state,
      phone: req.body.phone,
      amount: req.body.subtotal,
      products: req.body.cart,
    });
    await order.save();
    res.status(200).json({ success: true, body: req.body });

  }
};

export default connectDb(handler);
