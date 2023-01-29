"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findByCreatorId = exports.UpdateOne = exports.findCompanyById = exports.findCompanyByName = exports.findMany = exports.createCompany = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const company_model_1 = require("../models/company.model");
const createCompany = async (data) => {
    return company_model_1.CompanyModel.create(data);
};
exports.createCompany = createCompany;
const findMany = async (data) => {
    return company_model_1.CompanyModel.find({
        isActive: data.isActive
    });
};
exports.findMany = findMany;
const findCompanyByName = async (data) => {
    return company_model_1.CompanyModel.findOne({
        name: data.name
    });
};
exports.findCompanyByName = findCompanyByName;
const findCompanyById = async (data) => {
    return company_model_1.CompanyModel.findOne({ _id: new mongoose_1.default.Types.ObjectId(data.companyId) });
};
exports.findCompanyById = findCompanyById;
const UpdateOne = async (user, data) => {
    const companyName = await (0, exports.findByCreatorId)(user._id);
    return company_model_1.CompanyModel.updateOne({ name: companyName }, data);
};
exports.UpdateOne = UpdateOne;
const findByCreatorId = async (data) => {
    return company_model_1.CompanyModel.findOne({
        creatorId: data
    });
};
exports.findByCreatorId = findByCreatorId;
//# sourceMappingURL=company.service.js.map