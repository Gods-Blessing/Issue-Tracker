const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../module/userschema');

passport.use(new LocalStrategy({usernameField: 'email', passReqToCallback: true},
    function(req,email, password, done) {
      User.findOne({ email: email }, function (err, user) {
        if (err) { req.flash('error', 'error while finding the user');return done(err); }
        if (!user || user.password != password) { req.flash('error', 'ivalid username or password');return done(null, false); }
        return done(null, user);
      });
    }
  ));

  passport.serializeUser(function(user, done){
    return done(null, user.id);
  })


  passport.deserializeUser(function(id, done){
    User.findById(id, function(err,user){
        if(err){
            console.log(err);
            return;
        }
        return done(null, user);
    })
  })


  passport.checkAuthentication = function(req,res, next){
    if(req.isAuthenticated()){
        return next();
    }

    return res.redirect('/signin');
  }


  passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user
    }
    // console.log(res);
    next();
  }

  module.exports = passport;