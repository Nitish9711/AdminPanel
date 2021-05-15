const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const router = express.Router();


router.post("/createUser", async (req,res,next) => {
  const {  email, password} = req.body;
  
  
   
  try {
      const existingUser = await User.findOne({ email });
      if(existingUser) return res.status(400).json({message: "User already exists"});
      const hashedPassword = await bcrypt.hash(password, 12);
      const result = await User.create({email, password: hashedPassword});
      
      res.status(200).json({result : result, message:"User added successfully"});
  } catch (error) {
      res.status(500).json({ message: 'Something went wrong.'});
  }
})


router.post("/login", (req, res, next) => {
 
  let fetchedUser;

  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Authenticated user not found"
        });
      }
      fetchedUser = user;
     
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
     
      if (!result) {
        return res.status(401).json({
          message: "password match failed"
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        "secret_this_should_be_longer",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Auth failed"
      });
    });
});

module.exports = router;
