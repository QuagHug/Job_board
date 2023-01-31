import express from 'express';
import _ from 'lodash'
import { formatJsonApiResource, formatJsonVerification } from '../utils/formatJson';
import * as MDW from "../middlewares" 

const verificationRouter = express.Router();

verificationRouter.post(
  '/',
  (req, res, next) => {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    // Set custom headers for CORS
    res.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Custom-Header");

    if (req.method === "OPTIONS") {
        return res.status(200);
    }

    return next();
  },
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