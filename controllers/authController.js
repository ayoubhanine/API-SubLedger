import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req,res) => {

  try {

    const {name,email,password,role} = req.body;

    const userExists = await User.findOne({email});

    if(userExists){
      return res.status(400).json({message:"Email déjà utilisé"});
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role

    });

    await user.save();

    res.status(201).json({message:"Utilisateur créé"});

  } catch(error){
    res.status(500).json({error:"Erreur serveur"});
  }

};
export const login = async (req,res)=>{

  try{

    const {email,password} = req.body;

    const user = await User.findOne({email});

    if(!user){
      return res.status(400).json({message:"Email invalide"});
    }

    const match = await bcrypt.compare(password,user.password);

    if(!match){
      return res.status(400).json({message:"Mot de passe incorrect"});
    }

    const token = jwt.sign(  //est une fonction de la bibliothèque jsonwebtoken,Elle sert à générer un token JWT
      {id:user._id, role:user.role},
      process.env.JWT_SECRET,
      {expiresIn:"1d"}
    );

    res.json({token});

  }catch(error){
    res.status(500).json({error:"Erreur serveur"});
  }

};