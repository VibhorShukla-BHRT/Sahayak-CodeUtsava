import { Router, Request, Response } from "express";
import multer, { FileFilterCallback } from "multer";
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3 from "../utils/s3";

const router = Router();

const storage = multer.memoryStorage();

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

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024,
    }
});


router.post("/verify", upload.single("file"), handleFile, async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            res.status(400).json({
                success: false,
                message: "No file uploaded"
            });
            return;
        }

    
        res.status(200).json({
            success: true,
            message: "File uploaded successfully",
            file: {
                filename: req.file.filename,
                originalname: req.file.originalname,
                mimetype: req.file.mimetype,
                size: req.file.size
            }
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


router.post("/upload", upload.single("file"), handleFile, async (req: Request, res: Response) => {
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
})


router.get("/fetch", async (req: Request, res: Response) => {
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
})

export { router as VerificationRouter };