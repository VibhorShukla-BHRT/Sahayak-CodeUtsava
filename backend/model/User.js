const mongoose = require("mongoose")

const userschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["applicant","verifier","administrator"],
        default:"applicant"
    },
    documents_submitted:{
        type:[String],
        default:[]
    },
    documents_verified:{
        type:[String],
        default:[]
    },
    image:{
        type:String,
        
    },
    createdAt:{
        type:Date,
        default:Date.now

    },
    updatedAt:{
        type:Date,
        default:Date.now
    }

    
});

module.exports = mongoose.model("User", userschema);


  