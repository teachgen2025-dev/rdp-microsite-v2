import Filters from "../components/Filters";
import StatsGrid from "../components/StatsGrid"; // Pastikan ini sudah StatsGrid
import Table from "../components/Table";
import Map from "../components/Map";
import LoadingSpinner from "../components/LoadingSpinner";
import { fetchReports } from "../api";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    wilayah: "",
    aktivitas: "",
    from: "",
    to: "",
  });

  useEffect(() => {
    setLoading(true); // 👈 3. Set loading TRUE sebelum mulai fetch
    fetchReports(filters)
      .then((res) => {
        setData(res);
        // setLoading(false) dipindah ke finally biar aman
      })
      .catch((err) => {
        console.error("Gagal fetch data:", err);
        // Handle error visual jika perlu
      })
      .finally(() => {
        setLoading(false); // 👈 4. Set loading FALSE setelah selesai (sukses/gagal)
      });
  }, [filters]);

  return (
    <div className="bg-gray-50 min-h-screen pb-12 relative">
      {/* Background Header */}
      <div className="bg-blue-900 h-64 w-full absolute top-0 left-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-purple-900 opacity-90"></div>
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-6">
        {/* Header Judul & Filter tetap muncul di awal */}
        <div className="mb-8 text-white">
          <h1 className="text-3xl font-bold tracking-tight">
            Command Center RDP
          </h1>
          <p className="text-blue-100 mt-1">
            Real-time Situation Report & Monitoring (Sumatera Region)
          </p>
        </div>
        <Filters filters={filters} setFilters={setFilters} />
        {/* 👇 5. LOGIKA CONDITIONAL RENDERING */}
        {loading ? (
          // Tampilkan Spinner jika loading = true
          <LoadingSpinner />
        ) : (
          // Tampilkan Konten Dashboard jika loading = false
          <>
            {/* Statistik Grid (Cards) */}
            <StatsGrid data={data} />

            {/* Main Content Grid: Map & Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* MAP SECTION */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-gray-800 flex items-center">
                      <span className="w-2 h-6 bg-blue-600 rounded mr-2"></span>
                      Peta Sebaran Aktivitas
                    </h2>
                    <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded text-gray-500">
                      Live Mode
                    </span>
                  </div>
                  <Map data={data} />
                  {/* Legend Map */}
                  <div className="mt-4 flex flex-wrap gap-2 justify-center text-xs text-gray-500">
                    <span className="flex items-center">
                      <span className="w-2 h-2 rounded-full bg-blue-500 mr-1"></span>{" "}
                      PSS
                    </span>
                    <span className="flex items-center">
                      <span className="w-2 h-2 rounded-full bg-green-500 mr-1"></span>{" "}
                      ToT
                    </span>
                    <span className="flex items-center">
                      <span className="w-2 h-2 rounded-full bg-orange-500 mr-1"></span>{" "}
                      School Kit
                    </span>
                    <span className="flex items-center">
                      <span className="w-2 h-2 rounded-full bg-red-500 mr-1"></span>{" "}
                      Cash
                    </span>
                    <span className="flex items-center">
                      <span className="w-2 h-2 rounded-full bg-violet-500 mr-1"></span>{" "}
                      Logistik
                    </span>
                  </div>
                </div>
              </div>

              {/* RECENT ACTIVITY SECTION (Sedikit saya rapikan tampilannya) */}
              <div className="lg:col-span-1">
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 h-full max-h-[600px] overflow-y-auto custom-scrollbar">
                  <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2 sticky top-0 bg-white z-10">
                    Aktivitas Terbaru
                  </h2>
                  <div className="space-y-4 pt-2">
                    {/* Ambil 10 data terakhir */}
                    {data
                      .slice()
                      .reverse()
                      .slice(0, 10)
                      .map((d, i) => {
                        const isSchoolKit =
                          d.aktivitas && d.aktivitas.includes("School Kit");
                        return (
                          <div
                            key={i}
                            className="flex gap-3 pb-3 border-b border-gray-50 last:border-0 relative"
                          >
                            {/* Garis timeline */}
                            {i !==
                              data.slice().reverse().slice(0, 10).length -
                                1 && (
                              <div className="absolute left-[5px] top-3 h-full w-[2px] bg-gray-100 -z-10"></div>
                            )}
                            <div className="flex-shrink-0 mt-1 z-0">
                              <div
                                className={`w-3 h-3 rounded-full ring-4 ring-white ${
                                  isSchoolKit ? "bg-orange-500" : "bg-blue-500"
                                }`}
                              ></div>
                            </div>
                            <div className="w-full">
                              <div className="flex justify-between items-start">
                                <p className="text-sm font-bold text-gray-700 line-clamp-1">
                                  {d.aktivitas || "Aktivitas belum diisi"}
                                </p>
                                <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2">
                                  {d.tanggal
                                    ? new Date(d.tanggal).toLocaleDateString(
                                        "id-ID",
                                        { day: "numeric", month: "short" }
                                      )
                                    : "-"}
                                </span>
                              </div>
                              <p className="text-xs text-gray-500 mb-1 font-medium truncate">
                                {d.lokasi}
                              </p>

                              {/* Badges */}
                              <div className="flex gap-2 mt-2">
                                {Number(d.pm_total) > 0 && (
                                  <span className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded font-medium">
                                    👥 PM: {d.pm_total}
                                  </span>
                                )}
                                {Number(d.school_kit) > 0 && (
                                  <span className="text-[10px] bg-orange-50 text-orange-600 px-1.5 py-0.5 rounded font-medium">
                                    📦 {d.school_kit} Kit
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    {data.length === 0 && (
                      <div className="text-gray-400 text-sm text-center py-10 flex flex-col items-center">
                        <span className="text-2xl mb-2">📭</span>Belum ada
                        laporan masuk hari ini.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Detail Table */}
            <div className="mt-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-10">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <span className="w-2 h-6 bg-purple-600 rounded mr-2"></span>
                Rincian Laporan Lapangan
              </h2>
              <Table data={data} />
            </div>
          </>
        )}{" "}
        {/* End Conditional Rendering */}
      </div>
    </div>
  );
}
