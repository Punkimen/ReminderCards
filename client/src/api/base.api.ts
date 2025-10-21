export const BASE_API_URL = 'http://localhost:3000/';

class ApiHandler {
  url
  constructor(url: string) {
    this.url = url;
  }

  async get(path: string){
    try {
      return await fetch(`${this.url}${path}`, {
        method: 'GET',
      });
    }catch(error) {
      throw new Error(`GET request failed: ${error}`);
    }
  }

  async post(path: string, body: object){
    try {
      return await fetch(`${this.url}${path}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
    }catch(error) {
      throw new Error(`POST request failed: ${error}`);
    }
  }

  async patch(path: string, body: object){ 
    try {
      return await fetch(`${this.url}${path}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      }
    catch(error) {
      throw new Error(`PATCH request failed: ${error}`);
    }
  }

  async put(path: string, body: object){ 
    try {
      return await fetch(`${this.url}${path}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      }
    catch(error) {
      throw new Error(`PATCH request failed: ${error}`);
    }
  }

  async delete(path: string, body?: object){
    try {
      return await fetch(`${this.url}${path}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
    }catch(error) {
      throw new Error(`DELETE request failed: ${error}`);
    }
  }

}

export const apiHandler = new ApiHandler(BASE_API_URL);
