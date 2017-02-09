## What it does?

In [Password Flow 2 option enabled accounts](https://auth0.com/forum/t/changepassword-v2-flow-and-force-password-reset/2535/1), with this simple project running on [Webtask.io](https://webtask.io)
you could replace the password reset email view of your Lock. With Webtask hosted reset email view, you could set different redirect to URLs even if your applications are using the same client ID in the Auth0 dashboard which is currently not possible to setup from the management dashboard.

To make this possible, spin up a new instance of this project for each different redirect URLs and in 
Lock configuration set the [forgot password link option](https://auth0.com/docs/libraries/lock/v10/customization#forgotpasswordlink-string-) to this instance.

Your Lock version should be 10 or newer.

## How it works?

1- User clicks on Lock password reset link <br />
2- Browser navigates to the instance of this project in webtask.io<br />
2.1- Webtask instance provides it's own user interface to get the user email.<br />
2.2- Webtask instance makes a Management v2 API call to get the customised password reset link.<br />
2.3- Webtask instance sends the received email link in 2.2 to user's email address provided in step 2.1<br />
3- User clicks on th link.<br />
4- User updates the password with Auht0 hosted page.<br />
5- After the password update, user is redirected to the customised redirect to path configured in step 2.<br />

## Prequists
* Install Node.js and Npm 

## Setup
* Install libraries

```bash
npm install
npm install -g wt-cli webtask-bundle
wt init
```
* Copy the `sample_config.json` as `config.json` in the same folder.

* Get the Webtask token for your Webtask.io account. You can find the token with below commandline call.
 
```bash   
wt profile ls --show-token
```

* Paste your Webtask token to config.json<br />
<b>`"webtaskToken":"YOUR_TOKEN_FROM_PREVIOUS_STEP"`</b>

* Fill the other required parameters in config.json.

  * Project name in the webtask link created.<br />
  <b>`"webtaskName": "custom-password-reset" </b>
  
  * Create AUTH0 API v2 Token following this link https://auth0.com/docs/api/management/v2/tokens<br />
  <b>`"AUTH0_APIv2_TOKEN":"YOUR_AUTH0_API_V2_TOKEN"`</b>
  
  * This project currently uses (SendGrid)[www.sendgrid.com] for sending emails.<br /> 
  <b>`"SENDGRID_KEY": "YOUR_SENDGRID_KEY"`</b>
  
  * Sender email<br />
  <b>`"fromEmail" : "YOUR@EMAIL"`</b>
  
  * Check the link for more details https://auth0.com/docs/api/management/v2#!/Tickets/post_password_change
  resultUrl is to configure the path to redirect after password update.<br />
  <b>`"resultUrl" : "YOUR_REDIRECT_URL_AFTER_PASSWORD_UPDATE"`</b>
  
  * connectionId should be the database connection id where user email is available.
  It starts with con_ and id is available in the URL when you click on connection in 
  management dashboard<br />
  <b>`"connectionId" : "YOUR_AUTH0_DB_CONNECTION"`</b>

  * Your auth0 domain like MY_DOMAIN.auth0.com or MY_DOMAIN.aut0.au.com etc.<br />
  <b>`"auth0Domain": "YOUR_AUTH0_DOMAIN"`</b>

* Bundle the project and upload to Webtask.io

```bash
npm run bundle
npm run deploy
```
## How to test
https://webtask.it.auth0.com/api/run/YOUR_ACCOUNT/custom-password-reset

## Usefull links
* [Webtask Basics](https://webtask.io/docs/101)
* [Sandboxjs](https://webtask.io/docs/sandboxjs)
* [Webtask Bundler](https://github.com/auth0/webtask-bundle)

## License
[MIT](LICENSE)
