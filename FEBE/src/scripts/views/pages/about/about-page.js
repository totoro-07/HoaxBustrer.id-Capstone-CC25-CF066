export default class AboutPage {
  async render() {
    return `
    <section class="about">
    <div class="about__container">
        <h1 class="about__title">Tentang Aplikasi</h1>
        <p class="about__description">
        <strong>HoaxBuster.id</strong> merupakan aplikasi cerdas berbasis web yang dikembangkan untuk membantu masyarakat mengenali berita palsu (hoax) dengan cepat, mudah, dan akurat. Menggunakan teknologi <em>Natural Language Processing</em> (NLP) dan <em>Machine Learning</em> terkini, sistem ini menganalisis konten teks secara otomatis dan memberikan prediksi tingkat kepercayaan apakah suatu informasi tergolong hoaks atau bukan.
        </p>

        <div class="about__section">
        <h2 class="about__subtitle">Apa Itu Hoaks?</h2>
        <p class="about__text">
            Hoaks adalah informasi palsu atau menyesatkan yang sengaja disebarluaskan untuk tujuan tertentu, seperti manipulasi opini publik, provokasi, atau penipuan. Dampak dari hoaks dapat mencakup keresahan sosial, kerugian ekonomi, hingga menurunnya kepercayaan terhadap institusi resmi.
        </p>
        </div>

        <div class="about__section">
        <h2 class="about__subtitle">Cara Kerja Aplikasi</h2>
        <ol class="about__text">
            <li>Pengguna memasukkan teks berita melalui form input.</li>
            <li>Teks dikirim ke server dan diproses oleh model NLP dan Machine Learning.</li>
            <li>Model menganalisis dan memprediksi probabilitas berita tersebut tergolong hoaks.</li>
            <li>Hasil analisis ditampilkan dalam bentuk visualisasi prediksi yang mudah dipahami.</li>
        </ol>
        </div>

        <div class="about__section">
        <h2 class="about__subtitle">Tim Pengembang</h2>
        <div class="about__team-grid">
            <div class="team-member">
            <img src="/images/developer/revo.JPG" alt="Revo Pratama" class="team-member__avatar" />
            <div>
                <a href="https://www.linkedin.com/in/revo-pratama-133962339/" target="_blank" class="team-member__name">Revo Pratama</a>
                <p class="team-member__role">ML Engineer</p>
                <p class="team-member__univ">Universitas Bengkulu</p>
            </div>
            </div>
            <div class="team-member">
            <img src="/images/developer/Ahmad.JPG" alt="Ahmad Radesta" class="team-member__avatar" />
            <div>
                <a href="https://www.linkedin.com/in/ahmad-radesta-227a08139/" target="_blank" class="team-member__name">Ahmad Radesta</a>
                <p class="team-member__role">ML Engineer</p>
                <p class="team-member__univ">Universitas Bengkulu</p>
            </div>
            </div>
            <div class="team-member">
            <img src="/images/developer/Ferdy.JPG" alt="Ferdy F. Rowi" class="team-member__avatar" />
            <div>
                <a href="https://www.linkedin.com/in/ferdy-fitriasnyah-rowi-827077341/" target="_blank" class="team-member__name">Ferdy F. Rowi</a>
                <p class="team-member__role">ML Engineer</p>
                <p class="team-member__univ">Universitas Bengkulu</p>
            </div>
            </div>
            <div class="team-member">
            <img src="/images/developer/hisbulah.JPG" alt="M Hisbulah Endima T" class="team-member__avatar" />
            <div>
                <a href="https://www.linkedin.com/in/muhammad-hisbulah-endima-tandjung-223809247/" target="_blank" class="team-member__name">M Hisbulah Endima T</a>
                <p class="team-member__role">Fullstack Developer</p>
                <p class="team-member__univ">Universitas Bengkulu</p>
            </div>
            </div>
            <div class="team-member">
            <img src="img/pandunata.jpg" alt="Pandunata S. Gansa" class="team-member__avatar">
            <div>
                <a href="https://www.linkedin.com/in/pandunata-syakurta-gansa/" target="_blank" class="team-member__name">Pandunata S. Gansa</a>
                <p class="team-member__role">Fullstack Developer</p>
                <p class="team-member__univ">Universitas 17 Agustus 1945 Surabaya</p>
            </div>
            </div>
        </div>

        <div class="about__closing">
            <p>
            Kami percaya bahwa teknologi dapat membantu menciptakan ruang digital yang lebih sehat. Jika kamu menemukan informasi yang mencurigakan, verifikasi bersama kami melalui <strong>HoaxBuster.id</strong> dan jadilah bagian dari solusi.
            </p>
            <a href="#/cek-berita" class="about__button">Coba Verifikasi Sekarang</a>
        </div>
        </div>
    </div>
    </section>

    `;
  }

  async afterRender() {
    // Tambahkan interaksi jika diperlukan
  }
}
