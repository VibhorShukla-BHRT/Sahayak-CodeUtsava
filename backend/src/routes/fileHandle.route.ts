import { Router, Request, Response } from "express";
import multer, { FileFilterCallback } from "multer";
import FormData from "form-data";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { ethers } from "ethers";
import fs from 'fs'
import s3 from "../utils/s3";
import path from 'path'
import * as dotenv from "dotenv";
import axios from "axios";
import { addDoc, verifyDoc } from "../controllers/contract.controller";
dotenv.config();

const router = Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadsDir = path.join(__dirname, './uploads'); // Define the uploads directory

    // Create the directory if it doesn't exist
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir);
    }

    cb(null, uploadsDir); // Save files to the uploads directory
  },
  filename: (req, file, cb) => {
    // Use the original name or modify it to prevent overwriting
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Save the file with a unique name
  },
});

const handleFile = async (err: any, req: Request, res: Response, next: Function) => {
    if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
            res.status(400).json({
                success: false,
                message: "File size too large. Maximum size is 5MB"
            });
            return;
        }
        res.status(400).json({
            success: false,
            message: err.message
        });
        return;
    }
    next(err);
}

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const allowedMimes = ["image/jpeg", "image/png", "image/gif", "application/pdf"];
    
    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type. Only JPEG, PNG, GIF and PDF files are allowed."));
    }
};

const upload = multer({ storage: storage });

router.post("/verify", upload.single("file"), handleFile, async (req: Request, res: Response) => {
    try {

        const { privateKey } = req.body

        if (!req.file) {
            res.status(400).json({
                success: false,
                message: "No file uploaded"
            });
            return;
        }

        const form = new FormData();
        form.append('file', fs.createReadStream(req.file.path), req.file.originalname);
        
        
        const resp = await axios.post("http://localhost:8000/extract-text", form, {
            headers: {
                ...form.getHeaders(), // Important: this sets the correct Content-Type
            },
        });

        console.log(resp.data.text)
        
        const hash = ethers.keccak256(ethers.toUtf8Bytes(resp.data.text));

        console.log(hash)

        const veriData = await verifyDoc(privateKey, hash);
        
        // console.log(veriData)
        
        const folerPath = veriData !== 'true' ? "verified" : "failed"

        // const params = {
        //     Bucket: process.env.BUCKET_NAME,
        //     Key: `${folerPath}/` + req.file.fieldname,
        //     Body: Buffer.from(req.file.buffer),
        //     ContentType: req.file.mimetype
        //   };
          
        //   const command = new PutObjectCommand(params);
        //   const response = await s3.send(command);
    
        res.status(200).json({
            success: veriData,
            message: 'ok'
        });

        return;
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error uploading file",
            error: error instanceof Error ? error.message : "Unknown error"
        });
        return;
    }
});


router.post("/add", upload.single("file"), handleFile, async (req: Request, res: Response) => {
  try {

    const { privateKey } = req.body

    if (!req.file) {
        res.status(400).json({
            success: false,
            message: "No file uploaded"
        });
        return;
    }

    const form = new FormData();
    form.append('file', fs.createReadStream(req.file.path), req.file.originalname);
    
    
    const resp = await axios.post("http://localhost:8000/extract-text", form, {
        headers: {
            ...form.getHeaders(), // Important: this sets the correct Content-Type
        },
    });
    
    const hash = ethers.keccak256(ethers.toUtf8Bytes(resp.data.text));

    const addData = await addDoc(privateKey, hash);
    console.log(addData)

    const folerPath = addData.success !== 'true' ? "verified" : "failed"

    // const params = {
    //     Bucket: process.env.BUCKET_NAME,
    //     Key: "verified/" + req.file.fieldname,
    //     Body: Buffer.from(req.file.buffer),
    //     ContentType: req.file.mimetype
    //   };
      
      // const command = new PutObjectCommand(params);
      // const response = await s3.send(command);

    res.status(200).json(addData);

    return;
} catch (error) {
    res.status(500).json({
        success: false,
        message: "Error uploading file",
        error: error instanceof Error ? error.message : "Unknown error"
    });
    return;
}
})   

  async function getFilesWithSignedUrls(bucketName: string, folderPath: string) {
    try {
      // First, list all files
      const command = new ListObjectsV2Command({
        Bucket: bucketName,
        Prefix: folderPath
      });
  
      const response = await s3.send(command);
      const files = response.Contents?.filter(item => item.Key !== folderPath) || [];
  
      // Then generate signed URLs for each file
      const filesWithUrls = await Promise.all(
        files.map(async (file) => {
          const getObjectCommand = new GetObjectCommand({
            Bucket: bucketName,
            Key: file.Key,
          });
  
          const signedUrl = await getSignedUrl(s3, getObjectCommand, {
            expiresIn: 3600 // 1 hour
          });
  
          return {
            key: file.Key,
            size: file.Size,
            lastModified: file.LastModified,
            url: signedUrl
          };
        })
      );
  
      return filesWithUrls;
  
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
  

router.post("/fetch", async (req: Request, res: Response) => {
    try {

        const { folder } = req.body
        const bucketname = process.env.BUCKET_NAME as string

        const files = await getFilesWithSignedUrls( bucketname, 'verified/');

        res.status(200).json({
            message: "ok",
            data: files
        })

    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: "Server error"
        })
    }
})


// Usage in Express route


export { router as VerificationRouter };