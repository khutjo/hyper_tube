function 	fieldSpecD(field)
{
	return (function dsc(a,b)
			{
				if (a[field] < b[field])
					return (-1);
				if (a[field] > b[field])
					return (1);
				return (0);
			});
}

//function for ascending
function 	fieldSpecA(field)
{
	return (function asc(a,b)
		{
			if (a[field] < b[field])
				return (-1);
			if (a[field] > b[field])
				return (1);
			return (0);
		});
}


//sort funciton
function 	sort_by_field(order, data, field)
{
	if (order === "asc")
		return (data.sort(fieldSpecA(field)));
	else
		return (data.sort(fieldSpecD(field)));
}


function 	display(movie)
{
	console.log(movie.length);
	console.log(movie);
	var colCounter = 0;
	var container = document.getElementById('results');

	for(var i = 0; i < movie.length; i++)
	{
		var movie_url = 'https://www.imdb.com/title/' + movie['imdbID'];
		if (movie['Poster'] == 'N/A'){
			movie['Poster'] = 'https://submissions.mnetcorporate.co.za/assets/channels/mnet_movies/logo-large.png?v=2';
		}
		if (i == 0 || i % 3 == 0){
			var rowDiv = document.createElement('div');
			rowDiv.setAttribute('class', 'row');
		}
		var movieDiv = document.createElement('div');
		movieDiv.setAttribute('class', 'col-sm');
		var moviePoster = document.createElement('img');
		moviePoster.src = movie[i].Poster;
		
		var movieTitle = document.createElement("label");
		movieTitle.setAttribute('class', 'badge badge-pill badge-success');
		movieTitle.innerHTML = movie[i].Title;
	
		var releaseYear = document.createElement("label");
		releaseYear.setAttribute('class', 'badge badge-pill badge-primary');
		releaseYear.innerHTML = movie[i].Year;
		
		var movieDetails = document.createElement('div');
		movieDetails.appendChild(movieTitle);
		movieDetails.appendChild(releaseYear);
		movieDiv.appendChild(moviePoster);
		movieDiv.appendChild(movieDetails);
		rowDiv.appendChild(movieDiv);
		container.appendChild(rowDiv);

	}	
	
	/* 
	forEach(function(movie) {

		if (movie['Poster'] == 'N/A')
		movie['Poster'] = 'https://submissions.mnetcorporate.co.za/assets/channels/mnet_movies/logo-large.png?v=2';
		var movie_url = 'https://www.imdb.com/title/' + movie['imdbID'];
		
		if (colCounter == 0 || colCounter % 3 == 0){
			var rowDiv = document.createElement('div');
			rowDiv.setAttribute('class', 'row');
		}
		var movieDiv = document.createElement('div');
		movieDiv.setAttribute('class', 'col-sm');
		movieDiv.innerHTML = movie.Title;
		rowDiv.appendChild(movieDiv);
		container.appendChild(rowDiv);

		
		var node = document.getElementById('results');
		var newNode = document.createElement('p');
		node.appendChild(newNode).innerHTML =(' <tr><td><h5>' + movie['Title'] + ' </h5></td> <td>' + movie['Year'] +
		'</td><td><img height="50%" src='+ movie['Poster']+ 'alt=""></td> <td><a href=' + movie_url +'>Download</a></td></tr>');

		node.appendChild(newNode).innerHTML = (
		'<div class="row>'
		+'<div class="col-sm">'
		+'<img  height="" width="" src=' 
		+ movie['Poster']
		+'alt="">'
		+'<h5>'+ movie['Title']+'</h5>' 
		+ movie['Year']
		+'<a class="btn btn-primary" href=' 
		+ movie_url 
		+'>Download</a></div></div>'
		); 
		node.appendChild(newNode);
	});
	 */
}




function	ft_search(Errid) {
	var s = document.getElementById('search').value
	var stuff = {};
	stuff['search'] = s;
	$(document).ready(function () {
		$.ajax({
			url: "results",
			type: 'get',
			data: stuff,
			success : function (data) {
				// console.log(data['Search'][0]);
				if (data['Search'] || data['Title']) {
					// console.log(data['Title']);
						var node = document.getElementById('results');
						node.innerHTML = "";
						if (data['Search']){
						document.getElementById(Errid).innerHTML = "";
						var things = sort_by_field("asc", data['Search'], "Title");
						display(things);
									}
									else if (data){
										document.getElementById(Errid).innerHTML = "Too many results. Please be more verbous ......";
										if (data['Poster'] == 'N/A')
											data['Poster'] = 'https://submissions.mnetcorporate.co.za/assets/channels/mnet_movies/logo-large.png?v=2';
										document.getElementById('results').innerHTML = ('<tr><td>' + data['Title'] + ' </td> <td>' + data['Year'] +
											'</td><td><img height="20%" src=' + data['Poster'] + 'alt=""></td> <td><a href=https://www.imdb.com/title/' + data['imdbID'] + '>Download</a></td></tr>');
										}
								}
							else {
									document.getElementById('results').innerHTML = "movie noT FOUND";
								}
							},
			error: function () {
				console.log("something went wrong");
			}
		});
	});
}