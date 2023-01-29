"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOne = exports.updateOne = exports.replaceOne = exports.findMany = exports.findOne = exports.create = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = require("../models/user.model");
const create = (data) => {
    return user_model_1.UserModel.create(data);
};
exports.create = create;
const findOne = (id) => {
    return user_model_1.UserModel.findOne({ _id: new mongoose_1.default.Types.ObjectId(id) });
};
exports.findOne = findOne;
const findMany = () => {
    return user_model_1.UserModel.find();
};
exports.findMany = findMany;
const replaceOne = (id, data) => {
    return user_model_1.UserModel.replaceOne({ _id: new mongoose_1.default.Types.ObjectId(id) }, data);
};
exports.replaceOne = replaceOne;
const updateOne = (id, data) => {
    return user_model_1.UserModel.updateOne({ _id: new mongoose_1.default.Types.ObjectId(id) }, data);
};
exports.updateOne = updateOne;
const deleteOne = (id) => {
    return user_model_1.UserModel.deleteOne({ _id: new mongoose_1.default.Types.ObjectId(id) });
};
exports.deleteOne = deleteOne;
//# sourceMappingURL=user.services.js.map