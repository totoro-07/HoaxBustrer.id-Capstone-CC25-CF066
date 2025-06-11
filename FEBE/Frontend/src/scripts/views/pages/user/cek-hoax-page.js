import { showAlert } from '../../../utils';
import AddStoryPresenter from '../../../presenters/story/cek-hoax';
import AnimationHelper from '../../../utils/animation-helper';

export default class AddStoryPage {
  constructor() {
    this.presenter = new AddStoryPresenter(this);
  }

  async render() {
    return `
      <div class="container">
        <section class="cek-hoax-form">
          <form id="cek-hoax-form" class="form">
            <h1 class="form-title" style="opacity: 0; transform: translateY(-20px);">
              🔍 Hoax Detector
            </h1>

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

  // Ambil label dari objek prediction
  const label = prediction.label.toLowerCase();
  const confidence = prediction.confidence;
  const isHoax = label === 'hoax';

  resultContainer.innerHTML = `
    <div class="bg-white shadow rounded-lg p-4 border ${isHoax ? 'border-red-600' : 'border-green-600'}">
      <h2 class="${isHoax ? 'text-red-700' : 'text-green-700'} text-lg font-bold mb-2">🧠 Hasil Prediksi</h2>
      <p class="text-gray-800 text-md">
        Teks tersebut terdeteksi sebagai: 
        <strong class="${isHoax ? 'text-red-600' : 'text-green-600'}">
          ${prediction.label} (${confidence}% yakin)
        </strong>
      </p>
    </div>
  `;
}

}
