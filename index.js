const Twitter = require("twitter");
const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");
const myCanvas = createCanvas(1000, 200);
const ctx = myCanvas.getContext("2d");

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

async function loadLogo(ctx, x, y) {
  await loadImage("logo.png").then((image) => {
    ctx.drawImage(image, x - 75, y - 70);
  });
}

async function loadingBar(ctx, diff) {
  await loadImage("barra.png").then((image) => {
    pat = ctx.createPattern(image, "repeat");
    ctx.fillStyle = pat;
    ctx.fillRect(80, 110, 820 - (820.0 * diff) / total, 10);
  });
}

async function progressIndicator(ctx, x, y) {
  //bolinha
  // ctx.beginPath();
  // ctx.arc(x, y, 10, 0, 2 * Math.PI, true);
  // ctx.fill();

  //triangulo
  ctx.beginPath();
  ctx.moveTo(x, y - 15);
  ctx.lineTo(x + 10, y - 25);
  ctx.lineTo(x - 10, y - 25);
  ctx.fill();

  //logo
  await loadLogo(ctx, x, y);
}

async function draw() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 1000, 200);

  // barra de fora
  ctx.fillStyle = "#c2e1ff";
  roundRect(ctx, 75, 105, 830, 20, 5, true, true);

  // loadingBarHtml(ctx);
  await loadingBar(ctx, diff).then(() => {
    // barra
    ctx.fillStyle = "#254AA5";
    progressIndicator(ctx, 80 + 820 - (820.0 * diff) / total, 115).then(() => {
      const buffer = myCanvas.toBuffer("image/png");
      fs.writeFileSync("./final.jpg", buffer);
    });
  });
}

var client = new Twitter({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token_key: process.env.access_token,
  access_token_secret: process.env.access_token_secret,
});

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

  draw().then(() => {
    imageToPost = fs.readFileSync("./final.jpg");
    client.post(
      "media/upload",
      { media: imageToPost },
      function (error, media, response) {
        if (!error) {
          // If successful, a media object will be returned.
          console.log(media);

          // Lets tweet it
          var status = {
            status: msg,
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
        }
      }
    );
  });
} else {
  msg = `😎🏖`;
  client.post("statuses/update", { status: msg }, (error, tweet, response) => {
    if (error) throw error;
    console.log(tweet); // Tweet body.
    console.log(response); // Raw response object.
  });
}
