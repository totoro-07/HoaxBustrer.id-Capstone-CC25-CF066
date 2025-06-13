import HomePresenter from '../../../presenters/home/home-presenter';
import { createSkeletonStory, initMapWithLayerControl } from '../../../utils';
import AnimationHelper from '../../../utils/animation-helper';
import ErrorHandler from '../../../utils/error-handler';

export default class HomePage {
  constructor() {
    this._stories = [];
    this._map = null;
    this._storyListElement = null;
    this._presenter = new HomePresenter(this);
  }

async render() {
  return `
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1>Selamat Datang Kembali di HoaxBuster.id</h1>
        <p>Verifikasi kebenaran berita hanya dalam hitungan detik dengan Hoaxbuster.id</p>
        <div class="cta-buttons">
          <a href="#/cek-hoax" class="btn-primary">
            <i class="fas fa-search"></i> Mulai Deteksi
          </a>
        </div>
      </div>
    </section>

    <!-- Value Proposition -->
    <section class="section light">
      <div class="container">
        <h2 class="section-title">Mengapa HoaxBuster.id?</h2>
        <p class="section-subtitle">Kami hadir untuk bantu kamu melawan hoax</p>
        <div class="features">
          <div class="feature-card">
            <i class="fas fa-bolt icon"></i>
            <h3>Deteksi Cepat</h3>
            <p>Proses hanya butuh 3–5 detik per berita.</p>
          </div>
          <div class="feature-card">
            <i class="fas fa-brain icon"></i>
            <h3>AI Canggih</h3>
            <p>Model ML terbaru dengan akurasi tinggi hingga 92%.</p>
          </div>
          <div class="feature-card">
            <i class="fas fa-unlock-alt icon"></i>
            <h3>Akses Tanpa Batas dengan Login</h3>
            <p>Login untuk mendapatkan akses penuh tanpa batas dalam melakukan deteksi hoax. Pengguna tanpa login dibatasi hingga 3 kali penggunaan.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="section white">
      <div class="container">
        <h2 class="section-title">Cara Menggunakan</h2>
        <p class="section-subtitle">Langkah sederhana untuk mulai mendeteksi hoax</p>
        <div class="steps">
          <div class="step">
            <div class="step-number">1</div>
            <h3>Masukkan Konten</h3>
            <p>Salin teks berita yang ingin kamu periksa.</p>
          </div>
          <div class="step">
            <div class="step-number">2</div>
            <h3>Analisis Otomatis</h3>
            <p>Model AI kami akan menganalisis konten secara mendalam.</p>
          </div>
          <div class="step">
            <div class="step-number">3</div>
            <h3>Hasil Instan</h3>
            <p>Dapatkan penilaian hoax dalam beberapa detik.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="section cta">
      <div class="container text-center">
        <h2 class="section-title text-white">Periksa Sekarang!</h2>
        <p class="section-subtitle text-white">Akses berita tanpa batas secara gratis.</p>
        <a href="#/cek-hoax" class="btn-primary-white">
          Deteksi Berita
        </a>
      </div>
    </section>
  `;
}

async afterRender() {
  const animateOnScroll = () => {
    document.querySelectorAll(".section, .hero").forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.85) {
        el.classList.add("visible");
      }
    });
  };

  document.querySelectorAll(".section, .hero").forEach(el => {
    el.classList.add("invisible");
  });

  window.addEventListener("scroll", animateOnScroll);
  setTimeout(animateOnScroll, 100);
}

}
