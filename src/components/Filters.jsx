export default function Filters({ filters, setFilters }) {
  const wilayahOptions = [
    "Banda Aceh",
    "Bireuen",
    "Langsa",
    "Medan",
    "Langkat",
    "Tapanuli Tengah",
    "Padang",
    "Malalo",
    "Solok",
    "Agam",
    "Tanah Datar",
  ];

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
      <div className="flex flex-col md:flex-row gap-4 items-end">
        {/* Wilayah */}
        <div className="w-full md:w-1/4">
          <label className="block text-xs font-semibold text-gray-500 mb-1 ml-1 uppercase">
            Filter Wilayah
          </label>
          <select
            className="w-full bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            value={filters.wilayah}
            onChange={(e) =>
              setFilters((f) => ({ ...f, wilayah: e.target.value }))
            }
          >
            <option value="">Semua Wilayah</option>
            {wilayahOptions.map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>
        </div>

        {/* Aktivitas */}
        <div className="w-full md:w-1/4">
          <label className="block text-xs font-semibold text-gray-500 mb-1 ml-1 uppercase">
            Jenis Aktivitas
          </label>
          <select
            className="w-full bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            value={filters.aktivitas}
            onChange={(e) =>
              setFilters((f) => ({ ...f, aktivitas: e.target.value }))
            }
          >
            <option value="">Semua Aktivitas</option>
            <option>Sekolah Ceria (PSS)</option>
            <option>Distribusi Logistik</option>
            <option>Bantuan Tunai</option>
            <option>Assessment</option>
            <option>Training of Trainer</option>
          </select>
        </div>

        {/* Date Range */}
        <div className="w-full md:w-2/4 grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1 ml-1 uppercase">
              Dari Tanggal
            </label>
            <input
              type="date"
              className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={filters.from}
              onChange={(e) =>
                setFilters((f) => ({ ...f, from: e.target.value }))
              }
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1 ml-1 uppercase">
              Sampai Tanggal
            </label>
            <input
              type="date"
              className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={filters.to}
              onChange={(e) =>
                setFilters((f) => ({ ...f, to: e.target.value }))
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
