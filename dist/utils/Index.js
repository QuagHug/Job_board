"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatJsonApiCollection = exports.formatJsonApiResource = void 0;
const lodash_1 = __importDefault(require("lodash"));
const formatJsonApi = (result) => {
    return {
        type: 'UserSchema',
        _id: result._id,
        attributes: lodash_1.default.omit(result, ['_id', 'createdAt', 'updatedAt']),
        relationships: {},
        meta: {
            createdAt: result.createdAt,
            updatedAt: result.updatedAt
        }
    };
};
const formatJsonApiResource = (req, res, next) => {
    const result = lodash_1.default.get(req, "result", {});
    const data = formatJsonApi(result);
    res.json({ data });
};
exports.formatJsonApiResource = formatJsonApiResource;
const formatJsonApiCollection = (req, res, next) => {
    const result = lodash_1.default.get(req, "result", {});
    const paginationData = lodash_1.default.get(req, "paginationData", {});
    const responseData = {
        data: lodash_1.default.map(result, formatJsonApi),
        links: {
            self: req.protocol + '://' + req.get('host') + req.url + `?page=${paginationData.currentPage}`,
            first: req.protocol + '://' + req.get('host') + req.url + `?page=${0}`,
            last: req.protocol + '://' + req.get('host') + req.url + `?page=${paginationData.totalPages - 1}`,
            next: req.protocol + '://' + req.get('host') + req.url + `?page=${paginationData.currentPage < paginationData.totalPages - 1 ? paginationData.currentPage + 1 : null}`,
            previous: req.protocol + '://' + req.get('host') + req.url + `?page=${paginationData.currentPage > 0 ? paginationData.currentPage - 1 : null}`,
        },
        meta: paginationData
    };
    res.json(responseData);
};
exports.formatJsonApiCollection = formatJsonApiCollection;
//# sourceMappingURL=index.js.map