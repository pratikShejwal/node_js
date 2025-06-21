const express = require('express')
const router  = express.Router()
const Person = require('./../models/Person')

router.post('/',async(req,res)=>{

try {
   const data = req.body //bodyParser stores data on request body
  const newPerson = new Person(data)

  const response = await newPerson.save()
  res.status(200).json(response)
} catch (err) {
  res.status(500).json({error:'internal error'})
}
})

router.get('/',async (req,res)=>{

  try {
    const data =await Person.find()
    res.status(200).json(data)
  } catch (err) {
    console.log("error");
    res.send(500).json({error:'server side problem'})
    
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