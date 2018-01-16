const boardModel = require('../models/boards')
const userModel = require('../models/users')
const jwt = require('jsonwebtoken')

let getDecode = function (token) {
  let decoded = jwt.verify(token, 'secure');
  return decoded
}

class Board{
  static addBoard (req, res) {
    let decoded = getDecode(req.headers.token)
    let newBoard = new boardModel({
      name: req.body.name,
      isComplete: false,
      userPost: decoded.id,
      point: req.body.point
    })
    newBoard.save()
    .then((response) => {
      res.status(200).json({
        msg: 'board berhasil ditambahkan',
        data: response
      })
    }).catch((err) => {
      console.log(err);
    })
  }

  static getBoard (req, res) {
    boardModel.find({
      isComplete: false
    }).populate('user')
    .then((boards) => {
      res.status(200).json({
        data:boards
      })
    }).catch((err) => {
      console.log(err);
    })
  }

  static getMyBoard (req, res) {
    console.log('masuk');
    let decoded = getDecode(req.headers.token)
    boardModel.find({
      userGet: decoded.id
    }).populate('user')
    .then((response) => {
      res.status(200).json({
        data:response
      })
    }).catch((err) => {
      console.log(err);
    })
  }

  static deleteBoard (req, res) {
    boardModel.findByIdAndRemove(req.params.id)
    .then((board) => {
      res.status(200).json({
        msg: 'board berhasil dihapus',
        dataDeleted: board
      })
    }).catch((err) => {
      console.log(err);
    })
  }

  static completeBoard (req, res) {
    console.log(req.params.id);
    console.log(req.body);
    let decoded = getDecode(req.headers.token)
    console.log(decoded);
    boardModel.findById(req.params.id)
    .then((board) => {
      board.isComplete = true
      board.save()
      .then((boardsaved) => {
        userModel.findById(decoded.id)
        .then((user) => {
          user.point += board.point
          user.save()
          .then((response) => {
            res.status(200).json({
              data: boardsaved
            })
          }).catch((err) => {
            console.log(err);
          })
        }).catch((err) => {
          console.log(err);
        })
      }).catch((err) => {
        console.log(err);
      })
    }).catch((err) => {
      console.log(err);
    })
  }

  // static uncompleteBoard (req, res) {
  //   boardModel.findById(req.params.id)
  //   .then((board) => {
  //     board.isComplete = false
  //     board.save()
  //     .then((response) => {
  //       res.status(200).json({
  //         msg: 'board uncomplete',
  //         data: response
  //       })
  //     }).catch((err) => {
  //       console.log(err);
  //     })
  //   }).catch((err) => {
  //     console.log(err);
  //   })
  // }

  static changeBoardName (req, res) {
    boardModel.findById(req.params.id)
    .then((board) => {
      board.name = req.body.name
      board.save()
      .then((response) => {
        res.status(200).json({
          msg: 'board name changed',
          data: response
        })
      }).catch((err) => {
        console.log(err);
      })
    }).catch((err) => {
      console.log(err);
    })
  }

  static takeBoard (req, res) {
    let decoded = getDecode(req.headers.token)
    boardModel.findById(req.params.id)
    .then((board) => {
      console.log(board);
      userModel.findById(decoded.id)
      .then((user) => {
        board.userGet = user._id
        board.save()
        .then((response) => {
          res.status(200).json({
            msg: 'board todo taken',
            data: response
          })
        }).catch((err) => {
          console.log(err);
        })
      }).catch((err) => {
        console.log(err);
      })
    }).catch((err) => {
      console.log(err)
    })
  }
}

module.exports = Board
