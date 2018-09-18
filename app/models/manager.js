var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var managerSchema = new Schema({
    name:    {type: String, required : true},
    email: {type: String, required : true},
    bank_id :{type: String}
  })

  const Manager = module.exports = mongoose.model('Manager',managerSchema);

  module.exports.getManagerByEmail = function(email, callback){
    const query = {email: email}
    Manager.findOne(query, callback);
  };