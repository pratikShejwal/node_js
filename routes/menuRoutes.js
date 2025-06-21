const express = require('express')
const router = express.Router()
const Menu = require('./../models/Menu')

//For menu card
router.post('/',async(req,res)=>{
try{
 const data = req.body
  const newMenu = new Menu(data)
  const response =await newMenu.save()
  res.status(200).json(response)
}
catch(err)
{
  res.status(500).json({error:'Server side error'})
} 

})
router.get('/',async(req,res)=>{

  try{
 const data =await Menu.find();
  res.status(200).json(data)
  }
  catch(err)
  {
    res.status(500).json({error:'server side error'})
  }
 
})
router.get('/:tasteType',async(req,res)=>{

  try{
const tasteType = req.params.tasteType
const response =await Menu.find({taste:tasteType})
  res.status(200).json(response)
  }
  catch(err)
  {
    res.status(500).json({error:'server side error'})
  }
 
})

module.exports = router