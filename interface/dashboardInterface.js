import HotelApiCliente from "../service/hotelApiClient.js"
import Navigator from "../component/navInterface.js";

const IDash = {
    hoteisList: document.getElementById("dv-hoteis"),
    btnFetch: document.getElementById("menu-dashboard"),

    init() {
        // Bind events buttom
        this.fetchAndRenderList()
        this.btnFetch.addEventListener("click", this.fetchAndRenderList.bind(this));
        Navigator.navBar();
      },
      async fetchAndRenderList() {
        try {
          // Fetch List of Users in API
          const hoteis = await HotelApiCliente.fetchList();
          // Render Data in the User Grid
          this.renderUserList(hoteis);
        } catch (error) {
          // Display error message on screen
          Navigator.setMessageAlert(`${error.status}: ${error.message}`);
          // Validate Token
          Navigator.navGuard(error);
          // Log...
          // console.log(error);
        }
      },
      renderUserList(hoteis) {
        this.hoteisList.innerHTML = "";
        hoteis.forEach((hotel) => {
            const div = document.createElement("div")
            div.classList.add("col-md-4")

            div.innerHTML = `
            <div class="card card-widget widget-user shadow">
                  <div
                    class="widget-user-header bg-info"
                    style="
                      background: url(${hotel.url_background ?? 'static/img/hoteis/1.jpg'}) center center;
                    "
                  >
                    <h3 class="widget-user-username">${hotel.nome}</h3>
                    <h5 class="widget-user-desc">${hotel.cidade}</h5>
                  </div>
                  <div class="widget-user-image">
                    <img
                      class="img-circle elevation-2"
                      src="${hotel.url_image}"
                      alt="User Avatar"
                    />
                    <div class="icon">
                      <i class="ion ion-pie-graph"></i>
                    </div>
                  </div>
                  <div class="card-footer">
                    <div class="row">
                      <div class="col-sm-4 border-right">
                        <div class="description-block">
                          <h5 class="description-header">R$ ${hotel.diaria}</h5>
                          <span class="description-text">Diária</span>
                        </div>
                      </div>

                      <div class="col-sm-4 border-right">
                        <div class="description-block">
                          <h5 class="description-header">
                            ${this.getStarsHtml(hotel.estrelas)}
                          </h5>
                          <span class="description-text">Estrelas</span>
                        </div>
                      </div>

                      <div class="col-sm-4">
                        <div class="description-block">
                          <h5 class="description-header">${hotel.uf}</h5>
                          <span class="description-text">Local</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            `;
            this.hoteisList.appendChild(div);
        });
      },
      getStarsHtml(stars) {
        var html = '';
        for (let index = 0; index < stars; index++) {
           html += '<i class="fa fa-star-o bg-yellow"> </i>';
        }
        return html;
      },
}

export default IDash;