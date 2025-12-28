function formatGoogleDriveUrl(url) {
  if (!url) return "";
  const stringUrl = String(url);
  const idMatch = stringUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (idMatch && idMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${idMatch[1]}`;
  }
  return stringUrl;
}

export default function Table({ data }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="w-full text-sm text-left text-gray-600 bg-white">
        <thead className="bg-gray-50 text-xs text-gray-700 uppercase tracking-wider">
          <tr>
            <th className="px-4 py-3 border-b">Waktu</th>
            <th className="px-4 py-3 border-b">Wilayah & Lokasi</th>
            <th className="px-4 py-3 border-b">Aktivitas</th>
            <th className="px-4 py-3 border-b text-center">Detail PM</th>
            <th className="px-4 py-3 border-b">Relawan</th>
            <th className="px-4 py-3 border-b text-center">Foto</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.map((d, i) => (
            <tr key={i} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="font-medium text-gray-900">
                  {d.tanggal ? d.tanggal.split("T")[0] : "-"}
                </div>
                <div className="text-xs text-gray-400">
                  {d.waktu || "00:00"} WIB
                </div>
              </td>

              <td className="px-4 py-3">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800 mb-1">
                  {d.wilayah}
                </span>
                <div
                  className="text-xs text-gray-500 truncate max-w-[150px]"
                  title={d.lokasi}
                >
                  {d.lokasi}
                </div>
              </td>

              <td className="px-4 py-3 max-w-[200px]">
                <div className="text-xs font-medium text-gray-800">
                  {d.aktivitas}
                </div>
              </td>

              <td className="px-4 py-3 text-center">
                <div className="flex flex-col items-center">
                  <span className="font-bold text-gray-900 text-base">
                    {d.pm_total || 0}
                  </span>
                  <div className="text-[10px] text-gray-400 flex gap-1 mt-1">
                    <span title="Siswa">S:{d.pm_siswa || 0}</span>
                    <span title="Guru">G:{d.pm_guru || 0}</span>
                    <span title="Ortu">O:{d.pm_ortu || 0}</span>
                  </div>
                </div>
              </td>

              <td className="px-4 py-3">
                <div className="flex flex-col gap-1">
                  <div className="text-xs">
                    <span className="text-gray-500">Relawan:</span>{" "}
                    <span className="font-medium">{d.jumlah_relawan || 0}</span>
                  </div>
                  {/* Tampilkan School Kit jika ada datanya (> 0) */}
                  {Number(d.school_kit) > 0 && (
                    <div className="text-xs bg-orange-100 text-orange-800 px-1.5 py-0.5 rounded w-fit border border-orange-200">
                      📦 {d.school_kit} Kit
                    </div>
                  )}
                </div>
              </td>

              <td className="px-4 py-3">
                <div className="flex -space-x-2 overflow-hidden justify-center">
                  {[d.foto_1, d.foto_2, d.foto_3]
                    .filter(Boolean)
                    .map((f, idx) => (
                      <div key={idx} className="relative group">
                        <img
                          src={formatGoogleDriveUrl(f)}
                          className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover cursor-pointer hover:z-10"
                          alt="Bukti"
                          referrerPolicy="no-referrer"
                        />
                        {/* --- FLOATING HOVER IMAGE --- */}
                        <div className="hidden group-hover:block fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[480px] p-2 bg-white rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-gray-200 z-[9999]">
                          <img
                            src={formatGoogleDriveUrl(f)}
                            className="w-full h-auto rounded"
                            alt="Zoom Preview"
                            referrerPolicy="no-referrer"
                          />
                          <div className="text-center text-xs text-gray-500 mt-2">
                            Lokasi: {d.lokasi}
                          </div>
                        </div>
                      </div>
                    ))}
                  {!d.foto_1 && !d.foto_2 && !d.foto_3 && (
                    <span className="text-xs text-gray-300">-</span>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
