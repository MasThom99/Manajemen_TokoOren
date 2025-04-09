import { header, footer } from "./template.js";
const resetAccount = (link) => {
  const content = `
    <p>
    // You received this email because you have made a Password reset request at Toko Oren.
    Kamu menerima email ini karena kamu telah melakukkan permintaan untuk mereset password di Toko Oren.
    <br>
    // Change Your Password immediately by clicking the button below.
    Ganti Password kamu segere dengan tekan tombol di bawah ini.
    </p>

    <p>
    // If you don't think you have made a Password reset request Toko Oren, please ignore this email.
    Jika kamu tidak merasa telah melakukan permintaan untuk mereset password di Toko Oren , abaikan email ini.
    <br>
    Alternative link: <a href="${link}"${link}</a>
    <p>

    <hr>

    <p>Copyright & Copy; ${new Date().getFullYear()} Toko Oren
    `;
  return header + content + footer;
};

export default resetAccount;
