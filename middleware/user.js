const {User}=require("../db")
const jwt= require("jsonwebtoken");
const secret=require("../index");
function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    // const username=req.headers.username;
    // const password=req.headers.password;
    // User.findOne({
    //     username:username,
    //     password:password
    // }).then(function(value){
    //     if(value){
    //         next();
    //     }else{
    //         res.status(403).json({
    //             msg:"User doesnot exist"
    //         })
    //     }
    // })
    const token=req.headers.authorization; 
    const words=token.split(" ");
    const jwToken=words[1];
    try{
       const decodeValue=jwt.verify(jwToken,secret);
        if(decodeValue.username){
            req.username=decodeValue.username;
            
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

module.exports = userMiddleware;