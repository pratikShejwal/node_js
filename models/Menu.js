const mongoose = require('mongoose')
const menuSchema = new mongoose.Schema({
    name:{
     type:String,
     unique:true,
    required:true
    },
    price:{
        type:Number,
        required:true
    },
    taste:{
        type:String,
        enum:['sweet','spicy','sour']
    },
    isDrink:{
        type:Boolean,
        default:false
    },
    ingredients:{
        type:[String],
        default:[]
    },
    num_sales:{
        type:Number,
        default:0
    }
})

const Menu = mongoose.model('Menu',menuSchema)

module.exports = Menu