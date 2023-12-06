const config = require("../config/config");
const nodemailer = require("nodemailer");
const { addListener } = require("nodemon");

function sendMail1(params) {
  params.site_url = config.site_url;
  params.admin_mail = config.admin_mail;
  params.site_name = config.site_name;

  var smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'johnwick.octal@gmail.com',
      pass: 'dtxgdyyubbzqejve'
    },
  });

  var mail = {
    from: config.senderFrom,
    to: params.to,
    subject: params.subject,
    html: params.html,
  };

  smtpTransport.sendMail(mail, function (error, response) {
    smtpTransport.close();
    if (response) {
      return true;
    } else {
      return false;
    }
  });
}

exports.sendMail1 = sendMail1;
