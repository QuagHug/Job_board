"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.idValidation = exports.createUserValidation = void 0;
const validator_1 = __importDefault(require("validator"));
const user_model_1 = require("../models/user.model");
const lodash_1 = __importDefault(require("lodash"));
const mongoose_1 = __importDefault(require("mongoose"));
async function createUserValidation(req, res, next) {
    const errors = {};
    const { email, firstName, lastName } = req.body;
    if (!email) {
        errors.email = "Email is required";
    }
    else if (validator_1.default.isEmpty(email)) {
        errors.email = "Email is not empty";
    }
    else if (!validator_1.default.isEmail(email)) {
        errors.email = "Email is invalid";
    }
    else {
        const foundUser = await user_model_1.UserModel.findOne({ email });
        if (foundUser)
            errors.email = "Email is in used";
    }
    if (!firstName) {
        errors.firstName = "First name is required";
    }
    else if (!validator_1.default.isLength(firstName, { min: 2, max: 20 })) {
        errors.firstName = "FirstName must be from 2-20 characters";
    }
    if (!lastName) {
        errors.lastName = "Last name is required";
    }
    else if (!validator_1.default.isLength(lastName, { min: 2, max: 20 })) {
        errors.lastName = "Last name must be from 2-20 characters";
    }
    if (lodash_1.default.isEmpty(errors))
        return next();
    return res.status(404).json({
        status: 404,
        detail: errors
    });
}
exports.createUserValidation = createUserValidation;
function idValidation(req, res, next) {
    if (!mongoose_1.default.isValidObjectId(req.params.id)) {
        return res.status(404).json({
            message: "Bad request",
            errors: "Invalid id"
        });
    }
    next();
}
exports.idValidation = idValidation;
//# sourceMappingURL=user.validate.js.map