const { api } = require("../db/index");
const {mongoDb} = require('../db/index')
const {Member} = require('../models/index')
mongoDb();

const wooOrders = async()=>{
    try{
       return  api.get("orders",{
        per_page: 100, 
      })
        .then((response) => {
          console.log(response.data.length)
          return response.data
        })
        .catch((error) => {
          console.log('error :'+ error.response.data);
        });
    }catch(err){
        console.log(`${err.message}`)
    }
    
}

const checkSalesMade = async(code)=>{
    let orders = await wooOrders()
    let sales_made = 0 ;
    orders.forEach(item => {
        obj = item.meta_data.filter(obj => obj.key === 'referal_code')

        if(obj.length == 1){
            if(code == obj[0].value){
                sales_made += 1;
            }
        }else{
            try {
                throw new Error('referal code obj returned more than one referal_code!!!!!!');
              } catch (e) {
                console.error(`${e.name}: ${e.message}`);
              }
        }
    })
    return sales_made ;
    
}


const newOrderProcessing = async (code)=>{
  const res =   await Member.findOne({code : code})

  console.log('res',res)
  if (res.sales_made) res.sales_made = parseInt(res.sales_made + 1) 
  else res.sales_made = parseInt(1)
  try{
  
    return await res.save().then(()=>{
      return true;
    })
  }catch (e) {
    console.log('error saving..',e.message)
  }



}

module.exports ={
    wooOrders,
    checkSalesMade,
    newOrderProcessing
}

