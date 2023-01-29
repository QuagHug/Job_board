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
const lodash_1 = __importDefault(require("lodash"));
const formatJson_1 = require("../utils/formatJson");
const MDW = __importStar(require("../middlewares"));
const interfaces_1 = require("../interfaces");
const CompanyService = __importStar(require("../services/company.service"));
const companyRouter = express_1.default.Router();
companyRouter.patch("/:companyId/_upload_", MDW.authenticate, MDW.authorize([interfaces_1.EUserType.recruiter]));
companyRouter.get("/:companyId", MDW.wrapper(CompanyService.findCompanyById), formatJson_1.formatJsonApiResource);
/**
 * @todo create company
 */
companyRouter.post('/', 
// MDW.authenticate,
// MDW.authorize([EUserType.recruiter]),
// async (req, res, next) => {
// 	const data = req.body;
// 	const company = await CompanyService.create(data);
// 	_.set(req, 'result', company)
// 	next();
// },
MDW.wrapper(CompanyService.createCompany), formatJson_1.formatJsonApiResource);
companyRouter.get('/', MDW.authenticate, MDW.authorize([interfaces_1.EUserType.recruiter]), async (req, res, next) => {
    const name = req.query;
    const company = await CompanyService.findCompanyByName(name);
    lodash_1.default.set(req, 'result', company);
    next();
}, formatJson_1.formatJsonApiResource);
/**
 * @todo get company detail
 */
companyRouter.patch('/', MDW.authenticate, MDW.authorize([interfaces_1.EUserType.recruiter]), async (req, res, next) => {
    const data = req.body;
    const company = await CompanyService.UpdateOne(req.user, data);
    lodash_1.default.set(req, 'result', company);
    next();
}, formatJson_1.formatJsonApiResource);
/**
 * @todo update company
 */
/**
 * @todo delete company
 */
exports.default = companyRouter;
//# sourceMappingURL=company.route.js.map