// Importing Twitter API keys
var twitterrKeys = require("./keys.js");
var fs = require('fs');
// Request node package used for omdB function
var request = require("request");
// Twitter node package used for twitter function
var twitter = require("twitter");
// Spotify node package used for spotify function
var spotify = require("spotify");

// Function that looks for and executes liri's command and search 
function liriNodeApp(command, answer){
	switch(command){
		case 'my-tweets': twitter(answer); 
			break;
		case 'spotify-this-song': spotify(answer); 
			break;
		case 'movie-this': omdB(answer); 
			break;
		case 'do-what-it-says': doWhatItSays(); 
			break;
		default: log("\nINSTRUCTIONS:\nChoose from the following commands: \n**********************************\n SHOW MY MOST RECENT TWEETS: node liri.js my-tweets\n SONG INFORMATION: node liri.js spotify-this-song '<song name here>'\n LEARN MORE ABOUT A MOVIE: node liri.js movie-this '<movie name here>'\n RUN A COMMAND FROM A TEXT FILE: node liri.js do-what-it-says\n");
	}
}

function twitter(handle){
	if(!handle){
		handle = "GigiCasablanca";
	}
	var client = new twitter({
	  consumer_key: twitterrKeys.twitterKeys.consumer_key,
	  consumer_secret: twitterrKeys.twitterKeys.consumer_secret,
	  access_token_key: twitterrKeys.twitterKeys.access_token_key,
	  access_token_secret: twitterrKeys.twitterKeys.access_token_secret
	});

	var params = {screen_name: handle, count:20};
	client.get('statuses/user_timeline', params, function(error, tweets, response){
		if(!error){
			console.log("********************");
			for(var i = 0; i < params.count; i++){
				console.log("@" + tweets[i].user.screen_name);
	      		console.log("Tweet " + "#" + (i + 1) + ": " + tweets[i].text);
	      		console.log("Created: " + tweets[i].created_at + "\n");
	      		console.log("\n********************\n");
			}
		}
	});
}



liriNodeApp(process.argv[2], process.argv[3]);