export default class GuestPage {
  async render() {
    return `
      <section class="hero">
        <div class="hero__inner">
          <h1 class="hero__title">Deteksi Berita Hoaks</h1>
          <p class="hero__tagline">Kebenaran di ujung jarimu!</p>
          <div class="hero__cta">
            <a href="#/add-guest-story" class="hero-button">
              <i class="fas fa-pen-nib"></i> Periksa Sekarang
            </a>
          </div>
        </div>
      </section>
      
      <div class="container">
        <section class="content-section stories-section">
          <h2 class="section-title">Deteksi Terakhir</h2>
          <div class="guest-message">
            <div class="guest-card">
              <i class="fas fa-user-lock"></i>
              <h3>Akses dibatasi</h3>
              <p>Silahkan Register dan Login untuk melihat riwayat deteksi oleh komunitas kami.</p>
              <div class="guest-buttons">
                <a href="#/login" class="guest-button primary">Login</a>
                <a href="#/register" class="guest-button secondary">Sign Up</a>
              </div>
            </div>
          </div>
        </section>
      </div>
    `;
  }

  async afterRender() {
    // You can add interactions or logic here after render
  }
}
