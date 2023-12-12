/**
 * userApiClient.js:
 * Contains methods for interacting with the user API (Search, Create, Get, Delete, List.).
 */

// Importing dependencies
import Navigator from "../interface/navInterface.js";

/**
 * Connects to the backend through a RESTful API with the routes
 * **************************************************************
 * fetchList: Get a user by ID  - GET /api/hotels/{id}
 * findById: Get all data      - GET /api/hotels
 * create: Create a new data    - POST /api/hotels
 * editUser: Update a data by ID    - PUT /api/hotels/{id}
 * deleteUser: Delete a data by ID  - DELETE /api/hotels/{id}
 */
const HotelApiClient = {
  /** Set endpoint API  */
  apiUrl: "http://127.0.0.1:5001/api",

  /**
   * Get a hotel by ID
   * GET /api/hotels/{id}
   * @returns users
   */
  async fetchList() {
    let resourceUrl = `${this.apiUrl}/hotels`;
    try {
      const response = await fetch(resourceUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: Navigator.getToken(), // Adiciona o token no header
        },
      });

      if (!response.ok) {
        const formError = {
          status: response.status,
          statusText: response.statusText,
          message: (await response.json()).message,
        };
        // console.info(response);
        throw formError;
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get all hotels
   * GET /api/hotels
   * @param {*} userId
   * @returns user
   */
  async findById(userId) {
    let resourceUrl = `${this.apiUrl}/users/${userId}`;
    // console.log(resourceUrl);
    try {
      const response = await fetch(resourceUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: Navigator.getToken(), // Adiciona o token no header
        },
      });

      if (!response.ok) {
        const formError = {
          status: response.status,
          statusText: response.statusText,
          message: (await response.json()).message,
        };
        //console.info(error);
        throw formError;
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Create a new hotel
   * POST /api/hotels
   * @param {*} newData
   * @returns hotel
   */
  async create(newData) {
    let resourceUrl = `${this.apiUrl}/users`;
    try {
      const response = await fetch(resourceUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: Navigator.getToken(), // Adiciona o token no header
        },
        body: JSON.stringify(newData),
      });

      if (!response.ok) {
        const formError = {
          status: response.status,
          statusText: response.statusText,
          message: (await response.json()).message,
        };
        // console.info(response);
        throw formError;
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update a hotel by ID
   * PUT /api/hotels/{id}
   * @param {*} hotelId
   * @param {*} newData
   * @returns user
   */
  async edit(userId, newData) {
    let resourceUrl = `${this.apiUrl}/users/${userId}`;
    try {
      const response = await fetch(resourceUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: Navigator.getToken(), // Adiciona o token no header
        },
        body: JSON.stringify(newData),
      });

      if (!response.ok) {
        const formError = {
          status: response.status,
          statusText: response.statusText,
          message: (await response.json()).message,
        };
        // console.info(response);
        throw formError;
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * DELETE /api/hotels/{id}: Delete by ID
   * @param {*} hotelId
   * @returns statuscode 200
   */
  async delete(userId) {
    let resourceUrl = `${this.apiUrl}/users/${userId}`;
    try {
      const response = await fetch(resourceUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: Navigator.getToken(), // Adiciona o token no header
        },
      });

      if (!response.ok) {
        const formError = {
          status: response.status,
          statusText: response.statusText,
          message: (await response.json()).message,
        };
        // console.info(response);
        throw formError;
      }

      return "Excluído com sucesso";
    } catch (error) {
      // console.error("Erro ao excluir usuário:", error);
      throw error;
    }
  },
};

export default HotelApiClient;
