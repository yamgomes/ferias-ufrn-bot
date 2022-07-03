const axios = require("axios"),
  cheerio = require("cheerio"),
  pretty = require("pretty"),
  url = "https://www.pensador.com/";

module.exports = async function scrapePensamentos(term, depth = 1) {
  if (term === undefined) {
    throw new Error("A search term must be defined");
  }

  // substitute spaces for + and put in lowercase
  term = term.replace(/\s/g, "+").toLowerCase();
  const urlPensador = `${url}busca.php?q=${term}&p=2`;

  try {
    depthCounter = 1;
    const { data } = await axios.get(urlPensador);
    const $ = cheerio.load(data);
    const pensamentos = [];

    $(".thought-card").each(function (i, e) {
      pensamentos.push({
        author: $(this).find("a").first().text(),
        text: $(this).find("p").first().text().replace(/\n/g, ""),
      });
    });

    nav = $(".nav");

    while (depthCounter < depth && nav.text().includes("Próxima >")) {
      depthCounter++;
      const nextPage = `${urlPensador}&p=${depthCounter}`;
      const { data } = await axios.get(nextPage);
      const $2 = cheerio.load(data);
      $2(".thought-card").each(function (i, e) {
        pensamentos.push({
          author: $(this).find("a").first().text(),
          text: $(this).find("p").first().text().replace(/\n/g, ""),
        });
      });
    }
    // output to file
    return pensamentos;
  } catch (err) {
    console.log(err);
    return [];
  }
};
