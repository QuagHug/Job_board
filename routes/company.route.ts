import express from 'express';
import _ from 'lodash'
import { formatJsonApiCollection, formatJsonApiResource } from '../utils/formatJson'
import * as MDW from '../middlewares';
import { EUserType } from '../interfaces';
import * as CompanyService from '../services/company.service'

const companyRouter = express.Router();

companyRouter.patch(
	"/:companyId/_upload_",
	MDW.authenticate,
	MDW.authorize([EUserType.recruiter])
)

companyRouter.get(
	"/:companyId",
	MDW.wrapper(CompanyService.findCompanyById),
	formatJsonApiResource
)



/**
 * @todo create company
 */
companyRouter.post(
	'/',
	// MDW.authenticate,
	// MDW.authorize([EUserType.recruiter]),
	// async (req, res, next) => {

	// 	const data = req.body;
	// 	const company = await CompanyService.create(data);

	// 	_.set(req, 'result', company)
	// 	next();
	// },
	MDW.wrapper(CompanyService.createCompany),
	formatJsonApiResource
)

companyRouter.get(
		'/',
		MDW.authenticate,
		MDW.authorize([EUserType.recruiter]),
		async (req, res, next) => {
	
			const name = req.query;
			const company = await CompanyService.findCompanyByName(name);
	
			_.set(req, 'result', company)
			next();
		},
		formatJsonApiResource
	)

/**
 * @todo get company detail
 */

companyRouter.patch(
		'/',
		MDW.authenticate,
		MDW.authorize([EUserType.recruiter]),
		async (req, res, next) => {
	
			const data = req.body;
			const company = await CompanyService.UpdateOne(req.user, data);
			_.set(req, 'result', company)
			next();
		},
		formatJsonApiResource
)
/**
 * @todo update company
 */

/**
 * @todo delete company
 */

export default companyRouter;
