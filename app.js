const express = require('express')
const mongoose= require('mongoose')
const app=express();
const url = 'mongodb://localhost/ContactManager'




mongoose.connect(url,{useNewUrlParser:true})

const connect=mongoose.connection
connect.on('open',()=>{
    console.log("######### DATABASE CONNECTED...######")
})








app.listen(4000,()=>{
    console.log("#########SERVER STARTED...########")
})