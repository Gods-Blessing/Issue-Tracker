const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    projectName:{
        type: String,
        require: true
    },
    projectDescription:{
        type: String,
        require: true
    },
    author:{
        type: String,
        require: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
}, {
    timestamps: true
});


const Project = mongoose.model('Project', projectSchema);

module.exports = Project;