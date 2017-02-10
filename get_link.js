var request = require('request@2.56.0');

function getPasswordLink(context, emailTo, cb){
  context.storage.get(function (err, data) {
    if (err) {
      return cb(err);
    }
    if (!data || !data.auth0APIv2Token){
       return cb("auth0APIv2Token is not defined!");
    }
    var passwordResetUrl = "https://" + context.secrets.auth0Domain + "/api/v2/tickets/password-change";
    console.log("getPasswordLink called : " + data.auth0APIv2Token);
    request.post({
      url: passwordResetUrl,
      headers: {
        Authorization: 'Bearer ' + data.auth0APIv2Token
      },
      json: { "result_url": context.secrets.resultUrl, 
              "connection_id" : context.secrets.connectionId,
              "email":emailTo}
    }, function(err, response, body) {
         if (err) {
           return cb(err);
         }
         if(body.error){
           return cb(body)
         }
         cb(null, body.ticket);
    });       
  });
}

function requestAccessToken(context, cb) {
  console.log("requestAccessToken called");
  var accessTokenUrl = "https://" + context.secrets.auth0Domain + "/oauth/token";
  var audience = "https://" + context.secrets.auth0Domain + "/api/v2/";
  request.post({
    url: accessTokenUrl,
    headers: {
      "content-type": "application/json" 
    },
    json: { "client_id": context.secrets.AUTH0_APIv2_CLIENT_ID, 
            "client_secret" : context.secrets.AUTH0_APIv2_CLIENT_SECRET,
            "audience":audience,
            "grant_type":"client_credentials"}
  }, function(err, response, body) {
       if (err) {
         return cb(err);
       }
       if(body.error){
         return cb(body)
       }
       cb(null, body.access_token);
    });
}

module.exports = function (context, emailTo, cb) {
  getPasswordLink(context, emailTo, function(err, resp){
    if (err){
      console.log(err);
      requestAccessToken(context, function(err, resp){
        if (err){
          console.log(err);
          cb(err);
        } else {
          context.storage.set({ "auth0APIv2Token": resp }, { force: 1 }, function (err) {
            if (err) {
              return cb(err);
            } 
            getPasswordLink(context, emailTo, cb);
          });
        }
      })
    } else {
      cb(null, resp);
    }
  })
}