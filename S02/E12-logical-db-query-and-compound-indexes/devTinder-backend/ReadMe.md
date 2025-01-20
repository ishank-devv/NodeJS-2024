ExpressJs- a framework for NodeJS

To create connfiguration file, package.json

- npm init
  package.json: ( this file is like a INDEX's role in book, its metadata associated with a project )

src/app.js - starting point of your application, main code js file where you'll write nodej/js code

- npm i express
  dependencies: whenever we install/i something, it adds dependecy to our project inside "node_modules" means it added "express" as dependency to our project.

  express: express inside node modules is also dependent on a lot of dependencies( other npm libraries) And other libraries are dependent on other dependencies. All that will be installed.
  "express": "^4.21.2"
  "4.21.2"- without any sign, means project will never update, will run on this particular version.

  ^- caret ( our project will updated automatically if it is 4.x.x)- upto minor updates

  ~- Tilda (our project will updated automatically if it is 4.21.x)- only patch updates

  4- major( it will change only when critical/breaking major change happen, may not be backward versioncompatible)

  21- minor( releasing new minor feature, things will still be backward compatible- means not a major version change )

  2- patch( small change, bugfix, - means very safe change )

  package-lock.json: what actual version i'm using is defined here. package.json is not giving me exact version info your project is running on because it might be auto updated, that info will be present in package-lock.json.

nodemon:to auto restart server after every change in code

- npm i -g nodemon ( global installation)
  nodemon: to auto restart server
  command too run: nodemon src/app.js

S02Ep06

- How to connect your application to your mongo db cluster.

1. Create a config folder inside src
2. Create a database.js file inside the config folder, in this file we will write the logic to connect to database
3. we'll use mongoose library to connect/talk to DB
4. go to mongoose.com and copy the boilerplate code
5. Also mongoose has very good documentation for reference
6. npm i mongoose
7. write logic in the file database.js & import that file inside app.js( require("./config/database"); )

// NOTE: PROPER WAY OF MAKING A DB CONNECTION
// once your DB connection is established
// then only you should do app.listen( 3000, ()=>{})

// that's why first export connectDB function from database.db file
// and import it in app.js( line 2 ) & call connectDB before app.listen

SCHEMA- create inside a models

S02E08
npm validator library- can be used to do validations at schema level
& Sanitization(api level validation)

- npm i validator

S02E09

- passwords should be stored in hashed format/encrypted format
  First thing should be done during /signup:

1. Validation of data( utils/helper funct)
2. Encrypt the password
3. Then Store user in DB

To encrypt/hash passwords & also validate your passwords

- npm i bcrypt

S02E10

- there are certain APIs which can be accessed only after the authentication/logged in.
- COOKIE: when you're loggin in an application & calling a login API, then server validates( email & password ) & then authenticates & sends back a response along with JWT token inside the COOKIE. Then browser will store that cookie, whenever user is making any(like, comment, post, patch) API call, browser will send that cookie along with request, then this cookie will validated & proper response(data etc) will send back to browser.
- Suppose after sometime, On every API call, this cookie(JWT token) will be validated.
- cookie EXPIRE: you can also expire your cookies which holds JWT token & other things
- EXPIRY: we can set expiry date of JWT token to any time( 0d,1d, 1w, 1m etc)
- 0d: expires immediatly once the token is created
- AUTHENTICATION/VALIDATION FAILED: When JWT token is expired & you're making an API call, then it won't work & you'll have to login again.

cookie-parser: is used to read cookies

- npm i cookie-parser

JWT: JSON wen token, is JSON Object which is used to securely transfer information over the web(between two parties).

- npm i jsonwebtoken
  It is made of 3 parts:

1. Header
2. Payload/data
3. Signature

- Auth Middleware(userAuth): is needed because we want all( except /signin & /login) the APIs to work after authentication
- use userSchema methods in user.js to generate jwt token & bcrypt.compare instead in app.js, as it is re-usable, testable etc
- if this is being used to point to the instance of user, then avoid using arrow function as this doesn't work well with arrow function. where user/this can be Akash or Elon

S02E11

- use express.router() to handle( grouped & manage apis effieciently) routing in a proper way
