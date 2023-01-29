import express from 'express';
import * as UserService from '../services/user.service'
import _ from 'lodash'
import { formatJsonApiResource } from '../utils/formatJson';
import { authenticate } from '../middlewares/authentication.middleware';

const meRouter = express.Router();

/**
 * @todo get me
 */
meRouter.get(
  '/me',
  authenticate,
  (req, res, next) => {
    _.set(req, 'result', req.user)
    next()
  },
  formatJsonApiResource
)

/**
 * @todo update password
 */
meRouter.patch(
  '/me/update-password',
  authenticate,
  async (req, res, next) => {
    const data = req.body; // oldPassword, newPassword, newPassword2
    data.userId = _.get(req, "user._id");
    const result = await UserService.updatePassword(data)

    _.set(req, 'result', result)
    next();
  },
  formatJsonApiResource
)

meRouter.patch(
    '/me/update-profile',
    authenticate,
    async (req, res, next) => {
      const data = req.body; // oldPassword, newPassword, newPassword2
      data.userId = _.get(req, "user._id");
      const result = await UserService.updateOneUser(data.userId, data);
  
      _.set(req, 'result', result)
      next();
    },
    formatJsonApiResource
  )
  

/**
 * @todo update user/profile
 */



export default meRouter;
