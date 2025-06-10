import StoryApi from '../../data/api';
import { showAlert } from '../../utils';
import ErrorHandler from '../../utils/error-handler';
import NetworkStatus from '../../utils/network-status';

export default class CekHoaxGuestPresenter {
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

      // Batas maksimal 3x submit untuk guest
      const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
      if (!isLoggedIn) {
        const usageCount = parseInt(localStorage.getItem('guestUsageCount') || '0', 10);
        if (usageCount >= 3) {
          showAlert('Anda sudah menggunakan fitur ini sebanyak 3x. Silakan login untuk melanjutkan.', 'warning');
          return;
        }
      }

      const response = await this._storyApi.checkHoaxGuest({ description });

      if (!response.error) {
        showAlert('Berhasil mengirim permintaan cek hoax!', 'success');

        if (!isLoggedIn) {
          const usageCount = parseInt(localStorage.getItem('guestUsageCount') || '0', 10);
          localStorage.setItem('guestUsageCount', usageCount + 1);
        }

        setTimeout(() => {
          window.location.hash = '#/';
        }, 1500);

        return true;
      } else {
        throw new Error(response.message || 'Gagal mengirim permintaan');
      }
    } catch (error) {
      if (!NetworkStatus.isOnline) {
        return ErrorHandler.handleOfflineError(error, {
          offlineAction: () => {
            showAlert('Permintaan Anda disimpan secara offline dan akan dikirim saat online kembali.', 'info');
            setTimeout(() => {
              window.location.hash = '#/';
            }, 2000);
            return true;
          }
        });
      } else {
        return ErrorHandler.handleFormError(error, {
          context: 'Mengirim permintaan cek hoax',
          defaultMessage: 'Terjadi kesalahan. Silakan coba lagi.'
        });
      }
    }
  }
}
