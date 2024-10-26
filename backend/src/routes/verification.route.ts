import { Router, Request, Response } from "express";
import multer, { FileFilterCallback } from "multer";

const router = Router();

const storage = multer.memoryStorage();


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


router.post("/verify", upload.single("file"), (req: Request, res: Response) => {
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


router.use((err: any, req: Request, res: Response, next: Function) => {
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
});

export { router as VerificationRouter };