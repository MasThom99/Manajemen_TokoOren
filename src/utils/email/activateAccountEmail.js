import { header, footer } from "./template.js";

export const activateAccount = (link) => {
  const content = `
    <p>
    // you received this email because your account has been registered at Toko Oren server
    Kamu menerima email ini karena akun kamu telah terdaftar di Toko Oren 
    <br>
    //immediately activate your account by clicking the button below.
    Segera aktivasi akun kamu dengan klik tombol dibawah ini.
    </p>

    <a href="${link}" style="color: white;"class="auth-button">Aktivasi Akun</a>

    <p>
    // If you dont feel like registering an account at Toko Oren , please ignore this email.
    jika kamu tidak merasa ingin mendaftar akun di Toko Oren , abaikan email ini.
    <br>
    Link alternatif: <a href="${link}">${link}</a>
    </p>

    <hr>

    <pCopyright & copy; ${new Date().getFullYear()} Toko Oren
    `;

  return header + content + footer;
};
