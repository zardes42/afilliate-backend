const { User } = require("../models/index");
const { hashPassword } = require("../utilities");
const { authServices } = require("../services");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

const { generateAccessToken, generateRefreshToken } = authServices;

let refreshTokens = [];

const registerUser = async (req, res) => {
  try {
    const hashedPassword = await hashPassword(req.body.password);
    const user = new User({
      user_name: req.body.username.toLowerCase(),
      email: req.body.email.toLowerCase(),
      password: hashedPassword,
    });

    await user.save();
    const refreshToken = generateRefreshToken(user.toJSON());
    const accessToken = generateAccessToken(user.toJSON());
    refreshTokens.push(refreshToken);


    res.status(201).send({
      message: "User created successfully.",
      auth: true,
      accessToken,
      refreshToken,
    });
  } catch (e) {
    console.log(e.message);
    res.send({ message: "Error registering user." });
  }
};
const loginUser = async (req, res) => {


  User.findOne({ email: req.body.email }).then(async (result) => {
    if(result){
    const user = result;
    console.log(user);
    bcrypt.compare(req.body.password, user.password, (err, response) => {
      err && console.log("bcrypt", err.message);
      if (response) {
        const refreshToken = generateRefreshToken(user.toJSON());
        refreshTokens.push(refreshToken);
        const accessToken = generateAccessToken(user.toJSON());

        res.status(201).send({
          message: "User logged in  successfully.",
          auth: true,
          accessToken,
          refreshToken,
        });
      }
      else{
        res.send({message: "Incorrect password."})
      }
    });
  }
  else{
    res.send({message : 'No User with provided email.'})
  }
  });
};

const logoutUser = (req, res) => {
  const refreshToken = req.body.token
  refreshTokens =refreshTokens.filter(token => token !== refreshToken)
  res.status(200).send({status :true,message: "User logged out successfully."})
}
const refreshUserToken  = (req, res) => {
  const refreshToken = req.body.token
  if (!refreshToken) res.status(401).json('You are not authenticated ...')
  if(!refreshTokens.includes(refreshToken)) res.status(403).json("Refresh Token is invalid ...")

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
    err && console.log(err);
    console.log('user',user)
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    refreshTokens.push(newRefreshToken);
    res.status(200).json({ 
      message:"Your refresh token has been refreshed",
        user,
        accessToken :newAccessToken,
        refreshToken :newRefreshToken
    });
  });
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,refreshUserToken
};
