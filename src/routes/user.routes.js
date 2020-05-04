const { Router } = require('express')
const router = Router();

const {
    renderSignUpForm,
    signup,
    renderSignInForm,
    signin,
    logout
} = require('../controllers/user.controller')

router.get('/user/signup', renderSignUpForm)

router.post('/user/signup', signup)

router.get('/user/signin', renderSignInForm)

router.post('/user/signin', signin)

router.get('/user/logout', logout)

module.exports = router