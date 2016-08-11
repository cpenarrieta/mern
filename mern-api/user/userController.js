const User = require('./userModel');
const _ = require('lodash');

exports.get = (req, res, next) => {
  User
    .find({})
    .select('-password')
    .exec()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      next(err);
    });
};

exports.post = (req, res, next) => {
  var newUser = req.body;

  User
    .create(newUser)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      next(err);
    });
};

exports.getOne = (req, res, next) => {
  User
    .findById(req.params.id)
    .select('-password')
    .exec()
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      next(err);
    });
};

exports.put = (req, res, next) => {
  User
    .findById(req.params.id)
    .exec()
    .then((prevUser) => {
      if (prevUser) {
        const updatedUser = _.merge(prevUser, req.body);
        return updatedUser.save();
      }
    })
    .then((savedUser) => {
      if (savedUser) {
        res.json(savedUser.toJson());
      } else {
        res.status(400).send('user not found');
      }
    })
    .catch((err) => {
      next(err);
    });
};

exports.delete = (req, res, next) => {
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if (user) {
        return user.remove();
      }
    })
    .then((removedUser) => {
      if (removedUser) {
        res.json(removedUser.toJson());
      } else {
        res.status(400).send('user not found');
      }
    })
    .catch((err) => {
      next(err);
    });
};
