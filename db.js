const mongoose = require('mongoose')

// Define MongoDB URL

const mongoURL = 'mongodb://127.0.0.1:27017/resto'

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