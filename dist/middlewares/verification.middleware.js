"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailConfirmation = exports.createUserVerification = exports.verification = void 0;
const lodash_1 = __importDefault(require("lodash"));
const user_model_1 = require("../models/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mailservice_1 = __importDefault(require("../utils/mailservice"));
const SVC = __importStar(require("../services"));
const exTime = 24 * 60 * 60 * 1000;
const createJwt = (email) => {
    return jsonwebtoken_1.default.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });
};
const verification = async (req, res, next) => {
    const { email, password } = req.body;
    user_model_1.UserModel.findOne({ email })
        .then(user => {
        if (!user) {
            res.status(404);
            return Promise.reject({
                message: "User not found"
            });
        }
        lodash_1.default.set(req, "result", user);
        return bcryptjs_1.default.compare(password, user.password);
    })
        .then(isMatched => {
        if (!isMatched) {
            res.status(401);
            return Promise.reject({
                message: "Email and password not match"
            });
        }
        // jwt
        return createJwt(email);
    })
        .then(async (jwt) => {
        res.cookie("jwt", jwt, { maxAge: exTime, httpOnly: true, secure: true });
        res.header("access-control-expose-headers", "Set-Cookie");
        lodash_1.default.set(req, "success", true);
        return next();
    })
        .catch(err => {
        lodash_1.default.set(req, "success", false);
        lodash_1.default.set(req, "errors", [err.message]);
        return next();
    });
};
exports.verification = verification;
const createUserVerification = async (req, res, next) => {
    const userId = lodash_1.default.chain(req).get("result").get("_id").value();
    const userEmail = lodash_1.default.chain(req).get("result").get("email").value();
    const jwt = jsonwebtoken_1.default.sign({ userId }, "mk98mb2RAZn^78tV!bok");
    const url = `https://job-board-quaghug.vercel.app/verification/email/${jwt}`;
    await mailservice_1.default.send({
        to: userEmail,
        from: "hungluudemo@gmail.com",
        subject: 'Confirm Email',
        html: `Please click this link to confirm your email: <a href="${url}">HERE</a>`,
    })
        .then(res => {
        return next();
    })
        .catch(err => console.log);
};
exports.createUserVerification = createUserVerification;
const emailConfirmation = async (req, res, next) => {
    const { token } = req.params;
    try {
        const result = jsonwebtoken_1.default.verify(token, "mk98mb2RAZn^78tV!bok");
        const userId = lodash_1.default.get(result, "userId");
        await SVC.updateOneUser(userId, { emailConfirmed: true });
        // const user = await SVC.findOneUser({ _id: userId });
        // _.set(req, "result", user);
        return res.redirect("https://job-board-client-zeta.vercel.app/index.html");
    }
    catch (err) {
        throw err;
    }
};
exports.emailConfirmation = emailConfirmation;
//# sourceMappingURL=verification.middleware.js.map