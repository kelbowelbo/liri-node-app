var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');

// THIS IS THE TWITTER SECTION
function myTweets() {
	var twitterKeys = require('./keys.js');
	var client = new Twitter(twitterKeys);
	var params = {screen_name: 'rampart54321', count: 20};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {
			for (i = 0; i < tweets.length; i++) { 
				console.log(tweets[i].created_at + tweets[i].text);
			}
		}
	});
}
// THIS IS THE SPOTIFY SECTION
function mySpotify(media) {
	var spotify = new Spotify({
		id: '63fe538405b147dfaa1277a09938fad8',
		secret: '715cccedc6f0494bbc7394857e5e3179'
	});

	if (!media) {
		media = "The Sign";
	}
	media = "\"" + media + "\"";
	spotify.search({type: 'track', query: media, limit: 5}, function(err, data) {
	  	if (err) {
	    	return console.log('Error occurred: ' + err);
		}
		for (i = 0; i < data.tracks.items.length; i++) {
			console.log('Album Name: ' + data.tracks.items[i].album.name);
			console.log('Song Name: ' + data.tracks.items[i].name);	
			console.log('Preview of Song: ' + data.tracks.items[i].preview_url);
			var artists = "";
			for (j = 0; j < data.tracks.items[i].artists.length; j++) {
				artists = artists + data.tracks.items[i].artists[j].name + " ";
			}
			console.log("Artist: " + artists);
		}
	});
}
// THIS IS THE MOVIE SECTION

function myMovie(media) {
	if (!media) {
		media = "Mr. Nobody";
	}
	request("http://www.omdbapi.com/?t=" + media + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {
		if (!error && response.statusCode === 200) {
			var movie = JSON.parse(body);
			console.log('The movie’s rating is: ' + JSON.stringify(movie, null, 2));
			console.log('Title: ' + movie.Title);
			console.log('Year: ' + movie.Year);
			console.log('IMDB Rating: ' + movie.imdbRating);
			console.log('Country: ' + movie.Country);
			for (i = 0; i < movie.Ratings.length; i++) {
				if (movie.Ratings[i].Source === "Rotten Tomatoes") {
					console.log("Rotten Tomatoes Rating: " + movie.Ratings[i].Value);
				}
			}
		}
	});
}
function doWhatThisSays() {
	var data = fs.readFileSync('random.txt', 'utf8');
	var args = data.split(",");
	doCommand(args[0], args[1]);
}

// NODE 

doCommand(process.argv[2], process.argv[3]);

function doCommand(doThisCommand, media) {

	switch (doThisCommand){
	case "my-tweets": 
		myTweets();
		break;
	case "spotify-this-song": 
		mySpotify(media);
		break;
	case "movie-this": 
		myMovie(media);
		break;
	case "do-what-it-says":
		doWhatThisSays();
		break;
	default : 
		console.log("I'm sure it was great");
	}
}
