

var express = require('express');
var router = express.Router();
var Manager = require('../app/models/manager')
/* GET banks listing. */
router.get('/', function(req, res, next) {

    Manager.find({}, function (err, managers) {
  
      if (err){
        res.send(err)
      }
    else{
      res.send(managers);
    }
  });
   
  });

router.post('/', function(req, res, next) {


        var manager = Manager();

        manager.name= req.body.name;
        manager.email= req.body.email;
        manager.bank_id= req.body.bank_id;

        Manager.getManagerByEmail(req.body.email, function(err, foundManager){
            if(foundManager){
              res.json({success: false, msg:'Failed- Manager already exists!'});
            } 
            else if(err){
            res.json({success: false, msg:err});
        }
            else {
                manager.save(function(err){
                    if (err){
                        res.send(err)
                    }
                    else{
                        res.json({success: true, msg:'Manager registered'});
                    }
                  });
            }
           });

  });

router.get('/:manager_id', function(req,res,next){
    var manager_id = req.params.manager_id;
    Manager.find({_id: manager_id}, (function(err, manager){
        if(err)
        throw err;
        else{
            res.send({message:'success',manager })
        }
    }))
})

router.delete('/:manager_id',function(req, res) {
    var manager_id = req.params.manager_id;
    Manager.findByIdAndRemove({_id:manager_id}).then(function(manager){
        res.send(manager);
    });
});

router.put('/:manager_id', function(req, res, next) {
    var manager_id = req.params.manager_id;

    Manager.findById(manager_id, function(err, foundManager){
      if(foundManager){
        foundManager.name= req.body.name;
        foundManager.email= req.body.email;
        foundManager.bank_id= req.body.bank_id;
        foundManager.save(function(err){
          if (err){
              res.send(err)
          }
          else{
              res.json({success: true, msg:'manager modified'});
          }
        });
      } 
      else {
      res.json({success: false, msg:'not found'});
  }

     });
});
 
module.exports = router;    