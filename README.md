## What it does?

In Password Flow 2 option enabled accounts, with this simple project running on [Webtask.io](https://webtask.io), 
you could easily differentiate the redirect URLs for your applications where browser redirects the users after 
they update their passwords clicking the password reset link.

To make this possible, spin up a new instance of this project for each different redirect URLs you need and in 
Lock configuration of your application set the [forgot password link option](https://auth0.com/docs/libraries/lock/v10/customization#forgotpasswordlink-string-)  
to this instance, if you are using Lock 10 or later versions.

## How does is work?

1- User clicks on Lock password reset link.
2- Browsers navigate to the instance of this project in webtask.io
2.1- Webtask instance provides it's own user interface to get the user email.
2.2- Webtask instance makes a Management v2 API call to get the customised password reset link.
2.3- Webtask instance sends the received email link in 2.2 to user's email address provided in step 2.1
3- User clicks on link the link.
4- User updates the password with Auht0 hosted page.
5- After the password update, user is redirected to the customised redirect path in step 2.

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

* Paste your Webtask token to config.json
```json  
{
  "webtaskToken":"YOUR_TOKEN_FROM_PREVIOUS_STEP"
}
```

* Fill the other required parameters in config.json.

* Bundle the project and upload to Webtask.io

```bash
npm run bundle
npm run deploy
```
## How to test
https://webtask.it.auth0.com/api/run/YOUR_ACCOUNT/custom-password-reset?email=saltukalakus@gmail.com

## Usefull links
* [Webtask Basics](https://webtask.io/docs/101)
* [Sandboxjs](https://webtask.io/docs/sandboxjs)
* [Webtask Bundler](https://github.com/auth0/webtask-bundle)

## License
[MIT](LICENSE)