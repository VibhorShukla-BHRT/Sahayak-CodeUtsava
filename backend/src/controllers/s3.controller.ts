import { Request, Response } from "express"
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3 from "../utils/s3";

const uploadToS3 = async (req: Request, res: Response) => {
    try {
        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: "key",
            Body: "file",
            ContentType: "png"
        }
    
        const command = new PutObjectCommand(params);
    
        const response = await s3.send(command);
    
        res.status(200).json({
            message: "Uploaded successfully"
        })


        return
    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: "Server error"
        })
        return
    }
}

const fetchFromS3  = async (req: Request, res: Response) => {
    try {

        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: "key",
        };

        const command = new GetObjectCommand(params);
        const url = await getSignedUrl(s3, command);
        res.status(200).json({
            message: url
        })

    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: "Server error"
        })
    }
}