const router = require('express').Router();

const {
    getUsers,
    getOneUser,
    createUser,
    deleteUser,
    updateUser,
} = require('../../controllers/userController.js')

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router
    .route('/:userId')
    .get(getOneUser)
    .put(updateUser)
    .delete(deleteUser)

module.exports = router;