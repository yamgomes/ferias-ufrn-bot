import { pensadorScraper } from "./scraper-pensador.js";
import { newPerson } from "./lists.js";

export async function getQuote(
  messageLength = 0,
  pessoaPesquisada = newPerson()
) {
  let pessoaAnterior = "";

  for (let counter = 0; counter < 5; counter++) {
    while (pessoaAnterior == pessoaPesquisada) {
      pessoaAnterior = pessoaPesquisada;
      pessoaPesquisada = newPerson();
    }

    let listaPensamentos = await pensadorScraper(pessoaPesquisada, 3);
    if (listaPensamentos.length < 1) {
      pessoaPesquisada = newPerson();
      continue;
    }

    while (listaPensamentos.length > 2) {
      let fraseIndex = Math.floor(Math.random() * listaPensamentos.length)
      let frase = listaPensamentos[fraseIndex];
      if ((frase && frase.text && frase.author)) {
        let fraseFormatada = `${frase.text}\n— ${frase.author.trim()}`;
        if (fraseFormatada.length + messageLength <= 275){
          return fraseFormatada
        }
      }
      listaPensamentos.splice(fraseIndex, 1)
    }
  }
  return "";
}
