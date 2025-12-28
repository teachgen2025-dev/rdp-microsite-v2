// Komponen Icon Sederhana (SVG)
const Icons = {
  User: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  School: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 10v6M2 10v6" />
      <path d="M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),
  Teacher: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  Home: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  Hand: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17" />
      <path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
      <path d="m2 13 6 6" />
    </svg>
  ),
  Activity: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  Box: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  ),
};

export default function StatsGrid({ data }) {
  // Menghitung Total secara aman (handle jika data kosong/undefined)
  const sum = (field) =>
    data.reduce((acc, curr) => acc + (Number(curr[field]) || 0), 0);

  const stats = [
    {
      title: "Total Penerima Manfaat",
      value: sum("pm_total"),
      icon: <Icons.User />,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Siswa Terbantu",
      value: sum("pm_siswa"),
      icon: <Icons.School />,
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "School Kit",
      value: sum("school_kit"),
      icon: <Icons.Box />,
      color: "from-orange-500 to-orange-600",
    },
    {
      title: "Guru Terbantu",
      value: sum("pm_guru"),
      icon: <Icons.Teacher />,
      color: "from-pink-500 to-pink-600",
    },
    {
      title: "Orang Tua / Wali",
      value: sum("pm_ortu"),
      icon: <Icons.Home />,
      color: "from-orange-500 to-orange-600",
    },
    {
      title: "Total Kegiatan",
      value: data.length,
      icon: <Icons.Activity />,
      color: "from-emerald-500 to-emerald-600",
    },
    {
      title: "Relawan Terlibat",
      value: sum("jumlah_relawan"),
      icon: <Icons.Hand />,
      color: "from-indigo-500 to-indigo-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="relative bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden"
        >
          {/* Background Gradient Accents */}
          <div
            className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${stat.color}`}
          ></div>

          <div className="flex justify-between items-start mb-2">
            <div
              className={`p-2 rounded-lg bg-gray-50 text-gray-600 group-hover:text-white group-hover:bg-gradient-to-br ${stat.color} transition-colors duration-300`}
            >
              {stat.icon}
            </div>
          </div>

          <div className="mt-2">
            <h3 className="text-2xl font-bold text-gray-800 tracking-tight">
              {stat.value.toLocaleString("id-ID")}
            </h3>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mt-1">
              {stat.title}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
