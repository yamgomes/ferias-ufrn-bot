const Twitter = require("twitter");
const { createCanvas, loadImage } = require("canvas");
const pensador = require("pensador-api");

const start = Date.parse(process.env.start_date);
const end = Date.parse(process.env.end_date)
var now = new Date();
now = now.getTime();
const diff = Math.ceil((end - now) / (1000 * 60 * 60 * 24.0));
const total = Math.ceil((end - start) / (1000 * 60 * 60 * 24.0));

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
  "revolucionários",
  "ecléticos",
  "sensatos",
  "surpreendentes",
  "inesperados",
  "tecnológicos",
  "modernos",
  "abstratos",
  "concretos",
  "feios",
  "gostosos",
  "saborosos",
  "apetitosos",
  "acadêmicos",
  "românticos",
  "defenestrados",
  "esculachados",
  "concomitantes",
  "estapafúrdios",
  "heroicos",
  "épicos",
  "homéricos",
  "euclideanos",
  "geométricos",
  "inexoráveis",
];

const emojis = [
  "🔥",
  "😎",
  "😁",
  "😜",
  "🤪",
  "🥳",
  "💆‍♀️",
  "💃",
  "🛀",
  "🙌",
  "🎆",
  "🎇",
  "🍾",
  "🍷",
  "🧉",
  "🍸",
  "🍹",
  "🍺",
  "🍻",
  "🥂",
  "🥃",
  "🥤",
  "✈",
  "🏖",
  "💅"
]

const client = new Twitter({
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
    ctx.lineWidth = 5;
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
  const logoUFRN = await loadImage("logo.png");
  const barrinha = await loadImage("barranova.png");

  const canvasWidth = 1200;
  const canvasHeight = 675;
  const progressBarSize = 990;

  const canvas = createCanvas(canvasWidth, canvasHeight);
  const context = canvas.getContext("2d");
  // background
  context.fillStyle = "#1563B0";
  context.fillRect(0, 0, canvasWidth, canvasHeight);
  // barra de fora
  context.fillStyle = "#c2e1ff";
  roundRect(context, 100, 300, 1000, 100, 5, true, true);
  // barra interna
  context.fillStyle = context.createPattern(barrinha, "repeat");
  context.save();
  context.translate(105, 305);
  context.fillRect(
    0,
    0,
    progressBarSize - (progressBarSize * diff) / total,
    90
  );
  context.restore();
//   // triangulo
//   context.fillStyle = "#254AA5";
//   context.beginPath();
//   context.moveTo(progressBarSize + 105 - (progressBarSize * diff) / total, 270);
//   context.lineTo(progressBarSize + 125 - (progressBarSize * diff) / total, 250);
//   context.lineTo(progressBarSize + 85 - (progressBarSize * diff) / total, 250);
//   context.fill();
//   // logo
//   context.drawImage(
//     logoUFRN,
//     progressBarSize + 5 - (progressBarSize * diff) / total,
//     170
//   );
  // return image
  return canvas.toBuffer("image/png");
}

async function pensadorFormatado() {
  return pensador({
    term: "qwertyuiopasdfghjklzxcvbnm"[Math.floor(Math.random() * 26)],
    max: 500,
  }).then((array) => {
    frase = array.phrases[Math.floor(Math.random() * array.phrases.length)];
    fraseFormatada = `${frase.text} (${frase.author})`;
    return fraseFormatada;
  });
}

async function pensar() {
  pensamento = await pensadorFormatado();
  while (pensamento.length > 200) {
    pensamento = pensadorFormatado();
  }
  return pensamento;
}

async function tweetWithImage(message) {
  const image = await drawProgressBar();
  message += "\n\npensamento do dia: ";
  console.log("Pensando...")
  message += await pensar();
  console.log(message);
  await twitterPostImage(image, message);
}

if (diff >= 0) {
  if (diff == 0) {
    msg = `acabou!!!! (menos pra alguns)`;
  } else if (diff == 1) {
    msg = `último dia!! (talvez não para todos)`;
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
  msg = `${emojis[Math.floor(Math.random() * emojis.length)]}${emojis[Math.floor(Math.random() * emojis.length)]}`;
  client.post("statuses/update", { status: msg }, (error, tweet, response) => {
    if (error) throw error;
    console.log(tweet); // Tweet body.
    console.log(response); // Raw response object.
  });
}
