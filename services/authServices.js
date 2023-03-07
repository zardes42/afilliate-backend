const jwt = require('jsonwebtoken')



const generateAccessToken = (user)=>{
   
    return jwt.sign(user,process.env.JWT_ACCESS_SECRET,{expiresIn:"60min"})
}
const generateRefreshToken = (user)=>{
    
    return jwt.sign(user,process.env.JWT_REFRESH_SECRET)
}
const verifyToken =(refreshToken , secret )=>{
    jwt.verify(refreshToken,secret,(err , id)=>{
    err && console.log(err);
    return true
    })
}


module.exports ={
    generateAccessToken,
    generateRefreshToken,
    verifyToken,
}