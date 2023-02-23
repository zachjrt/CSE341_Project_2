const express = require('express');
const router = express.Router();
const path = require('path');
const isLoggedIn = require('../middleware/auth.js')
const passport = require('passport');


//Not ready yet. Crashes
// router.use('/', (req, res) => { res.sendFile(path.join(__dirname, '/static/index.html'))},  require('./swagger'));

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../static/index.html'));
  });
router.get('/auth',passport.authenticate('github',{ scope: [ 'user:email' ] }));

router.get('/auth/error', (req, res) => res.send('Unknown Error'))

router.get('/oauth-callback',passport.authenticate('github', { failureRedirect: '/auth/error' }),
function(req, res) {
  res.redirect('/api-docs');
});

router.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
})


router.use('/', require('./swagger'));
router.use('/requests',isLoggedIn, require('./requests'));
router.use('/workers', isLoggedIn, require('./workers'));




module.exports = router;