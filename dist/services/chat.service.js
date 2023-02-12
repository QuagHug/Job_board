"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createChat = void 0;
const chat_model_1 = require("../models/chat.model");
const createChat = (data) => {
    return chat_model_1.ChatModel.create(data);
};
exports.createChat = createChat;
// export const insertMessage = async (data: any) => {
//     const chat = await ChatModel.findOne({ from_id: data.fromId, to_id: data.toId});
//     if(!chat) return createChat(data);
//     chat.message.push(data.message);
//     return chat.save();
// }
//# sourceMappingURL=chat.service.js.map