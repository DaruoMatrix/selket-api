var express = require('express');
var router = express.Router();
var Admin = require('../app/models/admin');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../app/config/database');







// Register
router.post('/', (req, res, next) => {
    let newAdmin = new Admin({

      username:req.body.username,
      password:req.body.password,
     
      
  });
  Admin.getAdminByUsername(newAdmin.username, function(err, foundUser){
  if(foundUser){
    res.json({success: false, msg:'Failed- Admin already exists!'});
  } else {
    Admin.addAdmin(newAdmin, (err, user) => {
      if(err){
        res.json({success: false, msg:err});
      } 
      else {
          res.json({success: true, msg:'Admin registered'});
      }
    });
  }
 });

});



// Authenticate
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
   
    Admin.getAdminByUsername(username, (err, admin) => {
      if(err) throw err;
      if(!admin){
        return res.json({success: false, msg: 'Admin not found'});
      }
  
      Admin.comparePassword(password, admin.password, (err, isMatch) => {
        if(err) throw err;
        if(isMatch){
          const token = jwt.sign({data: admin}, config.secret, {
            expiresIn: 604800 // 1 week
          });
   
          res.json({
            success: true,
            token: `Bearer ${token}`,
            admin: {
              id: admin._id,
              username: admin.username
            }
          });
        } else {
          console.log('Wrong password');
          return res.json({success: false, msg: 'Wrong password'});
        }
      });
    });
  });


module.exports = router;