import Twit from "twit";
import Moment from "moment";

//var endDate = process.env.enddate; // 18/09/2021
var endDate = "18/09/2021";

var T = new Twit({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token: process.env.access_token,
  access_token_secret: process.env.access_token_secret,
  timeout_ms: 60 * 1000,
});

//function endsIn(endDate)

new Date().toString();
