import pensadorMelhor from "./scraper-pensador.js";
import { newPerson } from "./lists.js";

export async function getQuote(messageLength = 1, pessoaPesquisada = "") {
  let listaPensamentos = null;
  let fraseFormatada = "";
  let retry = false;
  do {
    retry = false;
    if (pessoaPesquisada == "") {
      let listaPensamentos = await pensadorMelhor(newPerson(), 3);
    } else {
      listaPensamentos = await pensadorMelhor(pessoaPesquisada, 3);
    }
    let fraseFormatada = "";
    if (listaPensamentos != null && listaPensamentos.length > 0) {
      let frase =
        listaPensamentos[Math.floor(Math.random() * listaPensamentos.length)];
      if (frase && frase.text && frase.author) {
        fraseFormatada = `${frase.text}\n${frase.author.trim()}`;
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
