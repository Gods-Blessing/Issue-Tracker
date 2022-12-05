const { populate } = require('../module/projectschema');
const Project = require('../module/projectschema');
const User = require('../module/userschema');
const Comment = require('../module/comment');

module.exports.projectpage = function(req,res){
    return res.render('projectpage');
}


// for adding of project
module.exports.addproject = function(req,res){
    // console.log(req.user);
            Project.create({
                projectName: req.body.projectName,
                projectDescription: req.body.projectDescription,
                author: req.body.author,
                user: req.user._id
            }, function(err){
                // console.log(req.body.projectName);
                if(err){
                    console.log("error in creating the project");
                    return;
                }

                return res.redirect('back');
            })
};




module.exports.projectpagedetail = function(req,res){
    Project.findById(req.params.id)
    // .populate('author')
    .populate({
        path:'comments',
        populate: 'user'
    })
    .exec(function(err, project){
        if(err){
            console.log("unable to find the project");
            return;
        }
        let day = new Date();
        // day.getDay();
        // console.log(day.toString().substring(0,15));
        // day.toString().substring(12,17);

        return res.render('projectDetailpage',{
            title: "Project detail",
            project: project
        });
    })
}



// for deleting of project
module.exports.deleteproject = function(req,res){
    Project.findById(req.params.id, function(err, project){
        if(project.user == req.user.id){
            project.remove();

            Comment.deleteMany({project: req.params.id}, function(err){
                return res.redirect('/home');
            })
        }else{
            return res.redirect('back');
        }
    })
    // return res.redirect('back');
}




// for updating of projects
module.exports.update = function(req,res){
    // console.log("params",req.query.projectid);
    // console.log("user",req.query.projectuserid);
    // console.log("body:",req.body);
    // let splt = req.query.split('&');
    // console.log(splt);
    if(req.user.id == req.query.projectuserid){
        Project.findByIdAndUpdate(req.query.projectid, req.body, function(err, project){
            // console.log(project);
            return res.redirect('back');
        });
    }else{
        return res.status(401).send('Unauthorized');
    }
}