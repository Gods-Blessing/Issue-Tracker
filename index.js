const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const port = process.env.port;
const env = require('./config/environment');

const path = require('path');
const mongoose = require('mongoose');
const db = require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts');
const sassMiddleware = require('node-sass-middleware');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const customMiddleware = require('./config/middleware');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



app.use(express.static(process.env.asset_path));
app.use(express.urlencoded());
app.use(expressLayouts);
app.use(cookieParser());
app.use(sassMiddleware({
    src: path.join(__dirname, process.env.asset_path, '/scss'),
    dest: path.join(__dirname, process.env.asset_path, '/css'),
    debug: true,
    outputStyle: 'expanded',
    prefix: '/css'
}))

app.use(session({
    secret: process.env.session_cookie_key,
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge: 6000000
    },
    store:  MongoStore.create({
        mongoUrl: process.env.dburl,
        autoRemove: 'disabled'
     }, (err)=>{
        console.log(err || 'connect mongodb setup');
     })
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMiddleware.setFlash);


app.use('/', require('./routes'));








app.listen(port, function(err){
    if(err){
        console.log("error in connecting to server");
        return;
    }

    console.log("Connected to Server", port);
})