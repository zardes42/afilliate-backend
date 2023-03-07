const {mongoDb} = require('../db/index')
const {Member} = require('../models/index')
mongoDb();






// INSERT INTO MEMBERS TABLE

const newAfilliate = async (first_name,last_name,church,code)=>{

    try{             
      const member = new  Member({
        first_name,last_name,church,code
      })
     await member.save()
      return true
    }catch(err){
        console.log(err.message)
        return false
    }
}
// GET ALL AFILLIATES FROM DB
const getAfilliates = async()=>{
    try{
    return await Member.find().then(response => {
            // console.log(response[0)
            return response
            
        })
    }catch(err){
        console.log(err.message)
        return false
    }

}
// CHECK DATABASE IF CODE ALREADY EXISTS
const checkNewCode = async(code) =>{
    
    try{
    return await Member.where('code').equals(code).then(response =>{
        if(response.length === 0){
           return true;

        }
        else{
            return false;
        }

    })
    }catch(e){
        console.log(e.message)
    }

}




module.exports = {
    newAfilliate,
    getAfilliates,
    checkNewCode,
}