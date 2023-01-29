import { NextFunction, Request, Response } from "express";
import jsonwebtoken from 'jsonwebtoken';
import _ from 'lodash';
import * as UserService from '../services/user.service';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  // Headers Authorization: Bearer {{token}}
  // const jwt = _.last(_.split(_.get(req, 'headers.Authorization') as string, " "))
  const jwt = req.cookies.jwt;
  if (!jwt) return res.status(404).json({ message: "Token is missing" })

  try {
    const result = jsonwebtoken.verify(jwt, process.env.JWT_SECRET);

    const user = await UserService.findByEmail(_.get(result, "email"))

    _.set(req, 'user', user);
    res.status(200);
    return next()
  } catch (error) {
    res.status(401).json({ message: "Token is invalid" })
  }
}