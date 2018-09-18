var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var Address = require('./address');

var bankAgencySchema = new Schema({
    bank_id : Number,
    name:    String,
    //address:  Address,
    phone:  Number,
    email: String,
    
  })

  
  module.exports = mongoose.model('BankAgency',bankAgencySchema);