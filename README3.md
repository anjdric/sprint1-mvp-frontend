
# GeoVisio API

  

Esta API tem por princípio realizar a **manipulação de dados** com **base geográfica**.

  

À partir de **coordenadas**, é possível cadastrar itens que são chamados de **catálogos geográficos**.

  

Nesta primeira versão, é possível:

- Cadastrar coordenadas;

- Recuperar uma lista de coordenadas;

- Cadastrar um catálogo geográfico, dada uma coordenada pré-cadastrada;

- Recuperar uma lista de catálogos geográficos;

- Recuperar uma lista de hashtags que foram cadastradas nos catálogos geográficos.

  

Para backlog futuro, esta API fornecerá:

  

- Edição e remoção de catálogos e coordenadas;

- Categorização de grandes áreas;

- Rotas de acompanhamento de atualização de catálogos em linha de tempo para determinada coordenada (é possível já cadastrar mais de um catálogo geográfico para uma determinada coordenada);

- Rotas para Sistema de login.

  

## Qual é a aplicação desta api?

  

Se você possui qualquer tipo de **dado georreferenciado**, é possível utilizar para **associar informações** do seu negócio à essas **coordenadas**.

  

É aplicável às áreas de:

- Agro (mapeamento de safras, escoamento, status de lavouras);

- Petróleo (mapeamento de dados sobre extração e/ou potencial extração);

- Geológico (mapeamento de terreno);

- Biológico (catalogação de fauna, flora, etc.)

- Mobilidade (transportes, pontos de taxi, ônibus, etc.)

- Saúde pública (mapeamento de UBS, ações de vacinação por região)

- Segurança (tático, policial, criminalidade)

- Defesa Civil (Pontos de alagamento, risco de barrancos, etc.)

  

Funciona da seguinte forma:

1. Para cada **coordenada** cadastrada, é possível cadastradar um ou vários **catálogos**.

2. Cada catálogo possui **título, descrição, hashtag, imagem** e estará **associada à uma coordenada**.

3. Dada uma **hashtag**, é possível **filtrar catálogos** que utilizam essa hastag.

  

## Como executar

  

> Para este trabalho foi utilizada a versão do python 3.12.

  
  

Será necessário ter todas as libs python listadas no `requirements.txt` instaladas.

Após clonar o repositório, é necessário ir ao diretório raiz, pelo terminal, para poder executar os comandos descritos abaixo.

  

> É fortemente indicado o uso de ambientes virtuais do tipo [virtualenv](https://virtualenv.pypa.io/en/latest/installation.html).

  

```

(env)$ pip install -r requirements.txt

```

  

Este comando instala as dependências/bibliotecas, descritas no arquivo `requirements.txt`.

  

Para executar a API basta executar:

  

```

(env)$ flask run --host 0.0.0.0 --port 5000

```

  

Em modo de desenvolvimento é recomendado executar utilizando o parâmetro reload, que reiniciará o servidor

automaticamente após uma mudança no código fonte.

  

```

(env)$ flask run --host 0.0.0.0 --port 5000 --reload

```

  

Abra o [http://localhost:5000/#/](http://localhost:5000/#/) no navegador para verificar o status da API em execução.

## Endpoints
| Rota | Método  | Recebe | Resultado (OK)|
|--|--|--|--|
| /coordinate |POST | latitude(float), longitude (float) |200 - Latitude e longitude cadastrada com sucesso.
|/coordinates| GET| (sem parâmetros)| 200 - Lista de coordenadas com latitude e longitude.
|/geo_catalog|POST|latitude(float), longitude (float), title(str 144), description(str 3000), hashtag(str 40), img_source(base64Url) | 200 - Catálogo cadastrado
|/geo_catalogs|GET| hashtag(str 40) [OPICIONAL]|200 - Lista de catálogos
|/hashtags| GET |(sem parâmetros) | 200 - Lista de hashtags
