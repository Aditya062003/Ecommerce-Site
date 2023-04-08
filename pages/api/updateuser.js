import User from "../../models/User";
import jsonwebtoken from "jsonwebtoken";
import connectDb from "../../middleware/mongoose";

async function handler(req, res) {
  if (req.method == "POST") {
    let token = req.body.token;
    let user = jsonwebtoken.verify(token, "aditya");
    let dbuser = await User.findOneAndUpdate({ email: user.email },{address:req.body.address,pincode:req.body.pincode,phone:req.body.phone,name:req.body.name});
    // const { name, email, address, pincode } = dbuser;
    res.status(200).json({ success:true });
  } else {
    res.status(400).json({ error: "error" });
  }
}

export default connectDb(handler);
