"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findMessage = exports.findCandidateByChat = exports.createChat = void 0;
const lodash_1 = __importDefault(require("lodash"));
const chat_model_1 = require("../models/chat.model");
const user_service_1 = require("./user.service");
const createChat = (data) => {
    return chat_model_1.ChatModel.create(data);
};
exports.createChat = createChat;
const findCandidateByChat = async (data) => {
    const chats = await chat_model_1.ChatModel.find({ to_id: data._id });
    console.log(chats);
    let usersId = [];
    let users = [];
    chats.forEach(chat => {
        if (!lodash_1.default.includes(usersId, chat.from_id))
            usersId.push(chat.from_id);
    });
    console.log(usersId);
    usersId.forEach(async (id) => {
        console.log(id);
        console.log(await (0, user_service_1.findUserByObjectId)(id));
        const user = await (0, user_service_1.findUserByObjectId)(id);
        users.push(user);
    });
    console.log(users);
    return users;
};
exports.findCandidateByChat = findCandidateByChat;
const findMessage = async (data) => {
    return chat_model_1.ChatModel.find({ $or: [{ from_id: data.recruiterId, to_id: data.candidateId }, { from_id: data.candidateId, to_id: data.recruiterId }] }).sort({ createdAt: 1 });
};
exports.findMessage = findMessage;
// export const insertMessage = async (data: any) => {
//     const chat = await ChatModel.findOne({ from_id: data.fromId, to_id: data.toId});
//     if(!chat) return createChat(data);
//     chat.message.push(data.message);
//     return chat.save();
// }
//# sourceMappingURL=chat.service.js.map