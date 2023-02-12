"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatJsonVerification = exports.formatJsonApiCollection = exports.formatJsonApiResource = void 0;
const lodash_1 = __importDefault(require("lodash"));
const user_model_1 = require("../models/user.model");
const formatJsonApi = (result) => {
    return {
        type: 'UserSchema',
        _id: result._id,
        attributes: lodash_1.default.omit(result, ['createdAt', 'updatedAt']),
        relationships: {},
        meta: {
            createdAt: result.createdAt,
            updatedAt: result.updatedAt
        }
    };
};
const formatJsonApiResource = (req, res, next) => {
    const result = lodash_1.default.get(req, "result", {});
    const formatedData = formatJsonApi(result);
    res.json({ data: formatedData });
};
exports.formatJsonApiResource = formatJsonApiResource;
const formatJsonApiCollection = async (req, res, next) => {
    let page = parseInt(req.query.page) || 0;
    let limit = parseInt(req.query.page) || 10;
    let total = await user_model_1.UserModel.countDocuments();
    const result = lodash_1.default.get(req, "result", {});
    const responseData = {
        data: lodash_1.default.map(result, formatJsonApi),
        links: {
            self: req.protocol + '://' + req.get('host') + req.url + `?page=${page}`,
            first: req.protocol + '://' + req.get('host') + req.url + `?page=${0}`,
            last: req.protocol + '://' + req.get('host') + req.url + `?page=${Math.ceil(total / limit) - 1}`,
            next: req.protocol + '://' + req.get('host') + req.url + `?page=${page < Math.ceil(total / limit) - 1 ? page + 1 : null}`,
            previous: req.protocol + '://' + req.get('host') + req.url + `?page=${page > 0 ? page - 1 : null}`,
        },
        meta: {
            currentPage: page,
            itemCount: total % limit,
            itemsPerPage: limit,
            totalItems: total,
            totalPages: Math.ceil(total / limit)
        }
    };
    return res.json(responseData);
};
exports.formatJsonApiCollection = formatJsonApiCollection;
const formatJsonVerification = async (req, res, next) => {
    const success = lodash_1.default.get(req, "success");
    if (!success) {
        return res.json({
            status: res.statusCode,
            detail: lodash_1.default.get(req, "errors")
        });
    }
    return res.json({
        data: formatJsonApi(lodash_1.default.get(req, "result")),
        authentication: lodash_1.default.get(req, "authentication"),
        links: {
            self: req.protocol + '://' + req.get('host') + req.originalUrl
        }
    });
};
exports.formatJsonVerification = formatJsonVerification;
//# sourceMappingURL=formatJson.js.map