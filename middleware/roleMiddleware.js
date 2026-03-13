import User from "../models/User.js";

export const isAdmin = (req,res,next)=>{

  if(req.user.role !== "admin"){
    return res.status(403).json({message:"Accès refusé"});
  }

  next();

};
export const ValidateRole=async(req,res,next)=>{
  try{
    const {role}=req.body;
    if(role==="admin"){
        const existingAdmin= await User.findOne({role:"admin"});
        if(existingAdmin){
          return res.status(403).json({message:"admin already exists,we can accept one"})
        }
    }
    next()
  }
  catch(err){
console.log("Error on validating role.", error);
    res.status(500).json({ message: "Internal server error" });
  }
}