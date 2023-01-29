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
const MDW = __importStar(require("../middlewares"));
const userValidate = __importStar(require("../validation"));
const service = __importStar(require("../services/user.service"));
const formatJson_1 = require("../utils/formatJson");
const middlewares_1 = require("../middlewares");
const userRouter = express_1.default.Router();
//get all user
userRouter.get('/users', middlewares_1.authenticate, MDW.wrapper(service.findMany), formatJson_1.formatJsonApiCollection);
//get user by id
userRouter.get('/users/:id', middlewares_1.authenticate, MDW.wrapper(service.findOneUser), formatJson_1.formatJsonApiResource);
//create new user
userRouter.post('/users', userValidate.createUserValidation, MDW.wrapper(service.create), MDW.createUserVerification, formatJson_1.formatJsonApiResource);
//replace by id
userRouter.put('/users/:id', userValidate.idValidation, (request, response, next) => {
    const data = request.body;
    service.replaceOne(request.params.id, data)
        .then(result => {
        if (result.matchedCount) {
            return response.json(data);
        }
        return response.send("user not found");
    })
        .catch(err => {
        throw err;
    });
});
//update by id
userRouter.patch('/users/:id', userValidate.idValidation, (request, response, next) => {
    const data = request.body;
    service.updateOneUser(request.params.id, data)
        .then(result => {
        if (result.matchedCount) {
            return response.json(data);
        }
        return response.send("user not found");
    })
        .catch(err => {
        throw err;
    });
});
//delete by id
userRouter.delete('/users/:id', userValidate.idValidation, (request, response, next) => {
    service.deleteOne(request.params.id)
        .then(result => {
        if (result.deletedCount) {
            return response.json();
        }
        return response.send("user not found");
    })
        .catch(err => {
        throw err;
    });
});
exports.default = userRouter;
//# sourceMappingURL=user.route.js.map