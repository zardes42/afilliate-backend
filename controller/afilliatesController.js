const {Afilliates} = require('../services/index')
const {checkNewCode,getAfilliates,newAfilliate} = Afilliates
const {generateCode} = require('../utilities/index')


const getNewCode =  (req, res) => {
    let code = generateCode();
   while(checkNewCode(code)  === false ){
          code = generateCode();
          console.log('here',code)

   }
   res.send(code)
}

const getAllAfilliates =async (req, res) => {
    
    let result;
    try{

         result =  await getAfilliates()
        
    }
    catch(err){
        console.log(err.message)
    }
    if (result){
        res.status(200).send(result);
    }else{
        res.status(500).send({message: 'Error in getting data from db'})
    }
}

const createNewAfilliate = async (req, res) => {

    let  {first_name,last_name,church,code}=  req.body;
   //  let sales_made = 0 ;
    let result;
    try{
         // sales_made = await checkSalesMade(code)    
          result = await newAfilliate(first_name,last_name,church,code)
    }catch(err){
        console.log(err.message)
    }
   
         if (result){
            res.status(201).send({message: "success"})
         }
         else{
            res.send({message:"error in creating user"})
         }
     
 
 }

module.exports ={
    getNewCode,
    getAllAfilliates,
    createNewAfilliate
}