const express = require('express')
const router  = express.Router()
const Person = require('./../models/Person')
const {jwtAuthMiddleware,generateToken} = require('./../jwt')
const { json } = require('body-parser')

router.post('/signup',async(req,res)=>{

try {
   const data = req.body //bodyParser stores data on request body
  const newPerson = new Person(data)

  const response = await newPerson.save()

  const payload = {
    id:resonse.id,
    name:response.username
  }
  console.log(JSON.stringify(payload));
  
  const token = generateToken(payload)

  res.status(200).json({response:response,token:token})
} catch (err) {
  res.status(500).json({error:'internal error'})
}
})

//login route
router.post('/login',async(req,res)=>{
  
try {
  const {username,password} = req.body
  const user =await Person.findOne({username:username})

  if(!user || !(await user.comparePassword(password))){
    return res.status(401).json({message:'invalid username or password'})
  }

  //generate token
    const payload = {
      id:user.id,
      username:user.usernam
    }
   const token = generateToken(payload)
    
   //return token as response
   res.json(token)

} catch (error) {
  res.status(500).json({message:"server side error"})
}

})

router.get('/',jwtAuthMiddleware,async (req,res)=>{
  try {
    const data =await Person.find()
    res.status(200).json(data)
  } catch (err) {
    console.log("error");
    res.send(500).json({error:'server side problem'}) 
  }
})

router.get('/profile',jwtAuthMiddleware,async (req,res)=> {
  try {
    const userData = req.user
    console.log("userData: ",userData);
    const userId = userData.id
    const user =await Person.findById(userId)
    res.status(200).json({user})
  } catch (error) {
    res.status(500).json({message:"Internal Server Error"})
  }
})

//parameterized query

router.get('/:workType',async(req,res)=>{
  try{
    const workType = req.params.workType;
   const response =await Person.find({work:workType})
   res.status(200).json(response)
  }
  catch(err)
  {
    res.status(500).json({error:"Internal server error"})
  }
})

router.put('/:id',async(req,res)=>{

try{
  const id = req.params.id;
const data = req.body
const response =await Person.findByIdAndUpdate(id,data,{
  new:true,
  runValidators:true
})


if(!response){
  res.status(404).json({error:"No data found"})
}
console.log("data fetched and updated");

res.status(200).json(response)
} 
catch(err)
{
  res.status(500).json({error:"Internal error"})
}
})

router.delete('/:id',async(req,res)=>{
  try{
    const id = req.params.id;
   const response =await Person.findByIdAndDelete(id)
   res.status(200).json(response)
  }
  catch(err)
  {
    res.status(500).json({error:"Internal server error"})
  }
})

module.exports = router