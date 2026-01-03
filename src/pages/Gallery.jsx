import React, { useEffect, useState } from "react";
import { fetchGallery } from "../api";

export default function Gallery() {
  const [gallery, setGallery] = useState({ aceh: [], sumut: [], sumbar: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGallery().then((res) => {
      setGallery(res);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-white pt-20 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Dokumentasi Lapangan
          </h1>
          <p className="text-gray-500">
            Arsip foto kegiatan relawan di berbagai wilayah intervensi.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        ) : (
          <div className="space-y-16">
            <GalleryRow
              title="Wilayah Aceh"
              data={gallery.aceh}
              color="purple"
            />
            <GalleryRow
              title="Wilayah Sumatera Utara"
              data={gallery.sumut}
              color="green"
            />
            <GalleryRow
              title="Wilayah Sumatera Barat"
              data={gallery.sumbar}
              color="orange"
            />
          </div>
        )}
      </div>
    </div>
  );
}

// Komponen Helper untuk Baris Gallery
function GalleryRow({ title, data, color }) {
  if (!data || data.length === 0) return null;

  return (
    <div className="animate-fade-in-up">
      <div className="flex items-center gap-4 mb-6">
        <div className={`w-2 h-8 bg-${color}-600 rounded-full`}></div>
        <h3 className={`text-2xl font-bold text-${color}-800`}>{title}</h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {data.map((item, idx) => (
          <div
            key={idx}
            className="aspect-square relative group overflow-hidden rounded-xl bg-gray-100 cursor-pointer shadow-sm hover:shadow-lg transition-all"
          >
            <img
              src={item.thumbnail}
              alt="Doc"
              className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="bg-white/20 backdrop-blur-sm border border-white text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-white hover:text-black transition"
              >
                Lihat Foto
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
