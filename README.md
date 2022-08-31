A web platform that enables users to register and send money to each other through MPESA.

Developed using Next.js, Sass, Bootstrap and MongoDB.

### Pre-requisites

1. Make sure you have MongoDB installed in your machine.
2. For emails create a Google app password. Open [my Google account security](https://myaccount.google.com/intro/security), enable 2-step verification and create a new app password.


### Project set up

```
git clone https://github.com/faizscripts/paypoint

cd paypoint

npm i
```

In the root directory of the project, create a .env.local file and add the following data.

```
EMAIL=YOUR_EMAIL
APP_PASSWORD=APP_PASSWORD
MONGODB_URI="mongodb://localhost:27017/PaypointDB"
JWTKEY="JWTKEY"
```

### Running the project

**Development mode**

```
npm run dev
```

**Production mode**
```
npm run build
npm start
```