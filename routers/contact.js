const express =require('express')


const router =express.Router()
const Contact=require('../models/contact')

const upload =require('../middleware/upload')

router.get('/',async(req,res)=>{
    try{
        const contacts=await Contact.find()
        res.json(contacts)
    }catch(err){
        res.json(err)
    }
})

router.post('/',upload.single('photo'),async(req,res)=>{
    const contact=new Contact({
        name:req.body.name,
        number:req.body.number,
        email:req.body.email,
        address:req.body.address,
        photo:req.file?req.file.path:null
    })
    try{
        const c1=await contact.save()
        res.json(c1)
        
    }catch(err){
        res.json(err)
    }
})

router.get('/:id',async(req,res)=>{
    try{
        const contact=await Contact.findById(req.params.id)
        res.json(contact)
    }catch(err){
        console.log(err)
    }
})

router.put('/:id',upload.single('photo'),async (req,res)=>{
    try{
        Contact.updateOne({_id:req.params.id},{
            $set:{
                fav:req.body.fav,
                name:req.body.name,
                number:req.body.number,
                email:req.body.email,
                address:req.body.address,
                photo:req.file?req.file.path:null
            }
        }).then((result)=>{
            res.json({"msg":"Contact Updated"})
        }).catch(err=>{
            console.log("error##",err)
        })
    }catch(err){
        res.send("somthing went wrong",err)
    }
})

router.delete('/:id',async(req,res)=>{
    try{
        Contact.deleteOne({_id:req.params.id}).then(
            (result)=>{
                res.json(result)
            }
        )
    }catch(err){
        res.send(err)
    }
})


module.exports = router