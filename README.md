## What it does?

In [Password Flow 2 option enabled accounts](https://auth0.com/forum/t/changepassword-v2-flow-and-force-password-reset/2535/1), with this simple project running on [Webtask.io](https://webtask.io)
you could replace the password reset email view of your Lock. With Webtask hosted reset email view, you could set different redirect to URLs for your applications even they are using the same client ID in the Auth0 dashboard which is currently not possible to setup from the management dashboard.

To make this possible, spin up a new instance of this project for each different redirect to URLs and in 
Lock configuration of your application set the [forgot password link](https://auth0.com/docs/libraries/lock/v10/customization#forgotpasswordlink-string-) to this instance.

Note that, your Lock version should be 10 or newer.

## How it works?

1- User clicks on Lock password reset link. <br />
2- Browser navigates to the instance of this project in webtask.io<br />
2.1- Webtask instance provides it's own user interface to get the user email.<br />
2.2- Webtask instance makes a [Management v2 API call](https://auth0.com/docs/api/management/v2#!/Tickets/post_password_change) to get the customised password reset link.<br />
2.3- Webtask instance sends the received email link in 2.2 to user's email address provided in step 2.1<br />
3- User clicks on the link.<br />
4- User updates the password with Auht0 hosted page.<br />
5- After the password update, user is redirected to the customised redirect to path configured in step 2.<br />

## Prerequisites
* Install Node.js and Npm 

## Setup
* Install libraries

```bash
npm install
npm install -g wt-cli webtask-bundle
wt init
```
* Copy the `sample_config.json` as `config.json` in the same folder.

* Get the Webtask token for your Webtask.io account. You can find the token with below command line call.
 
```bash   
wt profile ls --show-token
```

* Paste your Webtask token to config.json<br />
<b>`"webtaskToken":"YOUR_WEBTASK_TOKEN"`</b>

* Fill the other required parameters in config.json.

  * Project name in the webtask link created. For each different redirect to update this setting.<br />
  <b>`"webtaskName": "custom-password-reset"`</b>
  
  * [Create AUTH0 API v2 Token](https://auth0.com/docs/api/management/v2/tokens)<br />
  <b>`"AUTH0_APIv2_TOKEN":"YOUR_AUTH0_API_V2_TOKEN"`</b>
  
  * This project currently uses [SendGrid](www.sendgrid.com) for sending emails.<br /> 
  <b>`"SENDGRID_KEY": "YOUR_SENDGRID_KEY"`</b>
  
  * Sender email<br />
  <b>`"fromEmail" : "YOUR@EMAIL"`</b>
  
  * resultUrl is to configure the path to redirect to after password update. Check the [API](https://auth0.com/docs/api/management/v2#!/Tickets/post_password_change) for more details.<br />
  <b>`"resultUrl" : "YOUR_REDIRECT_TO_URL_AFTER_PASSWORD_UPDATE"`</b>
  
  * connectionId should be the database connection id where user email is available.
  It starts with `con_` and this id is available in the URL when you click on a [connection](https://manage.auth0.com/#/connections/database) in 
  management dashboard.<br />
  <b>`"connectionId" : "YOUR_AUTH0_DB_CONNECTION"`</b>

  * Your auth0 domain like MY_DOMAIN.auth0.com or MY_DOMAIN.aut0.au.com etc.<br />
  <b>`"auth0Domain": "YOUR_AUTH0_DOMAIN"`</b>

* Bundle the project and upload to Webtask.io
```bash
npm run bundle
npm run deploy
```
## How to test
Click on the created webtask link <br />
`https://webtask.it.auth0.com/api/run/`<b>YOUR_ACCOUNT</b>`/`<b>webtaskName</b>

## Demo
2 SPA with Lock is currently hosted in now.sh with the below link. Both have the same client id in Auth0 dashboard. 
I have started a webtask for each so that when an email reset update completes in Auth0 hosted page user is
returned to correct app. Please try yourself with your email in both of the apps. Note that as both Apps
use the same connection/db you need to create an account only once. Also notice that webtask urls for both apps
are different.

* [APP-1](https://build-xkqwxuiflr.now.sh)
* [APP-2](https://build-qhwjuvtumi.now.sh)

## Useful links
* [Webtask Basics](https://webtask.io/docs/101)
* [Sandboxjs](https://webtask.io/docs/sandboxjs)
* [Webtask Bundler](https://github.com/auth0/webtask-bundle)

## License
[MIT](LICENSE)
