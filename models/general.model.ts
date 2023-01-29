import mongoose from "mongoose";

export interface IGeneral {
    _id: mongoose.Types.ObjectId,
    createdAt: Date,
    updatedAt: Date
    
}