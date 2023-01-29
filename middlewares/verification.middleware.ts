import { Request, Response, NextFunction, json } from "express"
import _ from "lodash";
import { UserModel } from "../models/user.model";
import jsonwebtoken from 'jsonwebtoken'
import bcrypt from 'bcryptjs';
import mailTransporter from "../utils/mailservice";
import * as SVC from "../services";

const exTime = 24 * 60 * 60 * 1000;

const createJwt = (email: string) => {
	return jsonwebtoken.sign({ email }, process.env.JWT_SECRET, {
		expiresIn: '1d'
	})
}

export const verification = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    UserModel.findOne({ email })
		.then(user => {
			if (!user) {
				res.status(404);
				return Promise.reject({
				message: "User not found"
			})}
			_.set(req, "result", user);
			return bcrypt.compare(password, user.password);
		})
		.then(isMatched => {
			if (!isMatched) {
				res.status(401);
				return Promise.reject({
				message: "Email and password not match"
			})}
			// jwt
			return createJwt(email);
		})
		.then(async jwt => {
			res.cookie("jwt", jwt, { maxAge: exTime });
			_.set(req, "success", true);
			return next();
		})
		.catch(err => {
			_.set(req, "success", false);
			_.set(req, "errors", [err.message]);
			return next();
		})
    
}

export const createUserVerification = (req: Request, res: Response, next: NextFunction) => {
	const userId = _.chain(req).get("result").get("_id").value();
	const userEmail = _.chain(req).get("result").get("email").value();
	const jwt = jsonwebtoken.sign({ userId }, "mk98mb2RAZn^78tV!bok")
	const url = `http://localhost:4000/verification/email/${jwt}`;

	mailTransporter.sendMail({
		to: userEmail,
		subject: 'Confirm Email',
		html: `Please click this link to confirm your email: <a href="${url}">HERE</a>`,
	});
	return next();
}

export const emailConfirmation = async (req: Request, res: Response, next: NextFunction) => {
	const { token } = req.params;
	try {
		const result = jsonwebtoken.verify(token, "mk98mb2RAZn^78tV!bok");
		const userId = _.get(result, "userId");
		await SVC.updateOneUser(userId, {emailConfirmed: true});
		const user = await SVC.findOneUser({ _id: _.get(result, "userId")});
		_.set(req, "result", user);
	}
	catch(err) {
		throw err;
	}
	res.redirect("http://127.0.0.1:5501/client/");
	return next();
}