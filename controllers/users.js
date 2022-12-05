const User = require('../module/userschema');

// to create a user
module.exports.createuser = function(req,res){
    if(req.body.password == req.body.confirm_password){
        User.findOne({email: req.body.email}, function(err, user){
            if(err){
                console.log("error while finding the user");
                return;
            }

            if(user){
                console.log("user already exist");
                return res.redirect('back');
            }

            User.create(req.body, function(err){
                if(err){
                    console.log('error while creating user');
                    return;
                }

                return res.redirect('/signin');
            })
        })
    }else{
        return res.redirect('back');
    }
}





module.exports.creatession = function(req,res){
    req.flash('success', 'logged in ');
    return res.redirect('/home');
}