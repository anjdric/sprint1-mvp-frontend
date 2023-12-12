/**
 * userApiClient.js:
 * Contains methods for interacting with the user API (Search, Create, Get, Delete, List.).
 */

// Importing dependencies
import Navigator from "../component/navInterface.js";

/**
 * Connects to the backend through a RESTful API with the routes
 * **************************************************************
 * fetchUserList: Get a user by ID  - GET /api/users/{id}
 * findUserById: Get all users      - GET /api/users
 * createUser: Create a new user    - POST /api/users
 * editUser: Update a user by ID    - PUT /api/users/{id}
 * deleteUser: Delete a user by ID  - DELETE /api/users/{id}
 */
const UserApiClient = {
  /** Set endpoint API  */
  apiUrl: "http://127.0.0.1:5001/api",

  /**
   * Get a user by ID
   * GET /api/users/{id}
   * @returns users
   */
  async fetchUserList() {
    let resourceUrl = `${this.apiUrl}/users`;
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

      const users = await response.json();
      return users;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get all users
   * GET /api/users
   * @param {*} userId
   * @returns user
   */
  async findUserById(userId) {
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

      const user = await response.json();
      return user;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Create a new user
   * POST /api/users
   * @param {*} email
   * @param {*} login
   * @param {*} password
   * @returns user
   */
  async createUser(newData) {
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

      const newUser = await response.json();
      return newUser;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update a user by ID
   * PUT /api/users/{id}
   * @param {*} userId
   * @param {*} newData
   * @returns user
   */
  async editUser(userId, newData) {
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

      const newUser = await response.json();
      return newUser;
    } catch (error) {
      throw error;
    }
  },

  /**
   * DELETE /api/users/{id}: Delete a user by ID
   * @param {*} userId
   * @returns statuscode 200
   */
  async deleteUser(userId) {
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

      return "Usuário excluído com sucesso";
    } catch (error) {
      // console.error("Erro ao excluir usuário:", error);
      throw error;
    }
  },
};

export default UserApiClient;
