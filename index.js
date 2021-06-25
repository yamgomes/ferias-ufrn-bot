const Twitter = require("twitter");

//var endDate = process.env.enddate; // 18/09/2021
var end = new Date(2021, 08, 18);
var now = new Date();
var diff = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24.0));
var msg = "",
  final = "";
const adj = [
  "longos",
  "míseros",
  "compridos",
  "lentos",
  "tortuosos",
  "sinuosos",
  "sofridos",
  "demorados",
  "intermináveis",
  "paulatinos",
  "traiçoeiros",
  "perversos",
  "ridículos",
  "proparoxítonos",
  "radicais",
  "eucariontes",
  "vagarosos",
  "robustos",
  "abençoados",
  "amaldiçoados",
  "calcificados",
  "inoxidáveis",
  "rugosos",
  "famigerados",
  "lacradores",
  "fofos",
  "síncronos e assíncronos",
  "catastróficos",
  "cínicos",
  "indiferenciáveis",
  "hilários",
  "eletrizantes",
  "hidratados",
  "perigosos",
  "duvidosos",
  "velozes",
  "furiosos",
  "arretados",
  "cintilantes",
  "cheirosos",
  "preguiçosos",
  "eletrizantes",
  "inacabáveis",
  "di... como assim falta esse tanto?#",
  "bom dia RNs#",
  '"hoje tem aula de quê tanto?"#',
  "dias, quase lá meu povo#",
  "pores-do-sol. ou é por-do-sols? não sei#",
  "misteriosos",
  "dolosos e culposos",
  "oxigenados",
  "pluricelulares",
  "variáveis",
  "calóricos",
  "voltas desse circular inverso que chamamos de terra#",
];

if (diff == 0) {
  msg = `ACABOUUUUUU!!!!`;
} else if (diff == 1) {
  msg = `último dia galera`;
} else if (diff > 1) {
  final = adj[Math.floor(Math.random() * adj.length)];

  if (final.substr(-1) != "#") {
    final = final.concat(" dias");
  } else {
    final = final.slice(0, -1);
  }

  msg = `faltam ${diff} ${final}`;
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
