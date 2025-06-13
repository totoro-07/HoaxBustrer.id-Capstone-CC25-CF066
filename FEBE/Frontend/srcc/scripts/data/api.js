import CONFIG from '../config';
import { showAlert } from '../utils';
import StoryIDB from './idb';
import NetworkStatus from '../utils/network-status';
import ErrorHandler from '../utils/error-handler';

class StoryApi {
  static async _fetchWithAuth(endpoint, options = {}) {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch(`${CONFIG.BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  static async _fetchWithoutAuth(endpoint, options = {}) {
    const response = await fetch(`${CONFIG.BASE_URL}${endpoint}`, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  static async _convertBlobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  static async register({ name, email, password }) {
    try {
      const response = await fetch(`${CONFIG.BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseJson = await response.json();
      
      if (!responseJson.error) {
        showAlert('Registration successful! Please login.');
        return responseJson;
      } else {
        throw new Error(responseJson.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      showAlert('Registration failed. Please try again.', 'error');
      throw error;
    }
  }

  static async login({ email, password }) {
    try {
      const response = await fetch(`${CONFIG.BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseJson = await response.json();
      
      if (!responseJson.error && responseJson.loginResult) {
        localStorage.setItem('token', responseJson.loginResult.token);
        localStorage.setItem('name', responseJson.loginResult.name); 
        document.dispatchEvent(new Event('authChanged'));
        showAlert('Login successful!');
        return responseJson;
      } else {
        throw new Error(responseJson.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login failed:', error);
      showAlert('Login failed. Please check your credentials.', 'error');
      throw error;
    }
  }

  static async checkHoaxUser({ description, token }) {
    try {
      const response = await fetch(`${CONFIG.BASE_URL}${CONFIG.ENDPOINTS.CHECK_HOAX}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: description }), // harus "text"
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error('Hoax check failed:', error);
      showAlert('Gagal melakukan pengecekan hoax.', 'error');
      throw error;
    }
  }

  static async checkHoaxGuest({ description }) {
    try {
      const response = await fetch(`${CONFIG.BASE_URL}/hoax-check/guest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: description }), // harus "text"
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error('Hoax check (guest) failed:', error);
      showAlert('Gagal melakukan pengecekan hoax untuk tamu.', 'error');
      throw error;
    }
  }
}

export default StoryApi;
