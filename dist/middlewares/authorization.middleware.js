"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const lodash_1 = __importDefault(require("lodash"));
// ['candidate'] <=> 'candidate' => next()
// ['candidate'] <=> 'recruiter' => err
// ['candidate', 'recruiter'] <=> 'candidate' => next()
// ['candidate'] <=> 'recruiter' => next
const authorize = (userTypeArray) => {
    return (req, res, next) => {
        const userType = lodash_1.default.get(req, 'user.userType');
        if (lodash_1.default.includes(userTypeArray, userType))
            return next();
        return res.status(403).json({ message: 'You do not have permission(s)' });
    };
};
exports.authorize = authorize;
//# sourceMappingURL=authorization.middleware.js.map