import nodemailer from "nodemailer";

const mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS
    }
})

export default mailTransporter;

