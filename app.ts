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
app.use((req, res, next) => {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "YOUR_URL"); // restrict it to the required domain
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    // Set custom headers for CORS
    res.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Custom-Header");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    return next();
})

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