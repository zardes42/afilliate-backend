const {Afilliates,WooServices} = require('../services/index')



const {getAfilliates} = Afilliates;
const {wooOrders} = WooServices;

const getDashboard = async (req, res) => {
    let afilliates =[],orders=[],processing_orders=0 ,completed_orders=0;
    try{ 
        afilliates = await getAfilliates()
        orders =  await wooOrders()
        orders.forEach(order => {

        if(order.status === 'processing') {
                processing_orders += 1;
        }else if(order.status === 'completed'){
                completed_orders += 1;
            
        }

        })
    }catch(err){console.log(err.message)}
    
    res.status(200).send({
        afilliates: afilliates.length,
        total_orders:orders.length,
        completed_orders,
        processing_orders
    })
    
        
        

}
module.exports = getDashboard