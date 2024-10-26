import express from 'express'
import cors from 'cors'
import { VerificationRouter } from './routes/verification.route'
import { userRouter } from './routes/user.routes'
import { orgRoute } from './routes/org.routes'
import { connectToDatabse } from './database/db'

connectToDatabse()

const app = express()
app.use(express.urlencoded({ extended: true }));

app.use(cors())
app.use(express.json());

app.use("/api/v1/upload", VerificationRouter)
app.use("/api/v1/user", userRouter)
app.use("/api/v1/org", orgRoute)

app.listen(3000);
console.log("Server running on port: ", 3000);