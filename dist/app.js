"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const verification_route_1 = __importDefault(require("./routes/verification.route"));
const company_route_1 = __importDefault(require("./routes/company.route"));
const default_route_1 = __importDefault(require("./routes/default.route"));
const SVC = __importStar(require("./services"));
const http_1 = __importDefault(require("http"));
const dotenv = __importStar(require("dotenv"));
const job_route_1 = __importDefault(require("./routes/job.route"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
dotenv.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*"
    }
});
io.on('connection', socket => {
    console.log(socket.id);
    socket.on("send-message-candidate", async (message, fromId, toId) => {
        const recruiter = await SVC.findUserById((await SVC.findJobById(toId)).recruiterId);
        SVC.createChat({ from_id: fromId._id, to_id: recruiter.id, message });
        socket.to(fromId + recruiter._id.toString()).emit(message);
    });
    socket.on("join-room-candidate", async (fromEmail, toJobId) => {
        const candidate = await SVC.findByEmail(fromEmail);
        const recruiter = await SVC.findUserById((await SVC.findJobById(toJobId)).recruiterId);
        socket.join(candidate._id.toString() + recruiter._id.toString());
    });
    socket.on("send-message-recruiter", async (message, fromId, toId) => {
        socket.to(fromId + toId).emit(message);
    });
    socket.on("join-room-recruiter", async (fromId, toId) => {
        socket.join(fromId + toId);
    });
});
app.use((0, cors_1.default)({ origin: ["https://job-board-client-zeta.vercel.app"], credentials: true, allowedHeaders: ["Origin", "X-Requested-With", "content-type", "set-cookie", "jwt"] }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use('/', default_route_1.default);
app.use('/jobs', job_route_1.default);
app.use('/companies', company_route_1.default);
app.use('/api', user_route_1.default);
app.use('/verification', verification_route_1.default);
console.log(process.env.DB_URI);
console.log(process.env.SENDGRID_SECRET);
// const options : ConnectOptions = ;
mongoose_1.default.connect(process.env.DB_URI)
    .then(() => {
    console.log("connected");
})
    .catch(err => {
    console.log(err);
});
const port = process.env.PORT || 4000;
server.listen({ port }, () => {
    console.log("server running");
});
//# sourceMappingURL=app.js.map