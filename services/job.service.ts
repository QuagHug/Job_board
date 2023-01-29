import mongoose from "mongoose";
import {JobModel} from "../models";
import _ from "lodash";
import jobRouter from "../routes/job.route";


export const createJob = (data: any) => {
    return JobModel.create(data);
}

export const findOneJob = (data: any) => {
    return JobModel.findOne({_id: new mongoose.Types.ObjectId(data.id)});
}

export const findManyJob = async (data: any) => {
    let page = parseInt(data.page as string) || 0;
    let limit = parseInt(data.page as string) || 10;
    return JobModel.find().skip(page*limit).limit(limit)
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

export const searchJob = async (data: any) => {
    const queryStr = data.title || "";
    return JobModel.find({ title: {$regex: '^' + queryStr} })
}
