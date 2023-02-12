"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const schema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    emailConfirmed: {
        type: Boolean,
        required: true,
    },
    dob: {
        type: Date
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 20
    },
    lastName: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 20
    },
    userType: {
        type: String,
        required: true,
    }
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});
schema.pre('save', function (next) {
    if (!this.isNew && !this.isModified('password'))
        return next();
    return bcryptjs_1.default.genSalt(10)
        .then(salt => {
        return bcryptjs_1.default.hash(this.password.toString(), salt);
    })
        .then(hash => {
        this.password = hash;
        return next();
    })
        .catch(err => {
        throw err;
    });
});
exports.UserModel = mongoose_1.default.model('user', schema);
exports.UserModel.createIndexes();
//# sourceMappingURL=user.model.js.map