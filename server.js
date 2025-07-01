// const { log } = require('console')
// let fs = require('fs')
// let os = require('os')

// let demo = os.userInfo()
// console.log(demo);

// console.log(os.version());

// fs.appendFile("hello.txt",`Hii ${demo.username} \n`,()=>console.log("File Created"))
// var _ = require('lodash');
// let arr = ["pratik",1,1,2,2,'pratik']
// let uniqueVal = _.uniq(arr)

// console.log(uniqueVal);
// const sample = require('./sample.js')
// let username = sample.name
// console.log(username);


//create a server in express

const express = require('express')
const db = require('./db')
require('dotenv').config()
const PORT = process.env.PORT || 3000
const app = express()
const bodyParser = require('body-parser')
const passport = require('./auth')



app.use(bodyParser.json())

//initialize passport js
app.use(passport.initialize())

//create middleware that authenticate requests
const localAuthMiddleWare = passport.authenticate('local',{session:false})

//middleware function
const logRequest = (req,res,next)=>{
  console.log(`${new Date().toLocaleString()} request made to: ${req.originalUrl}` );
  next()
}
app.use(logRequest)

//adding authentication middleware
app.get('/',(req, res) => {
  res.send('Hello World')
})

const personRoutes = require('./routes/personRoutes')
app.use('/person',personRoutes)

const menuRoutes = require('./routes/menuRoutes')
app.use('/menu',menuRoutes)

app.listen(PORT)