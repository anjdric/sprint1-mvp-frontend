# **PUC RIO**

## 🚀 **PROJETO MVP CAMADA FRONTEND** 



**Curso**: 405-303 - Engenharia de Software

**Disciplina**: Sprint: Desenvolvimento Full Stack Básico

**Autor**: _Paulo Cesar Luna_

---

## ⭐ FRONTEND - Guia de Roteiro de Hospedagem 

Sistema tem por objetivo facilitar o compartilhamento de locais e hotéis entre usuários cadastrados na plataforma.

Idéia consiste em um hub de troca de locais e hospedagem entré os colaboradores da plataforma.

### 🌍 DEMO WEB
> [Aplicação Roteiro de Hospedagem](https://hotel-mvp.club).

### 🌍 DEMO API - DEPENDÊNCIA POJETO WEB
> [API Roteiro de Hospedagem](https://api.hotel-mvp.club).  


> Entendendo o Projeto:


## 📌 Estrutura da Aplicação

O projeto está organizado da seguinte forma:

- 📂 **`/`**: Pasta raiz do código-fonte.
  - 📁 **`/component`**: Contém arquivos de componente de interação do usuário com a navegação de interface
  - 📁 **`/interface`**: Arquivos que gerenciam a interação com a interface.  
  - 📁 **`/service`**: Contém os arquivos relacionados à interação com a API.   
  - 📁 **`/static`**: Armazena recursos estáticos como arquivos CSS, JS, imagens.   
  


## 📌 Responsabilidade da Estrutura

### 📂 `/`

  - 📄 **index.html**: Arquivo HTML principal da aplicação SPA.
  - 📄 **README.md**: Documentação do projeto.

### 📂 `/component`

- 📄 **navInterface.js**: Componente de interação do usuário com a navegação de interface.

### 📂 `/interface`

- 📄 **authInterface.js**: Gerencia a interação de autenticação de usuário com a interface.
- 📄 **hotelInterface.js**: Gerencia a interação do usuário com hotéis na interface.
- 📄 **userInterface.js**: Gerencia a interação do usuário com a interface user.

### 📂 `/service`

- 📄 **authApiClient.js**: Responsável pela autenticação do usuário.
- 📄 **hotelApiClient.js**: Realiza requisições relacionadas a hotéis na API (CRUD).
- 📄 **userApiClient.js**: Realiza requisições relacionadas a usuários na API (CRUD).



### 📂 `/static`

- 📦 **/css**: Estilos para a interface da aplicação.
- 📦 **/js**: Javascripts para a interface da aplicação.
- 📦 **/img**: Imagens para a interface da aplicação.



## 📌 Tecnologias Utilizadas

- HTML5: Linguagem de marcação para estruturar a página web.
- CSS3: Linguagem de estilização para design e layout da interface.
- JavaScript (ES6+): Utilizado para lógica de interação com o usuário e comunicação com a API.
- Fetch API: Utilizado para realizar requisições HTTP à API.
- localStorage: Utilizado para armazenar o token de autenticação no navegador.
- [Bootstrap 3](https://getbootstrap.com/docs/3.4/): Framework CSS para facilitar o design responsivo.
- [Font Awesome](https://fontawesome.com/): Biblioteca de ícones e fontes.

## 📌 Executando o Projeto

Para executar o projeto localmente, siga os passos abaixo:

- ✒️ **Clone o repositório:**

   ```bash
   git clone https://github.com/anjdric/sprint1-mvp-frontend
   cd nome-do-repositorio
   ```

- ✒️ **Rodar no Browser**
  > Pode instalar o pacote **Live Server** no VSCODE [Live Server](https://github.com/ritwickdey/vscode-live-server-plus-plus).  


## 📌 Backlogs Features
> Funcionalidades que continuarão sendo implementadas, devido ao prazo não foi possível 

- [ ] Dashboard Compartilhado
- [ ] Cadastrar Hotel
- [ ] Editar Hotel
- [ ] Deletar Hotel
- [ ] Confirmação Cadastro de Usuário por email


## 📌 Autores

- ✒️ **Desenvolvedor** - Paulo Cesar Luna
- ✒️ **Documentação** - Paulo Cesar Luna







     
