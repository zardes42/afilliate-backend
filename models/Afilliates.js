const mongoose = require('mongoose')
const {Schema} = mongoose;

const afilliateSchema = new Schema({
    first_name: {type:String,required:true,lowercase:true},
    last_name: {type:String,required:true,lowercase:true},
    church: {type:String,required:true,lowercase:true},
    sales_made: Number, 
    code : {type :String,required:true,uppercase:true,min:6,max:6},
    date_created : {type: Date,immutable :true,default:()=> Date.now()}, 

})


module.exports = mongoose.model('members',afilliateSchema)
