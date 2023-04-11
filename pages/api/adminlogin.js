import User from "../../models/User";
import connectDb from "../../middleware/mongoose";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  if (req.method == "POST") {
    let user = await User.findOne({ email: req.body.email });
    var bytes = CryptoJS.AES.decrypt(user.password, "secret123");
    let decryptedPass = bytes.toString(CryptoJS.enc.Utf8);
    if (user) {
      if (req.body.email == user.email && req.body.password == decryptedPass) {
        var admintoken = jwt.sign(
          { email: user.email, name: user.name },
          "aditya",
          {
            expiresIn: "1d",
          }
        );
        if (user.admin=="true") {
          res
            .status(200)
            .json({ success: true, admintoken, email: user.email });
        } else {
          res
            .status(400)
            .json({
              success: false,
              error: "This email address is not authorized to view Admin page.",
            });
        }
      } else {
        res.status(400).json({ success: false, error: "Invalid Credentials" });
      }
    } else {
      res.status(400).json({ success: false, error: "User not found!" });
    }
  }
};

export default connectDb(handler);
