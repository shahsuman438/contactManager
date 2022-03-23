const express=require('express')
const userModel=require('../models/user')
const router=express.Router()
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const verifytoken=require('../middleware/verifyToken')



router.post('/register',async(req,res)=>{
    let userdata=req.body
    let user=new userModel(userdata)
    user.save((error,registerUser)=>{
        if(error){
            console.log('Error',error)
        }else{
            let payload={subject:registerUser._id}
            let token=jwt.sign(payload,'sk1443')
            res.status(200).send({token})
        }
    })
})

router.get('/user/:id',verifytoken,async(req,res)=>{
    try{
        userModel.findById(req.params.id).then(
            (data)=>{
                res.status(200).send(data)
            }
        )
    }catch(error){
        res.status(404).send({
            "msg":"user not found"
        })
    }
})

router.delete('/user/:id',async(req,res)=>{
    try{
        userModel.deleteOne({_id:req.params.id}).then(
            (result)=>{
                res.status(200).send({"msg":"Deleted Success"})
            }
        )
    }catch(error){
        res.status(404).send({
            "msg":"user not found"
        })
    }
})


router.get('/user',async(req,res)=>{
    try{
        userModel.find().then(data=>{
            res.status(200).send(data)
        }).catch(err=>{res.status(404).send({"msg":"user not found"})})
    }catch(error){
        res.status(500).send({
            "msg":"somthing went wrong"
        })
    }
})

router.post('/login',async (req,res)=>{
   
    try {
        userModel.findOne({email:req.body.email}).then(
            async(user)=>{
                const isMatched= await bcrypt.compare(req.body.password,user.password)
                if(isMatched){
                    let payload={subject:user._id}
                    let token=jwt.sign(payload,'sk1443')
                    res.status(200).send(token)
                }else{
                    res.status(400).send({"msg":"invalid password"})

                }
            }
        ).catch(
            error=> res.status(400).send({"msg":"Invalid Email"})
        )
        
    } catch (error) {
        res.status(400).send({"msg":"Somthing went wrong"})
    }
})

module.exports=router

