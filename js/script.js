$(document).ready(function() {

	//Search form effects
	$('#search').mouseenter(function() {
			$('.icon').animate({opacity: 0}, 400);
	});

	$('#search').mouseleave(function () {
			$('.icon').animate({opacity: 1}, 400);
	});

	$('form').submit(function(evt) { //on form submission ...

		evt.preventDefault(); //stop the form from submitting

    	//display the album div
		(function() {
			document.getElementById("wrap-margin").style.display = "block";
			console.log("wrap-margin show");
			document.getElementById("sort").style.display = "inline-block";
			document.getElementById("top").style.display = "block";
		})();
	

	//when the button is clicked, the anonomyous function runs all code below
		let searchString = $('#search').val();
		//console.log(searchString);

		//variable to hold the spotify API URL
		var spotifyAPI = 'https://api.spotify.com/v1/search';
		//variable to hold the options Spotify API needs
		var spotifyOptions = {
			q: searchString,
			type: 'album'
		};


		function displayAlbums(data) {
			console.log(data);

			$('#albums').empty();

			var albumHTML = '<ul id="album-wrap" class="flex center-align row wrap space-around">';

			var artistName = '<div id="artist-name">' + '<h2>' + 'Albums by ' + data.albums.items[0].artists[0].name + '</h2>' + '</div>';
			//console.log(artistName);

			$.each(data.albums.items, function(i, album) {
				//console.log(album);
				albumHTML += '<li class="album-img" data-name="' + album.name + '" >';
				//albumHTML += '<a href="' + album.images[0].url + '"data-lightbox="albumArt" data-title = "' +  album.name + '">';
				albumHTML += '<a href="' + album.images[0].url + '"data-lightbox="albumArt" data-title = "Album Name: ' +  album.name + ' | Spotify Album ID: ' + album.id +'">';
				albumHTML += '<img class="img" src= " '+ album.images[0].url + '" title = "' + album.name +'"></a></li>';
			});
			albumHTML += '</ul>';
			$('#albums').prepend(artistName);
			$('#albums').append(albumHTML);	
		}

		function fail() {
			console.log('Your AJAX request has failed.');
			window.alert("Sorry, there was an error. Please try again.");
		}

		$.ajax({
			url: spotifyAPI,
			data: spotifyOptions,
			success: displayAlbums,
			error: fail
		});



	}); //end click button function

    lightbox.option({
      'alwaysShowNavOnTouchDevices': true,
      'wrapAround': true
    });

	//Sort the image gallery alphabetically on button click
	$('#sort').on('click', function() {
		console.log("sort!");
		var parentNode = document.getElementById('album-wrap');
		var listNodes = parentNode.childNodes;
		console.log(listNodes);
		
		tinysort('ul#album-wrap>li',{attr:'data-name'});
	});

}); // end ready


