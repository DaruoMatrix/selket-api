
var express = require('express');
var router = express.Router();

const nodemailer = require('nodemailer');
/* GET banks listing. */


router.post('/', function(req, res, next) {
    console.log("body : ",req.body);
    
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, 
        auth: {
            user: 'masterdaruom@gmail.com', 
            pass: 'mouradDaruom7/'
        },
        tls:{
            rejectUnauthorized:false
        }
    });

    
    let mailOptions = {
        from: '"SELKET application 👻" <masterdaruom@gmail.com>',
        to: req.body.email,
        subject: 'Demande de crédit ✔', 
        text: req.body.content, // plain text body
        html: '<b>'+req.body.content+req.body.name+'</b>', // html body
        attachments: [{
            filename: req.body.name+'.pdf',
            path: 'C:/Users/DaruoM/Downloads/'+req.body.name+'.pdf',
            contentType: 'application/pdf'
          }]
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).send({ error: "error" });
           
        }
        else{
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        res.json({success: true, msg:'mail sent'});
    }
    });
  });


  module.exports = router;