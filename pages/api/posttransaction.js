import connectDb from "../../middleware/mongoose";
import Order from "../../models/Order";

const handler = async (req, res) => {
  let order = await Order.findOneAndUpdate(
    { orderID: req.body.oid },
    { status: "Paid", paymentinfo: JSON.stringify(req.body) }
  );
  // let order = await Order.findOne({orderID:req.body.oid})
  console.log("post oid", req.body.oid);

  // Order.findByIdAndUpdate(order._id,{status : 'Paid'})
  // res.status(200).json({body:req.body})
  res.redirect("/order?id="+order._id, 200);
};

export default connectDb(handler);
