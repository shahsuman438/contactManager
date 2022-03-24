const express =require('express')


const router =express.Router()
const Contact=require('../models/contact')

const upload =require('../middleware/upload')
const verifyToken=require('../middleware/verifyToken')

const userModel=require('../models/user')




router.get('/',async(req,res)=>{
    try{
        const contacts=await Contact.find()
        res.json(contacts)
    }catch(err){
        res.json(err)
    }
})

// router.post('/',upload.single('photo'),async(req,res)=>{
//     const contact=new Contact({
//         name:req.body.name,
//         number:req.body.number,
//         email:req.body.email,
//         address:req.body.address,
//         photo:req.file?req.file.path:null
//     })
//     try{
//         const c1=await contact.save()
//         res.json(c1)
        
//     }catch(err){
//         res.json(err)
//     }
// })

// router.get('/:id',async(req,res)=>{
//     try{
//         const contact=await Contact.findById(req.params.id)
//         res.json(contact)
//     }catch(err){
//         console.log(err)
//     }
// })


// nested block post
router.post('/',verifyToken,upload.single('photo'),async(req,res)=>{
    try {
        userModel.findById(req.userId.subject).then(
            user=>{
                const contact=new Contact({
                    fav:req.body.fav,
                    name:req.body.name,
                    number:req.body.number,
                    email:req.body.email,
                    address:req.body.address,
                    photo:req.file?req.file.path:null
                })
                contact.save()
                user.contacts.push(contact)
                user.save()
                res.status(201).send({"msg":"contact created"})
            }
        )
    } catch (error) {
        res.send(500,{"msg":"Something went wrong"})
    }
})

// nested block get

router.get('/:id',verifyToken,async(req,res)=>{
    try {
        userModel.findById(req.userId.subject).then(
            async(user)=>{
                 res.status(200).send(user.contacts.id(req.params.id))
            }
        )
        
    } catch (erorr) {
        res.send(500,{"msg":"Something went wrong"})    
    }
})



// nested block PUT


router.put('/:id',verifyToken,upload.single('photo'),async(req,res)=>{
    try {
       userModel.findById(req.userId.subject,async(err,result)=>{
           if(!err){
               if(!result){
                    res.status(404).send('User was not found');
               }else{
                    typeof req.body.fav!='undefined'?result.contacts.id(req.params.id).fav=req.body.fav:null
                    req.body.name?result.contacts.id(req.params.id).name=req.body.name:null
                    req.body.number?result.contacts.id(req.params.id).number=req.body.number:null
                    req.body.email?result.contacts.id(req.params.id).email=req.body.email:null
                    req.body.address?result.contacts.id(req.params.id).address=req.body.address:null
                    req.file?result.contacts.id(req.params.id).photo=req.file.path:null
                   await result.save(err=>{
                       if(err) return res.status(500).send(err);
                       res.status(200).send({"msg":"Update Successfull"})
                   })  
           }}else{
                res.status(500).send(err.message);
           }
       })
    } catch (error) {
        res.json({"msg":error})    
        
    }
})






// normal contact update
// router.put('/:id',upload.single('photo'),async (req,res)=>{
//     try{
//         Contact.updateOne({_id:req.params.id},req.body)
//         .then((result)=>{
//             res.json({"msg":"Contact Updated","response":result})
//         }).catch(err=>{
//             console.log("error##",err)
//         })
//     }catch(err){
//         res.send("somthing went wrong",err)
//     }
// })


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













