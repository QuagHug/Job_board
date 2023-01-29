"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobModel = exports.JobSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const interfaces_1 = require("../interfaces");
exports.JobSchema = new mongoose_1.default.Schema({
    companyId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: 'Company'
    },
    recruiterId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    mode: {
        type: String,
        required: true,
        default: interfaces_1.EMode.onsite
    },
    overview: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    requirement: {
        type: String,
        required: true
    },
    benefit: {
        type: String,
        required: true
    },
    pdfUrl: {
        type: String,
    },
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    }
});
exports.JobModel = mongoose_1.default.model('job', exports.JobSchema);
//# sourceMappingURL=job.model.js.map