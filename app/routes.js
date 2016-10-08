var mongoose = require('mongoose');

var _ = require('underscore')

var tools =require('./tools/tools');

tools.DataGrouper.register("sum", function(item) {
	    return _.extend({}, item.key, {Value: _.reduce(item.vals, function(memo, node) {
	        return memo + Number(node.Value);
	    }, 0)});
	});
module.exports = function(app) {
	var Whd = mongoose.model('Whd');
	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	app.get('/getWhd',function(req, res, next){
		var queryWhd = Whd.find({"latlng":{'$exists':true}},{"latlng":1}).limit(10000);;

    	queryWhd.exec(function (err, whd){
      if (err) { 
        console.log(err)
        return next(err); 
      }
      if (!whd) { return next(new Error('can\'t find whd')); }

      //console.log('start grouping')
      //whd = tools.DataGrouper.sum(whd, ["latlng"])
      //console.log('done grouping')
      req.whd = whd;
      res.json(req.whd);
    });

	})
	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

};