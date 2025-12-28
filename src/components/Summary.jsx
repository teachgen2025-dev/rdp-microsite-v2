export default function Summary({ data }) {
  const totalKegiatan = data.length;
  const totalJumlah = data.reduce((a, b) => a + Number(b.jumlah || 0), 0);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
      <Card title="Total Kegiatan" value={totalKegiatan} />
      <Card title="Total Peserta / Item" value={totalJumlah} />
      <Card
        title="Wilayah Aktif"
        value={[...new Set(data.map((d) => d.wilayah))].length}
      />
      <Card
        title="Aktivitas"
        value={[...new Set(data.map((d) => d.aktivitas))].length}
      />
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-3xl font-semibold mt-1">{value}</div>
    </div>
  );
}
