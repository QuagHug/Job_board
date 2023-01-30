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

app.use(express.urlencoded({extended: true})); 
app.use(express.json());   
app.use(cookies());

// var whitelist = ['http://localhost:4000', "http://localhost:5501" /** other domains if any */ ]
// var corsOptions = {
//   credentials: true,
//   origin: function(origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }

app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "POST, PUT, PATCH, GET, DELETE, OPTIONS");
    next()
  });

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