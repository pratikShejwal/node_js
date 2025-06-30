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
const Person = require('./models/Person')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy 



app.use(bodyParser.json())

//Authentication logic here

passport.use(new LocalStrategy(async(USER,PASS,done)=>{

  try {
    console.log(`received credentials ${USER} and ${PASS}`);
  const user =await Person.findOne({username:USER})

  if(!user)
    {
    return done(null,false,{message :"username not found"})
  }

  const isMatchPassword = user.password === password ? true : false
  if(isMatchPassword)
  {
    return done(null,user)
  }
  else
  {
     return done(null,false,{message :"Wrong Password"})
  }

  }
   catch (error) 
   {
    return done(err)
  }
  
  

  
}))
app.use(passport.initialize())
//middleware function
const logRequest = (req,res,next)=>{
  console.log(`${new Date().toLocaleString()} request made to: ${req.originalUrl}` );
  next()
}
app.use(logRequest)

app.get('/',passport.authenticate('local',{session:false}),(req, res) => {
  res.send('Hello World')
})

const personRoutes = require('./routes/personRoutes')
app.use('/person',personRoutes)

const menuRoutes = require('./routes/menuRoutes')
app.use('/menu',menuRoutes)

app.listen(PORT)