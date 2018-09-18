var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const GeoSchema = new Schema({
  type: {
    type: String, 
    default : "point"
  },
  coordinates: {
    type: [Number],
    index : "2dsphere"
  }

})
var bankSchema = new Schema({
    name:   {type: String, required : true},
    number_agencies:  Number,
    email: {type: String, required : true},
    location: GeoSchema
  })

  const Bank = module.exports = mongoose.model('Bank',bankSchema);

  module.exports.getBankByEmail = function(email, callback){
    const query = {email: email}
    Bank.findOne(query, callback);
  };