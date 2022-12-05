const Bug = require('../module/bug');



module.exports.addbug = function(req,res){
    // console.log(req.body);
    Bug.create({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        user: req.user._id
    }, function(err){
        if(err){
            console.log("error while creating bug");
            return;
        }
        return res.redirect('back');
    })
}



module.exports.bugpage = function(req,res){
    Bug.findById(req.params.id)
    .populate({
        path:'comment',
        populate:{
            path: 'user'
        }
    })
    
    .exec( function(err, bug){
        if(err){
            console.log("error while finding the error");
            return;
        }
        return res.render('bugpage',{
            bug:bug
        });
    })
}
