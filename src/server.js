const express = require('express')
const exphs = require('express-handlebars')
const path = require('path')
const morgan = require('morgan')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')

// Initialization
const app = express()
require('./config/passport')

// Settings
app.set('port', process.env.PORT || 4000)
app.set('views', path.join(__dirname, 'views') )
app.engine('.hbs',exphs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}))
app.set('view engine', 'hbs')

// Middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({extended:false})) // le decimos que los datos obtenidos por la url se conviertan a Json
app.use(methodOverride('_method')) // en el HTML en el action enviamos los valores
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

// Global Variebles
    
app.use((req, res, next) => {
    // creamos una variable en el servidor para usarlo donde sea y le agregamos los valores que usamos en flash
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error') //passport default agregar este nombre
    res.locals.user = req.user || null // passport guarda al usuario en req.user
    
    // tenemos que usar next o si no No continuara con el codigo siguiente
    next();
})

// Routes
app.use(require('./routes/index.routes'))
app.use(require('./routes/notes.routes'))
app.use(require('./routes/user.routes'))


// Static Files
app.use(express.static(path.join(__dirname,'public')))

module.exports = app