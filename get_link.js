var request = require('request@2.56.0');

module.exports = function(context, emailTo, cb){
  var passwordResetUrl = "https://" + context.secrets.auth0Domain + "/api/v2/tickets/password-change";
  request.post({
    url: passwordResetUrl,
    headers: {
      Authorization: 'Bearer ' + context.secrets.AUTH0_APIv2_TOKEN
    },
    json: { "result_url": context.secrets.resultUrl, 
            "connection_id" : context.secrets.connectionId,
            "email":emailTo}
  }, function(err, response, body) {
       if (err) {
         cb(err);
       }
       console.log(body);
       cb(null, body.ticket);
    });
}