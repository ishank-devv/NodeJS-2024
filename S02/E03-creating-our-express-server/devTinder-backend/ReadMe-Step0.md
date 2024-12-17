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
