import mongoose from 'mongoose';
import { IGeneral } from './general.model';

export interface IChat extends IGeneral {
    from_id: mongoose.Types.ObjectId,
    to_id: mongoose.Types.ObjectId,
    message: string
}

export const ChatSchema = new mongoose.Schema<IChat>({
  from_id: {
    type: mongoose.Schema.Types.ObjectId,
    require: true
  },
  to_id: {
    type: mongoose.Schema.Types.ObjectId,
    require: true
  },
  message: {
    type: String,
    require: true
  }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  }
})

export const ChatModel = mongoose.model<IChat>('chat', ChatSchema);
