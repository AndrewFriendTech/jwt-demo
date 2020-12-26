//sample user databse
let users = [
	{userID:1, username: "af123" ,full_name:"Andrew Friend",password:"Password"},
	{userID:2, username: "jw456" ,full_name:"Joel Ward", password:"Password"},
	{userID:3, username: "jr123" ,full_name:"Jim Roberts", password:"Password"},
	{userID:4, username: "jo234", full_name:"Jessie Owens", password:"Password"},
	{userID:5, username: "rp567" ,full_name:"Ryan Patrick", password:"Password"}
];



//secret key to sign tokens
let secretkey = "thisIsAnInsecureKey";

//port to run sever on
const port = 8000;

//dependecies
const express = require('express');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.urlencoded());
app.use(express.json());

app.post("/login" ,(req,res) =>{
	user
})

//if username is correct, returns user and password , other
function authenticateUser(username,password)
{

}

function verifyToken(req,res,next){

}

app.listen(port, () => console.log("Server listening on port:" + 8000));


