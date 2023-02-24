const express = require('express');
const router = express.Router();
const path = require('path');
const isLoggedIn = require('../middleware/auth.js')
const passport = require('passport');


//Main log in page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../static/index.html'));
  });

//Sends user to get authenticated by gihub
router.get('/auth',passport.authenticate('github',{ scope: [ 'user:email' ] }));


//If an error occurs on  authentication
router.get('/auth/error', (req, res) => res.send('Unknown Error'))

//return callback route
router.get('/oauth-callback',passport.authenticate('github', { failureRedirect: '/auth/error' }),
function(req, res) {
  res.redirect('/api-docs');
});

//Previous routes
router.use('/', require('./swagger'));
router.use('/requests',isLoggedIn, require('./requests'));
router.use('/workers', isLoggedIn, require('./workers'));

//export
module.exports = router;