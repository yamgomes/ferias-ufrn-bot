# **Bot das Férias UFRN**

### Esse é o código que comandava o [Bot @feriasdaufrn](https://twitter.com/feriasdaufrn).

Inspirado pelo [Bot de férias da USP](https://twitter.com/SpFerias), mas foram adicionadas **RISADAS** (**R**ecursos **I**nterativos de **S**uperação de **A**lcance e **D**istribuição **A**umentada de **S**orriso) que incluem:

- Reclamações sobre a passagem do tempo
- Frases inspiradoras do [pensador.com](https://www.pensador.com/) (que tiveram que ser [raspadas](https://pt.wikipedia.org/wiki/Raspagem_de_dados) pois o site não fornece API pública)
- Barra de progresso (inspirado pela página [Progress Bar 202\_](https://twitter.com/ProgressBar202_))

O código está (relativamente) limpo, modularizado e comentado o suficiente para que qualquer um com conhecimento não muito avançado de JavaScript consiga acompanhar a lógica para se [inspirar](https://pt.wikipedia.org/wiki/Licen%C3%A7a_MIT). Abaixo está uma explicação da função de cada arquivo. Se você deseja fazer um bot simples que só publica frases aleatórias, você só precisa da lógica contida nos três primeiros arquivos (ou você pode fazer em Python como o da USP está implementado porque é muito mais fácil).

Após mudanças na API do XTwitter, o código não funciona mais. Não há biblioteca que realize as operações e eu acho que a documentação da API para publicar com imagens meio que... sumiu? Além disso, o bot estava hospedado no Heroku, mas eles não têm mais um plano gratuito então lá se foi a hospedagem também.

## **index.js**

Ponto de entrada, determina se está em período letivo para publicar a contagem regressiva e permite adicionar condições especiais para certos dias (tanto quantidade restante quanto dias específicos).

## **lists.js**

Repositório de reclamações, termos a serem buscados no Pensador e emojis a serem publicados durante as férias ou em caso de erro¹. Para adicionar uma nova categoria é só criar uma lista e exportar uma função que retorne um elemento aleatório.

<sub>¹retorno de erro não implementado</sub>

## **tweet.js**

Responsável por criar um cliente da [API do Twitter](https://developer.twitter.com/en/products/twitter-api) usando o arquivo [.env](https://www.freecodecamp.org/portuguese/news/como-usar-variaveis-de-ambiente-do-node-com-um-arquivo-dotenv-para-node-js-e-npm/) e exportar funções que publiquem o tweet.

## **progressBar.js**

Gerador da barra de progresso. Cria um canvas HTML e usa `barranova.png` para gerar a imagem. Foi chato de fazer.

## **scraper-pensador.js**

Função de _web scraping_ que percorre o HTML do pensador.com e coleta as informações das frases e autores. Já havia um pacote no npm que fazia isso, mas o pensador.com mudou seu layout e o pacote ficou desatualizado. Existe um pacote que leva em conta o novo layout, mas é para Typescript.

## **quotes.js**

_Wrapper_ para o scraper-pensador, tenta achar uma frase no tamanho correto dentre a lista de frases e então retorna a frase formatada no estilo

> Frase de fulano
>
> — Fulano
