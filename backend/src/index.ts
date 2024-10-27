import express, { Router } from 'express'
import cors from 'cors'
import { VerificationRouter } from './routes/fileHandle.route'
import { userRouter } from './routes/user.routes'
import { orgRoute } from './routes/org.routes'
import { connectToDatabse } from './database/db'
import session from 'express-session';
import { Request, Response } from 'express'

connectToDatabse()
const secret = process.env.JWT_SECRET as string || "S3CR3T"

const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}));
app.use(express.json());
app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie: { 
      secure: false, // Set to true if using HTTPS
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30
     },
}))
declare module 'express-session' {
    interface SessionData {
      isLoggedIn: boolean;
      userId: string;
      email: string;
      name: string;
      employeeID: string;
    }
  }


const router = Router();
const checkAuth = async (req: Request, res: Response) => {
  console.log(req.headers.authorization);
  res.status(403).json({
    message: "true"
  })
}

app.use("/api/v1/upload", VerificationRouter)
app.use("/api/v1/user", userRouter)
app.use("/api/v1/org", orgRoute)

app.use("/api/v1/checkAuth", router.get("", checkAuth))

app.listen(3000);
console.log("Server running on port: ", 3000);