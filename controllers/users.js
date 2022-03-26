const { User } = require('../models');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const jwt = require('jwt-simple');
const { secretPhrase } = require('../config/config');
const { transport} = require('../mailing/sendMails');
const nodemailer = require('nodemailer')


const createUser = async (req, res) => {
  const checkUserNameExist = await User.findOne({ where: {username: req.body.username} })
    if(!checkUserNameExist){
        req.body.password = bcrypt.hashSync(req.body.password, 10);

        let newUser = await User.create(req.body)
        
        if (newUser){
          const mailOptions = {
            from: 'The Alkemy Backend project',
            to: req.body.email,
            subject: 'Back End testing',
            text: 'Thanks for suscribing to Movie-Hub ',
          };
          
          transport.sendMail(mailOptions, (error, info) => {
              if (error) {
                res.status(409).json({ msg: "It has been an error with your email"})
              } else {
                res.status(200).json({ msg: "An email has been sent to your email"})
              }
            });
          };
        res.status(201).json({ newUser, token: createToken(newUser) });
  } else {
    res
      .status(400)
      .json({ msg: 'Username already used, please use another username' });
  }
};

const signInUser = async (req, res) => {
  const {
    body: { username, password },
  } = req;
  const userFound = await User.findOne({ where: { username } });

  if (userFound) {
    const matchPassword = bcrypt.compareSync(req.body.password, userFound.password);
    if (matchPassword) {
      res.status(202).json({ token: createToken(userFound) });
    } else {
      res.status(401).json({ msg: 'Invalid Password' });
    }
  } else {
    res.status(500).json({ msg: 'Something went wrong' });
  }
};

const createToken = (user) => {
  const encode = {
    email: user.email,
    createdAt: moment().unix(),
    expiredAt: moment().add(24, 'hours').unix(),
  };
  return jwt.encode(encode, secretPhrase);
};



module.exports = {
  createUser,
  signInUser,
};
