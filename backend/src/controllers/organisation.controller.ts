import { organisationModel } from "../models/user.model"
import { Response, Request } from "express"


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

        res.status(200).json({
            message: "Organisation created successfully"
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

        if(!user) {
            res.status(404).json({
                message: "User does not exist"
            })
            return
        }

        res.status(200).json({
            message: "User signed in"
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