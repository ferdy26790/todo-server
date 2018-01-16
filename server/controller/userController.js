const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const userModel = require('../models/users')
const saltRounds = 10;
let getDecode = function (token) {
  let decoded = jwt.verify(token, 'secure');
  console.log(decoded);
  return decoded
}
class User{
  static register (req, res) {
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
      let newUser = new userModel({
        name: req.body.name,
        email: req.body.email,
        password: hash,
        point: 0
      })
      newUser.save()
      .then((response) => {
        res.status(200).json({
          msg: 'register berhasil',
          data: response
        })
      }).catch((err) => {
        console.log(err);
      })
    });
  }

  static login (req, res) {
    console.log(req.body);
    userModel.find({
      email: req.body.email
    })
    .then((user) => {
      bcrypt.compare(req.body.password, user[0].password, function (err, response) {
        if(!err) {
          let payload = jwt.sign({
            id: user[0]._id,
            name: user[0].name,
            email: user[0].email,
            point: user[0].point
          }, 'secure')
          res.status(200).json({
            msg:'login sukses',
            token: payload
          })
        } else {
          console.log('inierror',err);
        }
      })
    }).catch((err) => {
      console.log('masuk error');
      console.log(err);
    })
  }

  static getUser (req, res) {
    let decoded = getDecode(req.headers.token)
    if(decoded) {
      userModel.findById(decoded.id)
      .then((user) => {
        res.status(200).json({
          data:user
        })
      }).catch((err) => {
       console.log(err);
      })
      // res.status(200).json({
      //   id: decoded.id,
      //   name: decoded.name,
      //   email: decoded.email,
      //   point: decoded.point
      // })
    } else {
      console.log('masuk di else');
    }
  }

  static changeName (req, res) {
    let decoded = getDecode(req.headers.token)
    userModel.findById(decoded.id)
    .then((user) => {
      user.name = req.body.name
      user.save()
      .then((response) => {
        res.status(200).json({
          msg: "name changed",
          data: response
        })
      }).catch((err) => {
        console.log(err);
      })
    }).catch((err) => {
      console.log(err);
    })
  }
}

module.exports = User
