import StoryApi from '../../data/api';
import { showAlert } from '../../utils';

export default class ProfilePresenter {
  constructor(view) {
    this.view = view;
    this.api = StoryApi;
  }

  async getUserProfile() {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token tidak ditemukan. Harap login.');

      const response = await this.api.getProfile(token);
      return response.user;
    } catch (error) {
      console.error('Gagal ambil profil:', error);
      showAlert('Gagal memuat profil. Silakan login kembali.');
      throw error;
    }
  }
}
