const asyncHandler = require("express-async-handler");
const Users = require("../Models/userModel");
const generateToken = require("../config/genarateToken");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')

//todo-----------------------------------------------------------------------------

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const userExist = await Users.findOne({ email });

  if (userExist) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await Users.create({ username, email, password });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "User not created" });
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (token) {
    try {
   
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded is ====",decoded);
        
       
        const findUser = await Users.findById(decoded.id);
        if(!findUser){
          return res.status(404).json({ message: "User not found" });
        } 
        const user = await Users.findOne({email:email });
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
  
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(401).json({ message: "Invalid password" });
        }
  
        return res.status(200).json({
          message: "Successfully logged",
          userDetails: {
            userId: user._id,
            name: user.name,
            email: user.email,
          },
        });
    } catch (error) {
      console.log("Invalid Token:", error.message);
        return res.status(401).json({ message: "Invalid Token" }); 
    }
  }
 
});

const allUserData = asyncHandler(async (req,res)=>{
    const userData = await Users.find()
    if(userData){
        res.json({
            userData
        })
    }else{
        res.status(401).json({ message: "User Data is not found" });
    }
})


//todo-----------------------------------------------------------------------------

module.exports = {
  registerUser,
  authUser,
  allUserData
};
