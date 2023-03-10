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
import chatRouter from "./routes/chat.route";

dotenv.config();
const app = express()
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "https://job-board-hung-luu-client.herokuapp.com"
    }
});

const port = process.env.PORT || 4000
server.listen({port}, () => {
    console.log("server running");
})

io.on('connection', async socket => {
    console.log(socket.id);
    socket.on("send-message-candidate", async (message, recruiterId, candidateId) => {
        console.log(message);
        SVC.createChat({ from_id: candidateId, to_id: recruiterId, message });
        socket.to(recruiterId+candidateId).emit("receive-message", message);
    })
    socket.on("join-room-candidate", async (recruiterId, candidateId) => {
        socket.join(recruiterId+candidateId);
    })
    socket.on("send-message-recruiter", async (message, recruiterId, candidateId) => {
        SVC.createChat({ from_id: recruiterId, to_id: candidateId, message });
        socket.to(recruiterId+candidateId).emit("receive-message", message);
    })
    socket.on("join-room-recruiter", async (recruiterId, candidateId) => {
        socket.join(recruiterId+candidateId);
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
app.use("/chat", chatRouter)

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
