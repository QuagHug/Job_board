"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatModel = exports.ChatSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.ChatSchema = new mongoose_1.default.Schema({
    from_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        require: true
    },
    to_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        require: true
    },
    message: {
        type: String,
        require: true
    }
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    }
});
exports.ChatModel = mongoose_1.default.model('chat', exports.ChatSchema);
//# sourceMappingURL=chat.model.js.map