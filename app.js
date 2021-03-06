

//secret key to sign 
let secretkey = "ThisKeyIsNotVerySecure"
let port = 8000;

//dependecies
const express = require('express');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const path = require('path');
const logHeaders = require('./logHeaders');

const app = express();

app.use(morgan('dev'));
app.use(logHeaders);
app.use(express.urlencoded());
app.use(express.json());

let publicPath = path.resolve(__dirname,"public");
app.use(express.static(publicPath));


app.post("/login" ,(req,res) =>{
	let user = authenticateUser(req.body.username,req.body.password);
	if(user.error)
	{
		res.status(401)
		res.send(user)
	}
	else
	{
		jwt.sign(user, secretkey, { expiresIn: '30m' }, (err, token) => {
			res.json({
			  token,
			  user
			});
		});
	}
})

app.get("/users", verifyToken, (req,res) => {
	res.send({users, token: req.authData});
});


//if username is correct, returns user and password , other
function authenticateUser(username,password)
{
	let user = findUserByID(username);
	if(user)
	{
		if(user.password == password)
		{
			return user;
		}
		else
		{
			return {error: "Incorrect Password"}
		}
	}
	return {error: "Incorrect Username"};
}




app.listen(port, () => console.log("Server listening on port:" + 8000));

//middleware to verify JWT. Adds token to request object if valid, other respons with 403
function verifyToken(req, res, next) {
	// Get auth header value
	const bearerHeader = req.headers['authorization'];
	// Check if bearer is undefined
	if(typeof bearerHeader !== 'undefined') {
	  // Split at the space
	  const bearer = bearerHeader.split(' ');
	  // Get token from array
	  const bearerToken = bearer[1];
	  // Set the token
	  req.token = bearerToken;
	  //check token is valid
	  jwt.verify(bearerToken,secretkey,(err,data) =>{
		  if(err)
		  {
			res.status(403);
			res.send({error: "No token in header"});
		  }
		  else
		  {
			  req.authData = data;
			  next();
		  }
	  })
	  // Next middleware
	  //next();
	} else {
	  // Forbidden
	  res.status(403);
	  res.send({error: "No token in header"});
	}
  
  }


//sample user databse
let users = [
	{userID:1, username: "af123" ,full_name:"Andrew Friend",password:"Password"},
	{userID:2, username: "jw456" ,full_name:"Joel Ward", password:"Password"},
	{userID:3, username: "jr123" ,full_name:"Jim Roberts", password:"Password"},
	{userID:4, username: "jo234", full_name:"Jessie Owens", password:"Password"},
	{userID:5, username: "rp567" ,full_name:"Ryan Patrick", password:"Password"}
];


//functions for finding users

//by id
function findUserByID(userID){
	for(user of users)
	{
		if(user.userID == userID) return user;
	}
	return null;
}

//by username
function findUserByID(username){
	for(user of users)
	{
		if(user.username == username) return user;
	}
	return null;
}
