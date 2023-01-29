"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyModel = exports.CompanySchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.CompanySchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        require: true
    },
    logoUrl: {
        type: String,
        require: true
    },
    description: {
        type: String,
    },
    address: {
        type: String,
    },
    creatorId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        require: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    }
});
exports.CompanyModel = mongoose_1.default.model('company', exports.CompanySchema);
//# sourceMappingURL=company.model.js.map