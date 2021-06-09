const Twitter = require("twitter");

//var endDate = process.env.enddate; // 18/09/2021
var end = new Date(2021, 08, 18);
var now = new Date();
var diff = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24.0));
var msg = "";

if (diff == 0) {
  msg = `ACABOUUUUUU!!!!`;
} else if (diff == 1) {
  msg = `só mais um dia galera`;
} else if (diff > 1) {
  msg = `faltam ${diff} dias`;
} else {
  msg = `😎🏖`;
}

var client = new Twitter({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token_key: process.env.access_token,
  access_token_secret: process.env.access_token_secret,
});

client.post("statuses/update", { status: msg }, (error, tweet, response) => {
  if (error) throw error;
  console.log(tweet); // Tweet body.
  console.log(response); // Raw response object.
});
