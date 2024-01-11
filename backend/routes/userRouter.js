import bcrypt from 'bcryptjs';
import express from "express";
import expressAsyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import User from "../models/userModel.js";
import { baseUrl, generateToken, isAuth } from '../utils.js';
const userRouter = express.Router();

userRouter.post(
    '/signin',
    expressAsyncHandler(async (req,res) => {
      const user = await User.findOne({
        $or: [{ phone: req.body.phone }, { email: req.body.phone }],
      });
        if(user){
            if(bcrypt.compareSync(req.body.password, user.password)){
                res.send({
                    _id:user._id,
                    name:user.name,
                    email:user.email,
                    phone:user.phone,
                    isAdmin: user.isAdmin,
                    role:user.role,
                    token: generateToken(user.toObject()),
                })
            } else {
              res.status(401).send({ message: "Invalid email or password" });
            }
        } else{
          res.status(401).send({message:'Invalid email or password'});
        }
        
    })
)

userRouter.post(
    '/signup',
        expressAsyncHandler ( async(req,res) => {
          // checking if email is already in use
          const email = await User.findOne({ email: req.body.email });
          if (!email) {
            // checking if phone number already in use
            const phone = await User.findOne({ phone: req.body.phone });
            if (!phone) {
               const newUser = new User({
                 name: req.body.name,
                 email: req.body.email,
                 phone: req.body.phone,
                 role: "user",
                 password: bcrypt.hashSync(req.body.password),
               });

               const user = await newUser.save();
               res.send({
                 _id: user._id,
                 name: user.name,
                 email: user.email,
                 phone: user.phone,
                 isAdmin: user.isAdmin,
                 role: user.role,
                 token: generateToken(user),
               });
            } else {
              res
                .status(401)
                .send({ message: "Email or Phone number already in use!" });
            }
          } else {
            res.status(401).send({ message: "Email or Phone number already in use!" });
          }
        })
    )

userRouter.put(
        '/profile',
        isAuth,
        expressAsyncHandler(async (req, res) => {
          const user = await User.findById(req.user._id);
          if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.phone = req.body.phone || user.phone;
            if (req.body.password) {
              user.password = bcrypt.hashSync(req.body.password, 8);
            }
      
            const updatedUser = await user.save();
            res.send({
              _id: updatedUser._id,
              name: updatedUser.name,
              email: updatedUser.email,
              phone:updatedUser.phone,
              isAdmin: updatedUser.isAdmin,
              token: generateToken(updatedUser),
            });
          } else {
            res.status(404).send({ message: 'User not found' });
          }
          // // checking if email is already in use
          // const email = await User.findOne({ email: req.body.email || user.email });
          // if (!email) {
          //   // checking if phone number is already in use
          //   const phone = await User.findOne({ phone: req.body.phone || user.phone });
          //   if (!phone) {
              
          //   }
          // } else {
          //   res
          //     .status(401)
          //     .send({ message: "Email or Phone number already in use!" });
          // }
        })
);

userRouter.post(
  '/forget-password',
  expressAsyncHandler(async (req, res) => {
    const email = req.body.email.toLowerCase();
    const user = await User.findOne({ email: email });

    if (user) {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '3h',
      });
      user.resetToken = token;
      await user.save();

      //reset link
      // console.log(`${baseUrl()}/reset_password/${token}`);

      // mailgun()
      //   .messages()
      //   .send(
      //     {
      //       from: `nasmus_shahadat@nasmus.xyz`,
      //       to: `${user.name} <${user.email}>`,
      //       subject: `Reset Password`,
      //       html: ` 
      //        <p>Please Click the following link to reset your password:</p> 
      //        <a href="${baseUrl()}/reset_password/${token}"}>Reset Password</a>
      //        `,
      //     },
      //     (error, body) => {
      //       console.log(error);
      //       console.log(body);
      //     }
      //   );
      
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASSWORD,
        },
      });

      let mailOptions = {
        from: "woodfeeds@gmail.com",
        to: req.body.email,
        subject: "Reset Password - woodfeeds.com",
        text: `Please Click the following link to reset your password: ${baseUrl()}/reset_password/${token}`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
           res.send({ message: "We sent reset password link to your email." });
        }
      });
      
      // res.send({ message: "We sent reset password link to your email." });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  })
);

userRouter.post(
  '/reset-password',
  expressAsyncHandler(async (req, res) => {
    jwt.verify(req.body.token, process.env.JWT_SECRET, async (err, decode) => {
      if (err) {
        res.status(401).send({ message: 'Invalid Token' });
      } else {
        const user = await User.findOne({ resetToken: req.body.token });
        if (user) {
          if (req.body.password) {
            user.password = bcrypt.hashSync(req.body.password, 8);
            await user.save();
            res.send({
              message: 'Password reseted successfully',
            });
          }
        } else {
          res.status(404).send({ message: 'User not found' });
        }
      }
    });
  })
);

export default userRouter;