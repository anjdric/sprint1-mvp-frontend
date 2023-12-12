/**
 * navInterface.js:
 * Handles shared navigability interaction, DOM events and rendering on the interface.
 */
import Modal from "../static/js/modules/modal.js";
import Tooltip from "../static/js/modules/tooltip.js";
import TabNav from "../static/js/modules/tabnav.js";

const INavigation = {
  sectionAuthForm: document.getElementById("authSection"),
  menuPrincipal: document.querySelectorAll("[data-menu-item]"),

  menuDashboard: document.getElementById("menu-dashboard"),
  sectionDashboard: document.getElementById("dashboardSection"),

  menuSignup: document.getElementById("menu-user"),
  sectionSignupForm: document.getElementById("signupSection"),

  menuHotel: document.getElementById("menu-hotel"),
  sectionHotel: document.getElementById("hotelSection"),

  btnLogout: document.getElementById("btn-logout"),
  elementsNot: document.querySelectorAll("[data-auth='not-auth']"),
  elementsAut: document.querySelectorAll("[data-auth='auth']"),
  messageForm: document.getElementById("message"),
  tooltip: new Tooltip("[data-tooltip]"),
  modal: new Modal(
    '[data-modal="abrir"]',
    '[data-modal="fechar"]',
    '[data-modal="entrar"]',
    '[data-modal="container"]'
  ),
  tabNav: new TabNav('[data-menu="list"] li', '[data-menu="content"]'),

  // Code for interface initialization
  init() {
    this.messageForm.innerHTML = "";
    this.tooltip.init();
    this.tabNav.init();
  },

  // Navigation Manager
  navBar() {
    if (this.isAuthenticated()) {
      this.elementsAut.forEach(function (item) {
        item.classList.add("ativo");
      });
      this.elementsNot.forEach(function (item) {
        item.classList.remove("ativo");
      });
    } else {
      this.elementsAut.forEach(function (item) {
        item.classList.remove("ativo");
      });
      this.elementsNot.forEach(function (item) {
        item.classList.add("ativo");
      });
    }
  },

  // Check if you are authorized
  isAuthenticated() {
    return localStorage.getItem("token_type") !== null;
  },

  // Get Session Token LocalStorage
  getToken() {
    return `${localStorage.getItem("token_type")} ${localStorage.getItem(
      "access_token"
    )}`;
  },

  // Set Session Token LocalStorage
  setToken(type, token, refresh) {
    localStorage.setItem("token_type", type);
    localStorage.setItem("access_token", token);
    localStorage.setItem("refresh_token", refresh);
  },

  // Clear Session Token
  clearToken() {
    localStorage.clear();
    this.navBar();
  },

  // Set Alert Messages
  setMessageAlert(msg) {
    const alert = this.messageForm.parentElement.parentElement;
    alert.classList.toggle("section-inactive");
    this.messageForm.innerHTML = msg;

    setTimeout(function () {
      alert.classList.toggle("section-inactive"), 2000;
    }, 6000);
  },

  // Clear Alert Messages
  clearMessageAlert() {
    this.messageForm.innerHTML = "";
  },

  // Clear Form inputs
  resetForm(formData) {
    formData.querySelector("input[type=hidden]").value = "";
    formData.reset();
  },

  // AuthGuard Navigation
  navGuard(event) {
    if (event.status === 302 || event.status === 401 || event.status === 403) {
      this.clearToken();
    }
    this.navBar();
  },

  // Adiciona o formulário HTML ao elemento 'formContainerModal'
  renderElementModal(domElements) {
    // Adiciona o formulário HTML ao elemento 'formContainerModal'
    this.modal.containerModal.innerHTML = "";
    let div = document.createElement("div");
    div.classList.add("modal");
    div.innerHTML = domElements;
    this.modal.containerModal.append(div);
    return div;
  },
};

export default INavigation;
