/*
** AuthInterface.js
Handles the interaction of user authentication, DOM events, and rendering in the interface.
*/
import Navigator from "../component/navInterface.js";
import Auth from "../service/authApiClient.js";
import UserInterface from "../interface/userInterface.js";

const IAuth = {
  sectionForm: document.getElementById("authSection"),
  formData: document.getElementById("loginForm"),
  btnLogout: document.getElementById("btn-logout"),
  btnLogin: document.getElementById("btn-login"),

  // Code for interface initialization
  init() {
    // Bind events buttom
    this.btnLogout.addEventListener("click", this.logout.bind(this));
    this.btnLogin.addEventListener("click", this.login.bind(this));
    // AuthGuard Navigation
    Navigator.navBar();
  },

  // Handles user interaction Login
  async handleLoginUser(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password2").value;

    try {
      const data = await Auth.authenticate(username, password);
      console.log(data);

      if (data) {
        // Set authorization token without local storage
        Navigator.setToken(
          data.token_type,
          data.access_token,
          data.refresh_token
        );
        // Redirecionar para a próxima página
        Navigator.navBar();
        // Get resource API
        UserInterface.fetchAndRenderList();
        // Clean Display error message on screen
        Navigator.clearMessageAlert();
        // Display message on screen
        Navigator.setMessageAlert(`Usuário autenticado.`);
        // Closed Modal
        Navigator.modal.toggleModal();
        // log...
        console.log("Usuário autenticado. Token salvo no localStorage.");
      }
    } catch (error) {
      // Display error message on screen
      Navigator.setMessageAlert(`${error.status}: ${error.message}`);
      // Log...
      console.log(error);
      //console.error('Erro ao autenticar:', error);
    }
  },

  /**
   * Login application
   * @param {*} event
   */
  login(event) {
    event.preventDefault();
    this.renderFormAuth();
  },

  /**
   * Logout application
   */
  logout() {
    Navigator.clearToken();
    // Display message on screen
    Navigator.setMessageAlert(`Desconectando usuário ...`);
    // Refresh local page
    setTimeout(function () {
      window.location.reload();
    }, 3000);
  },

  // Renders the authentication form in the DOM dynamically
  renderFormAuth() {
    const formHtml = `
    <form id="loginForm" action="">
      <br/>
      <h3>Autenticação</h3>
      <label for="username">Login</label>
      <input type="text" for="username" id="username" [data-tooltip]="Insira seu Usuário" required>
      <label for="senha">Senha</label>
      <input type="password" for="password2" id="password2" [data-tooltip]="Insira sua Senha" required>
      </br> </br>
      <div class="row">
      <div class="col-6">
      <button class="btn btn-primary" data-modal="entrar" type="submit">Entrar</button>
      </div>
      <div class="col-6" style="float:left !important;">
      <button class="btn btn-warning" data-modal="Voltar" type="button" style="float:right !important;">Voltar</button>
      </div>
      </div>
    </form>`;

    // Adiciona o formulário HTML ao elemento 'formContainerModal'
    const modal = Navigator.modal.containerModal.querySelector("div");
    modal.classList.remove("modal-delete");
    modal.classList.remove("modal-cadastro");
    modal.classList.add("modal-login");
    modal.innerHTML = "";
    let div = document.createElement("div");
    div.innerHTML = formHtml;
    modal.appendChild(div);
    const formData = document.getElementById("loginForm");
    // Form authentication addEventListener
    formData.addEventListener("submit", this.handleLoginUser.bind(this));
    // Buttom close addEventListener
    const btnClose = formData.querySelector('[data-modal="Voltar"]');
    btnClose.addEventListener(
      "click",
      Navigator.modal.eventToggleModal.bind(this)
    );
    // Open Modal
    Navigator.modal.toggleModal();
  },
};

export default IAuth;
