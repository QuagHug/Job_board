"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificationSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const interfaces_1 = require("../interfaces");
exports.VerificationSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        default: interfaces_1.EVerificationType.password
    },
    jwt: {
        type: String
    }
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    }
});
const VerificationModel = mongoose_1.default.model('Verification', exports.VerificationSchema, 'Verification');
VerificationModel.createIndexes();
exports.default = VerificationModel;
//# sourceMappingURL=verification.model.js.map