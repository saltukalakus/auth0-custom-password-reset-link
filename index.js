var sendMail = require("./sendgrid");

module.exports = function (context, req, res) {
  // Create a password reset page to get the user email

  // Call Management v2 API to get the password reset link

  // Send the password reset link
  sendMail(context, context.data.email, "http://www.saltukalakus.com", function(err, response){
    if (err){
        res.writeHead(response.statusCode, { 'Content-Type': 'text/html '});
        return res.end("Sending mail failed " + error);
    }

    res.writeHead(response.statusCode, { 'Content-Type': 'text/html '});
    res.end("Mail sent!");
  }); 
}