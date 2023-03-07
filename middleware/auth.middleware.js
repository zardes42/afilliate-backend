const jwt = require('jsonwebtoken')


const authenticate = (req,res,next)=>{
const token = req.headers['x-access-token'] 

if (!token){
    res.status(401).send({
        auth:false,
        message : 'You are not authenticated!'
    })
}
else{
    jwt.verify(token,process.env.JWT_ACCESS_SECRET,(err , user)=>{
        if(err){
            res.status(403).send({auth : false, message :'Token is not valid!'})
        }
        else{
            req.userId = user._id
            next();
        }
    })


}
}
module.exports = authenticate
