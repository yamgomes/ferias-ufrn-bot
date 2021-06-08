import Twit from "twit";

//var endDate = process.env.enddate; // 18/09/2021
var end = Date(2021, 08, 18).getTime();
var now = new Date().getTime();
var diff = Math.ceil((end - now) / (1000 * 60 * 60 * 24.0));
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

var T = new Twit({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token: process.env.access_token,
  access_token_secret: process.env.access_token_secret,
  timeout_ms: 60 * 1000,
});

console.log(msg);
await new Promise((resolve) => T.post("statuses/update", { msg }, resolve));
