//https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
//http://blog.arisetyo.com/?p=492


/*
* - index.ejs
* index GET
* login POST
*/

var User = require('../models/dbSchema');

exports.index = function(req, res){
	
  User.find(function(error, users) {
      if(error) {
          console.log('error ' + error);
          return;
      }
			
      if(session.username === 'admin') {
          res.render('index', { 
            title     : 'User management',
            name      : session.username || '',
            users     : users,
            isAdmin   : true
          });    
      }
      else {
           res.render('index', { 
            title     : 'User management',
            name      : session.username || '',
            users     : users,
            isAdmin   : false
          });      
      }
    
  }); // list the whole content
};
exports.login = function(req, res){
  
    var username = req.param('user');
    var password = req.param('psw');
  
    if(username !== undefined && password !== undefined) {
      
      session.username = username;
			
      User.findOne({name: username, pass: password}, function(err, userLoggedInInfo) {
          if(err || !userLoggedInInfo) {
              console.log('No record based on the login info');
              // TODO: user not in the DB error
          }
          else {
            User.find(function(error, users) {
                if(error) {
                    console.log('error ' + error);
                    return;
                }

                if(username === 'admin') {
                    res.render('index', {
                      title     : 'Express POST',
                      name      : session.username || userLoggedInInfo.name,
                      users     : users,
                      isAdmin   : true
                    });
                }
                else {
                    res.render('index', {
                      title     : 'Express POST',
                      name      : session.username || userLoggedInInfo.name,
                      users     : users,
                      isAdmin   : false
                    });
                }
              
            }); // list the whole content
          }
      });
    }
    else {
        // TODO: login error
        
        res.render('index', {
          title     : 'Express POST',
          name      : '',
          users     : users,
          isAdmin   : false
        });
    }
};

/*
* - newUser.ejs
* newUser GET
* newAction POST
*/

exports.newUser = function(req, res){
    if(session.username !== 'admin'){
        res.redirect('/');
        return;
    }
  
    res.render('newuser', {
      title     : 'Express GET'
    });  
};

exports.newAction = function(req, res){
    if(session.username !== 'admin'){
        res.redirect('/');
        return;
    }
    
    var username = req.param('newUser');
    var password = req.param('newPsw');
  
		//need a query that the user name does not already exist 

		var newUser = User({
			name: username,
			pass: password
		});
	
		newUser.save(function(err, saved) {
				if( err || !saved ) {
						console.log("Record not saved");
						// handle same user name
						return;
				}
				
				console.log("Record saved");
			
				res.redirect('/');
		});
};

/*
* - editUser.ejs
* editAction PUT
*/
/*
exports.editPage = function(req, res){
    if(session.username !== 'admin'){
        res.redirect('/');
        return;
    }
  
		var _id	= req.params._id;
	
		console.log(_id);
	
    res.render('edituser', {
      title     : 'Express POST',
      _id       : '',
      userName  : ''
    });
};
*/
exports.editAction = function(req, res){
    if(session.username !== 'admin'){
        res.redirect('/');
        return;
    }
	
		var editById	= req.params.id;
		var editName	= req.body.editName; // req.body needed because it came from the AJAX PUT data 

		User.findByIdAndUpdate(editById, { name: editName }, function(error, user) {
				if(error) {
						console.log('error ' + error);
						return;
				}
				//console.log('User updated to ' + editName);
			
				return res.json({username: editName});
		});
	
};

/*
* - delUser
* delAction DELETE
*/

exports.delAction = function(req, res){
    if(session.username !== 'admin'){
        res.redirect('/');
        return;
    }
	
		var delByID	= req.params.id;
		
		User.findByIdAndRemove(delByID, function(error) {
				if(error) {
						console.log('error ' + error);
						return;
				}
				
				//console.log('User removed');
			
				return res.json({userID: delByID});
			
		});
};



/*
* - delRedis
* delRedis Cache
*/
exports.delRedis = function(req, res){
	
		cache.del('home', function(err, count){
						console.log(count + ' entries was removed.');
		});
	
};