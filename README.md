## **PUC RIO**

### **PROJETO MVP CAMADA FRONTEND**


**Curso**: 405-303 - Engenharia de Software

**Disciplina**: Sprint: Desenvolvimento Full Stack Básico

**Autor**: _Paulo Cesar Luna_


## FRONTEND - Guia de Roteiro de Hospedagem 

Este projeto consiste em um aplicativo que realiza operações CRUD (Create, Read, Update, Delete) para hotéis e usuários. Ele consome uma API de backend para gerenciar os dados.

## Estrutura de Arquivos

O projeto está organizado da seguinte forma:

- **`/`**: Pasta raiz do código-fonte.
  - **`/service`**: Contém os arquivos relacionados à interação com a API.
  - **`/interface`**: Arquivos que gerenciam a interação com a interface.   
  - **`/static`**: Armazena recursos estáticos como arquivos CSS, JS, imagens.   
  


## Responsabilidade de Cada Arquivo

### Pasta `/`

  - **index.html**: Arquivo HTML principal da aplicação SPA.
  - **README.md**: Documentação do projeto.

### Pasta `/service`

- **authApiClient.js**: Responsável pela autenticação do usuário.
- **hotelApiClient.js**: Realiza requisições relacionadas a hotéis na API (CRUD).
- **userApiClient.js**: Realiza requisições relacionadas a usuários na API (CRUD).

### Pasta `/interface`

- **navInterface.js**: Gerencia a interação do usuário a navegação pela interface.
- **authInterface.js**: Gerencia a interação de autenticação de usuário com a interface.
- **hotelInterface.js**: Gerencia a interação do usuário com hotéis na interface.
- **userInterface.js**: Gerencia a interação do usuário com usuários na interface.

### Pasta `/static`

- **/css**: Estilos para a interface da aplicação.
- **/js**: Javascripts para a interface da aplicação.
- **/img**: Imagens para a interface da aplicação.



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
