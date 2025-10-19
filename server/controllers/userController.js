import userModel from "../models/userModel.js";

// export const getUserData =async (req,res)=>{
//     try {
//         // const userId = req.user?.userId;
//         // console.log(userId);
//         const {userId} = req.body;
        
//     if (!userId) {
//       return res.json({ success: false, message: "User ID not found" });
//     }
//         const user = await userModel.findById(userId);
//         if(!user){
//             return res.json({success:false,message:'User not found'});
//         }
       

//         res.json({success:true,
//             userData:{
//                 name:user.name,
//                 isAccountVerified:user.isAccountVerified,
//             }
//         })
//     } catch (error) {
//         res.json({success:false,message:error.message});
        
//     }
// }



export const getUserData = async (req, res) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID not found in token" });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      userData: {
        name: user.name,
        isAccountVerified: user.isAccountVerified,
      },
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
