import pensadorMelhor from "./scraper-pensador.js";

export default async function (messageLength, pessoaPesquisada = "") {
  if (process.argv.length == 3 || process.argv.length == 5) {
    pessoaPesquisada = process.argv[-1];
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
};
