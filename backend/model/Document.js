const mongoose = require("mongoose");


const docschema = new mongoose.Schema({
    document_id:{
        type:String,
        required:true,
        unique:true,
    },
    user_id:{
        type:Schema.Types.ObjectId,
        ref:'Users',
        required:true,
    },
    document_name:{
        type:String,
        enum:["birth_certificate", "transcript", "Adhar_card", "Marksheet"],
        required:true,
    },
    file_path:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:["pending", "verified" , "rejected"],
        default:"pending",
    },
    verified_by:{
        type:Schema.Types.ObjectId,
        ref:'Users',
        required:true,
    },
    verification_timestamp:{
        type:Date,
        default:Date.now
    },
    anomaly_detected:{
        type:Boolean,
        default:false
    },
    anomaly_reason:{
        type:String,
    },
    document_hash:{
        //for blockchain 
        type:String,
        required:true,
    },
    created_at:{
        type:Date,
        default:Date.now
    },
    updated_at:{
        type:Date,
        default:Date.now
    },
});
exports.docschema = docschema;

module.exports = mongoose.model("Documents", docschema);






  