import express from "express"
import mongoose from "mongoose"
import { ConnectOptions } from "mongoose"
import userRouter from "./routes/user.route"
import verificationRouter from "./routes/verification.route";
import companyRouter from "./routes/company.route";
import defaultRouter from "./routes/default.route";

import * as dotenv from "dotenv"
import jobRouter from "./routes/job.route";
import cookies from "cookie-parser"
import cors from "cors"

dotenv.config();


const app = express()
app.use(cors({origin: ["https://job-board-client-zeta.vercel.app"] , credentials: true, allowedHeaders: ["Origin","X-Requested-With","content-type","set-cookie"] }));


app.use(express.urlencoded({extended: true})); 
app.use(express.json());   
app.use(cookies());

app.use('/', defaultRouter)
app.use('/jobs', jobRouter)
app.use('/companies', companyRouter)
app.use('/api', userRouter)
app.use('/verification', verificationRouter)

console.log(process.env.DB_URI);

// const options : ConnectOptions = ;
mongoose.connect(process.env.DB_URI)
.then(() => {
    console.log("connected");
})
.catch(err => {
    console.log(err);
})

const port = process.env.PORT || 4000
app.listen({port}, () => {
    console.log("server running");
})