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
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const lodash_1 = __importDefault(require("lodash"));
const UserService = __importStar(require("../services/user.service"));
const authenticate = async (req, res, next) => {
    // Headers Authorization: Bearer {{token}}
    // const jwt = _.last(_.split(_.get(req, 'headers.Authorization') as string, " "))
    const jwt = req.cookies.jwt;
    if (!jwt)
        return res.status(405).json({ message: "Token is missing" });
    try {
        const result = jsonwebtoken_1.default.verify(jwt, process.env.JWT_SECRET);
        const user = await UserService.findByEmail(lodash_1.default.get(result, "email"));
        lodash_1.default.set(req, 'user', user);
        res.status(200);
        return next();
    }
    catch (error) {
        res.status(401).json({ message: "Token is invalid" });
    }
};
exports.authenticate = authenticate;
//# sourceMappingURL=authentication.middleware.js.map