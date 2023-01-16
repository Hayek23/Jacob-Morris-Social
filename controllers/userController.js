const { model } = require('mongoose')
const {User, Thought} = require('../models')

module.exports = {
    // get all users
    getUsers(req, res) {
      User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
    // get one user
    getOneUser(req, res) {
      User.findOne({ _id: req.params.userId })
        .select('-__v')
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'There is no user with that ID!' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    // Create a user
    createUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },
    // Delete a user
    deleteUser(req, res) {
        user.findOneAndDelete({ _id: req.params.userId })
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'There is no user with that ID' })
            : Thought.deleteMany({ _id: { $in: user.thoughts } })
        )
        .then(() => res.json({ message: 'user and thoughts deleted!' }))
        .catch((err) => res.status(500).json(err));
    },
    // Update a user
    updateUser(req, res) {
      Course.findOneAndUpdate(
        { _id: req.params.courseId },
        { $set: req.body },
        { runValidators: true, new: true }
      )
        .then((course) =>
          !course
            ? res.status(404).json({ message: 'No user with this id!' })
            : res.json(course)
        )
        .catch((err) => res.status(500).json(err));
    },
  };
  