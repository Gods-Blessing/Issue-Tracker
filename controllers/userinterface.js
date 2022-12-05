const User = require('../module/userschema');
const Bug = require('../module/bug');
const Project = require('../module/projectschema');

module.exports.userinterface = (req,res)=>{
    if(req.isAuthenticated()){
        return res.redirect('/home')
    }
    return res.render('signup');
}

module.exports.signin = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/home')
    }
    return res.render('signin');
}

// module.exports.find = function(req,res){
//     console.log(req.body.search);
//     let ans = Project.find({});
//     let anss = ans.filter(function(project){
//         if(project.user == req.body.search){
//             return res.render('home', {
//                 title: "home page",
//                 projects: project,
//             });
//         }
//     });

// }


module.exports.home = function(req,res){
    // console.log(req);
    Project.find({})
    .sort('-createdAt')
    .populate('user')
    .exec(function(err, project){

        if(err){
            console.log("error");
            return;
        }
        return res.render('home', {
            title: "home page",
            projects: project,

        });
    })
}

module.exports.signout = function(req,res){
    req.logout(function(err){
        if(err){
            req.flash('error', 'error while logout');
        }
    });
    req.flash('success', 'logged out');

    // console.log(req.session);
    return res.redirect('/signin');
}