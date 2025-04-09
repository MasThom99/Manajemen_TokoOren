import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const { EMAIL, EMAIL_PASS } = process.env;
export const sendEmail = async (dataEmail) => {
  return new Promise(async (resolveContent, reject) => {
    try {
      const transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: EMAIL,
          pass: EMAIL_PASS,
        },
      });
      const response = await transport.sendEmail(dataEmail)
      resolve(response)
    } catch (error) {}
  });
};
