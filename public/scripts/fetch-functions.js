function postObj(url, object, callback)
{
	let options ={
		method:"POST",
		headers:{
			'Content-Type' : 'application/json'
		},
		body: JSON.stringify(object)
	}
	fetch(url,options)
	.then(response => response.json())
	.then(callback);
}

function postObjWithToken(url, object,token,callback)
{
	let options ={
		method:"POST",
		headers:{
			'Content-Type' : 'application/json',
			'Authorization': 'Bearer ' + token 
		},
		body: JSON.stringify(object)
	}


	fetch(url,options)
	.then(response => response.json())
	.then(callback);
}

function getObj(url,callback)
{
	let options ={
		method:"GET"
	};
	
	fetch(url,options)
	.then(response => response.json())
	.then(callback);

}

function getObjWithToken(url,token,callback)
{
	let options ={
		method:"GET",
		headers:{
			'Authorization' : 'Bearer ' + token 
		},
	}


	fetch(url,options)
	.then(response => response.json())
	.then(callback);
}