const {selectUsers} = require('../Models/index');

exports.getUsers = (req, res, next) => {
    selectUsers().then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {next(err)});
  };