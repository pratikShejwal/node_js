const Person = require('./models/Person')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy 

passport.use(new LocalStrategy(async(USER,pass,done)=>{

  try {
    console.log(`received credentials ${USER} and ${pass}`);
  const user =await Person.findOne({username:USER})
   
  if(!user)
    {
    return done(null,false,{message :"username not found"})
  }

  const isMatchPassword = await user.comparePassword(pass)
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
    return done(error)
  }
}))

module.exports = passport
