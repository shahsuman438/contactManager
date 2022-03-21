const express =require('express')

const router =express.Router()
const contact=require('../models/contact')


router.get('/',async(req,res)=>{
    try{
        const contacts=await contact.find()
        console.log('[log] ',contacts)
        res.json(contacts)
    }catch(err){
        console.log("somthing went wrong",err)
    }
})


module.exports = router