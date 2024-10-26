import mongoose from "mongoose";

async function connectToDatabse() {
    mongoose.connect("mongodb://localhost:27017/user").then(() => {
        console.log("Database connected")
    }).catch((error) => {
        console.log("Failed to connect", error);
    })
}

export { connectToDatabse }