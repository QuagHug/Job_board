"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapper = void 0;
const lodash_1 = __importDefault(require("lodash"));
const wrapper = (fn) => {
    return async (req, res, next) => {
        // post
        const user = req.user;
        const body = req.body;
        const cookies = req.cookies;
        const params = req.params;
        const query = req.query;
        const data = { ...body, ...params, ...query, ...cookies, user };
        const result = await fn(data);
        lodash_1.default.set(req, 'result', result);
        return next();
    };
};
exports.wrapper = wrapper;
//# sourceMappingURL=wrapper.middleware.js.map