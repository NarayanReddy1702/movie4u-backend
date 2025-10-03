import jwt from "jsonwebtoken" 
import User from "../model/auth.model.js";

async function authMiddleware(req, res, next) {
    try{
  const token = req.cookies?.token;
   console.log(token);
   
  if (!token) {
    return res.status(401).json({ message: "Token not found in cookies" });
  }
   
  const decoded = jwt.verify(token,process.env.JWT_SECRET)
  const user = await User.findOne({email:decoded.email})
   req.user = user;
  next(); // pass control to next middleware/route
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
}

export default authMiddleware;
