const passport = require('passport');
const helpers = require('./routehelpers');

module.exports = function(app) {

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

  app.get('/auth/facebook', passport.authenticate('facebook'));

  app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }),
    helpers.newUser,
    helpers.setCookie,
    helpers.setUserId,
    helpers.setHeader,
    helpers.loginRedirect
  );

  app.get('/logout', 
    helpers.terminateSession, 
    helpers.loginRedirect
  );

  // get songs for sequencer
  app.get('/api/sample/:songTitle', helpers.getSong);

  // get sound options for each track in sequencer
  app.get('/api/options/:userId', helpers.getSampleOptions);

  // get session info for requests
  app.get('/api/session', helpers.getUserSession);

  // get profile info for user (sequences saved and samples uploaded)
  app.get('/api/profile/:userId', 
    helpers.isLoggedIn, 
    helpers.getUserProfile
  );

  // save sequences when logged in as a user
  app.post('/api/save', 
    helpers.isLoggedIn, 
    helpers.saveSequence
  );

  app.delete('/api/deleteSequence/:sequenceName/:userId', 
    helpers.isLoggedIn, 
    helpers.deleteSequence
  );

  app.post('/api/waveTest', (req, res, next) =>{
    console.log(req.body.data)
    res.send('got it');
  });
  
};
