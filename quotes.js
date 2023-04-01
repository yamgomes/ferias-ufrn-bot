import { pensadorScraper } from "./scraper-pensador.js";
import { newPerson } from "./lists.js";

export async function getQuote(
  messageLength = 0,
  pessoaPesquisada = newPerson()
) {
  for (let counter = 0; counter < 5; counter++) {
    let listaPensamentos = await pensadorScraper(pessoaPesquisada, 3);
    if (listaPensamentos.length < 1) {
      pessoaPesquisada = newPerson();
      continue;
    }

    let frase =
      listaPensamentos[Math.floor(Math.random() * listaPensamentos.length)];

    if (!(frase && frase.text && frase.author)) continue;

    let fraseFormatada = `${frase.text}\n— ${frase.author.trim()}`;

    if (fraseFormatada.length + messageLength > 275) continue;

    return fraseFormatada;
  }
  return "";
}
