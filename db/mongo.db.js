const mongoose = require('mongoose')


// const uri = 'mongodb+srv://iyin_admin:DKaudn2MRfervLYe@cluster0.ohnehxo.mongodb.net/?retryWrites=true&w=majority'

const db = async() =>{

    try{
        mongoose.connect(process.env.URI)
        console.log('Connected to MongoDB successfully....')

    }catch(e){
        console.log(e.message)
    }
}

module.exports = db