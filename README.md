<p align="center">
  <a href="http://docs.fitii.fit"><img src="https://github.com/Make-Squad/networq-v1/blob/master/client/public/images/Networq.png" width="300" alt="Fitii"></a>
  <br>
  <a href="#"><img src="https://img.shields.io/badge/version-v1.0.0-blue.svg" alt="Version"></a>
  <a href="#"><img src="https://img.shields.io/badge/tests-passing-brightgreen.svg" alt="Version"></a>
  <a href="#"><img src="https://travis-ci.org/johnathanachen/Fitii.svg?branch=master" alt="Travis CI"></a>
</p>

## The Virtual Business Card

> Why carry business cards around when your face can be your business card?

> This is a user-focused virtual business card application where you can leave your business card at home and embrace the use of augmented reality. You store your business card in the app and manage your privacy settings. When you're out in the world, your contact hovers their camera over your face and the app will recognize your image. This will send you an access notification and you can share your business card with them as well as connect with them on Linked in.  

# Installation

To install the required **modules**, run the command

```
$ npm i
```

To start up your **local dev** environment run:

```
$ npm run dev
```

Run **test**

```
$ npm test
```

Serve up **docs**

```
$ npm run dev
```

```
root/
|
|-- client/                  # Client side folders
|   |-- public/              # public files
|       |-- views/           # React files; html files
|       |-- styles/          # Template styles (buttons, colors, typography, etc)
|       |-- images/
|       |-- js/              # client side javascript
|   |-- src/                 # source files
|       |-- app/             # App files
|       |-- components/
|
|-- controllers/       
|-- models/
|-- tests/
|
`-- server.js                # server setup
```

## Our Stack
- Clarifai API for image recognition
- MongoDB and Mongoose for database use and access
- Express.js and Node.js for server logic and HTTP requests
- HTML, Bootstrap, CSS, Sass, React.js and Javascript for front end templates and client side logic

## Collaborators
- Stephanie Cherubin - Front End, UI Design - React.js, Javascript
- Faith Chikwekwe - Back End, Gitmaster - Node.js, Express.js, Javascript
