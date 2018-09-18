

var express = require('express');
var router = express.Router();
var Bank = require('../app/models/bank')
/* GET banks listing. */
router.get('/', function(req, res, next) {

    Bank.find({}, function (err, banks) {
  
      if (err){
        res.send(err)
      }
    else{
      res.send(banks);
    }
  });
   
  });

router.post('/', function(req, res, next) {
        var bank = Bank();

        bank.name= req.body.name;
        bank.email= req.body.email;
        bank.location.geolocation[0] = req.body.longitude;
        bank.location.geolocation[1] = req.body.latitude;
        

        Bank.getBankByEmail(req.body.email, function(err, foundBank){
          if(foundBank){
            res.json({success: false, msg:'Failed- Bank already exists!'});
          } 
          else if(err){
          res.json({success: false, msg:err});
      }
          else {
            bank.save(function(err){
                  if (err){
                      res.send(err)
                  }
                  else{
                      res.json({success: true, msg:'Bank registered'});
                  }
                });
          }
         });
  });
  router.put('/:bank_id', function(req, res, next) {
    var bank_id = req.params.bank_id;

    Bank.findById(bank_id, function(err, foundBank){
      if(foundBank){
        foundBank.name= req.body.name;
        foundBank.email= req.body.email;
        foundBank.save(function(err){
          if (err){
              res.send(err)
          }
          else{
              res.json({success: true, msg:'Bank modified'});
          }
        });
      } 
      else {
      res.json({success: false, msg:'not found'});
  }

     });
});
router.get('/:bank_id', function(req,res,next){
    var bank_id = req.params.bank_id;
    Bank.find({_id: bank_id}, (function(err, bank){
        if(err)
        throw err;
        else{
            res.send({message:'success',bank })
        }
    }))
})

router.delete('/:bank_id',function(req, res) {
  var bank_id = req.params.bank_id;
  Bank.findByIdAndRemove({_id:bank_id}).then(function(bank){
      res.send(bank);
  });
});
   
 
module.exports = router;