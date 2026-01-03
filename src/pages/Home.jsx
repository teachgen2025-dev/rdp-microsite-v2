import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden relative bg-gray-900">
      {/* Background Image & Overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: "url('/header-bg.jpg')" }}
      ></div>
      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-900/90 via-purple-900/90 to-gray-900/90"></div>

      {/* Content Hero */}
      <div className="relative z-10 max-w-5xl mx-auto space-y-10 animate-fade-in-up py-12">
        {/* Logo & Judul */}
        <div>
          <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 text-white text-xs font-bold tracking-[0.2em] mb-6 border border-white/20 backdrop-blur-md uppercase">
            RDP Sumatera Region
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-none drop-shadow-lg">
            Respon Darurat <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
              Pendidikan
            </span>
          </h1>
          <p className="mt-6 text-xl text-blue-100 max-w-2xl mx-auto font-light leading-relaxed">
            Platform pusat data terpadu untuk monitoring, pelaporan lapangan,
            dan publikasi kegiatan pemulihan pasca bencana.
          </p>
        </div>

        {/* --- 4 MENU UTAMA --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 w-full mt-8">
          {/* 1. Command Center */}
          <MenuCard
            to="/dashboard"
            color="blue"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            }
            title="Command Center"
            desc="Dashboard Data Realtime"
          />

          {/* 2. Input Laporan */}
          <MenuCard
            to="/input"
            color="orange"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            }
            title="Input Laporan"
            desc="Form Laporan Relawan"
          />

          {/* 3. Kabar Media (Link Halaman Baru) */}
          <MenuCard
            to="/media"
            color="purple"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
            }
            title="Kabar Media"
            desc="Berita & Publikasi"
          />

          {/* 4. Gallery (Link Halaman Baru) */}
          <MenuCard
            to="/gallery"
            color="green"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            }
            title="Gallery Foto"
            desc="Dokumentasi Wilayah"
          />
        </div>
      </div>
    </div>
  );
}

// Component Kecil untuk Kartu Menu (Biar Rapi)
function MenuCard({ to, color, icon, title, desc }) {
  // Map warna string ke class Tailwind yang valid
  const colors = {
    blue: "bg-blue-500 group-hover:bg-blue-600",
    orange: "bg-orange-500 group-hover:bg-orange-600",
    purple: "bg-purple-500 group-hover:bg-purple-600",
    green: "bg-green-500 group-hover:bg-green-600",
  };

  return (
    <Link
      to={to}
      className="group relative bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-white/30 flex flex-col items-center text-center"
    >
      <div
        className={`p-4 rounded-2xl text-white shadow-lg mb-4 transition-transform duration-300 group-hover:scale-110 ${
          colors[color] || "bg-gray-500"
        }`}
      >
        {icon}
      </div>
      <h3 className="font-bold text-white text-lg tracking-wide mb-1">
        {title}
      </h3>
      <p className="text-white/60 text-sm">{desc}</p>
    </Link>
  );
}
