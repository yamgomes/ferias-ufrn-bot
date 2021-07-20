const Twitter = require("twitter");
const { createCanvas, loadImage } = require("canvas");

var start = new Date(2021, 05, 07);
var end = new Date(2021, 08, 18);
var now = new Date();
var diff = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24.0));
var total = Math.ceil(
  (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24.0)
);

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

var client = new Twitter({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token_key: process.env.access_token,
  access_token_secret: process.env.access_token_secret,
});

async function twitterPostImage(image, text) {
  client.post(
    "media/upload",
    { media: image },
    function (error, media, response) {
      if (!error) {
        // If successful, a media object will be returned.
        console.log(media);

        // Lets tweet it
        var status = {
          status: text,
          media_ids: media.media_id_string, // Pass the media id string
        };

        client.post(
          "statuses/update",
          status,
          function (error, tweet, response) {
            if (!error) {
              console.log(tweet);
            }
          }
        );
      } else console.log(error);
    }
  );
}

async function drawProgressBar() {
  // carregar primeiro as coisas async te poupa de ter 1 milhao de thens
  const logoUFRN = await loadImage("logo.png");
  const barrinha = await loadImage("barra.png");

  // agora daqui pra frente é so fazer as operacoes normalmente
  const canvas = createCanvas(1000, 200); // chutei um tamanho
  const context = canvas.getContext("2d");
  // background
  context.fillStyle = "#fff";
  context.fillRect(0, 0, 1000, 200);
  // barra de fora
  context.fillStyle = "#c2e1ff";
  roundRect(context, 75, 105, 830, 20, 5, true, true);
  // loading bar
  context.fillStyle = context.createPattern(barrinha, "repeat");
  context.fillRect(80, 110, 820 - (820.0 * diff) / total, 10);
  // barra?
  context.fillStyle = "#254AA5";
  context.beginPath();
  context.moveTo(900 - (820.0 * diff) / total, 100);
  context.lineTo(910 - (820.0 * diff) / total, 90);
  context.lineTo(890 - (820.0 * diff) / total, 90);
  context.fill();
  // logo
  context.drawImage(logoUFRN, 825 - (820.0 * diff) / total, 45);
  // return image
  return canvas.toBuffer("image/png");
}

async function tweetWithImage(message) {
  const image = await drawProgressBar();
  await twitterPostImage(image, message);
  console.log("Imagem enviada");
}

if (diff >= 0) {
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
  }
  tweetWithImage(msg);
} else {
  msg = `😎🏖`;
  client.post("statuses/update", { status: msg }, (error, tweet, response) => {
    if (error) throw error;
    console.log(tweet); // Tweet body.
    console.log(response); // Raw response object.
  });
}
