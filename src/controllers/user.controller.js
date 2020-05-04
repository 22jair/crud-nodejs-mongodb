const userCtrl = {}

const passport = require('passport')

const User = require('../models/User')

// muestra vista de registro
userCtrl.renderSignUpForm = (req, res ) => {
    res.render('user/signup')
}

// registra
userCtrl.signup = async (req, res) => {
    
    const errors = []
    const {name, email, password, confirm_password} = req.body;
    
    if(password != confirm_password){
       errors.push({text: 'Passwords do not match.'})
    }
    if(password.length < 4){
        errors.push({ text: 'Passwords must be at least 4 characters.' })
    }

    if(errors.length > 0){
        res.render('user/signup', { errors , name, email, password, confirm_password})
    }else{
        // res.send("registrado")
        const emailUser = await User.findOne({email: email})
        if(emailUser){
            req.flash('error_msg','the email is already in use.')
            res.redirect('/user/signup')
        }else{
            const newUser = new User({name, email, password})
            newUser.password = await newUser.encrypPassword(password)
            await newUser.save()
            req.flash('success_msg', 'You are registered')
            res.redirect('/user/signin')
        }
    }   
}

// muestra vista de login
userCtrl.renderSignInForm = (req, res ) => {
    res.render('user/signin')
}

// userCtrl.signin = (req, res) => {
//     res.send("ingreso")
// }
userCtrl.signin = passport.authenticate('local', {
    failureRedirect: '/user/signin',
    successRedirect: '/notes',
    failureFlash: true //aca usa flash para los mensaje globales
})

userCtrl.logout = (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out now')
    res.redirect('/user/signin')
}

module.exports = userCtrl