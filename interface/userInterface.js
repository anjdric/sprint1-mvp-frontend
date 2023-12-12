/**
 * userInterface.js:
 * Handles interaction, DOM events and rendering on the interface.
 */

// Importing dependencies
import UserApiClient from "../service/userApiClient.js";
import Navigator from "../interface/navInterface.js";

const IUser = {
  sectionForm: document.getElementById("signupSection"),
  formData: document.getElementById("createUserForm"),
  btnFetch: document.getElementById("menu-user"),
  btnSignup: document.getElementById("btn-create"),
  btnSignupLogin: document.getElementById("btn-signup"),
  btnReset: document.querySelector('button[type^="reset"]'),
  inputeUserId: document.getElementById("user_id"),
  emailInput: document.getElementById("email"),
  loginInput: document.getElementById("login"),
  nameInput: document.getElementById("name"),
  passwordInput: document.getElementById("password"),
  usersTableBody: document.getElementById("userTableBody"),

  // Code for interface initialization
  init() {
    // Check If Authenticated
    if (Navigator.isAuthenticated()) {
      // Fetch List of Users in API
      // this.fetchAndRenderList();
    }

    this.btnFetch.addEventListener("click", this.fetchAndRenderList.bind(this));
    this.btnSignup.addEventListener("click", this.createUser.bind(this));
    this.btnSignupLogin.addEventListener("click", this.createUser.bind(this));
  },

  //
  /**
   * Display All Users Registered in the Database
   * @returns users
   */
  async fetchAndRenderList() {
    try {
      // Fetch List of Users in API
      const users = await UserApiClient.fetchUserList();
      // Render Data in the User Grid
      this.renderUserList(users);
    } catch (error) {
      // Display error message on screen
      Navigator.setMessageAlert(`${error.status}: ${error.message}`);
      // Validate Token
      Navigator.navGuard(error);
      // Log...
      // console.log(error);
    }
  },

  /**
   * Search for a Registered User in the Database by User Id
   * @param {*} userId
   * @returns user
   */
  async findUserById(userId) {
    try {
      // Fetch User in API
      const user = await UserApiClient.findUserById(userId);
      // Render Data in the User Grid
      return user;
    } catch (error) {
      // Display error message on screen
      Navigator.setMessageAlert(`${error.status}: ${error.message}`);
      // Validate Token
      Navigator.navGuard(error);
      // Log...
      // console.log(error);
    }
  },

  /**
   * HandleCreateUser:
   * It is the event handler for the user creation form,
   * which interacts directly with the UserApiClient
   * Or
   * HandleEditUser:
   * It is the event handler for the user edit form,
   * which interacts directly with the UserApiClient
   * @param {*} event
   */
  async handleSubmitUser(event) {
    event.preventDefault();
    try {
      //
      console.log("User", this.inputeUserId.value);
      const object = {
        email: this.emailInput.value,
        login: this.loginInput.value,
        name: this.nameInput.value,
        password: this.passwordInput.value,
      };

      if (!this.inputeUserId.value) {
        // console.log("createUser");
        await UserApiClient.createUser(object);
      } else {
        // Calls the API edit feature
        await UserApiClient.editUser(this.inputeUserId.value, object);
        // Send alert Success Operation
        Navigator.setMessageAlert("OK: Atualizado com sucesso!");
      }

      // Clear All Form Fields
      Navigator.resetForm(this.formData);
      // Fetch List of Users in API
      await this.fetchAndRenderList();
      // Close Modal
      Navigator.modal.toggleModal();
    } catch (error) {
      // Display error message on screen
      Navigator.setMessageAlert(`${error.status}: ${error.message}`);
      // Validate Token
      Navigator.navGuard(error);
      // Log...
      //console.log(error);
    }
  },

  /**
   * HandleDeleteUser :
   * It is the event handler for the user delete button, and interacts directly with the UserApiClient.
   * It receives the user ID and calls the deleteUser function.
   */
  async handleDeleteUser(event) {
    event.preventDefault();
    try {
      const userId = this.inputeUserId.value;
      const message = await UserApiClient.deleteUser(userId);
      // Close Modal
      Navigator.modal.toggleModal();
      // Send alert Success Operation
      Navigator.setMessageAlert(`OK: ${message}`);
      // Fetch List of Users in API
      await this.fetchAndRenderList();
    } catch (error) {
      // Display error message on screen
      Navigator.setMessageAlert(`${error.status}: ${error.message}`);
      // Validate Token
      Navigator.navGuard(error);
    }
  },

  /**
   * Function that interacts directly with the DOM to manipulate user data for created.
   * It receives the user ID
   */
  async createUser() {
    console.log(`Create usuário`);
    // Open Modal with Registration Form
    this.renderFormSignup(0);
  },

  /**
   * Function that interacts directly with the DOM to manipulate user data for editing.
   * It receives the user ID
   * @param {*} userId
   */
  async editUser(userId) {
    console.log(`Editar usuário com ID ${userId}`);
    // Open Modal with Registration Form
    this.renderFormSignup();
    // Implement Logic to Edit a User
    this.inputeUserId.value = userId;
    // Get API User
    const user = await this.findUserById(userId);
    // Render Data in the User Form
    this.inputeUserId.value = user.user_id;
    this.emailInput.value = user.email;
    this.loginInput.value = user.login;
    this.nameInput.value = user.name;
  },

  /**
   * Function that interacts directly with the DOM to manipulate user data for deleted.
   * It receives the user ID
   * @param {*} userId
   */
  async deleteUser(userId) {
    console.log(`Excluir usuário com ID ${userId}`);
    // Get API User
    const user = await this.findUserById(userId);
    // Open Modal with Registration Form
    this.renderFormDelete(user.name);
    // Implement Logic to Delete a User
    this.inputeUserId.value = userId;
  },

  // Render database user list
  renderUserList(users) {
    // console.log(users);
    this.usersTableBody.innerHTML = "";
    users.forEach((user) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="hidden">${user.user_id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.login}</td>
        <td style="text-align: center;">
        ${
          user.active
            ? '<span class="badge bg-success">True</span>'
            : '<span class="badge bg-danger">False</span>'
        }        
        </td>
        <td style="text-align: center;">
          <button class="btn btn-sm bg-gradient-info" style="width:80px !important;" type="button" data-user-id="${
            user.user_id
          }" data-user-edit="true">Edit</button>
          <button class="btn btn-sm  bg-gradient-danger" style="width:80px !important;" type="button" data-user-id="${
            user.user_id
          }" data-user-delete="true">Delete</button>
        </td>
      `;
      this.usersTableBody.appendChild(row);
    });

    this.usersTableBody
      .querySelectorAll("button[data-user-id]")
      .forEach((item, i) => {
        // Set userId
        const userId = item.getAttribute("data-user-id");
        // Add Event Listener for Edit User.
        if (item.hasAttribute("data-user-edit")) {
          //console.log(`Editar usuário com ID ${userId}`);
          item.addEventListener("click", this.editUser.bind(this, userId));
        }
        // Add Event Listener to Delete User
        if (item.hasAttribute("data-user-delete")) {
          //console.log(`Excluir usuário com ID ${userId}`);
          item.addEventListener("click", this.deleteUser.bind(this, userId));
        }
      });
  },

  // Renders the authentication form in the DOM dynamically
  renderFormSignup(page) {
    //modal.innerHTML = "";
    const labelTitle =
      page === 0 ? "Preencha seu Password" : "Confirme seu Password";
    const labelh3 = page === 0 ? "Cadastrar" : "Editar";

    const formHtml = `
      <button data-modal="fechar" class="fechar"></button>
      <form id="createUserForm">
        <br/>
        <h3>${labelh3}</h3>
        <input type="hidden" id="user_id">

        <label for="name">Nome:</label>
        <input type="name" id="name" placeholder="Preencha o Name" [data-tooltip]="Insira o  name" required><br>
        
        <label for="email">Email:</label>
        <input type="email" id="email" placeholder="Preencha o Email" [data-tooltip]="Insira o  Email" required><br>
    
        <label for="login">Login:</label>
        <input type="text" id="login" placeholder="Preencha o Login" [data-tooltip]="Insira o Login" required><br>
    
        <label for="password">${labelTitle}</label>
        <input type="password" id="password" placeholder="${labelTitle}" [data-tooltip]="${labelTitle}" required><br>
        <br/>
        <div class="row">
       
        <button class="btn bg-gradient-success" type="submit">Salvar</button>
        <button class="btn btn-sm  bg-gradient-danger" type="reset">Limpar</button>      
        </div>
      </form>
    `;

    // Add the HTML form to the 'formContainerModal' element
    const modal = Navigator.modal.containerModal.querySelector("div");
    modal.innerHTML = "";
    modal.classList.remove("modal-login");
    modal.classList.remove("modal-delete");
    modal.classList.add("modal-cadastro");
    let div = document.createElement("div");
    div.innerHTML = formHtml;
    modal.appendChild(div);
    const formData = document.getElementById("createUserForm");
    // Form authentication addEventListener
    formData.addEventListener("submit", this.handleSubmitUser.bind(this));
    // Buttom cloase addEventListener
    const btnClose = document.querySelector('[data-modal="fechar"]');
    btnClose.addEventListener(
      "click",
      Navigator.modal.eventToggleModal.bind(this)
    );
    // Open Modal
    Navigator.modal.toggleModal();
    // Bind DOM
    this.reBind();
  },

  // Renders the authentication form in the DOM dynamically
  renderFormDelete(userName) {
    const formHtml = ` <form id="deleteUserForm">
    <input type="hidden" id="user_id">
    <div class="card card-danger">
    <div class="card-header">
    <h3 class="card-title"><strong><s>[${userName}]</s> Deseja Deletar? </strong></h3>
    <div class="card-tools">  
    </div>    
    </div>    
    <div class="card-body" style="background-color:#ddd !important;">
   
    <input type="hidden" id="user_id">
      <div class="row justify-content-center"> 
      
      <div class="row" style="padding-bottom: 20px !important;">      
        <button class="btn btn-lg btn-block bg-gradient-danger" style="border: 1px solid #fff !important;" type="submit">Confirmar</button>
        <button class="btn btn-lg btn-block btn-warning" style="border: 1px solid #fff !important;" type="button" data-modal="fechar">Cancelar</button>           
      </div>         
      </div>
       
    </div>    
    </div>
    </form>
    `;

    // Add the HTML form to the 'formContainerModal' element
    const modal = Navigator.modal.containerModal.querySelector("div");
    modal.innerHTML = "";
    modal.classList.remove("modal-login");
    modal.classList.remove("modal-cadastro");
    modal.classList.add("modal-delete");

    let div = document.createElement("div");
    div.innerHTML = formHtml;
    modal.appendChild(div);
    const formData = document.getElementById("deleteUserForm");
    // Form authentication addEventListener
    formData.addEventListener("submit", this.handleDeleteUser.bind(this));
    // Buttom close addEventListener
    const btnClose = formData.querySelector('[data-modal="fechar"]');
    btnClose.addEventListener(
      "click",
      Navigator.modal.eventToggleModal.bind(this)
    );
    // Open Modal
    Navigator.modal.toggleModal();
    // Bind DOM
    this.reBind();
  },

  // Function to binnd html elements created in the DOM dynamically
  reBind() {
    this.formData = document.getElementById("createUserForm");
    this.btnSignup = document.getElementById("btn-create");
    this.btnReset = document.querySelector('button[type^="reset"]');
    this.inputeUserId = document.getElementById("user_id");
    this.emailInput = document.getElementById("email");
    this.loginInput = document.getElementById("login");
    this.nameInput = document.getElementById("name");
    this.passwordInput = document.getElementById("password");
  },
};

export default IUser;
