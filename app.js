const express = require('express')
const mongoose= require('mongoose')
const app=express();
const url = 'mongodb://localhost/ContactManager'
const contactRouter=require('./routers/contact')
const userRouter=require('./routers/user')
const cors=require('cors')
const cookieParser=require('cookie-parser')
const globalContact =require('./routers/globalContact')
const corsOptions={
    origin:'http://localhost:3000',
    credentials:true
}

mongoose.connect(url,{useNewUrlParser:true})

const connect=mongoose.connection
connect.on('open',()=>{
    console.log("######### DATABASE CONNECTED...######")
})




app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))
app.use('/contact',contactRouter)
app.use('/uploads',express.static('uploads'))
app.use('/auth',userRouter)
app.use('/globalContact',globalContact)
app.listen(4000,()=>{
    console.log("#########SERVER STARTED...########")
})