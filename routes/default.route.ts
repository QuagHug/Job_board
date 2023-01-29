import express from 'express';
import _ from 'lodash'
import { formatJsonApiCollection, formatJsonApiResource } from '../utils/formatJson'
import * as MDW from '../middlewares';
import { EUserType } from '../interfaces';
import * as CompanyService from '../services/company.service'

const defaultRouter = express.Router();

defaultRouter.get(
	"/",
    MDW.authenticate
)

defaultRouter.get(
	"/:defaultId",
	MDW.wrapper(CompanyService.findCompanyById),
	formatJsonApiResource
)

export default defaultRouter;