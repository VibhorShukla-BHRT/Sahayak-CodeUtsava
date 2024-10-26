import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const secret = process.env.JWT_SECRET as string

async function CheckValidation(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
  
    if (!token) {
      return res.status(401).json({ message: 'Token not provided' });
    }

    const validation = jwt.verify(token, secret)

    if(!validation) {
        res.status(403).json({
            message: "Not authorized"
        })
        return
    }

    next()
}

export default CheckValidation