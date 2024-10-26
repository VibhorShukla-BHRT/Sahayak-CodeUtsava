import { userModel } from "../models/user.model"
import { Response, Request } from "express"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseApp } from "../utils/firebase";
import jwt from "jsonwebtoken";

const auth = getAuth(firebaseApp);
const secret = process.env.JWT_SECRET as string

const userSignup = async (req: Request, res: Response) => {
    try {
        const { email, name, password, phonenumber } = req.body

        const existingUser = await userModel.findOne({email})

        if(existingUser) {
            res.status(409).json({
                message: "User already exist"
            })
            return
        }

        const newUser = await userModel.create({
            email,
            name,
            password,
            phonenumber
        })

        const token = jwt.sign(newUser, secret)

        res.status(200).json({
            message: "User created successfully",
            token: token
        })
        return

    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({
            message: "Server error"
        })
        return
    }
}

const userSignin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        const user = await userModel.findOne({email})

        if(user?.password !== password) {
            res.status(403).json({
                message: "Wrong password"
            })
            return
        }

        if(!user) {
            res.status(404).json({
                message: "User does not exist"
            })
            return
        }

        const token = jwt.sign(user, secret)

        res.status(200).json({
            message: "User signed in",
            token: token
        })
        return

    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({
            message: "Server error"
        })
        return
    }
}

export { userSignin, userSignup }