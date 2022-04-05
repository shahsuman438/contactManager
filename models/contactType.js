const mongoose=require('mongoose');

const contactTypeSchema=new mongoose.Schema({
    nam:{
        type:String,
        required:true,
    },
    number:{
        type:Number,
        required:true,
    }
});


module.exports = mongoose.model("contactType",contactTypeSchema);