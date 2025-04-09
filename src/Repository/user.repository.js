import { AppDataSource } from "../config/database.js";
import { UserEntity } from "../Entity/users.entity.js";
import { TokenEntity } from "../Entity/token.entity.js";
import bcrypt from "bcrypt";
import { sendEmail } from "../utils/email/email.js";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import passport from "../utils/passport.js";
import { activateAccount } from "../utils/email/activateAccountEmail.js";

const { JWT_SECRET, EMAIL } = process.env;

class UserRepository {
  constructor() {
    this.userRepository = AppDataSource.getRepository(UserEntity);
    this.tokenRepository = AppDataSource.getRepository(TokenEntity);
  }
  validation(req) {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return {
        status: false,
        message: "error validation",
        error: error.array(),
      };
    }
  }

  async register(req, res) {
    const validationError = this.validationResult(req);
    if (validationError) {
      return res.status(400).json({
        validationError,
      });
    }
    const { username, password, roleId } = req.body;
    const existingUser = await this.UserRepository.findOne({
      where: { username },
    });
    if (existingUser) {
      return res.status(409).json({
        status: false,
        message: "password less than 6 character",
        data: null,
      });
    }
    // menjaga keamanan enkripsi password yang ada di user menggubkan bcrypt
    const hashPassword = await bcrypt.hash(password, 10);
    const register = this.userRepository.create({
      // ..data
      username,
      password: hashPassword,
      roleId,
    });
    await this.userRepository.save(register);
    const verificationToken = jwt.sign(
      {
        id: register.id,
      },
      JWT_SECRET
    );
    const token = this.tokenRepository.create({
      userId: register.id,
      token: verificationToken,
    });
    await this.tokenRepository.save(token);

    const emailData = {
      from: EMAIL,
      to: register.username,
      subject: "verify your email",
      text: `here is your token ${verificationToken}`,
      html: activateAccount(),
    };

    try {
      await sendEmail(emailData);
      return res.status(200).json({
        status: true,
        message: "User Register Succesfully",
        data: {
          id: register.id,
          username: register.username,
          profile_photo: register.profile_photo,
          isVerified: register.isVerified,
        },
      });
    } catch (error) {
      return res.status(500).json({
        message: "failed to send email",
      });
    }
  }

  async activateUser(req, res) {
    const { token } = req.params;
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.id;
    const existingUser = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!existingUser) {
      return res.status(404).json({
        status: false,
        message: "user not found",
      });
    }
    if (existingUser.isVerified) {
      return res.status(409).json({
        message: "user already activated",
      });
    }
    existingUser.isVerified = true;
    await this.userRepository.save(existingUser);
    return res.render("message");
  }
}

export default UserRepository;
