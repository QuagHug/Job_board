import mongoose from 'mongoose';
import { IGeneral } from './general.model';
import bcrypt from 'bcryptjs';

export interface IUser extends IGeneral {
    email: String,
    dob: Date, 
    firstName: String,
    lastName: String,
    password: string
}

const schema = new mongoose.Schema({ 
    email: {
        type: String,
        required: true, 
        index: true,
        unique: true
    },
    emailConfirmed: {
        type: Boolean,
        required: true, 
    },
    dob: {
        type: Date
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 20
    }, 
    lastName: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 20
    },
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
}});

schema.pre('save', function(next) {
    if (!this.isNew && !this.isModified('password')) return next();

    return bcrypt.genSalt(10)
        .then(salt => {
            return bcrypt.hash(this.password.toString(), salt)
        })
        .then(hash => {
            this.password = hash;
            return next();
        })
        .catch(err => {
            throw err;
        })
})

export const UserModel = mongoose.model<IUser>('user', schema);

UserModel.createIndexes();
