const Comment = require('../module/comment');
const Project = require('../module/projectschema');

module.exports.createcomment = function(req,res){
    Project.findById(req.body.projectid, function(err, project){

        if(err){
            console.log("error in finding the bug");
        }
        if(project){
            Comment.create({
                content: req.body.content,
                project: req.body.projectid,
                user: req.user._id
            }, function(err, comment){
                project.comments.push(comment);
                project.save();
                return res.redirect('back');
            })
        }else{
            // console.log("error in finding the bug");

            return res.redirect('back');
        }
    })
}


module.exports.delete = function(req,res){
    Comment.findById(req.params.id, function(err, comment){
        if(comment.user == req.user.id){
            let projectid = comment.project;

            comment.remove();

            Project.findByIdAndUpdate(projectid, { $pull: {comments: req.params.id}}, function(err, project){
                return res.redirect('back');
            })
        }else{
            return res.redirect('back');
        }
    })
}