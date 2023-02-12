import mongoose from "mongoose";
import { ChatModel } from "../models/chat.model";

export const createChat = (data: any) => {
    return ChatModel.create(data);
}

// export const insertMessage = async (data: any) => {
//     const chat = await ChatModel.findOne({ from_id: data.fromId, to_id: data.toId});
//     if(!chat) return createChat(data);
//     chat.message.push(data.message);
//     return chat.save();
// }