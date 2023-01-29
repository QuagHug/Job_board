"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailValidation = void 0;
const validator_1 = __importDefault(require("validator"));
const user_model_1 = __importDefault(require("../models/user.model"));
const lodash_1 = __importDefault(require("lodash"));
function emailValidation(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const errors = {};
        const { email, firstName, lastName } = req.body;
        if (!email) {
            errors.email = "Email is required";
        }
        else if (validator_1.default.isEmpty(email)) {
            errors.email = "Email is not empty";
        }
        else if (validator_1.default.isEmail(email)) {
            errors.email = "Email is invalid";
        }
        else {
            const foundUser = yield user_model_1.default.findOne({ email });
            if (foundUser)
                errors.email = "Email is in used";
        }
        if (lodash_1.default.isEmpty(errors))
            return next();
        return res.status(404).json({
            message: "Bad request",
            errors
        });
    });
}
exports.emailValidation = emailValidation;
