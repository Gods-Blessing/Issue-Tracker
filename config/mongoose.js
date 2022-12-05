const mongoose = require('mongoose');
const env = require('./environment');
mongoose.connect(process.env.dburl);


const db = mongoose.connection;


db.on('error', function(){
    console.log("error in connecting to databse");
    return;
})

db.once('open', function() {
    console.log("connected to database");
})

module.exports = db;