function postObj(url, object,callback)
{
	fetch(url,{
		method:"POST",
		headers:{
			'Content-Type' : 'application/json'
		},
		body: JSON.stringify(object)
	})
	.then(response => response.json())
	.then(callback);
}

function getObj(url,object,callback)
{
	fetch(url)
	.then(response => response.json())
  	.then(callback);

}