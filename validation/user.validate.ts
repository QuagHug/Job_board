import { Request, Response, NextFunction} from 'express'
import validator from 'validator'
import {UserModel} from '../models/user.model'
import _ from 'lodash'
import mongoose from 'mongoose'

interface IErrors {
    email?: String,
    firstName?: String,
    lastName?: String
}

export async function createUserValidation(req: Request, res: Response, next:NextFunction) {
    const errors: IErrors = {};
    const { email, firstName, lastName} = req.body;
    
    if(!email) {
        errors.email = "Email is required";
    }
    else if(validator.isEmpty(email)) {
        errors.email = "Email is not empty";
    }
    else if(!validator.isEmail(email)) {
        errors.email = "Email is invalid";
    }
    else {
        const foundUser = await UserModel.findOne({ email})
        if(foundUser) errors.email = "Email is in used";
    }

    if(!firstName) {
        errors.firstName = "First name is required";
    }
    else if(!validator.isLength(firstName, {min: 2, max: 20})) {
        errors.firstName = "FirstName must be from 2-20 characters";
    }
    
    if(!lastName) {
        errors.lastName = "Last name is required";
    }
    else if(!validator.isLength(lastName, {min: 2, max: 20})) {
        errors.lastName = "Last name must be from 2-20 characters";
    }

    if(_.isEmpty(errors)) return next();
    return res.status(404).json({
        status: 404,
        detail: errors
    })
}

export function idValidation(req: any, res: any, next:any) {
    if(!mongoose.isValidObjectId(req.params.id)) {
        return res.status(404).json({
            message: "Bad request",
            errors: "Invalid id"
        })
    }
    next();
}
