/*
** AuthApiClient.js
Contains methods to interact with the user authentication and Token generation API (Login, Refresh, Logon).
*/

/**
 * Connects to the backend through a RESTful API with the routes
 * **************************************************************
 * authenticate: Create a new user    - POST /api/authenticate
 */
const Auth = {
  /** Set endpoint API  */
  apiUrl: "http://127.0.0.1:5001/api",

  /**
   * Get a user token
   * @param {*} username
   * @param {*} password
   * @returns object token
   */
  async authenticate(username, password) {
    let resourceUrl = `${this.apiUrl}/authenticate`;

    try {
      const response = await fetch(resourceUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const formError = {
          status: response.status,
          statusText: response.statusText,
          message: (await response.json()).message,
        };
        // log ...
        //console.info(error);
        throw formError;
      }
      const token_info = await response.json();
      return token_info;
    } catch (error) {
      throw error;
    }
  },
};

export default Auth;
