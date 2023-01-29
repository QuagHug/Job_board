import mongoose from 'mongoose';
import { IGeneral } from './general.model';

export interface ICompany extends IGeneral {
  name: string;
  logoUrl: string;
  description: string;
  address: string;
  creatorId: mongoose.Types.ObjectId;
  isActive: Boolean
}

export const CompanySchema = new mongoose.Schema<ICompany>({
  name: {
    type: String,
    require: true
  },
  logoUrl: {
    type: String,
    require: true
  },
  description: {
    type: String,
  },
  address: {
    type: String,
  },
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  }
})



export const CompanyModel = mongoose.model<ICompany>('company', CompanySchema);
