const jwt=require('jsonwebtoken')



function verifyToken(req,res,next){
    console.log(req.headers.authorization)
    if(!req.headers.authorization){
        return res.status(401).send({"msg":"Unauthorized Access"})
    }
    let token=req.headers.authorization.split(' ')[1]
    if(token==null){
        return res.status(401).send({"msg":"Unauthorized Access"})
    }
    let payload=jwt.verify(token,'sk1443')
    if(!payload){
        return res.status(401).send({"msg":"Unauthorized Access"})
    }
    console.log(payload)
    req.userId=payload
    next()
}


module.exports=verifyToken