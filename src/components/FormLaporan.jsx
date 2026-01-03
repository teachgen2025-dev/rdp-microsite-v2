import { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";

const WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbzTKr0URWTrcPz1CmKX-T3nM4PDgqeaz0BqLrXux-nTlSaNdv9ocrZl9ab4wpZm8TA/exec";

const ACTIVITY_OPTIONS = [
  "Psikososial",
  "Distribusi Logistik",
  "Pembersihan Puing",
  "Layanan Kesehatan",
  "Sekolah Darurat",
  "Layanan Vokasi",
  "Assessment",
  "Koordinasi",
  "Dapur Umum",
];

export default function FormLaporan() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]); // Base64 strings
  const [aktivitasLainnya, setAktivitasLainnya] = useState(false);

  // State Calculation PM
  const [pm, setPm] = useState({ siswa: 0, guru: 0, orangTua: 0, lainnya: 0 });
  const totalPm =
    parseInt(pm.siswa || 0) +
    parseInt(pm.guru || 0) +
    parseInt(pm.orangTua || 0) +
    parseInt(pm.lainnya || 0);

  // Handle File Upload (Max 5, Image & Video)
  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      alert("Maksimal upload 5 file sekaligus.");
      return;
    }

    const promises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    });

    try {
      const base64Files = await Promise.all(promises);
      setPhotos(base64Files);
    } catch (error) {
      console.error("Error converting files", error);
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    const f = e.target;

    // 1. VALIDASI UKURAN FILE (PENTING UNTUK VIDEO)
    // Google Apps Script punya limit body request sekitar 50MB.
    // Kita batasi total upload max 25MB agar aman.
    const totalSize = photos.reduce(
      (acc, curr) => acc + curr.length * (3 / 4),
      0
    );
    if (totalSize > 25 * 1024 * 1024) {
      alert("Ukuran file terlalu besar! Total foto/video maksimal 25MB.");
      setLoading(false);
      return;
    }

    // Ambil Checkbox Aktivitas
    const checkboxes = Array.from(
      f.querySelectorAll('input[name="aktivitas"]:checked')
    ).map((cb) => cb.value);
    let aktivitasString = checkboxes.join(", ");
    if (aktivitasLainnya && f.aktivitas_lainnya_text.value) {
      aktivitasString += `, ${f.aktivitas_lainnya_text.value}`;
    }

    // Persiapan Payload
    const payload = {
      tanggal: f.tanggal.value,
      waktu: f.waktu.value,
      relawan: f.relawan.value,
      wilayah: f.wilayah.value,
      lokasi: f.lokasi.value,

      // Data Umum
      stakeholder_nama: f.stakeholder_nama.value,
      stakeholder_wa: f.stakeholder_wa.value,

      // Aktivitas
      aktivitas: aktivitasString,

      // Data Kuantitatif
      pm_siswa: pm.siswa,
      pm_guru: pm.guru,
      pm_ortu: pm.orangTua,
      pm_lainnya: pm.lainnya,
      pm_total: totalPm,
      jumlah_relawan: f.jumlah_relawan.value,
      school_kit: f.school_kit.value || 0,

      // Vokasi & Sekolah
      sekolah_paud: f.sekolah_paud.value || 0,
      sekolah_sd: f.sekolah_sd.value || 0,
      sekolah_madrasah: f.sekolah_madrasah.value || 0,
      sekolah_kondisi: f.sekolah_kondisi.value,
      vokasi_motor: f.vokasi_motor.value || 0,
      vokasi_rambut: f.vokasi_rambut.value || 0,
      vokasi_kru: f.vokasi_kru.value,

      // Narasi
      kronologi: f.kronologi.value,
      hal_baik: f.hal_baik.value,
      hal_perbaiki: f.hal_perbaiki.value,
      rencana_besok: f.rencana_besok.value,

      photos, // Array Base64
    };

    // DEBUGGING: Cek payload di console sebelum dikirim
    console.log("Mengirim Data:", payload);

    try {
      // GANTI URL INI DENGAN URL DEPLOYMENT TERBARU KAMU
      // Pastikan diakhiri /exec
      const API_URL =
        "https://script.google.com/macros/s/AKfycbzTKr0URWTrcPz1CmKX-T3nM4PDgqeaz0BqLrXux-nTlSaNdv9ocrZl9ab4wpZm8TA/exec";

      const response = await fetch(API_URL, {
        method: "POST",
        // HAPUS mode: 'no-cors' agar kita bisa terima balasan JSON
        // Google Apps Script mengharuskan redirect: 'follow'
        redirect: "follow",
        headers: {
          "Content-Type": "text/plain;charset=utf-8", // Gunakan text/plain untuk menghindari Preflight CORS options yang ribet
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log("Respon Server:", result);

      if (result.status === "success") {
        alert(
          "✅ Laporan Berhasil Terkirim! Data masuk ke baris " + result.row
        );
        window.location.href = "/dashboard";
      } else {
        throw new Error(result.message || "Gagal menyimpan data");
      }
    } catch (error) {
      console.error("Error Upload:", error);
      alert("❌ Terjadi Kesalahan: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden my-10 border border-gray-100">
      <div className="bg-purple-700 p-6 text-white text-center">
        <h2 className="text-2xl font-bold">Form Laporan Harian</h2>
        <p className="opacity-80">RDP Sumatera Region</p>
      </div>

      <form onSubmit={submitForm} className="p-8 space-y-10">
        {/* --- SECTION A: DATA UMUM & STAKEHOLDER (Digabung) --- */}
        <Section title="Data Umum & Stakeholder" code="A">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputGroup label="Tanggal Laporan">
              <input
                type="date"
                name="tanggal"
                required
                className="form-input"
              />
            </InputGroup>
            <InputGroup label="Waktu (Jam)">
              <input type="time" name="waktu" className="form-input" />
            </InputGroup>
            <InputGroup label="Nama Relawan PIC">
              <input
                type="text"
                name="relawan"
                required
                placeholder="Nama lengkap..."
                className="form-input"
              />
            </InputGroup>
            <InputGroup label="Wilayah / Posko">
              <select name="wilayah" className="form-select">
                <option>Banda Aceh</option>
                <option>Bireuen</option>
                <option>Langsa</option>
                <option>Medan</option>
                <option>Langkat</option>
                <option>Tapanuli Tengah</option>
                <option>Padang</option>
                <option>Malalo</option>
                <option>Solok</option>
                <option>Agam</option>
                <option>Tanah Datar</option>
              </select>
            </InputGroup>
          </div>
          <InputGroup label="Lokasi Detail (Desa/Dusun)">
            <textarea
              name="lokasi"
              rows="2"
              className="form-textarea"
              placeholder="Alamat lengkap lokasi kegiatan..."
            ></textarea>
          </InputGroup>

          {/* Stakeholder Pindah Sini */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-4">
            <h4 className="font-bold text-gray-800 mb-3 text-sm uppercase">
              🤝 Kontak Tokoh Lokal / Stakeholder
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputGroup label="Nama Tokoh">
                <input
                  type="text"
                  name="stakeholder_nama"
                  placeholder="Bpk/Ibu..."
                  className="form-input"
                />
              </InputGroup>
              <InputGroup label="Nomor WhatsApp">
                <input
                  type="text"
                  name="stakeholder_wa"
                  placeholder="08xxxxx"
                  className="form-input"
                />
              </InputGroup>
            </div>
          </div>

          {/* Checkbox Aktivitas */}
          <div className="mt-6">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Jenis Aktivitas Utama (Boleh lebih dari satu)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {ACTIVITY_OPTIONS.map((opt) => (
                <label
                  key={opt}
                  className="flex items-center space-x-2 text-sm bg-gray-50 p-2 rounded border hover:bg-purple-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    name="aktivitas"
                    value={opt}
                    className="rounded text-purple-600 focus:ring-purple-500"
                  />
                  <span>{opt}</span>
                </label>
              ))}
              <label className="flex items-center space-x-2 text-sm bg-gray-50 p-2 rounded border hover:bg-purple-50 cursor-pointer">
                <input
                  type="checkbox"
                  onChange={(e) => setAktivitasLainnya(e.target.checked)}
                  className="rounded text-purple-600"
                />
                <span>Lainnya...</span>
              </label>
            </div>
            {aktivitasLainnya && (
              <input
                type="text"
                name="aktivitas_lainnya_text"
                placeholder="Sebutkan aktivitas lainnya..."
                className="form-input mt-2"
              />
            )}
          </div>
        </Section>

        {/* --- SECTION B: DATA KUANTITATIF (Penerima Manfaat + Vokasi + Sekolah) --- */}
        <Section title="Data Kuantitatif & Layanan" code="B">
          {/* 1. Penerima Manfaat */}
          <div className="mb-6">
            <h4 className="font-bold text-gray-700 mb-3 text-sm">
              👥 Penerima Manfaat (Orang)
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 bg-blue-50 p-4 rounded-lg border border-blue-100">
              <PMInput
                label="Siswa"
                val={pm.siswa}
                onChange={(v) => setPm({ ...pm, siswa: v })}
              />
              <PMInput
                label="Guru"
                val={pm.guru}
                onChange={(v) => setPm({ ...pm, guru: v })}
              />
              <PMInput
                label="Orang Tua"
                val={pm.orangTua}
                onChange={(v) => setPm({ ...pm, orangTua: v })}
              />
              <PMInput
                label="Lainnya"
                val={pm.lainnya}
                onChange={(v) => setPm({ ...pm, lainnya: v })}
              />
              <div className="flex flex-col text-center">
                <label className="text-xs font-bold text-blue-800 mb-1">
                  TOTAL
                </label>
                <div className="text-xl font-bold text-blue-700 py-1">
                  {totalPm}
                </div>
              </div>
            </div>
          </div>

          {/* 2. Logistik & Relawan */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <InputGroup label="Jumlah Relawan Turun">
              <input
                type="number"
                name="jumlah_relawan"
                className="form-input"
              />
            </InputGroup>
            <InputGroup label="Paket School Kit Dibagikan">
              <input type="number" name="school_kit" className="form-input" />
            </InputGroup>
          </div>

          {/* 3. Layanan Vokasi (Pindah Sini) */}
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200 mb-6">
            <h4 className="font-bold text-orange-800 mb-3 flex items-center text-sm uppercase">
              🛠 Layanan Vokasi (RDP Service)
            </h4>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <InputGroup label="Servis Motor (Unit)">
                <input
                  type="number"
                  name="vokasi_motor"
                  placeholder="0"
                  className="form-input"
                />
              </InputGroup>
              <InputGroup label="Potong Rambut (Org)">
                <input
                  type="number"
                  name="vokasi_rambut"
                  placeholder="0"
                  className="form-input"
                />
              </InputGroup>
            </div>
            <InputGroup label="Nama Kru Bertugas">
              <input
                type="text"
                name="vokasi_kru"
                placeholder="Nama kru..."
                className="form-input"
              />
            </InputGroup>
          </div>

          {/* 4. Intervensi Sekolah (Pindah Sini) */}
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-bold text-green-800 mb-3 flex items-center text-sm uppercase">
              🏫 Intervensi Sekolah (Unit)
            </h4>
            <div className="grid grid-cols-3 gap-2 mb-4">
              <PMInput
                label="PAUD"
                val={null}
                onChange={() => {}}
                name="sekolah_paud"
              />
              <PMInput
                label="SD / MIN"
                val={null}
                onChange={() => {}}
                name="sekolah_sd"
              />
              <PMInput
                label="Madrasah/SMP"
                val={null}
                onChange={() => {}}
                name="sekolah_madrasah"
              />
            </div>
            <InputGroup label="Kondisi Sekolah (Deskripsi Singkat)">
              <input
                type="text"
                name="sekolah_kondisi"
                placeholder="Rusak Berat/Sedang..."
                className="form-input"
              />
            </InputGroup>
          </div>
        </Section>

        {/* --- SECTION C: NARASI --- */}
        <Section title="Laporan Narasi" code="C">
          <InputGroup label="Kronologi Kegiatan (5W + 1H)">
            <textarea
              name="kronologi"
              rows="4"
              className="form-textarea"
              placeholder="Ceritakan alur kegiatan dari awal sampai akhir..."
            ></textarea>
          </InputGroup>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputGroup label="Hal-hal Baik (Success Story)">
              <textarea
                name="hal_baik"
                rows="3"
                className="form-textarea border-green-200 focus:ring-green-500"
              ></textarea>
            </InputGroup>
            <InputGroup label="Kendala / Hal yg perlu diperbaiki">
              <textarea
                name="hal_perbaiki"
                rows="3"
                className="form-textarea border-red-200 focus:ring-red-500"
              ></textarea>
            </InputGroup>
          </div>
          <InputGroup label="Rencana Kegiatan Besok">
            <textarea
              name="rencana_besok"
              rows="2"
              className="form-textarea"
            ></textarea>
          </InputGroup>
        </Section>

        {/* --- SECTION D: DOKUMENTASI (Upgrade 5 File) --- */}
        <Section title="Dokumentasi" code="D">
          <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-100 transition">
            <input
              type="file"
              multiple
              accept="image/*,video/*" // TERIMA FOTO & VIDEO
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              <svg
                className="w-12 h-12 text-gray-400 mb-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
              <span className="text-purple-600 font-bold text-lg">
                Klik untuk Upload Foto/Video
              </span>
              <p className="text-gray-500 text-sm mt-1">
                Maksimal 5 file sekaligus (Foto/Video pendek)
              </p>
            </label>
          </div>
          {/* Preview Count */}
          {photos.length > 0 && (
            <div className="mt-4 p-3 bg-green-50 text-green-700 rounded border border-green-200 text-sm font-bold text-center">
              {photos.length} file siap diupload.
            </div>
          )}
        </Section>

        <button
          disabled={loading}
          className="w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-4 rounded-lg shadow-lg transition transform hover:scale-[1.01] flex justify-center items-center gap-2"
        >
          {loading ? <LoadingSpinner /> : "KIRIM LAPORAN SEKARANG 🚀"}
        </button>
      </form>
    </div>
  );
}

// Components Helper Kecil
function Section({ title, code, children }) {
  return (
    <div className="relative border border-gray-200 rounded-xl p-6 bg-white shadow-sm">
      <div className="absolute -top-4 -left-1 bg-purple-100 text-purple-800 font-bold px-3 py-1 rounded shadow-sm border border-purple-200 text-sm">
        BAGIAN {code}
      </div>
      <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-2">
        {title}
      </h3>
      {children}
    </div>
  );
}

function InputGroup({ label, children }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-semibold text-gray-600 mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}

function PMInput({ label, val, onChange, name }) {
  return (
    <div className="flex flex-col text-center">
      <label className="text-xs font-medium text-gray-500 mb-1">{label}</label>
      <input
        type="number"
        min="0"
        name={name}
        defaultValue={val}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        className="text-center w-full border border-gray-300 rounded py-2 px-1 focus:ring-purple-500 focus:border-purple-500"
      />
    </div>
  );
}
