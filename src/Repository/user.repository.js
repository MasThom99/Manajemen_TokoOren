import { AppDataSource } from "../config/database.js";
import { UserEntity } from "../Entity/users.entity.js";
import { TokenEntity } from "../Entity/token.entity.js";
import { RoleEntity } from "../Entity/role.entity.js";
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
    this.roleRepository = AppDataSource.getRepository(RoleEntity);
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
    const validationError = this.validation(req);
    if (validationError) {
      return res.status(400).json({
        validationError,
      });
    }
    const { username, password, roleId } = req.body;
    const existingUser = await this.userRepository.findOne({
      where: { username },
    });
    if (existingUser) {
      return res.status(409).json({
        status: false,
        message: "username already exist",
        data: null,
      });
    }
    const dataRole = await this.roleRepository.findOne({
      where: { id: roleId },
    });
    if (!dataRole) {
      return res.status(404).json({
        status: false,
        message: "id role not found",
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
    console.log(username);
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
      html: activateAccount(
        `http://localhost:1234/user/activate/${verificationToken}`
      ),
    };
    console.log(emailData);
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

  async login(req, res) {
    const validationError = this.validation(req);
    if (validationError) {
      return res.status(400).json({
        validationError,
      });
    }
    const { username, password } = req.body;
    const user = await this.userRepository.findOne({
      where: { username: username },
    });
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "user not found",
      });
    }
    if (!user.isVerified) {
      return res.status(403).json({
        status: false,
        message: "User isn't veriied",
        data: null,
      });
    }
    const comparePassword = bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(401).json({
        status: false,
        message: "password is wrong",
      });
    }
    const payLoad = {
      username: user.username,
      id: user.id,
      profile_photo: user.profile_photo,
      roleId: user.roleId,
    };
    const token = jwt.sign(payLoad, JWT_SECRET);
    return res.status(201).json({
      username: user.username,
      id: user.id,
      profile_photo: user.profile_photo,
      token: token,
    });
  }

  async list(req, res) {
    const user = await this.userRepository.find({
      relations: ["role"],
    });
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "user not found",
      });
    }
    return res.status(200).json({
      status: true,
      message: "list user",
      data: user,
    });
  }

  async detail(req, res) {
    const { id } = req.params;
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "user not found",
      });
    }
    return res.status(200).json({
      status: true,
      message: "list user",
      data: user,
    });
  }

  async update(req, res) {
    try {
      const validationError = this.validation(req);
      if (validationError) {
        return res.status(400).json({
          validationError,
        });
      }
      const { id } = req.params;
      const { username, password, profile_photo, roleId } = req.body;
      const user = await this.userRepository.findOne({
        where: { id },
      });
      if (!id) {
        return res.status(404).json({
          status: false,
          message: "user not found",
        });
      }

      const dataRole = await this.roleRepository.findOne({
        where: { id: roleId },
      });
      if (!id) {
        return res.status(404).json({
          status: false,
          message: "role id not found",
        });
      }

      const hashPassword = await bcrypt.hash(password, 10);
      console.log(hashPassword);
      await this.userRepository.update(id, {
        username,
        password :hashPassword,
        profile_photo,
        roleId,
      });
      const newData = await this.userRepository.findOne({
        where: { id },
      });
      return res.status(200).json({
        status: true,
        message: "Updated user succesfully",
        data: newData,
      });
    } catch (error) {}
  }

  async delete(req, res) {
    const { id } = req.params;
    const user = await this.userRepository.findOne({
      where: { id: id },
    });
    if (!id) {
      return res.status(404).json({
        status: false,
        message: "user not found",
      });
    }
    await this.userRepository.softDelete(id);
    return res.status(200).json({
      status: true,
      message: "user deleted successfully",
      data: user,
    });
  }

  async forgotPassword(req, res) {
    const { username, callback } = req.body;
    const user = await this.userRepository.findOne({
      where: { username },
    });
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "user not found",
      });
    }
    const verificationToken = jwt.sign({ id: user.id }, JWT_SECRET);
    const token = this.tokenRepository.create({
      id: user.id,
      token: verificationToken,
    });
    const emailData = {
      from: EMAIL,
      to: user.username,
      subject: "requested to change password",
      text: `here is your token ${verificationToken}`,
      html: activateAccount(),
    };
    try {
      // await sendEmail(emailData);
      return res.status(200).json({
        status: true,
        message: `please check your email, ${callback}/${verificationToken}`,
      });
    } catch (error) {
      console.log(error);
    }
  }
  async changePassword(req, res) {
    try {
      console.log(req.query);
      const { token } = req.query;
      const { password, confirmPassword } = req.body;
      if (!token) {
        return res.status(404).json({
          status: false,
          message: "token not found",
        });
      }
      if (!password) {
        return res.status(404).json({
          status: false,
          message: "user not found",
        });
      }
      if (password !== confirmPassword) {
        return res.status(400).json({
          status: false,
          message: "password doesnt match",
        });
      }
      const decoded = jwt.verify(token, JWT_SECRET);
      const userId = decoded.id;
      const user = await this.userRepository.findOne({
        where: { id: userId },
      });
      if (!user) {
        return res.status(404).json({
          status: false,
          message: "user not found",
        });
      }
      const hashPassword = bcrypt.hash(password, 10);
      user.password = hashPassword;
      await this.userRepository.update(user.id, user);

      try {
        const dataToken = await this.tokenRepository.findOne({
          where: { token },
        });
        if (!token) {
          return res.status(404).json({
            status: false,
            message: "token not found",
          });
        }
        dataToken.isExpired = true;
        const updateToken = await this.userRepository.save(dataToken);
      } catch (error) {
        console.log(error);
      }

      return res.status(200).json({
        status: true,
        message: "reset password succesfully",
        data: {
          id: user.id,
          username: user.username,
          profile_photo: user.profile_photo,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async googleLogin(req, res, next) {
    passport.authenticate("google", { scope: ["profile", "email"] })(
      req,
      res,
      next
    );
  }
  async googleCallback(req, res, next) {
    passport.authenticate("google", (error, user) => {
      if (error) {
        return next(error);
      }
      if (!user) {
        return res.status(401).json({
          status: false,
          message: "authentication failed",
        });
      }
      return res.status(200).json({
        status: true,
        message: "login success",
        data: { user: user.user, token: user.token },
      });
    })(req, res, next);
  }
}

export default UserRepository;
