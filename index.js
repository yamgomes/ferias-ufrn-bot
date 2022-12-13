require("dotenv").config({ path: __dirname + "./.env" });
const Twitter = require("twitter");
const { createCanvas, loadImage } = require("canvas");
const pensador = require("pensador-api");
const pensadorMelhor = require("./scraper-pensador.js");

const dataAgora = new Date();
const start = Date.parse(process.env.start_date);
const end = Date.parse(process.env.end_date);
var now = new Date();
now = now.getTime();
var diff = Math.ceil((end - now) / (1000 * 60 * 60 * 24.0));
var total = Math.ceil((end - start) / (1000 * 60 * 60 * 24.0));

// final com "#": não adiciona "dias" no final
// final com "@": texto nenhum
const listaAdjetivos = [
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
  "radicais",
  "eucariontes",
  "vagarosos",
  "abençoados",
  "amaldiçoados",
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
  "velozes e furiosos",
  "arretados",
  "preguiçosos",
  "eletrizantes",
  "inacabáveis",
  "di... como assim falta esse tanto?#",
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
  "feios",
  "gostosos",
  "acadêmicos",
  "românticos",
  "defenestrados",
  "esculachados",
  "estapafúrdios",
  "épicos",
  "geométricos",
  "inexoráveis",
  "sei lá que dia é hoje@",
  "hoje tô off@",
  "faltam ■■ dias@",
  "descubra@",
  "faltam alguns dias@",
  "você não vai acreditar em quantos dias faltam@",
  "insuportáveis",
];

const listaEmojis = [
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
  "💅",
];

const listaErro = ["🤔", "🤨", "🤯", "🤪", "🤩"];

const listaPessoas = [
  "valesca popozuda",
  "barraca do beijo",
  "é o tchan",
  "taylor swift",
  "buzz lightyear",
  "baco exu do blues",
  "xuxa",
  "turma do balão mágico",
  "snoop dogg",
  "sun tzu",
  "supermães",
  "david bowie",
  "djavan",
  "pandora",
  "paprika",
  "para todos os garotos",
  "Peaky Blinders",
  "PS. Eu Te Amo",
  "pyong lee",
  "manu gavassi",
  "Filipe Ret",
  "jô soares",
];

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

async function desenharProgresso() {
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
    progressBarSize - progressBarSize * Math.pow(diff / total, 2), // alternativa: Math.log(1 + (49 * diff) / total)) / Math.log(50)
    90
  );
  context.restore();
  return canvas.toBuffer("image/png");
}

async function obterPensamento(messageLength) {
  if (process.argv.length == 3 || process.argv.length == 5) {
    pessoaPesquisada = process.argv[-1];
  } else {
    pessoaPesquisada = "";
  }
  do {
    retry = false;
    if (pessoaPesquisada == "") {
      listaPensamentos = await pensadorMelhor(
        listaPessoas[Math.floor(Math.random() * listaPessoas.length)],
        3
      );
    } else {
      listaPensamentos = await pensadorMelhor(pessoaPesquisada, 3);
    }
    if (listaPensamentos != null && listaPensamentos.length > 0) {
      frase =
        listaPensamentos[Math.floor(Math.random() * listaPensamentos.length)];
      if (frase && frase.text && frase.author) {
        fraseFormatada = `${frase.text} (${frase.author})`;
      } else {
        retry = true;
        fraseFormatada = "";
      }
    } else {
      retry = true;
      fraseFormatada = "";
    }
    pessoaPesquisada = "";
  } while (fraseFormatada.length + messageLength > 275 || retry);
  return fraseFormatada;
}

async function tweetWithImage(text) {
  image = await desenharProgresso();
  client.post("media/upload", { media: image }, (error, media, response) => {
    if (!error) {
      // If successful, a media object will be returned.
      console.log(media);

      // Lets tweet it
      var status = {
        status: text,
        media_ids: media.media_id_string, // Pass the media id string
      };

      client.post("statuses/update", status, function (error, tweet, response) {
        if (!error) {
          console.log(tweet);
          console.log("\n================\n");
          console.log(response);
        } else {
          console.log(error);
        }
      });
    } else console.log(error);
  });
}

async function tweetWithoutImage(text) {
  client.post(
    "statuses/update",
    { status: text },
    function (error, tweet, response) {
      if (!error) {
        console.log(tweet);
        console.log("\n================\n");
        console.log(response);
      } else {
        console.log(error);
      }
    }
  );
}

async function tweetWithImageAndThought(message) {
  message += "\n\npensamento do dia: ";
  console.log("Pensando...\n");
  message += await obterPensamento(message.length);
  console.log(message);
  await tweetWithImage(message);
}

if (dataAgora.getDate() == 1 && dataAgora.getMonth() == 3) {
  // Primeiro de abril
  diff = 3;
  total = 80;
  tuitarComBarraDeProgresso(`faltam só 3 dias!`);
} else if (diff >= 0) {
  // Se for antes do fim do semestre
  if (diff == 0) {
    tweetWithoutImage(`acabou!!!! (menos pra alguns)`);
  } else if (diff == 1) {
    msg = `último dia!! (talvez não para todos)`;
  } else if (diff == 69) {
    msg = `faltam 69 😩😩 dias`;
  } else if (diff > 1) {
    // Tweets regulares
    sufixo = listaAdjetivos[Math.floor(Math.random() * listaAdjetivos.length)];
    if (sufixo.slice(-1) == "@") {
      sufixo = sufixo.slice(0, -1);
      msg = `${sufixo}`;
    } else if (sufixo.slice(-1) == "#") {
      sufixo = sufixo.slice(0, -1);
      msg = `faltam ${diff} ${sufixo}`;
    } else {
      msg = `faltam ${diff} ${sufixo} dias`;
    }
  }
  tweetWithImageAndThought(msg);
} else {
  // Férias. Vida boa
  tweetWithoutImage(
    `${listaEmojis[Math.floor(Math.random() * listaEmojis.length)]}${
      listaEmojis[Math.floor(Math.random() * listaEmojis.length)]
    }`
  );
}
