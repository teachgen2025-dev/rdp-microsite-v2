import React from "react";

export default function DetailModal({ data, onClose }) {
  if (!data) return null;

  // --- HELPER BARU: Mencari nilai dari berbagai kemungkinan nama Header ---
  // Ini solusi agar angka muncul meskipun nama kolom di Sheet beda dengan di kodingan
  const getVal = (possibleKeys) => {
    for (let key of possibleKeys) {
      // Cek exact match
      if (data[key] !== undefined && data[key] !== "") return data[key];

      // Cek case insensitive (misal "servis motor" vs "Servis Motor")
      const foundKey = Object.keys(data).find(
        (k) => k.toLowerCase() === key.toLowerCase()
      );
      if (foundKey && data[foundKey] !== undefined && data[foundKey] !== "")
        return data[foundKey];
    }
    return 0;
  };

  // 1. Logic Mencari Link Media (Foto/Video)
  const mediaLinks = Object.keys(data)
    .filter((key) => {
      return (
        /foto|media|dokumentasi/i.test(key) &&
        data[key] &&
        String(data[key]).startsWith("http")
      );
    })
    .map((key) => data[key]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-purple-800 p-4 text-white flex justify-between items-center sticky top-0 z-10">
          <div>
            <h2 className="text-lg font-bold">Detail Laporan Lapangan</h2>
            <p className="text-purple-200 text-xs flex gap-2">
              <span>📍 {data.wilayah}</span>
              <span>•</span>
              <span>👤 {data.relawan}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="bg-white/20 hover:bg-white/30 rounded-full p-2 text-white transition"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-8 custom-scrollbar">
          {/* A. Info Utama */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm bg-purple-50 p-4 rounded-xl border border-purple-100">
            <div>
              <span className="text-gray-500 block text-xs uppercase font-bold mb-1">
                Waktu Laporan
              </span>
              <span className="font-bold text-gray-800">
                {data.tanggal ? data.tanggal.split("T")[0] : "-"} <br />
                <span className="text-xs font-normal">{data.waktu} WIB</span>
              </span>
            </div>
            <div>
              <span className="text-gray-500 block text-xs uppercase font-bold mb-1">
                Aktivitas Utama
              </span>
              <span className="inline-block bg-white border border-purple-200 text-purple-800 px-2 py-1 rounded text-xs font-bold">
                {data.aktivitas}
              </span>
            </div>
            <div className="col-span-2 md:col-span-1">
              <span className="text-gray-500 block text-xs uppercase font-bold mb-1">
                Lokasi Detail
              </span>
              <span className="text-gray-800 leading-tight block text-xs md:text-sm">
                {data.lokasi}
              </span>
            </div>
          </div>

          {/* B. Dokumentasi */}
          {mediaLinks.length > 0 && (
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                📸 Dokumentasi Kegiatan
                <span className="bg-gray-200 text-gray-600 text-[10px] px-2 py-0.5 rounded-full">
                  {mediaLinks.length} File
                </span>
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {mediaLinks.map((url, idx) => (
                  <MediaThumbnail key={idx} url={url} />
                ))}
              </div>
            </div>
          )}

          <hr className="border-gray-100" />

          {/* C. Layanan & Statistik (ANGKA DIPERBAIKI DISINI) */}
          <div>
            <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase">
              📊 Statistik & Layanan
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
              {/* PM TOTAL */}
              <StatBox
                label="Total PM"
                val={getVal(["pm_total", "Total PM", "Penerima Manfaat"])}
                color="blue"
              />

              {/* SEKOLAH (SUM SEMUA JENIS SEKOLAH) */}
              <StatBox
                label="Sekolah"
                val={
                  Number(getVal(["sekolah_paud", "PAUD", "Sekolah PAUD"])) +
                  Number(getVal(["sekolah_sd", "SD", "Sekolah SD"])) +
                  Number(
                    getVal(["sekolah_madrasah", "Madrasah", "Sekolah Madrasah"])
                  )
                }
                color="green"
              />

              {/* VOKASI - SERVIS MOTOR */}
              {/* Kita cek nama variable kode 'vokasi_motor' ATAU header sheet 'Servis Motor' */}
              <StatBox
                label="Servis Motor"
                val={getVal([
                  "vokasi_motor",
                  "Servis Motor",
                  "Servis Motor (Unit)",
                  "Motor",
                ])}
                color="orange"
              />

              {/* VOKASI - POTONG RAMBUT */}
              <StatBox
                label="Ptg. Rambut"
                val={getVal([
                  "vokasi_rambut",
                  "Potong Rambut",
                  "Potong Rambut (Org)",
                  "Cukur",
                ])}
                color="orange"
              />
            </div>
          </div>

          {/* D. Narasi Detail */}
          <div className="space-y-4">
            <NarasiItem
              title="Kronologi Kegiatan"
              content={data.kronologi || data["Kronologi"]}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <NarasiItem
                title="Hal Baik (Success Story)"
                content={data.hal_baik || data["Hal Baik"]}
                color="green"
              />
              <NarasiItem
                title="Kendala & Evaluasi"
                content={
                  data.hal_perbaiki || data["Hal Perbaiki"] || data["Kendala"]
                }
                color="red"
              />
            </div>
            <NarasiItem
              title="Rencana Besok"
              content={data.rencana_besok || data["Rencana Besok"]}
              color="blue"
            />
          </div>

          {/* E. Stakeholder */}
          {(getVal(["stakeholder_nama", "Stakeholder Nama", "Nama Tokoh"]) ||
            getVal(["stakeholder_wa", "Stakeholder WA", "WA"])) && (
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm flex flex-col md:flex-row justify-between items-center gap-2">
              <div>
                <span className="font-bold text-gray-700 block text-xs uppercase">
                  Tokoh / Stakeholder
                </span>
                <span className="text-gray-900 font-medium">
                  {getVal([
                    "stakeholder_nama",
                    "Stakeholder Nama",
                    "Nama Tokoh",
                  ]) || "-"}
                </span>
              </div>
              {getVal(["stakeholder_wa", "Stakeholder WA"]) && (
                <a
                  href={`https://wa.me/${getVal([
                    "stakeholder_wa",
                    "Stakeholder WA",
                  ])}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 hover:bg-green-200 transition"
                >
                  WhatsApp: {getVal(["stakeholder_wa", "Stakeholder WA"])}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ... (Sub Components MediaThumbnail, StatBox, NarasiItem SAMA PERSIS SEPERTI SEBELUMNYA) ...
// Copas saja fungsi-fungsi kecil di bawah ini dari file sebelumnya, tidak ada perubahan di situ.
function MediaThumbnail({ url }) {
  const getDriveId = (link) => {
    const match = link.match(/\/d\/(.+?)\/|\/d\/(.+?)$|id=(.+?)&|id=(.+?)$/);
    return match ? match[1] || match[2] || match[3] || match[4] : null;
  };
  const id = getDriveId(url);
  const previewUrl = id
    ? `https://lh3.googleusercontent.com/d/${id}=s400`
    : url;
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="group relative block aspect-video bg-gray-100 rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition"
    >
      <img
        src={previewUrl}
        alt="Doc"
        className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://placehold.co/400x300?text=File+Media";
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition duration-300">
        <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/40">
          Buka File ↗
        </span>
      </div>
    </a>
  );
}

function StatBox({ label, val, color }) {
  const colors = {
    blue: "bg-blue-50 text-blue-700 border-blue-100",
    green: "bg-green-50 text-green-700 border-green-100",
    orange: "bg-orange-50 text-orange-700 border-orange-100",
  };
  return (
    <div className={`p-3 rounded-lg border ${colors[color] || colors.blue}`}>
      <div className="text-xl font-bold">{val || 0}</div>
      <div className="text-[10px] uppercase font-bold opacity-70">{label}</div>
    </div>
  );
}

function NarasiItem({ title, content, color = "gray" }) {
  const colors = {
    gray: "text-gray-700",
    green: "text-green-700",
    red: "text-red-700",
    blue: "text-blue-700",
  };
  return (
    <div>
      <h4 className={`font-bold text-sm mb-1 ${colors[color]}`}>{title}</h4>
      <p className="text-gray-600 text-sm bg-gray-50/50 p-3 rounded border border-gray-100 whitespace-pre-line leading-relaxed">
        {content || "-"}
      </p>
    </div>
  );
}
