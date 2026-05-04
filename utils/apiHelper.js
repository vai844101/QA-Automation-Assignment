require('dotenv').config();

class APIHelper {
  constructor(request) {
    this.request = request;
    this.baseURL = 'https://reqres.in/api';
  }

  getHeaders() {
    if (!process.env.REQRES_API_KEY) {
      console.warn('WARNING: REQRES_API_KEY is not set in .env. API tests might fail with 401 Unauthorized.');
    }

    return {
      'x-api-key': process.env.REQRES_API_KEY || 'your_api_key_here',
      'Content-Type': 'application/json'
    };
  }

  async createUser(userData) {
    return this.request.post(`${this.baseURL}/users`, {
      headers: this.getHeaders(),
      data: userData
    });
  }

  async getUser(userId) {
    return this.request.get(`${this.baseURL}/users/${userId}`, {
      headers: this.getHeaders()
    });
  }

  async updateUser(userId, userData) {
    return this.request.put(`${this.baseURL}/users/${userId}`, {
      headers: this.getHeaders(),
      data: userData
    });
  }
}

module.exports = APIHelper;
