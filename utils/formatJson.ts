import _ from "lodash";
import { IJsonApiCollection, IJsonApiResource, IPaginationResponse } from "./interface";
import { Request, Response, NextFunction } from "express";
import { IUser, UserModel } from "../models/user.model";
import { authenticate } from "passport";

const formatJsonApi = (result: any) : IJsonApiResource => {
    return {
        type: 'UserSchema',
        _id: result._id,
        attributes: _.omit(result, ['createdAt', 'updatedAt']),
        relationships: {},
        meta: {
            createdAt: result.createdAt,
            updatedAt: result.updatedAt
        }  
    }
}

export const formatJsonApiResource = (req: Request, res: Response, next: NextFunction) => {
    const result = _.get(req, "result", {}) as IUser;
    const formatedData: IJsonApiResource = formatJsonApi(result)
    res.json({data: formatedData});
}

export const formatJsonApiCollection = async (req: Request, res: Response, next: NextFunction) => {
    
    let page = parseInt(req.query.page as string) || 0;
    let limit = parseInt(req.query.page as string) || 10;
    let total = await UserModel.countDocuments();
    const result = _.get(req, "result", {}) as Array<IUser>;
    
    const responseData: IJsonApiCollection = {
        data: _.map(result, formatJsonApi),
        links: {
            self: req.protocol + '://' + req.get('host') + req.url + `?page=${page}`,
            first: req.protocol + '://' + req.get('host') + req.url + `?page=${0}`,
            last: req.protocol + '://' + req.get('host') + req.url + `?page=${Math.ceil(total/limit)-1}`,
            next: req.protocol + '://' + req.get('host') + req.url + `?page=${page < Math.ceil(total/limit)-1 ? page+1 : null}`,
            previous: req.protocol + '://' + req.get('host') + req.url + `?page=${page > 0 ? page-1 : null}`,
        },
        meta: {
            currentPage: page,
            itemCount: total%limit,
            itemsPerPage: limit,
            totalItems: total, 
            totalPages: Math.ceil(total/limit)
        }
    } 
    
    return res.json(responseData);
}

export const formatJsonVerification = async (req: Request, res: Response, next: NextFunction) => {
    const success = _.get(req, "success");
    if(!success) {
        return res.json({
            status: res.statusCode,
            detail: _.get(req, "errors")
        })
    }
    return res.json({
        data: formatJsonApi(_.get(req, "result")),
        authentication: _.get(req, "authentication"),
        links: {
            self: req.protocol + '://' + req.get('host') + req.originalUrl
        }
    })
}

