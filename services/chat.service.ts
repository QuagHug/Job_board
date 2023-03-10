import _ from "lodash";
import mongoose from "mongoose";
import { UserModel } from "../models";
import { ChatModel } from "../models/chat.model";
import { findUserById, findUserByObjectId } from "./user.service";

export const createChat = (data: any) => {
    return ChatModel.create(data);
}

export const findCandidateByChat = async (data: any) => {
    const chats = await ChatModel.find({ to_id: data._id });
    console.log(chats);
    
    let usersId = [];
    let users = [];
    for(const chat of chats) {
        if(!_.includes(usersId, chat.from_id.toString())) usersId.push(chat.from_id.toString());
    }
    console.log(usersId);
    
    for(const id of usersId) {
        console.log(id);
        const user = await findUserById(id);
        console.log(user);
        users.push(user);
    }
    console.log(users);
    
    return users;
}

export const findMessage = async (data: any) => {
    return ChatModel.find({ $or : [{ from_id: data.recruiterId, to_id: data.candidateId }, { from_id: data.candidateId, to_id: data.recruiterId }]}).sort({ createdAt: 1 }) 
}

// export const insertMessage = async (data: any) => {
//     const chat = await ChatModel.findOne({ from_id: data.fromId, to_id: data.toId});
//     if(!chat) return createChat(data);
//     chat.message.push(data.message);
//     return chat.save();
// }