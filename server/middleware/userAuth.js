// import jwt from "jsonwebtoken";

// const userAuth = async(req,res,next)=>{
//     const {token} = req.cookies;

//     if(!token){
//         return res.json({success:false,message:"Not Authorized. Login Again"})
//     }

//     try {
//        const tokenDecode = jwt.verify(token,process.env.JWT_SECRET)
        
//        if(tokenDecode.id){
//         req.body.userId = tokenDecode.id;
//        }
//        else{
//         return res.json({success:false,message:"Not Authorized. Login Again"})
//        }

//        next();

//     } catch (error) {
//         return res.json({success:false,message:error.message})
//     }
// }

// export default userAuth;

import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ success: false, message: "Not Authorized. Please log in." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.id) {
      return res.status(401).json({ success: false, message: "Invalid token. Please log in again." });
    }

    req.user = { userId: decoded.id }; // Attach decoded ID to req.user

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired token." });
  }
};

export default userAuth;
