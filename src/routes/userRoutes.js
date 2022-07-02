// this will have all my routes
const express = require('express')
const router = express.Router()

const usersController = require('../controllers/userController')

router.get('/allusers', usersController.getAllUsers)
router.get('/singleuser/:stageName',usersController.getSingleUser)

router.post('/login', usersController.loginUser)
router.post('/signup', usersController.signupUser)

router.patch('/createprofile/:stageName', usersController.createUserProfile)

router.delete('/delete/:stageName', usersController.deleteUser)

module.exports = router