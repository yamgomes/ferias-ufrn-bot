const Twitter = require("twitter");
const { createCanvas, loadImage } = require("canvas");

var start = Date.parse(process.env.start_date);
var end = Date.parse(process.env.end_date)
var now = new Date();
now = now.getTime();
var diff = Math.ceil((end - now) / (1000 * 60 * 60 * 24.0));
var total = Math.ceil(
  (end - start) / (1000 * 60 * 60 * 24.0)
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

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof stroke == "undefined") {
    stroke = true;
  }
  if (typeof radius === "undefined") {
    radius = 5;
  }
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  if (stroke) {
    ctx.stroke();
  }
  if (fill) {
    ctx.fill();
  }
}

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
    msg = `acabou galera!!!! (infelizmente não para todos)`;
  } else if (diff == 1) {
    msg = `último dia galera`;
  } else if (diff > 1) {
    final = adj[Math.floor(Math.random() * adj.length)];

    if (final.substr(-1) != "#") {
      final = final.concat(" dias");
    } else {
      final = final.slice(0, -1);
    }
    msg = `faltam ${diff} ${final}\n\nhttps://twitter.com/intent/tweet?text=faltam%20${diff}%20dias%20pras%20f%C3%A9rias%20da%20ufrn!%20acompanhe%20em%20%40feriasdaufrn`;
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
