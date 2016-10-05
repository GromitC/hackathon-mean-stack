var mongoose = require('mongoose');

module.exports = function(app) {
	var Players = mongoose.model('Players');
	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	app.get('/getPlayer',function(req, res, next){
		var queryPlayers = Players.find();

    	queryPlayers.exec(function (err, players){
      if (err) { 
        console.log(err)
        return next(err); 
      }
      if (!players) { return next(new Error('can\'t find players')); }
      req.players = players;
      res.json(req.players);
    });

	})
	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

};