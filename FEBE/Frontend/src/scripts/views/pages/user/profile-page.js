import ProfilePresenter from '../../../presenters/home/profile.presenter';

export default class ProfilePage {
  constructor() {
    this.presenter = new ProfilePresenter(this);
  }

  async render() {
    return `
      <section class="profile-page">
        <h1 class="profile-title">Profil Pengguna</h1>
        <div id="profile-container" class="profile-container loading">
          <p>Memuat data pengguna...</p>
        </div>
        <button id="logout-btn" class="logout-button">
          <i class="fas fa-sign-out-alt"></i> Logout
        </button>
      </section>
    `;
  }

  async afterRender() {
    const profileContainer = document.getElementById('profile-container');
    const logoutBtn = document.getElementById('logout-btn');

    try {
      const user = await this.presenter.getUserProfile();
      profileContainer.classList.remove('loading');
      profileContainer.innerHTML = `
        <div class="profile-card">
          <p><strong>Nama:</strong> ${user.name}</p>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Bergabung Sejak:</strong> ${new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
      `;
    } catch (error) {
      profileContainer.innerHTML = '<p class="error">Gagal memuat data profil.</p>';
    }

    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('token');
      window.location.hash = '#/login';
    });
  }
}
