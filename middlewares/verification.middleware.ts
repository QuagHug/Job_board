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
			res.cookie("jwt", jwt, { maxAge: exTime, domain: ".job-board-quaghug.vercel.app" , httpOnly: true, secure: true, sameSite: "none" });
			res.header("access-control-expose-headers", "set-cookie");
			_.set(req, "success", true);
			return next();
		})
		.catch(err => {
			_.set(req, "success", false);
			_.set(req, "errors", [err.message]);
			return next();
		})
    
}

export const createUserVerification = async (req: Request, res: Response, next: NextFunction) => {
	const userId = _.chain(req).get("result").get("_id").value();
	const userEmail = _.chain(req).get("result").get("email").value();
	const jwt = jsonwebtoken.sign({ userId }, "mk98mb2RAZn^78tV!bok")
	const url = `https://job-board-quaghug.vercel.app/verification/email/${jwt}`;

	await mailTransporter.send({
		to: userEmail,
		from: "hungluudemo@gmail.com",
		subject: 'Confirm Email',
		html: `Please click this link to confirm your email: <a href="${url}">HERE</a>`,
	})
	.then(res => {
		return next();
	})
	.catch(err => console.log)
}

export const emailConfirmation = async (req: Request, res: Response, next: NextFunction) => {
	const { token } = req.params;
	try {
		const result = jsonwebtoken.verify(token, "mk98mb2RAZn^78tV!bok");
		const userId = _.get(result, "userId");
		await SVC.updateOneUser(userId, {emailConfirmed: true});
		// const user = await SVC.findOneUser({ _id: userId });
		// _.set(req, "result", user);
		return res.redirect("https://job-board-client-zeta.vercel.app/index.html");
	}
	catch(err) {
		throw err;
	}
}