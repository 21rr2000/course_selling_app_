const {Admin}=require("../db")
const jwt= require("jsonwebtoken");
const {JWT_SECRET}=require("../config");
// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    // const username=req.headers.username;
    // const password=req.headers.password;
    // Admin.findOne({
    //     username:username,
    //     password:password
    // }).then(function(value){
    //     if(value){
    //         next();
    //     }else{
    //         res.status(403).json({
    //             msg:"Admin doesnot exist"
    //         })
    //     }
    // })
    const token=req.headers.authorization; 
    const words=token.split(" ");
    const jwToken=words[1];
    try{
        const decodeValue=jwt.verify(jwToken,JWT_SECRET);
        if(decodeValue.username){
            next();
        }else{
            res.status(403).json({
                msg:"you r not authenticated"
            })
         }
    }catch{
        res.json({
            msg:"incorrect inputs"
        })
    }
    
    }

module.exports = adminMiddleware;