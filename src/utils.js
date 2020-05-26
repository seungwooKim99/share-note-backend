import crypto from "crypto";
import { randomCodes } from "./randomCodes";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";

export const hash = (password) => {
    return crypto.createHmac('sha256', process.env.SECRET_KEY).update(password).digest('hex');
};

export const generateSecret = () => {
    const randomNumber = Math.floor(Math.random() * randomCodes.length);
    return `${randomCodes[randomNumber]}`;
};

export const sendSecretMail = (email, signUpSecret) => {
    const mail = {
        from: "seungwookim@sharenote.com",
        to: email,
        subject: '이메일 주소를 인증하고 Share Note 계정 가입을 완료하세요.',
        html: `
        <h1><strong>Share Note 가입을 환영합니다!</strong></h1><br><br>
            안녕하세요. 안전한 서비스를 위하여 이메일 인증을 완료하여 주시기 바랍니다.
            <strong>${signUpSecret}</strong>을 인증 칸에 입력해주세요.<br>
        <hr><h5>계정 보안을 위해 이메일 주소를 확인하세요.</h5>
        `
    };

    var options = {
        auth: {
            api_user: process.env.SENDGRID_USERNAME,
            api_key: process.env.SENDGRID_PASSWORD
        }
    };

    var client = nodemailer.createTransport(sgTransport(options));
    client.sendMail(mail, function (err, info) {
        if (err) {
            return false;
        }
    });

    return true;
};