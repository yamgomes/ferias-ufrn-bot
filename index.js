import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import drawProgressBar from "./progressBar.js";
import { getQuote } from "./quotes.js";
import { newEmoji, newEnding } from "./lists.js";
import { tweetWithMedia, tweetWithoutMedia } from "./tweet.js";

// Determina a data atual baseado na data inserida num arquivo .env (porque é mais facil de editar no Heroku)
const currentDate = new Date();
const start = Date.parse(process.env.start_date);
const end = Date.parse(process.env.end_date);
const now = currentDate.getTime();
const timeDifference = Math.ceil((end - now) / (1000 * 60 * 60 * 24.0));
const timeTotal = Math.ceil((end - start) / (1000 * 60 * 60 * 24.0));

// Função principal
async function run() {
  // férias
  if (timeDifference < 0) {
    tweetWithoutMedia(newEmoji(2));
    return;
  }
  // último dia
  if (timeDifference == 0) {
    tweetWithoutMedia(`acabou (eu acho)!`);
    return;
  }
  // primeiro de abril :D
  if (currentDate.getDate() == 1 && currentDate.getMonth() == 3) {
    let image = await drawProgressBar(3, 101);
    tweetWithMedia(
      `faltam só ${
        Math.floor(Math.random() * 3) + 3
      } dias!!!\n\nA inimiga é a pressa da perfeição\n— Sun Tzu`,
      image
    );
    return;
  }

  // Todos os casos abaixo usam a barra de progresso, então ela é gerada aqui
  let image = await drawProgressBar(timeDifference, timeTotal);
  // 69 dias ;)
  if (timeDifference == 69) {
    tweetWithMedia(`faltam ${timeDifference} dias 🥵`, image);
    return;
  }
  // último dia
  if (timeDifference == 1) {
    tweetWithMedia(`falta só ${timeDifference} dia (eu espero)`, image);
    return;
  }
  // Tweets regulares
  let ending = newEnding();
  let tweetText = "";
  if (ending.slice(-1) == "@") {
    ending = ending.slice(0, -1);
    tweetText = `${ending}`;
  } else if (ending.slice(-1) == "#") {
    ending = ending.slice(0, -1);
    tweetText = `faltam ${timeDifference} ${ending}`;
  } else {
    tweetText = `faltam ${timeDifference} ${ending} dias`;
  }
  getQuote(tweetText.length).then((quote) => {
    tweetWithMedia(`${tweetText}\n\n${quote}`, image);
  });
  return;
}

run();
