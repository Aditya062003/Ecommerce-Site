import User from "../../models/User";
import jsonwebtoken from "jsonwebtoken";
import connectDb from "../../middleware/mongoose";
var CryptoJS = require("crypto-js");

async function handler(req, res) {
  if (req.method == "POST") {
    let token = req.body.token;
    let user = jsonwebtoken.verify(token, "aditya");
    let dbuser = await User.findOne({email:user.email})
    var bytes = CryptoJS.AES.decrypt(dbuser.password, "secret123");
    let decryptedPass = bytes.toString(CryptoJS.enc.Utf8);
    if (decryptedPass == req.body.password && req.body.npassword == req.body.cpassword) {
      let dbuser = await User.findOneAndUpdate(
        { email: user.email },
        {
          password: CryptoJS.AES.encrypt(
            req.body.cpassword,
            "secret123"
          ).toString(),
        }
      );
      res.status(200).json({ success: true });
    }else{
        res.status(200).json({ success: false });
    }
   
  } else {
    res.status(400).json({ error: "error" });
  }
}

export default connectDb(handler);
