import jwt from "jsonwebtoken" 

function authMiddleware(req, res, next) {
    try{
  const token = req.cookies?.Token;
   
  if (!token) {
    return res.status(401).json({ message: "Token not found in cookies" });
  }
   
  const decoded = jwt.verify(token,process.env.JWT_SECRET)
   req.user = decoded;
    next(); // pass control to next middleware/route
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
}

export default authMiddleware;
