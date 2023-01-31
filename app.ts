import express from "express"
import mongoose from "mongoose"
import userRouter from "./routes/user.route"
import verificationRouter from "./routes/verification.route";
import companyRouter from "./routes/company.route";
import defaultRouter from "./routes/default.route";

import * as dotenv from "dotenv"
import jobRouter from "./routes/job.route";
import cookies from "cookie-parser"
import cors from "cors"

const app = express()

app.options('*', cors());
app.use(cors());

app.use(express.urlencoded({extended: true})); 
app.use(express.json());   
app.use(cookies());

app.use('/', defaultRouter)
app.use('/jobs', jobRouter)
app.use('/companies', companyRouter)
app.use('/api', userRouter)
app.use('/verification', verificationRouter)


dotenv.config();

const port = process.env.PORT || 4000
app.listen({port}, async () => {
    await mongoose.connect(process.env.DB_URI)
    .then(() => {
        console.table({
            dbtype: "mongodb",
            port,
            dbHost: "localhost"
        })
    })
    .catch(err => {
        throw err;
    })
})