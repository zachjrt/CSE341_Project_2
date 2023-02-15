const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const mongodb = require('./db/connect');
const routes = require('./routes');
const port = process.env.PORT || 3000;
const app = express();

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

  //Auth Test
  app.get('/oauth-callback', ({ query: { code } }, res) => {
    const body = {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_SECRET,
      code,
    };
    const opts = { headers: { accept: 'application/json' } };
    axios
      .post('https://github.com/login/oauth/access_token', body, opts)
      .then((_res) => _res.data.access_token)
      .then((token) => {
        // eslint-disable-next-line no-console
        console.log('My token:', token);
  
        res.redirect(`/?token=${token}`);
      })
      .catch((err) => res.status(500).json({ err: err.message }));
  });

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});