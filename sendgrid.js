var helper = require('sendgrid@4.7.0').mail;

module.exports = function(context, emailTo, linkToSend, cb){
  var fromEmail = new helper.Email(context.secrets.fromEmail);
  var toEmail = new helper.Email(emailTo);
  var subject = "Email reset link";
  var content = new helper.Content("text/plain", "Here is your password reset link " + linkToSend);
  var mail = new helper.Mail(fromEmail, subject, toEmail, content);

  var sg = require('sendgrid@4.7.0')(context.secrets.SENDGRID_KEY)
  var request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON()
  });

  sg.API(request, function(error, response) {
    cb(error, response);
  })
}