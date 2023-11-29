const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Auth } = require('../model/auth');
const promisify = require('util').promisify;
let salt = bcrypt.genSaltSync(10);
const sign = promisify(jwt.sign).bind(jwt);
let nodemailer = require('nodemailer');
const Utils = require('../Utils');

const authController = {
  //ADD user
  addAuth: async (req, res) => {
    try {
      const finDuplicateEmail = await Auth.findOne({ email: req.body.email });
      const finDuplicateUsername = await Auth.findOne({ username: req.body.username });
      if (finDuplicateEmail) {
        res.status(400).json({ message: 'The email field is already in the database', errorCode: 2 });
      } else if (finDuplicateUsername) {
        res.status(400).json({ message: 'The username field is already in the database', errorCode: 3 });
      } else {
        delete req.body.confirmPassword;
        let tempData = JSON.parse(JSON.stringify(req.body));
        tempData.password = await hashUserPassword(tempData.password);
        const newAuth = new Auth(tempData);
        const savedAuth = await newAuth.save();
        res.status(200).json(savedAuth);
      }
    } catch (err) {
      console.log(err, 'err')
      res.status(500).json(err); //HTTP REQUEST CODE
    }
  },

  login: async (req, res) => {
    try {
      const user = await Auth.findOne({ username: req.body.username });
      if (user) {
        let isAuthen = bcrypt.compareSync(req.body.password, user.password);
        if (isAuthen) {
          const accessToken = await generateToken(
            { username: req.body.username },
            'dungpt3', //accessTokenSecret nhét vào .env
            '10000000000s', //accessTokenLife nhét vào .env
          );
          res.status(200).json({ accessToken: accessToken });
        } else {
          res.status(200).json('wrong username or password 5');
        }
      } else {
        res.status(200).json('wrong username or password');
      }
    } catch (err) {
      res.status(500).json(err); //HTTP REQUEST CODE
    }
  },

  changePassword: async (req, res) => {
    try {
      const user = await Auth.findOne({ username: req.body.username });
      if (user) {
        let isAuthen = bcrypt.compareSync(req.body.oldPassword, user.password);
        if (isAuthen && req.body.newPassword == req.body.confirmPassword) {
          const newPassword = await hashUserPassword(req.body.newPassword);
          let updateUser = await Auth.findOneAndUpdate({ username: req.body.username }, {password: newPassword });
          res.status(200).json('update password successful');
        } else {
          res.status(500).json('wrong username or password');
        }
      } else {
        res.status(500).json('wrong username or password');
      }
    } catch (err) {
      res.status(500).json(err); //HTTP REQUEST CODE
    }
  },

  checkTokenExpire: (token) => {
    try {
      const decode = jwt.verify(token.toString(), 'dungpt3');
      return decode.payload.username
    } catch (e) {
      return false
    }
  },

  getProfile: async (req, res) => {
    let username = req.headers.authorization ? authController.checkTokenExpire(req.headers.authorization.split(" ")[1]) : '';
    if(username) {
      let user = await Auth.findOne({ username: username });
      if(user.id) {
        res.status(200).json(user)
      } else {
        res.status(500).json('het han token')
      }
    } else {
      res.status(500).json('error')
    }
  },

  editProfile: async (req, res) => {
    let username = authController.checkTokenExpire(req.headers.authorization.split(" ")[1]);
    let user = await Auth.findOne({ username: username });
    if(user.id) {
      let newUser = JSON.parse(JSON.stringify(user));
      newUser.phone = req.body.phone;
      newUser.address = req.body.address;
      let updateUser = await Auth.findOneAndUpdate({ username: username }, newUser);
      res.status(200).json('update successful')
    } else {
      res.status(500).json('het han token')
    }
  },

  sendMail: async (req, res, next) => {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'phamtiendung0926@gmail.com',
        pass: 'flafsnrcycuiupva'
      }
    });
    let newPassword;
    const user = await Auth.findOne({ username: req.body.username });
    if (user && user.email == req.body.email) {
      newPassword = Utils.getRandomText(10);
    } else {
      res.status(400).send('user name or email incorrect');
      return
    }
    let mainOptions = {
      from: 'Dungpt3',
      to: user.email,
      subject: 'Test Nodemailer',
      text: 'You recieved message from ',
      html: '<p>Your new password:<p/>' + newPassword,
    }
    transporter.sendMail(mainOptions, async (err, info) => {
      if (err) {
        console.log(err, 'err mail');
      } else {
        let hashNewPassword = await hashUserPassword(newPassword);
        await Auth.findOneAndUpdate({ username: req.body.username }, { password: hashNewPassword });
        res.status(200).send('check your mail to get new password');
      }
    });
  }
};

let hashUserPassword = async (password) => {
  try {
    let hashPassword = await bcrypt.hashSync(password, salt);
    return hashPassword;
  } catch (e) {
    return e
  }
}

const generateToken = async (payload, secretSignature, tokenLife) => {
  try {
    return await sign(
      {
        payload,
      },
      secretSignature,
      {
        algorithm: 'HS256',
        expiresIn: tokenLife,
      },
    );
  } catch (error) {
    console.log(`Error in generate access token:  + ${error}`);
    return null;
  }
};

module.exports = authController;
