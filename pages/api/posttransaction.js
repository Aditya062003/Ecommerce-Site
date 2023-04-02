
import connectDb from "../../middleware/mongoose";
import Order from "../../models/Order";

const handler = async (req, res) => {
  let order = await Order.findOneAndUpdate({orderID:req.body.oid},{status:'Paid'})
  // let order = await Order.findOne({orderID:req.body.oid})
  console.log('post oid',req.body.oid)
  // Order.findByIdAndUpdate(order._id,{status : 'Paid'})
  res.status(200).json({body:req.body})
}


export default connectDb(handler)