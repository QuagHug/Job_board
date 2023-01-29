"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_model_1 = __importDefault(require("../models/user.model"));
const userRouter = express_1.default.Router();
userRouter.get('/users', (req, res, next) => {
    const users = [
        { id: 1, email: "hungluu@" }
    ];
    res.json({
        data: users
    });
});
userRouter.post('/users', (req, res, next) => {
    const data = req.body;
    user_model_1.default.create(data)
        .then(user => {
        return res.json(user);
    })
        .catch(console.log);
});
exports.default = userRouter;
