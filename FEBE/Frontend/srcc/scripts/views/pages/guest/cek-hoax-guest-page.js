import CekHoaxGuestPresenter from '../../../presenters/guest/cek-hoax-guest-presenter';
import { showAlert } from '../../../utils';
import AnimationHelper from '../../../utils/animation-helper';

export default class CekHoaxGuestPage {
  constructor() {
    this.presenter = new CekHoaxGuestPresenter(this);
  }

  async render() {
    return `
      <div class="container">
        <section class="cek-hoax-form">
          <form id="cek-hoax-form" class="form">
            <h1 class="form-title" style="opacity: 0; transform: translateY(-20px);">
              🔍 Hoax Detector
            </h1>
            <p class="guest-note text-yellow-800 bg-yellow-100 border border-yellow-400 rounded px-4 py-2 mb-4 text-sm">
              <i class="fas fa-info-circle"></i> Anda menggunakan mode tamu. Batas maksimal cek hoax adalah <strong>3 kali</strong>.
            </p>

            <div class="form-group" style="opacity: 0; transform: translateY(20px);">
              <label for="description">Teks Berita</label>
              <textarea 
                id="description" 
                name="description" 
                class="form-control" 
                rows="6" 
                required 
                aria-required="true"
                placeholder="Tulis atau tempel isi berita yang ingin diverifikasi kebenarannya..."
              ></textarea>
            </div>

            <div class="form-actions">
              <button type="submit" class="submit-button" style="opacity: 0; transform: translateY(20px);">
                <i class="fas fa-search"></i> Verifikasi Sekarang
              </button>
            </div>
          </form>

          <!-- Hasil prediksi akan ditampilkan di sini -->
          <div id="prediction-result" class="prediction-result mt-4" style="display: none;"></div>
        </section>
      </div>
    `;
  }

  async afterRender() {
    this._initializeForm();
    this._animateInterface();
  }

  _initializeForm() {
    const form = document.getElementById('cek-hoax-form');
    const submitButton = form.querySelector('.submit-button');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const description = document.getElementById('description').value.trim();
      if (!description) {
        showAlert('Mohon masukkan teks yang ingin dicek.', 'warning');
        return;
      }

      const originalContent = submitButton.innerHTML;
      submitButton.disabled = true;
      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sedang Memproses...';

      try {
        await this.presenter.handleSubmitHoaxCheck({ description });
      } catch (error) {
        showAlert('Terjadi kesalahan saat memeriksa hoax.', 'danger');
      } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = originalContent;
      }
    });
  }

  _animateInterface() {
    const title = document.querySelector('.form-title');
    const formGroups = document.querySelectorAll('.form-group');
    const submitButton = document.querySelector('.submit-button');

    AnimationHelper.animateElement(title, {
      delay: 100,
      transform: 'translateY(0)'
    });

    AnimationHelper.animateFormElements(formGroups);

    AnimationHelper.animateElement(submitButton, {
      delay: 200 + (formGroups.length * 150),
      transform: 'translateY(0)'
    });
  }

  showPrediction(prediction) {
    const resultContainer = document.getElementById('prediction-result');
    resultContainer.style.display = 'block';

    const label = prediction.label?.toLowerCase?.() || prediction; // fallback untuk string
    const confidence = prediction.confidence ?? null;
    const isHoax = label === 'hoax';

    const confidenceText = confidence ? ` (${confidence}% yakin)` : '';

    resultContainer.innerHTML = `
      <div class="bg-white shadow rounded-lg p-4 border ${isHoax ? 'border-red-600' : 'border-green-600'}">
        <h2 class="${isHoax ? 'text-red-700' : 'text-green-700'} text-lg font-bold mb-2">🧠 Hasil Prediksi</h2>
        <p class="text-gray-800 text-md">
          Teks tersebut terdeteksi sebagai:
          <strong class="${isHoax ? 'text-red-600' : 'text-green-600'}">
            ${label}${confidenceText}
          </strong>
        </p>
      </div>
    `;
  }
}
