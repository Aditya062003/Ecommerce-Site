import connectDb from "../../middleware/mongoose";
import Order from "../../models/Order";
import jsonwebtoken from "jsonwebtoken"

const handler = async (req, res) => {
    const token = req.body.token
    console.log('token',token)
    const data = jsonwebtoken.verify(token,"aditya")
    console.log('data',data)
    let orders = await Order.find({email:data.email,status:'Paid'})
    res.status(200).json({orders})
};

export default connectDb(handler);
