const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const mongodb = require('./db/connect');
const routes = require('./routes');
//const session = require('express-session');
const cookieSession = require('cookie-session')
const passport = require('passport');
require('./helpers/passport')

const port = process.env.PORT || 3000;
const app = express();

app.use(cookieSession({
  name: 'github-auth-session',
  keys: ['key1', 'key2']
}))
app.use(passport.initialize());
app.use(passport.session());
// app.get('/api-docs',(req,res)=>{
// res.send(`Hello world ${req.user.displayName}`)
//  })

app.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
})


app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader(
    //   'Access-Control-Allow-Headers',
    //   'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    // );
    // res.setHeader('Content-Type', 'application/json');
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  })
  .use('/', routes);

  process.on('uncaughtException', (err,origin) => {
    console.log(process.stderr.fd, 'caught exception: ${err}\n' + 'Exception origin: ${origin}');
  });





mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});