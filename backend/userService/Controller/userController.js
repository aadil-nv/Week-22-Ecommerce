const asyncHandler = require("express-async-handler");
const Users = require("../Models/userModel");
const generateToken = require("../config/genarateToken");
const bcrypt = require("bcryptjs");

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
  const { email, password,token } = req.body;
  if (token) {
    try {
   
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      res.json({ message: "Token is verified", userId: decoded.id });
      return; 
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
      return; 
    }
  }
  const user = await Users.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
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
