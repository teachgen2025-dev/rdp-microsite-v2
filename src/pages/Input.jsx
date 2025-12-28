import FormLaporan from "../components/FormLaporan";

export default function Input() {
  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4">
      {/* Form Laporan sudah mandiri, tidak perlu card wrapper lagi di sini */}
      <FormLaporan />
    </div>
  );
}
