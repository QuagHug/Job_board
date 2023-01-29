import express from 'express';
import _ from 'lodash'
import { formatJsonApiResource, formatJsonVerification } from '../utils/formatJson';
import * as MDW from "../middlewares" 

const verificationRouter = express.Router();

verificationRouter.post(
  '/',
  MDW.verification,
  formatJsonVerification
)

verificationRouter.get(
  '/email/:token',
  // MDW.authenticate,
  MDW.emailConfirmation,
  formatJsonApiResource
)

export default verificationRouter;