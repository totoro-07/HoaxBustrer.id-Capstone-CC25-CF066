import StoryApi from '../../data/api';
import { showAlert } from '../../utils';
import ErrorHandler from '../../utils/error-handler';
import NetworkStatus from '../../utils/network-status';

export default class CekHoaxUserPresenter {
  constructor(view) {
    this._view = view;
    this._storyApi = StoryApi;
  }

  async handleSubmitHoaxCheck({ description }) {
    try {
      if (!description.trim()) {
        showAlert('Silakan masukkan teks berita untuk dicek', 'error');
        return;
      }

      // ⬇️ PERBAIKAN DI SINI: hanya untuk user login
      const token = localStorage.getItem('token');
      if (!token) {
        showAlert('Silakan login terlebih dahulu untuk menggunakan fitur ini.', 'error');
        return;
      }

      const response = await this._storyApi.checkHoaxUser({ description, token });

      if (!response.error) {
        showAlert('Permintaan cek hoax berhasil dikirim!', 'success');
        this._view.showPrediction(response.prediction);
        return true;
      } else {
        throw new Error(response.message || 'Gagal mengirim permintaan');
      }

    } catch (error) {
      if (!NetworkStatus.isOnline) {
        return ErrorHandler.handleOfflineError(error, {
          offlineAction: () => {
            showAlert('Permintaan Anda disimpan secara offline dan akan dikirim saat Anda online kembali.', 'info');
            setTimeout(() => {
              window.location.hash = '#/';
            }, 2000);
            return true;
          }
        });
      } else {
        return ErrorHandler.handleFormError(error, {
          context: 'Cek hoax oleh pengguna login',
          defaultMessage: 'Terjadi kesalahan. Silakan coba lagi.',
        });
      }
    }
  }
}
