const mongoose = require("mongoose");
const mongoose = require("mongoose");
const { docschema } = require("./Document");

const BlockchainTransactionschema = new  mongoose.Schema({
    transaction_id:{
        type:String,
        required:true,
        unique:true,
    },
    document_id:{
        type:Schema.Types.ObjectId,
        ref: 'Documents',
        required:true,
    },
    transaction_hash:{
        type:String,
        required:true,

    },
    verifier_id:{
        type:Schema.Types.ObjectId,
        ref:'Users',
        required:true,
    },
    status:{
        type:String,
        enum:["success", "failure"],
        required:true,
    },
    block_number:{
        type:Number,
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
})
module.exports = mongoose.model("BlockChaintransaction", BlockchainTransactionschema);

