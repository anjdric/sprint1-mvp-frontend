### **PUC RIO**
**Curso**: 405-303 - Engenharia de Software

**Disciplina**: Sprint: Desenvolvimento Full Stack Básico

**Autor**: _Paulo Cesar Luna_



##  Guia de Roteiro de Hospedagem

Este projeto consiste em um aplicativo de frontend que realiza operações CRUD (Create, Read, Update, Delete) para hotéis e usuários. Ele consome uma API de backend para gerenciar os dados.

## Estrutura de Arquivos

O projeto está organizado da seguinte forma:

- **/src**: Pasta raiz do código-fonte.
  - **/service**: Contém os arquivos relacionados à interação com a API.
    - **auth.js**: Gerencia a autenticação do usuário, obtendo e armazenando o token de autenticação.
    - **hotelApiClient.js**: Realiza requisições relacionadas a hotéis na API (CRUD).
    - **userApiClient.js**: Realiza requisições relacionadas a usuários na API (CRUD).
  - **/static**: Armazena recursos estáticos como arquivos CSS, JS, imagens.
    - **styles.css**: Arquivo de estilos para a interface.
  - **/interface**: Arquivos que gerenciam a interação com a interface.
    - **hotelInterface.js**: Gerencia a interação do usuário com hotéis na interface.
    - **userInterface.js**: Gerencia a interação do usuário com usuários na interface.
  - **index.html**: Arquivo HTML principal da aplicação SPA.
  - **README.md**: Documentação do projeto.

## Responsabilidade de Cada Arquivo

### Pasta `/service`

- **authApiClient.js**: Responsável pela autenticação do usuário.
- **hotelApiClient.js**: Realiza requisições relacionadas a hotéis na API (CRUD).
- **userApiClient.js**: Realiza requisições relacionadas a usuários na API (CRUD).

### Pasta `/static`

- **/css**: Estilos para a interface da aplicação.
- **/js**: Javascripts para a interface da aplicação.
- **/img**: Imagens para a interface da aplicação.

### Pasta `/interface`

- **navInterface.js**: Gerencia a interação do usuário a navegação pela interface.
- **authInterface.js**: Gerencia a interação de autenticação de usuário com a interface.
- **hotelInterface.js**: Gerencia a interação do usuário com hotéis na interface.
- **userInterface.js**: Gerencia a interação do usuário com usuários na interface.

## Tecnologias Utilizadas

- HTML5: Linguagem de marcação para estruturar a página web.
- CSS3: Linguagem de estilização para design e layout da interface.
- JavaScript (ES6+): Utilizado para lógica de interação com o usuário e comunicação com a API.
- Fetch API: Utilizado para realizar requisições HTTP à API.
- localStorage: Utilizado para armazenar o token de autenticação no navegador.

## Executando o Projeto

Para executar o projeto localmente, siga os passos abaixo:

1. Clone o repositório:
   ```bash
   git clone https://github.com/anjdric/sprint1-mvp-frontend
   cd nome-do-repositorio
   ```
