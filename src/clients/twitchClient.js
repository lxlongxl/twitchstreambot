import request from 'request';
import Twitch from 'twitch-js';

const token = "Insert your Twitch Token here";
const clientId = "Insert your Twitch Client id here";
const { api } = new Twitch({token, username});

function streamNameToUserId(streamerName) { 
  var requestUrl = `https://api.twitch.tv/helix/users?login=${streamerName}`;
  var options = getRequestOptions(requestUrl);
    
   request(options, (error, response, body) => {
    if (response.statusCode == 200) {
      var user = JSON.parse(body);
      console.log(`Successfully found ${user.display_name}`);
      return user.id;
    }
    console.log("Unable to find streamer");
    return -1; //Dummy value to say we couldn't find a userID
  });
}

function isStreaming(streamerName) {
  var userId = streamNameToUserId(streamerName);
  var requestUrl = `https://api.twitch.tv/helix/streams?user_id=${userId}`;
  var options = getRequestOptions(requestUrl);
  
  request(options, (err, res, body) => {
    if (response.statusCode == 200) {
      var userStreams = JSON.parse(body);
      if (userStreams.data.size > 0) {
        return true;
      }
    }
    return false;
  })
}

function getRequestOptions(url) {
  return {
    url: url,
    headers: {
      'Client-ID': `${clientId}`,
      'Authorization': `Bearer ${token}`
    }
  };
}



