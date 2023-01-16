const { User, Thought} = require('../models');

module.exports = {
    //get all thoughts
    getThoughts(req, res) {
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    //get one thought
    getOneThought(req, res) {
        Thought.findOne({_id: req.params.thoughtId})
        .select('-__v')
        .then((thought) =>
            !thought
                ? res.status(404).json({message: 'There are no thoughts with that id!' })
                : res.json(course)
        )
        .catch((err) => res.status(500).json(err));
    },
    //to post a thought
    postThought(req,res){
        Thought.create(req.body)
        .then((thought) => res.json(thought))
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },
    //update
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.courseId },
            { $set: req.body },
            { runValidators: true, new: true}
        )
        .then((thought) => 
            !thought
                ? res.status(404).json({message: 'There are no thoughts with this id!'})
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    //delete
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.objectId})
        .then((thought) => 
        !thought
            ?res.status(404).json({message: 'There are no thoughts with this id!'})
            : User.findOneAndUpdate(
                { thoughts: req.params.thoughtId},
                {$pull: { students: req.params.studentId } },
                { new: true } 
            )
        )
        .then((user) =>
        !user
          ? res.status(404).json({
              message: 'Thought deleted, but there were no users found',
            })
          : res.json({ message: 'Thought successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
    },

    //for reactions
    //add a reaction
    addReaction(req, res){
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId},
            { $addToSet: { reactions: req.body}}
        )
        .then((thought) =>
        !thought
            ? res
                .status(404)
                .json({ message: 'No thought found'})
            :res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    //delete reaction
    removeReaction(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reactions: { reactionId: req.params.reactionid}}},
        )
          .then((thought) =>
            !thought
              ? res
                  .status(404)
                  .json({ message: 'No thought found' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },
    };