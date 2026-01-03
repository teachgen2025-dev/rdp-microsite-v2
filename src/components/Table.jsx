// src/components/Table.jsx
import React from "react";

export default function Table({ data, onRowClick }) {
  if (!data || data.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        Belum ada data laporan.
      </div>
    );
  }

  // Ambil header dari keys data pertama (kecuali field tertentu yg panjang/hidden)
  // Atau definisikan manual biar rapi
  const headers = [
    { key: "tanggal", label: "Tanggal" },
    { key: "wilayah", label: "Wilayah" },
    { key: "relawan", label: "Relawan" },
    { key: "aktivitas", label: "Aktivitas" },
    { key: "pm_total", label: "PM Total" },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-600 text-xs uppercase tracking-wider border-b border-gray-200">
            {headers.map((h) => (
              <th key={h.key} className="p-4 font-bold">
                {h.label}
              </th>
            ))}
            <th className="p-4 font-bold text-right">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-sm">
          {data.map((row, idx) => (
            <tr
              key={idx}
              // INI KUNCINYA AGAR MODAL MUNCUL 👇
              onClick={() => onRowClick && onRowClick(row)}
              className="hover:bg-purple-50 cursor-pointer transition-colors group"
            >
              <td className="p-4 font-medium text-gray-900">
                {row.tanggal ? row.tanggal.split("T")[0] : "-"}
                <div className="text-xs text-gray-400">{row.waktu}</div>
              </td>
              <td className="p-4 text-gray-600">{row.wilayah}</td>
              <td className="p-4 text-gray-800 font-bold">{row.relawan}</td>
              <td className="p-4 text-gray-600 max-w-xs truncate">
                {row.aktivitas}
              </td>
              <td className="p-4">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-bold">
                  {row.pm_total}
                </span>
              </td>
              <td className="p-4 text-right">
                <button className="text-purple-600 font-bold text-xs border border-purple-200 px-3 py-1 rounded hover:bg-purple-600 hover:text-white transition">
                  Lihat
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
