import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    phonenumber: {
        type: Number,
        required: true,
        unique: true,
        trim: true
    }
})

const organisationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    phonenumber: {
        type: Number,
        required: true,
        unique: true,
        trim: true
    },
    organisationName: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    employeeID: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
})

const userModel = mongoose.model("Users", userSchema);
const organisationModel = mongoose.model("Organization", organisationSchema);

export { userModel, organisationModel }