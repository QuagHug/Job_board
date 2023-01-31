import express from 'express';
import _ from 'lodash'
import { formatJsonApiResource, formatJsonVerification } from '../utils/formatJson';
import * as MDW from "../middlewares" 
import cors from "cors"

const verificationRouter = express.Router();

verificationRouter.post(
  '/',
  cors(),
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