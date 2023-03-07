const {WooServices} = require('../services')
const {newOrderProcessing,wooOrders} = WooServices

const processNewOrder = async (req, res) => {

    obj = req.body.meta_data.filter(obj => obj.key === 'referal_code')

    
    if(obj.length > 0 ){
        try{
            const result =  await newOrderProcessing(obj[0].value)
            if (result === true) res.status(200).send({message:'success'})
        }
        catch(err){
            res.status(500).send({message:'error proccessing order...'})
        }

    }else{
        res.status(200).send({message:'There was no referal code in the order.'})
    }

}
const getAllOrdersFromApi = async(req, res)=>{
    try{
        // console.log(await wooOrders())
          res.send( await wooOrders() )
    }catch(err){
        res.json('Could not get all orders from API..')
        console.log(`Error: ${err.message}`)
    }
   
}

module.exports ={
    processNewOrder,
    getAllOrdersFromApi
}