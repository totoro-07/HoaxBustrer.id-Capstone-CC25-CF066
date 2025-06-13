export default class GuestPage {
  async render() {
    return `
      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-content">
          <h1>Deteksi Hoax Secara Instan dan Akurat</h1>
          <p>Verifikasi kebenaran berita hanya dalam hitungan detik dengan teknologi AI kami</p>
          <div class="cta-buttons">
            <a href="#/cek-hoax-guest" class="btn-primary">
              <i class="fas fa-search"></i> Periksa Sekarang
            </a>
            <a href="#/about" class="btn-secondary">
              <i class="fas fa-info-circle"></i> Pelajari Cara Kerja
            </a>
          </div>
        </div>
      </section>

      <!-- Value Proposition -->
      <section class="section light">
        <div class="container">
          <h2 class="section-title">Mengapa Memilih Kami?</h2>
          <p class="section-subtitle">Solusi terdepan untuk memerangi hoax di Indonesia</p>
          <div class="features">
            <div class="feature-card">
              <i class="fas fa-brain icon"></i>
              <h3>AI Canggih</h3>
              <p>Model ML terbaru dengan akurasi tinggi hingga 90%.</p>
            </div>
            <div class="feature-card">
              <i class="fas fa-bolt icon"></i>
              <h3>Hasil Instan</h3>
              <p>Proses hanya butuh 3–5 detik per berita.</p>
            </div>
            <div class="feature-card">
              <i class="fas fa-database icon"></i>
              <h3>Database Luas</h3>
              <p>24.000+ sumber terpercaya sebagai referensi validasi.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- How It Works -->
      <section class="section white">
        <div class="container">
          <h2 class="section-title">Cara Kerja</h2>
          <p class="section-subtitle">3 langkah mudah untuk verifikasi berita</p>
          <div class="steps">
            <div class="step">
              <div class="step-number">1</div>
              <h3>Masukkan Berita</h3>
              <p>Salin teks atau URL berita hoax yang ingin diperiksa.</p>
            </div>
            <div class="step">
              <div class="step-number">2</div>
              <h3>Analisis AI</h3>
              <p>Model AI kami akan menganalisis konten secara mendalam.</p>
            </div>
            <div class="step">
              <div class="step-number">3</div>
              <h3>Dapatkan Hasil</h3>
              <p>Laporan akurat dalam hitungan detik dengan sumber referensi.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Call to Action -->
      <section class="section cta">
        <div class="container text-center">
          <h2 class="section-title text-white">Siap Perangi Hoax?</h2>
          <p class="section-subtitle text-white">Gabung bersama kami dan dapatkan akses unlimited untuk deteksi berita.</p>
          <a href="#/register" class="btn-primary-white">
            Daftar Sekarang - Gratis
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
