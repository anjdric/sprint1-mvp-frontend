export default class Modal {
  constructor(botaoAbrir, botaoFechar, botaoEntrar, containerModal) {
    this.botaoAbrir = document.querySelector(botaoAbrir);
    this.botaoFechar = document.querySelector(botaoFechar);
    this.botaoEntrar = document.querySelector(botaoEntrar);
    this.containerModal = document.querySelector(containerModal);

    // bind this ao callback para
    // fazer referência ao objeto
    // da classe
    this.eventToggleModal = this.eventToggleModal.bind(this);
    this.cliqueForaModal = this.cliqueForaModal.bind(this);
  }

  // abre ou fecha o modal
  toggleModal() {
    this.containerModal.classList.toggle("ativo");
  }

  // adiciona o evento de toggle ao modal
  eventToggleModal(event) {
    event.preventDefault();
    this.toggleModal();
  }

  // fecha o modal ao clicar do lado de fora
  cliqueForaModal(event) {
    if (event.target === this.containerModal) {
      this.toggleModal();
    }
  }

  // adiciona os eventos aos elementos do modal
  addModalEvents() {
    this.botaoAbrir.addEventListener("click", this.eventToggleModal);
    this.botaoFechar.addEventListener("click", this.eventToggleModal);
    this.botaoEntrar.addEventListener("click", this.eventToggleModal);
    this.containerModal.addEventListener("click", this.cliqueForaModal);
  }

  init() {
    if (
      this.botaoAbrir &&
      this.botaoFechar &&
      this.botaoEntrar &&
      this.containerModal
    ) {
      this.addModalEvents();
    }
    return this;
  }
}
