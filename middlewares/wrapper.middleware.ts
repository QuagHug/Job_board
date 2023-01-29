import { NextFunction, Request, Response } from 'express';
import _ from 'lodash'

export const wrapper = (fn: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {

    // post
    const user = req.user;
    const body = req.body;
		const cookies = req.cookies;
    const params = req.params;
    const query = req.query;
    const data = { ...body, ...params, ...query, ...cookies, user }
    const result = await fn(data);

    _.set(req, 'result', result);
    return next()
  }
}