"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.create = exports.createJwt = void 0;
const verification_model_1 = __importDefault(require("../models/verification.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../models/user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createJwt = (email) => {
    return jsonwebtoken_1.default.sign({ email }, "mk98mb2RAZn^78tV!bok", {
        expiresIn: '1d'
    });
};
exports.createJwt = createJwt;
const create = async (data) => {
    return verification_model_1.default.create(data);
};
exports.create = create;
const login = async (data) => {
    const { email, password } = data;
    return user_model_1.UserModel.findOne({ email })
        .then(user => {
        if (!user)
            return Promise.reject({
                status: 404,
                message: "User not found"
            });
        return bcryptjs_1.default.compare(password, user.password);
    })
        .then(isMatched => {
        if (!isMatched)
            return Promise.reject({
                status: 401,
                message: "Email and password not match"
            });
        // jwt
        const jwt = (0, exports.createJwt)(email);
        return (0, exports.create)({ email, jwt });
    })
        .catch(err => {
        throw err;
    });
};
exports.login = login;
//# sourceMappingURL=verification.service.js.map