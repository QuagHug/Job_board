import express from "express"
import mongoose from "mongoose"
import userRouter from "./routes/user.route"
import verificationRouter from "./routes/verification.route";
import companyRouter from "./routes/company.route";
import defaultRouter from "./routes/default.route";
import * as SVC from "./services"
import http from "http"
import * as dotenv from "dotenv"
import jobRouter from "./routes/job.route";
import cookies from "cookie-parser"
import cors from "cors"

import { Server } from "socket.io"
import { ChatModel } from "./models/chat.model";

dotenv.config();
const app = express()
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

const port = process.env.PORT || 4000
server.listen({port}, () => {
    console.log("server running");
})

io.on('connection', socket => {
    console.log(socket.id);
    socket.on("send-message-candidate", async (message, fromId, toId) => {
        console.log(message);
        
        // const recruiter = await SVC.findUserById((await SVC.findJobById(toId)).recruiterId);
        // SVC.createChat({ from_id: fromId._id, to_id: recruiter.id, message });
        // socket.to(fromId+recruiter._id.toString()).emit(message);
    })
    socket.on("join-room-candidate", async (fromEmail, toJobId) => {
        const candidate = await SVC.findByEmail(fromEmail);
        const recruiter = await SVC.findUserById((await SVC.findJobById(toJobId)).recruiterId);
        socket.join(candidate._id.toString()+recruiter._id.toString());
    })
    socket.on("send-message-recruiter", async (message, fromId, toId) => {
        socket.to(fromId+toId).emit(message);
    })
    socket.on("join-room-recruiter", async (fromId, toId) => {
        socket.join(fromId+toId);
    })
});


app.use(cors({origin: ["https://job-board-hung-luu-client.herokuapp.com"] , credentials: true, allowedHeaders: ["Origin","X-Requested-With","content-type","set-cookie", "jwt"] }));

app.use(express.urlencoded({extended: true})); 
app.use(express.json());   
app.use(cookies());

app.use('/', defaultRouter)
app.use('/jobs', jobRouter)
app.use('/companies', companyRouter)
app.use('/api', userRouter)
app.use('/verification', verificationRouter)

console.log(process.env.DB_URI);
console.log(process.env.SENDGRID_SECRET);


// const options : ConnectOptions = ;
mongoose.connect(process.env.DB_URI)
.then(() => {
    console.log("connected");
})
.catch(err => {
    console.log(err);
})
