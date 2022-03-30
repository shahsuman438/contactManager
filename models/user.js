const mongoose=require('mongoose')

const bcrypt=require("bcrypt")
const contactSchema = require("./contact").schema

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    join:{
        type:Date,
        default:Date.now
    },
    photo:{
        type:String,
        default:null
    },
    phone:{
        type:Number
    },
    address:{
        type:String
    },
    country:{
        type:String
    },
    contacts:[contactSchema]
    
    
})


// userSchema.pre('save',async function(next){
//     try {
//         console.log("THIS-**",this)
//         const salt=await bcrypt.genSalt(10)
//         const hashPassword=await bcrypt.hash(this.password,salt)
//         this.password=hashPassword
//         next()
//     } catch (error) {
//         next(eror)
//     }
// })


module.exports=mongoose.model('user',userSchema)