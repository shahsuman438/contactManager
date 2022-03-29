const express = require('express')
const mongoose= require('mongoose')
const app=express();
const url = 'mongodb://localhost/ContactManager'
const contactRouter=require('./routers/contact')
const userRouter=require('./routers/user')
const cors=require('cors')


mongoose.connect(url,{useNewUrlParser:true})

const connect=mongoose.connection
connect.on('open',()=>{
    console.log("######### DATABASE CONNECTED...######")
})




app.use(express.json())
app.use(cors())
app.use('/contact',contactRouter)
app.use('/uploads',express.static('uploads'))
app.use('/auth',userRouter)
app.listen(4000,()=>{
    console.log("#########SERVER STARTED...########")
})