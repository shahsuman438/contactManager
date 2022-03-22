const express = require('express')
const mongoose= require('mongoose')
const app=express();
const url = 'mongodb://localhost/ContactManager'




mongoose.connect(url,{useNewUrlParser:true})

const connect=mongoose.connection
connect.on('open',()=>{
    console.log("######### DATABASE CONNECTED...######")
})


const contactRouter=require('./routers/contact')

app.use(express.json())
app.use('/contact',contactRouter)
app.use('/uploads',express.static('uploads'))

app.listen(4000,()=>{
    console.log("#########SERVER STARTED...########")
})