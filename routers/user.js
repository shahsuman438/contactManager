const express=require('express')
const userModel=require('../models/user')
const router=express.Router()
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const verifytoken=require('../middleware/verifyToken')
const userUpload=require('../middleware/userUpload')
router.post('/register',async(req,res)=>{
    const salt=await bcrypt.genSalt(10)
    const hashPassword=await bcrypt.hash(req.body.password,salt)
    req.body.password=hashPassword
    let user=new userModel(req.body)
    userModel.findOne({"email":req.body.email}).then(
        data=>{
            if(data){
                res.status(401).send({"msg":"Email already exist"})
            }else{
                user.save((error,registerUser)=>{
                    if(error){
                        console.log('Error',error)
                    }else{
                        let payload={subject:registerUser._id}
                        let token=jwt.sign(payload,'sk1443')
                        res.status(200).send({token})
                    }
                })
            }
        }
    )
})



router.get('/user',verifytoken,async(req,res)=>{
    try{
        userModel.findById(req.userId.subject).then(
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

router.delete('/user/:id',verifytoken,async(req,res)=>{
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



router.get('/users',verifytoken,async(req,res)=>{
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



router.put('/user/profile',userUpload.single('photo'),verifytoken,async (req,res)=>{
    try {
        const user=userModel.find({_id:req.userId.subject})
        userModel.updateOne({_id:req.userId.subject},{
            $set:{
                name:req.body.name,
                email:req.body.email,
                phone:req.body.phone,
                address:req.body.address,
                country:req.body.country,
                photo:req.file?req.file.path:user.photo,
            }
        }).then(result=>{
            res.send({"msg":"user updated"})
        })

    } catch (error) {
        console.log("##Error:-",error)
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
                    res.status(200).json({"token":token})
                }else{
                    res.status(401).json({"msg":"invalid password"})

                }
            }
        ).catch(
            error=> res.status(401).json({"msg":"Invalid Email"})
        )
        
    } catch (error) {
        res.status(500).send({"msg":"Somthing went wrong"})
    }
})

module.exports=router

