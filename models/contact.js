const mongoose=require('mongoose');

const contactSchema=new mongoose.Schema({
    fav:{
        type:Boolean,
        default:false
    },
    name:{
        type:String,
        required:true,
    },
    number:{
        type:Number,
        required:true,
    },
    email:{
        type:String
    },
    address:{
        type:String,
    },
    photo:{
        type:String
    }

});


module.exports=mongoose.model('contact',contactSchema);