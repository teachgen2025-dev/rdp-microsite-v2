import { useState, useEffect } from "react";

const WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbzTKr0URWTrcPz1CmKX-T3nM4PDgqeaz0BqLrXux-nTlSaNdv9ocrZl9ab4wpZm8TA/exec";

export default function FormLaporan() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);

  // State untuk Data Kuantitatif (Auto Sum)
  const [pm, setPm] = useState({ siswa: 0, guru: 0, orangTua: 0, lainnya: 0 });
  const totalPm =
    Number(pm.siswa) +
    Number(pm.guru) +
    Number(pm.orangTua) +
    Number(pm.lainnya);

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handlePhotoChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 3) {
      alert("Maksimal upload 3 foto");
      e.target.value = "";
      return;
    }
    const base64 = await Promise.all(files.map(toBase64));
    setPhotos(base64);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    const f = e.target;

    const payload = {
      tanggal: f.tanggal.value,
      waktu: f.waktu.value, // New Field
      relawan: f.relawan.value,
      wilayah: f.wilayah.value,
      lokasi: f.lokasi.value, // Lebih detail
      school_kit: f.school_kit.value || 0,

      // Checkbox Logic (Menggabungkan yg dipilih jadi string comma separated)
      aktivitas: Array.from(
        f.querySelectorAll('input[name="aktivitas"]:checked')
      )
        .map((cb) => cb.value)
        .join(", "),

      // Data Kuantitatif breakdown
      pm_siswa: pm.siswa,
      pm_guru: pm.guru,
      pm_ortu: pm.orangTua,
      pm_lainnya: pm.lainnya,
      pm_total: totalPm,
      jumlah_relawan: f.jumlah_relawan.value,

      // Narasi Baru
      kronologi: f.kronologi.value,
      hal_baik: f.hal_baik.value, // Rename dari kendala
      hal_perbaiki: f.hal_perbaiki.value, // Rename dari kebutuhan
      rencana_besok: f.rencana_besok.value,

      photos,
    };

    try {
      await fetch(WEB_APP_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });
      alert("✅ Laporan SitRep berhasil dikirim!");
      f.reset();
      setPhotos([]);
      setPm({ siswa: 0, guru: 0, orangTua: 0, lainnya: 0 });
    } catch (err) {
      alert("❌ Gagal mengirim laporan");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 my-8">
      {/* Header Form */}
      <div className="bg-white p-8 border-b border-purple-100 text-center">
        <h1 className="text-2xl font-bold text-purple-700 uppercase tracking-wide">
          Form Laporan Harian
        </h1>
        <p className="text-gray-500 mt-2 text-sm">
          SitRep Respon Darurat Pendidikan (RDP) Sumatera
        </p>
      </div>

      <form onSubmit={submitForm} className="p-8 space-y-10">
        {/* SECTION A: DATA UMUM */}
        <Section title="Data Umum" code="A">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputGroup label="Tanggal Laporan">
              <input
                type="date"
                name="tanggal"
                required
                className="form-input"
              />
            </InputGroup>
            <InputGroup label="Waktu (Jam:Menit)">
              <input type="time" name="waktu" required className="form-input" />
            </InputGroup>
          </div>

          <InputGroup label="Nama Pelapor (PIC)">
            <input
              type="text"
              name="relawan"
              placeholder="Nama Lengkap"
              required
              className="form-input"
            />
          </InputGroup>

          <InputGroup label="Wilayah / Titik Respon">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                "Aceh",
                "Tamiang",
                "Langsat",
                "Tapanuli Tengah",
                "Padang",
                "Malalo",
                "Solok",
                "Agam",
                "Tanah Datar",
              ].map((wil) => (
                <label
                  key={wil}
                  className="flex items-center space-x-2 border p-3 rounded-lg cursor-pointer hover:bg-gray-50 has-[:checked]:border-purple-500 has-[:checked]:bg-purple-50 transition-all"
                >
                  <input
                    type="radio"
                    name="wilayah"
                    value={wil}
                    required
                    className="text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-gray-700 text-sm font-medium">
                    {wil}
                  </span>
                </label>
              ))}
            </div>
          </InputGroup>

          <InputGroup label="Lokasi Detail (Kab/Kec/Desa)">
            <input
              type="text"
              name="lokasi"
              placeholder="Cth: Kec. Karang Baru, Aceh Tamiang"
              required
              className="form-input"
            />
          </InputGroup>

          <InputGroup label="Jenis Aktivitas Utama (Bisa pilih lebih dari satu)">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-gray-50 p-4 rounded-lg border">
              {[
                "Sekolah Ceria (PSS)",
                "Distribusi Logistik",
                "Bantuan Tunai",
                "Assessment",
                "Training of Trainer",
                "Lainnya",
              ].map((act) => (
                <label key={act} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="aktivitas"
                    value={act}
                    className="rounded text-purple-600 focus:ring-purple-500 h-4 w-4"
                  />
                  <span className="text-gray-700 text-sm">{act}</span>
                </label>
              ))}
            </div>
          </InputGroup>
        </Section>

        {/* SECTION B: DATA KUANTITATIF */}
        <Section title="Data Kuantitatif" code="B">
          <div className="bg-purple-50 p-5 rounded-lg border border-purple-100 mb-4">
            <h4 className="text-center font-bold text-gray-700 text-sm mb-4 uppercase tracking-wider">
              Rincian Penerima Manfaat (PM)
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
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

              {/* Total Readonly */}
              <div className="flex flex-col">
                <label className="text-xs font-bold text-green-700 mb-1 text-center uppercase">
                  TOTAL PM
                </label>
                <div className="bg-green-100 text-green-800 font-bold text-center py-2 rounded border border-green-300">
                  {totalPm}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputGroup label="Jumlah Relawan Terlibat">
              <div className="flex items-center">
                <input
                  type="number"
                  name="jumlah_relawan"
                  min="0"
                  placeholder="0"
                  className="form-input rounded-r-none"
                />
                <span className="bg-gray-100 border border-l-0 border-gray-300 px-3 py-2 rounded-r-lg text-gray-500 text-sm">
                  Orang
                </span>
              </div>
            </InputGroup>
            <InputGroup label="Distribusi School Kit">
              <div className="flex items-center">
                <input
                  type="number"
                  name="school_kit"
                  min="0"
                  placeholder="0"
                  className="form-input rounded-r-none"
                />
                <span className="bg-purple-100 border border-l-0 border-purple-300 px-3 py-3 rounded-r-lg text-purple-700 text-sm font-bold">
                  Paket
                </span>
              </div>
            </InputGroup>
          </div>
        </Section>

        {/* SECTION C: NARASI LAPORAN */}
        <Section title="Narasi Laporan" code="C">
          <InputGroup label="1. Kronologi Kegiatan">
            <textarea
              name="kronologi"
              rows="4"
              placeholder="Ceritakan alur kegiatan hari ini..."
              className="form-textarea"
            ></textarea>
          </InputGroup>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputGroup label="2. Hal Yang Sudah Baik">
              <textarea
                name="hal_baik"
                rows="3"
                placeholder="Apa yang berjalan lancar?"
                className="form-textarea"
              ></textarea>
            </InputGroup>
            <InputGroup label="3. Hal Yang Perlu Diperbaiki">
              <textarea
                name="hal_perbaiki"
                rows="3"
                placeholder="Apa kendala atau kebutuhan mendesak?"
                className="form-textarea"
              ></textarea>
            </InputGroup>
          </div>

          <InputGroup label="4. Rencana Aksi Besok">
            <textarea
              name="rencana_besok"
              rows="3"
              placeholder="Rencana kegiatan selanjutnya..."
              className="form-textarea"
            ></textarea>
          </InputGroup>
        </Section>

        {/* SECTION D: DOKUMENTASI */}
        <Section title="Dokumentasi" code="D">
          <div className="bg-blue-50 border border-blue-200 border-dashed rounded-lg p-6 text-center">
            <p className="text-blue-800 font-medium mb-1">
              Upload Foto Dokumentasi (Max 3 Foto)
            </p>
            <p className="text-xs text-blue-500 mb-4">
              Pilih 1-3 foto terbaik. Foto akan dikompres otomatis.
            </p>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handlePhotoChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer mx-auto max-w-xs"
            />
          </div>
        </Section>

        {/* SUBMIT BUTTON */}
        <div className="pt-4">
          <button
            disabled={loading}
            className="w-full bg-purple-700 text-white font-bold py-4 rounded-lg shadow-lg hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg tracking-wide uppercase"
          >
            {loading ? "Mengirim Laporan..." : "Kirim Laporan Harian"}
          </button>
        </div>
      </form>
    </div>
  );
}

/* --- UI COMPONENTS --- */

function Section({ title, code, children }) {
  return (
    <div className="relative border-l-4 border-purple-200 pl-6 py-2">
      <div className="absolute -left-[1.3rem] -top-0 bg-purple-100 text-purple-700 font-bold w-10 h-10 flex items-center justify-center rounded-full border-4 border-white shadow-sm">
        {code}
      </div>
      <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
        {title}
      </h3>
      <div className="space-y-5">{children}</div>
    </div>
  );
}

function InputGroup({ label, children }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
      {children}
    </div>
  );
}

function PMInput({ label, val, onChange }) {
  return (
    <div className="flex flex-col text-center">
      <label className="text-xs font-medium text-gray-500 mb-1">{label}</label>
      <input
        type="number"
        min="0"
        value={val}
        onChange={(e) => onChange(e.target.value)}
        className="text-center w-full border border-gray-300 rounded py-2 px-1 focus:ring-purple-500 focus:border-purple-500"
      />
    </div>
  );
}
