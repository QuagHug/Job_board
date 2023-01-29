import mongoose from "mongoose";
import { CompanyModel, ICompany } from "../models/company.model";


export const createCompany = async (data: any): Promise<ICompany> => {
  return CompanyModel.create(data);
}

export const findMany = async (data: any): Promise<Array<ICompany>> => {
  return CompanyModel.find({
    isActive: data.isActive
  })
}

export const findCompanyByName = async (data: any): Promise<ICompany> => {
  return CompanyModel.findOne({
    name: data.name
  })
}

export const findCompanyById = async (data: any): Promise<ICompany> => {
  return CompanyModel.findOne({_id: new mongoose.Types.ObjectId(data.companyId)});
}

export const UpdateOne = async (user: any, data) => {
    const companyName = await findByCreatorId(user._id);
    return CompanyModel.updateOne({name: companyName}, data);
}

export const findByCreatorId = async (data: any): Promise<ICompany> => {
    return CompanyModel.findOne({
      creatorId: data
    })
}