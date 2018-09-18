var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Address = require('./address');
var Bank_agency=require('./bank_agency');
var bcrypt = require('bcryptjs');
var findOrCreate = require('mongoose-findorcreate')
var test = new Schema({name : 'String'});

var AdminSchema = new Schema({
    username:    {type: String, required:false, unique: false, default:null},
    password :{type: String, default : null},

    


  })


  const Admin = module.exports = mongoose.model('Admin',AdminSchema);


  module.exports.getUserById = function(id, callback){
    Admin.findById(id, callback);
  };


  module.exports.addAdmin = function(newAdmin, callback){
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newAdmin.password, salt, (err, hash) => {
        if(err) console.log( err);
        newAdmin.password = hash;
        newAdmin.save(callback);
      });
    });
  };

  
  
  module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) console.log( err);
      callback(null, isMatch);
    });
  };

  module.exports.getAdminByUsername = function(username, callback){
    const query = {username: username}
    Admin.findOne(query, callback);
  };
