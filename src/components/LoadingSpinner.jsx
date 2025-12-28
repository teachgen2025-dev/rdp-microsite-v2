export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-8">
      {/* Container Spinner dengan Border Gradient Berputar */}
      <div className="relative w-20 h-20 animate-spin rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-[3px]">
        {/* Bagian Tengah Putih Diam */}
        <div className="flex h-full w-full rounded-full bg-gray-50 items-center justify-center">
          {/* Titik Tengah Berdenyut */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-400 to-purple-600 animate-pulse opacity-80"></div>
        </div>
      </div>

      {/* Teks Loading di bawahnya */}
      <p className="mt-6 text-gray-500 font-semibold animate-pulse tracking-wide">
        Menghubungkan ke Satelit RDP...
      </p>
      <p className="text-xs text-gray-400 mt-2">
        Mohon tunggu sebentar, sedang mengambil data terbaru.
      </p>
    </div>
  );
}
