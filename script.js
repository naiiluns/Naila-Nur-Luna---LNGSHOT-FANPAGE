// ===== Widget sidebar (dipakai di semua halaman) =====

// 0. Dropdown menu About: klik/ketuk untuk buka-tutup (untuk HP/tablet)
document.querySelectorAll(".has-sub > a").forEach((link) => {
  link.addEventListener("click", (e) => {
    const sub = link.parentElement;
    const layarSentuh = window.matchMedia("(hover: none)").matches || window.innerWidth <= 860;
    if (!layarSentuh) return; // di laptop tetap pakai hover & link biasa
    if (!sub.classList.contains("buka")) {
      e.preventDefault(); // ketukan pertama: buka dropdown, jangan pindah halaman
      sub.classList.add("buka");
    }
  });
});
// Ketuk di luar menu -> dropdown menutup
document.addEventListener("click", (e) => {
  document.querySelectorAll(".has-sub.buka").forEach((sub) => {
    if (!sub.contains(e.target)) sub.classList.remove("buka");
  });
});

// 1. Jam digital: update tiap 1 detik
function updateJam() {
  const elJam = document.getElementById("jam");
  const elTanggal = document.getElementById("tanggal");
  const sekarang = new Date();
  if (elJam) elJam.textContent = sekarang.toLocaleTimeString("id-ID");
  if (elTanggal) {
    elTanggal.textContent = sekarang.toLocaleDateString("id-ID", {
      weekday: "long", day: "numeric", month: "long", year: "numeric"
    });
  }
}

// Hanya jalan kalau halaman punya kotak jam
if (document.getElementById("jam")) {
  updateJam();
  setInterval(updateJam, 1000);
}

// 2. Counter pengunjung (disimpan di browser dengan localStorage)
const elCounter = document.getElementById("counter");
if (elCounter) {
  try {
    const jumlah = Number(localStorage.getItem("kunjunganShotties") || 0) + 1;
    localStorage.setItem("kunjunganShotties", jumlah);
    elCounter.textContent = jumlah;
  } catch (err) {
    elCounter.textContent = "1";
  }
}

// 3. Form kontak (hanya jalan di halaman Contact)
const formKontak = document.getElementById("formKontak");
if (formKontak) {
  formKontak.addEventListener("submit", (e) => {
    e.preventDefault(); // cegah reload, website statis tidak punya server
    const nama = document.getElementById("kNama").value.trim();
    const sukses = document.getElementById("kSukses");
    sukses.hidden = false;
    sukses.textContent = "Terima kasih, " + nama + "! Pesanmu sudah kami terima.";
    formKontak.reset();
  });
}


// ===== 4. FORM REGISTRASI SHOTTIES =====

const formShotties = document.getElementById("formShotties");

if (formShotties) {
  formShotties.addEventListener("submit", (e) => {
    e.preventDefault();

    // Ambil data dari form
    const nama = document.getElementById("nama").value.trim();
    const line = document.getElementById("line").value.trim();
    const kota = document.getElementById("kota").value.trim();
    const sumber = document.getElementById("sumber").value;
    const alasan = document.getElementById("alasan").value.trim();

    // Ambil pilihan bias
    const bias = document.querySelector('input[name="bias"]:checked');

    // Validasi nama
    if (nama.length < 3) {
      alert("Nama lengkap minimal 3 karakter.");
      return;
    }

    // Validasi username LINE
    if (line === "") {
      alert("Username LINE wajib diisi.");
      return;
    }

    // Validasi kota
    if (kota === "") {
      alert("Asal kota wajib diisi.");
      return;
    }

    // Validasi bias
    if (!bias) {
      alert("Silakan pilih bias kamu terlebih dahulu.");
      return;
    }

    // Validasi sumber informasi
    if (sumber === "") {
      alert("Silakan pilih dari mana kamu mengenal LNGSHOT.");
      return;
    }

    // Validasi alasan
    if (alasan === "") {
      alert("Ceritakan alasan kamu menyukai LNGSHOT.");
      return;
    }

    // Tampilkan hasil pendaftaran
    document.getElementById("hasilNama").textContent = nama;
    document.getElementById("hasilLine").textContent = line;
    document.getElementById("hasilKota").textContent = kota;
    document.getElementById("hasilBias").textContent = bias.value;
    document.getElementById("hasilSumber").textContent = sumber;
    document.getElementById("hasilAlasan").textContent = alasan;

    // Tampilkan kotak hasil
    const hasil = document.getElementById("hasilPendaftaran");
    hasil.hidden = false;

    // Arahkan halaman ke hasil pendaftaran
    hasil.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
}