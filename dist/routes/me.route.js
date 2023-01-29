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
const express_1 = __importDefault(require("express"));
const UserService = __importStar(require("../services/user.service"));
const lodash_1 = __importDefault(require("lodash"));
const formatJson_1 = require("../utils/formatJson");
const authentication_middleware_1 = require("../middlewares/authentication.middleware");
const meRouter = express_1.default.Router();
/**
 * @todo get me
 */
meRouter.get('/me', authentication_middleware_1.authenticate, (req, res, next) => {
    lodash_1.default.set(req, 'result', req.user);
    next();
}, formatJson_1.formatJsonApiResource);
/**
 * @todo update password
 */
meRouter.patch('/me/update-password', authentication_middleware_1.authenticate, async (req, res, next) => {
    const data = req.body; // oldPassword, newPassword, newPassword2
    data.userId = lodash_1.default.get(req, "user._id");
    const result = await UserService.updatePassword(data);
    lodash_1.default.set(req, 'result', result);
    next();
}, formatJson_1.formatJsonApiResource);
meRouter.patch('/me/update-profile', authentication_middleware_1.authenticate, async (req, res, next) => {
    const data = req.body; // oldPassword, newPassword, newPassword2
    data.userId = lodash_1.default.get(req, "user._id");
    const result = await UserService.updateOneUser(data.userId, data);
    lodash_1.default.set(req, 'result', result);
    next();
}, formatJson_1.formatJsonApiResource);
/**
 * @todo update user/profile
 */
exports.default = meRouter;
//# sourceMappingURL=me.route.js.map