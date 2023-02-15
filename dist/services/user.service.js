"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePassword = exports.deleteOne = exports.updateOneUser = exports.replaceOne = exports.findByEmail = exports.findMany = exports.findUserByObjectId = exports.findUserById = exports.findOneUser = exports.create = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = require("../models/user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const lodash_1 = __importDefault(require("lodash"));
const create = (data) => {
    return user_model_1.UserModel.create(data);
};
exports.create = create;
const findOneUser = (data) => {
    return user_model_1.UserModel.findOne({ _id: new mongoose_1.default.Types.ObjectId(data._id) });
};
exports.findOneUser = findOneUser;
const findUserById = (id) => {
    return user_model_1.UserModel.findOne({ _id: new mongoose_1.default.Types.ObjectId(id) });
};
exports.findUserById = findUserById;
const findUserByObjectId = (id) => {
    return user_model_1.UserModel.findOne({ _id: id });
};
exports.findUserByObjectId = findUserByObjectId;
const findMany = async (data) => {
    let page = parseInt(data.page) || 0;
    let limit = parseInt(data.page) || 10;
    return user_model_1.UserModel.find().skip(page * limit).limit(limit)
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
exports.findMany = findMany;
const findByEmail = (email) => {
    return user_model_1.UserModel.findOne({ email })
        .then(user => {
        if (user)
            return user;
        if (!user)
            Promise.reject({
                status: 404,
                message: 'User not found'
            });
    })
        .catch(err => {
        throw err;
    });
};
exports.findByEmail = findByEmail;
const replaceOne = (id, data) => {
    return user_model_1.UserModel.replaceOne({ _id: new mongoose_1.default.Types.ObjectId(id) }, data);
};
exports.replaceOne = replaceOne;
const updateOneUser = (id, data) => {
    return user_model_1.UserModel.updateOne({ _id: new mongoose_1.default.Types.ObjectId(id) }, data);
};
exports.updateOneUser = updateOneUser;
const deleteOne = (id) => {
    return user_model_1.UserModel.deleteOne({ _id: new mongoose_1.default.Types.ObjectId(id) });
};
exports.deleteOne = deleteOne;
const updatePassword = (data) => {
    const { userId, oldPassword, newPassword } = data;
    return user_model_1.UserModel.findOne(new mongoose_1.default.Types.ObjectId(userId))
        .then(user => {
        // check if user exist
        if (!user)
            return Promise.reject({
                message: 'User not found'
            });
        // check oldPassword
        return Promise.all([
            user,
            bcryptjs_1.default.compare(oldPassword, user.toObject().password)
        ]);
        // update newPassword
    })
        .then(([user, isMatched]) => {
        if (!isMatched)
            return Promise.reject({
                message: "Old password is not matched"
            });
        user.password = newPassword;
        return user.save();
    })
        .catch(err => {
        throw err;
    });
};
exports.updatePassword = updatePassword;
//# sourceMappingURL=user.service.js.map