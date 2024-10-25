
const jwt = require("jsonwebtoken");
require("dotenv").config();
//for authorisation

exports.auth = async(req,res,next)=>{
    try {
        
        //extract token
        console.log("token lene aaye hain",req.cookies.token);

        const token  = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ","");

        if(!token)
        {
            return res.status(400).json({
                sucsess:false,
                message:"token not found",
            });
        }

        //verify the token
        try {

            const decode = jwt.verify(token,process.env.JWT_SECRET);
            console.log("verified",decode);

            req.user = decode;
            
        } catch (error) {
            console.log(error);
            return res.status(401).json({
                sucsess:false,
                message:"jwt not found",
            });
        }

        next();

    } catch (error) {
        return res.status(500).json({
            sucsess:false,
            message:"authentication failed",
        });

    }
}

//isapplicant

exports.isapplicant = async(req,res,next)=>{
    try {

        if(req.user.role!=="applicant")
        {
            return res.status(401).json({
                sucsess:false,
                message:"invalid user ,not a applicant",
            });
        }
        
        next();
    } catch (error) {
        
        return res.status(500).json({
            sucsess:false,
            message:"error in applicant",
        });
    }
}

//isverifier
exports.isverifier = async(req,res,next)=>{
    try {

        if(req.user.accountType!=="verifier")
        {
            return res.status(401).json({
                sucsess:false,
                message:"invalid user ,not a verifier",
            });
        }
        
        next();
    } catch (error) {
        
        return res.status(500).json({
            sucsess:false,
            message:"error in verifier",
        });
    }
}

//isadministrator
exports.isadministrator = async(req,res,next)=>{
    try {

        if(req.user.accountType!=="administrator")
        {
            return res.status(401).json({
                sucsess:false,
                message:"invalid user ,not a administrator",
            });
        }
        
        next();
    } catch (error) {
        
        return res.status(500).json({
            sucsess:false,
            message:"error in administrator",
        });
    }
}



const { config } = require("dotenv");
const { json } = require("express");
const { verify } = require("jsonwebtoken");
const { default: auth } = require("../routes/auth");
