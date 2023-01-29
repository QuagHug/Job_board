import mongoose, { Types } from 'mongoose';
import { ELevel, EMode } from '../interfaces';
import { IGeneral } from './general.model';

/**
 * @todo validate email (email valid, email unique)
 */
export interface IJob extends IGeneral {
  companyId: mongoose.Types.ObjectId,
  recruiterId: mongoose.Types.ObjectId,
  title: string;
  level: ELevel; // fresher, junior, senior, leader, director, c-level
  mode: EMode;
  overview: string;
  description: string;
  requirement: string;
  benefit: string;
  pdfUrl: string;
}

export const JobSchema = new mongoose.Schema<IJob>({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Company'
  },
  recruiterId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  level: {
    type: String,
    required: true
  },
  mode: {
    type: String,
    required: true,
    default: EMode.onsite
  },
  overview: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  requirement: {
    type: String,
    required: true
  },
  benefit: {
    type: String,
    required: true
  },
  pdfUrl: {
    type: String,
  },
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  }
})

export const JobModel = mongoose.model<IJob>('job', JobSchema);
