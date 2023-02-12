import mongoose from "mongoose";
import {IUser, UserModel} from "../models/user.model";
import bcrypt from "bcryptjs"
import _ from "lodash";
import jsonwebtoken from "jsonwebtoken"

export const create = (data: any) => {
    return UserModel.create(data);
}

export const findOneUser = (data: any) => {
    return UserModel.findOne({_id: new mongoose.Types.ObjectId(data._id)});
}

export const findUserById = (id: any) => {
    return UserModel.findOne({_id: new mongoose.Types.ObjectId(id)});
}

export const findMany = async (data: any) => {
    let page = parseInt(data.page as string) || 0;
    let limit = parseInt(data.page as string) || 10;
    return UserModel.find().skip(page*limit).limit(limit)
        .then(result => {
            if(_.isEmpty(result)) return null;

            let resultArray : Array<Object> = [];
            
            result.forEach(user => { resultArray.push(user.toObject()); })
            return resultArray;
        })
        .catch(err => {
            throw err;
        })
}

export const findByEmail = (email: string) => {
    return UserModel.findOne({ email })
      .then(user => {
        if (user) return user;
        if (!user) Promise.reject({
          status: 404,
          message: 'User not found'
        })
      })
      .catch(err => {
        throw err;
      })
  }

export const replaceOne = (id: any, data: any) => {
    return UserModel.replaceOne({_id: new mongoose.Types.ObjectId(id)}, data);
}

export const updateOneUser = (id: any, data: any) => {
    return UserModel.updateOne({_id: new mongoose.Types.ObjectId(id)}, data);
}

export const deleteOne = (id: any) => {
    return UserModel.deleteOne({_id: new mongoose.Types.ObjectId(id)});
}

export const updatePassword = (data: any): Promise<IUser> => {
    const { userId, oldPassword, newPassword } = data;
    return UserModel.findOne(new mongoose.Types.ObjectId(userId))
        .then(user => {
            // check if user exist
            if (!user) return Promise.reject({
            message: 'User not found'
            })
    
            // check oldPassword
            return Promise.all([
            user,
            bcrypt.compare(oldPassword, user.toObject().password)
            ])
            // update newPassword
        })
        .then(([user, isMatched]) => {
            if (!isMatched) return Promise.reject({
            message: "Old password is not matched"
            })
    
            user.password = newPassword;
            return user.save();
        })
        .catch(err => {
            throw err;
        })
}