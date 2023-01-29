import express from 'express'
import {UserModel} from '../models/user.model'
import * as MDW from '../middlewares'
import * as userValidate from '../validation'
import * as service from '../services/user.service'
import { formatJsonApiResource, formatJsonApiCollection } from '../utils/formatJson'
import _ from 'lodash'
import { authenticate } from '../middlewares'

const userRouter = express.Router()

//get all user
userRouter.get('/users', 
    authenticate,
    MDW.wrapper(service.findMany),
    formatJsonApiCollection
)

//get user by id
userRouter.get('/users/:id',
    authenticate,
    MDW.wrapper(service.findOneUser),
    formatJsonApiResource
)

//create new user
userRouter.post('/users', 
    userValidate.createUserValidation, 
    MDW.wrapper(service.create),
    MDW.createUserVerification,
    formatJsonApiResource
)

//replace by id
userRouter.put('/users/:id', userValidate.idValidation, (request, response, next) => {
    const data = request.body;
    service.replaceOne(request.params.id ,data)
    .then(result => {
        if(result.matchedCount) {
            return response.json(data);
        }
        return response.send("user not found")
    })
    .catch(err => {
        throw err;
    })
})

//update by id
userRouter.patch('/users/:id', userValidate.idValidation, (request, response, next) => {
    const data = request.body;
    service.updateOneUser(request.params.id, data)
    .then(result => {
        if(result.matchedCount) {
            return response.json(data);
        }
        return response.send("user not found")
    })
    .catch(err => {
        throw err;
    })
})

//delete by id
userRouter.delete('/users/:id', userValidate.idValidation, (request, response, next) => {
    service.deleteOne(request.params.id)
    .then(result => {
        if(result.deletedCount) {
            return response.json();
        }
        return response.send("user not found")
    })
    .catch(err => {
        throw err;
    })
})


export default userRouter