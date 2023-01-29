"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchJob = exports.findManyJob = exports.findOneJob = exports.createJob = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("../models");
const lodash_1 = __importDefault(require("lodash"));
const createJob = (data) => {
    return models_1.JobModel.create(data);
};
exports.createJob = createJob;
const findOneJob = (data) => {
    return models_1.JobModel.findOne({ _id: new mongoose_1.default.Types.ObjectId(data.id) });
};
exports.findOneJob = findOneJob;
const findManyJob = async (data) => {
    let page = parseInt(data.page) || 0;
    let limit = parseInt(data.page) || 10;
    return models_1.JobModel.find().skip(page * limit).limit(limit)
        .then(result => {
        if (lodash_1.default.isEmpty(result))
            return null;
        let resultArray = [];
        result.forEach(user => { resultArray.push(user.toObject()); });
        return resultArray;
    })
        .catch(err => {
        throw err;
    });
};
exports.findManyJob = findManyJob;
const searchJob = async (data) => {
    const queryStr = data.title || "";
    return models_1.JobModel.find({ title: { $regex: '^' + queryStr } });
};
exports.searchJob = searchJob;
//# sourceMappingURL=job.service.js.map