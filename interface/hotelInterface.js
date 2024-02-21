/**
 * hotelInterface.js:
 * Handles interaction, DOM events and rendering on the interface.
 */

// Importing dependencies
import HotelApiClient from "../service/hotelApiClient.js";
import Navigator from "../component/navInterface.js";

const IHotel = {
  sectionForm: document.getElementById("hotelSection"),
  formData: document.getElementById("createHotelForm"),
  btnFetch: document.getElementById("menu-hotel"),
  btnCreate: document.getElementById("btn-create-hotel"),

  btnReset: document.querySelector('button[type^="reset"]'),
  inputHotelId: document.getElementById("hotel_id"),

  nomeInput: document.getElementById("nome"),
  estrelasInput: document.getElementById("estrelas"),
  diariaInput: document.getElementById("diaria"),
  cidadeInput: document.getElementById("cidade"),
  ufInput: document.getElementById("uf"),
  imageInput: document.getElementById("url_image"),
  backgroundInput: document.getElementById("url_background"),

  tableBody: document.getElementById("hotelTableBody"),

  // Code for interface initialization
  init() {
    // Check If Authenticated
    if (Navigator.isAuthenticated()) {
      // Fetch List of Users in API
      // this.fetchAndRenderList();
    }

    this.btnFetch.addEventListener("click", this.fetchAndRenderList.bind(this));
    //console.log(this.btnFetch);
    this.btnCreate.addEventListener("click", this.create.bind(this));
  },

  //
  /**
   * Display All hotels Registered in the Database
   * @returns hotels
   */
  async fetchAndRenderList(event) {
    try {
      console.log("Fetch hotels");
      // Fetch List of datas in API
      const datas = await HotelApiClient.fetchList();
      console.log(datas);
      // Render Datas in the Grid
      this.renderList(datas);
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
  async findById(userId) {
    try {
      // Fetch User in API
      const hotel = await HotelApiClient.findById(userId);
      // Render Data in the User Grid
      return hotel;
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
  async handleSubmitHotel(event) {
    event.preventDefault();
    try {
      //
      console.log("hotel", this.inputHotelId.value);
      const object = {
        user_id: 1,
        nome: this.nomeInput.value,
        estrelas: this.estrelasInput.value,
        cidade: this.cidadeInput.value,
        diaria: this.diariaInput.value,
        url_image: this.imageInput.value,
        url_background: this.backgroundInput.value,
        uf: this.ufInput.value,
      };

      console.log(object);

      if (!this.inputHotelId.value) {
        // console.log("createUser");
        await HotelApiClient.create(object);
      } else {
        // Calls the API edit feature
        await HotelApiClient.edit(this.inputHotelId.value, object);
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
   * handleDeleteHotel :
   * It is the event handler for the user delete button, and interacts directly with the UserApiClient.
   * It receives the user ID and calls the deleteUser function.
   */
  async handleDeleteHotel(event) {
    event.preventDefault();
    try {
      const hotelId = this.inputHotelId.value;
      const message = await HotelApiClient.delete(hotelId);
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
  async create() {
    console.log(`Create usuário`);
    // // Open Modal with Registration Form
     this.renderFormCadastro(0);
  },

  /**
   * Function that interacts directly with the DOM to manipulate user data for editing.
   * It receives the user ID
   * @param {*} hotelId
   */
  async edit(hotelId) {
    console.log(`Editar ID ${hotelId}`);
    // // Open Modal with Registration Form
    this.renderFormCadastro();
    // // Implement Logic to Edit a User
     this.inputHotelId.value = hotelId;
    // // Get API User
     const hotel = await this.findById(hotelId);
    // // Render Data in the User Form
     this.inputeUserId.value = hotel.user_id;
     this.nomeInput.value = hotel.nome;
     this.cidadeInput.value = hotel.cidade;
     this.ufInput.value = hotel.uf;
     this.diariaInput.value = hotel.diaria;
     this.estrelasInput.value = hotel.estrelas;
     this.imageInput.value = hotel.url_image;
     this.backgroundInput.value = hotel.url_background;
  },

  /**
   * Function that interacts directly with the DOM to manipulate user data for deleted.
   * It receives the user ID
   * @param {*} hotelId
   */
  async delete(hotelId) {
    console.log(`Excluir hotel com ID ${hotelId}`);
    // Get API User
    const hotel = await this.findById(hotelId);
    console.log(hotel)
    // Open Modal with Registration Form
    this.renderFormDelete(hotel.nome);
    // Implement Logic to Delete a User
    this.inputHotelId.value = hotelId;
  },


  renderFormDelete(hotelNome) {
    console.log(`Excluir ID ${hotelId}`);

    const formHtml = ` <form id="deleteHotelForm">
    <input type="hidden" id="user_id">
    <div class="card card-danger">
    <div class="card-header">
    <h3 class="card-title"><strong><s>[${hotelNome}]</s> Deseja Deletar? </strong></h3>
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
    const formData = document.getElementById("deleteHotelForm");
    // Form authentication addEventListener
    formData.addEventListener("submit", this.handleDeleteHotel.bind(this));
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

  // Render database data list
  renderList(hotels) {
    // console.log(users);
    this.tableBody.innerHTML = "";
    hotels.forEach((hotel) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="hidden">${hotel.hotel_id}</td>       
        <td>${hotel.nome}</td>                  
        <td>${hotel.cidade}</td>
        <td style="text-align: center;">${hotel.uf}</td>     
        <td>R$ ${hotel.diaria}</td>   
        <td style="text-align: center;">${this.getStarsHtml(hotel.estrelas)}</td>           
        <td style="text-align: center;">
        ${
          hotel.checked
            ? '<span class="badge bg-success">True</span>'
            : '<span class="badge bg-danger">False</span>'
        }
        </td>
        <td style="text-align: center;">
        ${
          hotel.active
            ? '<span class="badge bg-success">True</span>'
            : '<span class="badge bg-danger">False</span>'
        }
        </td>        
        <td style="text-align: center"><i class="fa fa-instagram" aria-hidden="true"></i></td>             
        <td style="text-align: center"><i class="fa fa-youtube-play" aria-hidden="true"></i></td>
        <td style="text-align: center;">
          <button class="btn btn-sm bg-gradient-info" style="width:80px !important;" type="button" data-hotel-id="${
            hotel.hotel_id
          }" data-hotel-edit="true">Edit</button>
          <button class="btn btn-sm  bg-gradient-danger" style="width:80px !important;" type="button" data-hotel-id="${
            hotel.hotel_id
          }" data-hotel-delete="true">Delete</button>
        </td>
      `;
      this.tableBody.appendChild(row);
    });

    this.tableBody
      .querySelectorAll("button[data-hotel-id]")
      .forEach((item, i) => {
        // Set userId
        const hotelId = item.getAttribute("data-hotel-id");
        // Add Event Listener for Edit User.
        if (item.hasAttribute("data-hotel-edit")) {
          //console.log(`Editar usuário com ID ${userId}`);
          item.addEventListener("click", this.edit.bind(this, hotelId));
        }
        // Add Event Listener to Delete User
        if (item.hasAttribute("data-hotel-delete")) {
          //console.log(`Excluir usuário com ID ${userId}`);
          item.addEventListener("click", this.delete.bind(this, hotelId));
        }
      });
  },
  getStarsHtml(stars) {
    var html = '';
    for (let index = 0; index < stars; index++) {
       html += '<i class="fa fa-star-o bg-yellow"> </i>';
    }
    return html;
  },
  // Renders the authentication form in the DOM dynamically
  renderFormCadastro(page) {
    //modal.innerHTML = "";
    const labelh3 = page === 0 ? "Cadastrar" : "Editar";

    const formHtml = `
    <button data-modal="fechar" class="fechar"></button>
    <form id="createHotelForm">
      <br/>
      <h3>${labelh3}</h3>
      <input type="hidden" id="hotel_id">
      <input type="hidden" id="user_id">
      <div class="row">
        <div class="col-12">
          <label for="nome">Nome:</label>
          <input type="text" id="nome" placeholder="Preencha o Name" [data-tooltip]="Insira o nome" required><br>
        </div>
      </div>

      <div class="row">
        <div class="col-6">
          <label for="estrelas">Estrelas:</label>
          <input type="number" min="1" max="5" id="estrelas" placeholder="Quantidade de Estrelas" [data-tooltip]="Total" required><br>
        </div>
        <div class="col-6">
          <label for="diaria">Diária:</label>
          <input type="number" id="diaria" placeholder="Preencha a Diária" [data-tooltip]="Insira a Diária" required><br>
        </div>
      </div>

      <div class="row">
      <div class="col-10">
        <label for="cidade">Cidade:</label>
        <input type="text" id="cidade" placeholder="Preencha a Cidade" [data-tooltip]="Insiara a Diária" required><br>
      </div>
      <div class="col-2">
        <label for="uf">UF:</label>
        <input type="text" id="uf" placeholder="UF" [data-tooltip]="UF" required><br>
      </div>
      </div>

      <div class="row">
        <label for="url_image">Logo URL:</label>
        <input type="text" id="url_image" placeholder="Preencha a url da Imagem" [data-tooltip]="Insiara a URL da Imagem" required><br>
    
        <label for="url_background">Background URL:</label>
        <input type="text" id="url_background" placeholder="Preencha a url de background" [data-tooltip]="Insiara a URL da Imagem" required><br>
      </div>

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
    const formData = document.getElementById("createHotelForm");
    // Form authentication addEventListener
    formData.addEventListener("submit", this.handleSubmitHotel.bind(this));
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
  renderFormDelete(hotelNome) {
    const formHtml = ` <form id="deleteHotelForm">
    <input type="hidden" id="hotel_id">
    <div class="card card-danger">
    <div class="card-header">
    <h3 class="card-title"><strong><s>[${hotelNome}]</s> Deseja Deletar? </strong></h3>
    <div class="card-tools">  
    </div>    
    </div>    
    <div class="card-body" style="background-color:#ddd !important;">
   
    <input type="hidden" id="hotel_id">
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
    const formData = document.getElementById("deleteHotelForm");
    // Form authentication addEventListener
    formData.addEventListener("submit", this.handleDeleteHotel.bind(this));
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
    this.formData = document.getElementById("createHotelForm");
    this.btnSignup = document.getElementById("btn-create");
    this.btnReset = document.querySelector('button[type^="reset"]');
    this.inputeUserId = document.getElementById("user_id");
    
    this.inputHotelId = document.getElementById("hotel_id")
    this.nomeInput = document.getElementById("nome");
    this.cidadeInput = document.getElementById("cidade");
    this.ufInput = document.getElementById("uf");
    this.estrelasInput = document.getElementById("estrelas");
    this.diariaInput = document.getElementById("diaria");
    this.imageInput = document.getElementById("url_image");
    this.backgroundInput = document.getElementById("url_background");
  },
};

export default IHotel;
