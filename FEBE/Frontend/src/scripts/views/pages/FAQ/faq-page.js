export default class FAQPage {
  async render() {
    return `
    <section class="faq">
      <div class="faq__container">
        <h1 class="faq__title">Pertanyaan yang Sering Diajukan (FAQ)</h1>

        <div class="faq__item">
          <h2 class="faq__question">Apa itu HoaxBuster.id?</h2>
          <p class="faq__answer">
            HoaxBuster.id adalah aplikasi web yang menggunakan teknologi <em>Natural Language Processing</em> dan <em>Machine Learning</em> untuk membantu masyarakat memverifikasi keaslian berita secara otomatis.
          </p>
        </div>

        <div class="faq__item">
          <h2 class="faq__question">Apakah layanan ini gratis?</h2>
          <p class="faq__answer">
            Ya, semua fitur yang tersedia di HoaxBuster.id dapat digunakan secara gratis oleh siapa saja.
          </p>
        </div>

        <div class="faq__item">
          <h2 class="faq__question">Apakah data berita saya disimpan?</h2>
          <p class="faq__answer">
            Tidak. Sistem hanya memproses teks yang Anda kirim secara temporer untuk keperluan analisis. Data tidak disimpan di server kami untuk menjaga privasi pengguna.
          </p>
        </div>

        <div class="faq__item">
          <h2 class="faq__question">Apakah hasil analisis selalu akurat?</h2>
          <p class="faq__answer">
            Meskipun sistem menggunakan model Machine Learning yang telah dilatih dengan berbagai data, hasil analisis tetap berupa prediksi. Kami menyarankan untuk tetap memverifikasi melalui sumber resmi.
          </p>
        </div>

        <div class="faq__item">
          <h2 class="faq__question">Bagaimana jika saya menemukan bug atau kesalahan?</h2>
          <p class="faq__answer">
            Silakan hubungi tim pengembang melalui LinkedIn yang tersedia di halaman <a href="#/tentang-kami">Tentang Kami</a> atau kirim laporan melalui fitur kontak (jika tersedia).
          </p>
        </div>
      </div>
    </section>
    `;
  }

  async afterRender() {
    const items = document.querySelectorAll('.faq__item');

    items.forEach((item) => {
      const btn = item.querySelector('.faq__question');
      btn.addEventListener('click', () => {
        item.classList.toggle('open');
        items.forEach((el) => {
          if (el !== item) el.classList.remove('open');
        });
      });
    });
  }
}