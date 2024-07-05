# BITWARDEN TOTP EXPORTER

Bitwarden recently released bitwarden authenticator, a free app that can be used separately from the bitwarden's (paid) inbuilt totp feature

If you already have your tokens in the bitwarden password manager, and want to migrate them (or copy them) to the bitwarden authenticator app (or any other auth app for that matter) this package helps you export all your totps (and any other custom field, if you so desire) to your desired auth service.

Besides, this works on any password manager export (json only for now) as long as you know the variable name of the totp. (default is 'totp' in .env)



# USAGE

1. clone this repo by running:

```git clone https://github.com/nathfavour/bitwarden_totp_export```

2. cd to the project root directory

```cd bitwarden_totp_export```

3. run:

```npm install```

4. now populate your .env file with the correct values for your case.

5. finally, run:

```npm 

