const mongoose = require('mongoose')

// Define MongoDB URL

// const mongoURL = 'mongodb://127.0.0.1:27017/resto'
const mongoURL = 'mongodb+srv://pkshejwal009:NaVf7iZFDobxjS2t@cluster0.csm9jhl.mongodb.net/'

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