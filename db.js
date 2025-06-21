const mongoose = require('mongoose')
require('dotenv').config()
// Define MongoDB URL

// const mongoURL = process.env.MONGODB_URL_LOCAL
const mongoURL = process.env.MONGODB_URL

//set up db connection
mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection // maintains default connection object

// Define Event Listener
db.on('connected',()=>{
    console.log("Database connected");
    
})
db.on('disconnected',()=>{
    console.log("Database disconnected");
    
})
db.on('error',(err)=>{
    console.error("error occured",err);
    
})
module.exports = db;