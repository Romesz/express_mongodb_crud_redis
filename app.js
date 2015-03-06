/*
http://nodejs.blog.br/2015/02/caching-views-redis-express-framework

https://app.redislabs.com/main/dashboard
*/

var express = require('express');
session     = require('express-session');
var routes  = require('./routes');
var http    = require('http');
var path    = require('path');
var mongoose = require('mongoose');
var	config = require('./config/config.json');	// has to be defined

var redis = require('redis').createClient(config.redis.port, config.redis.host, {auth_pass : config.redis.passworld});
cache = require('express-redis-cache')({client: redis});


var app = express();

mongoose.connect('mongodb://UserName:Pass@****.mongolab.com:****/dbname');  // has to be defined

app.set('cache', cache);

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
	

		cache.on('message', function(message){
						console.log(message);
		});
}

app.get('/', cache.route('home'), routes.index); //list users
app.post('/', routes.login); //login

app.get('/newUser', routes.newUser); //new page
app.post('/newUser', routes.newAction); //new action

app.put('/editUser/:id', routes.editAction); //edit action

app.delete('/:id', routes.delAction); //delete action


app.get('/del_redis', routes.delRedis);	//delete redis cache

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});