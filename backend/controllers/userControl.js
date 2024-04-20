
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserModel = require('./../models/userModel');

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRES_IN });
};
const hashPassword = async (password) => {
  return await bcrypt.hash(password, 12);
}
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
}

const User = {
  async auth(req, res) {
    try {
      const { email, password } = req.body;

      let user = await UserModel.findOne({ email });
      
      if (!user) {
        user = await UserModel.create({ email, password: await hashPassword(password) });
      } else {
        const passwordMatch = await comparePassword(password, user.password);
        if (!passwordMatch) {
          return res.status(StatusCodes.UNAUTHORIZED).send({
            success: false,
            message: "Authentication failed",
            data: null,
          });
        }
      }
      
      const token = generateToken(user._id);

      res.status(StatusCodes.OK).send({
        success: true,
        message: "Authentication successful",
        data: token,
      });

    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        success: false,
        message: error.message,
        data: null,
      });
    }
  },

  async getUserProfile(req, res) {
    try {
      const user = await UserModel.findById(req.userId, '-password');

      res.status(StatusCodes.OK).send({
        success: true,
        message: '',
        data: user,
      });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        success: false,
        message: error.message,
        data: null,
      });
    }
  },

  async updateUserProfile(req, res) {
    try {
      // await UserModel.findByIdAndUpdate(req.userId, req.body);
      // profilePhoto from file 

      // const fileName = profilePhoto.name;
      // file: {
      //   fieldname: 'profilePhoto',
      //   originalname: 'photo1711302385.jpeg',
      //   encoding: '7bit',
      //   mimetype: 'image/jpeg',
      //   path: 'https://res.cloudinary.com/cantacloud31/image/upload/v1712264041/users/1712264038389_photo1711302385.jpeg.jpg',
      //   size: 124792,
      //   filename: 'users/1712264038389_photo1711302385.jpeg'
      // },
      // console.log( req);
      const { path } = req.file;

      await UserModel.findByIdAndUpdate(req.userId, { profilePhoto: path, ...req.body });

      res.status(StatusCodes.OK).send({
        success: true,
        message: 'User profile updated successfully',
        data: null,
      });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        success: false,
        message: error.message,
        data: null,
      });
    }
  },      
}

module.exports = User;