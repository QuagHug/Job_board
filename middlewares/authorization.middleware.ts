import { NextFunction, Request, Response } from "express"
import { EUserType } from "../interfaces"
import _ from 'lodash';

// ['candidate'] <=> 'candidate' => next()
// ['candidate'] <=> 'recruiter' => err
// ['candidate', 'recruiter'] <=> 'candidate' => next()
// ['candidate'] <=> 'recruiter' => next
export const authorize = (userTypeArray: Array<EUserType>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userType = _.get(req, 'user.userType');

    if (_.includes(userTypeArray, userType)) return next();
    return res.status(403).json({ message: 'You do not have permission(s)' })
  }
}