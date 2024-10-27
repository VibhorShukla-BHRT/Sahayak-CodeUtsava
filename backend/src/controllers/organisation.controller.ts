import { organisationModel } from "../models/user.model"
import { Response, Request } from "express"
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();


const secret = process.env.JWT_SECRET as string

const orgnisationSignup = async (req: Request, res: Response) => {
    try {
        const { email, name, password, phonenumber, employeeID, OrgID } = req.body

        const existingOrganisation = await organisationModel.findOne({employeeID})

        if(existingOrganisation) {
            res.status(409).json({
                message: "Organisation with this employeeid already exists"
            })
            return
        }

        const newOrganisation = await organisationModel.create({
            email,
            name,
            password,
            phonenumber,
            employeeID,
            OrgID
        })

        const token = jwt.sign({newOrganisation}, secret)

        res.status(200).json({
            message: "Organisation created successfully",
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

const orgnisationSignin = async (req: Request, res: Response) => {
    try {
        const { employeeID, password } = req.body

        const user = await organisationModel.findOne({employeeID})

        if(user?.password !== password) {
            res.status(4403).json({
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

        const token = jwt.sign({user}, secret)

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

export { orgnisationSignin, orgnisationSignup }