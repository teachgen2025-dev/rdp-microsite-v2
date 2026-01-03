import React, { useEffect, useState } from "react";
import { fetchMedia } from "../api";

export default function Media() {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMedia().then((res) => {
      setMedia(res);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Kabar Media
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Kumpulan berita dan publikasi terkait aktivitas respon darurat di
            berbagai media.
          </p>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {media.map((m, i) => (
              <a
                key={i}
                href={m["Link Tautan"]}
                target="_blank"
                rel="noreferrer"
                className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full hover:-translate-y-1"
              >
                <div className="h-56 overflow-hidden bg-gray-200 relative">
                  <img
                    src={m["Link Gambar/Thumbnail"] || "/logo.png"}
                    alt={m["Judul"]}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 px-3 py-1 text-xs font-bold rounded-full shadow-sm text-purple-700">
                    MEDIA
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="font-bold text-gray-800 text-xl mb-3 line-clamp-2 group-hover:text-purple-700 transition">
                    {m["Judul"]}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-3 mb-4 flex-grow">
                    {m["Deskripsi Singkat"]}
                  </p>
                  <span className="text-sm font-semibold text-purple-600 flex items-center mt-auto">
                    Baca Selengkapnya
                    <svg
                      className="w-4 h-4 ml-1 group-hover:translate-x-1 transition"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      ></path>
                    </svg>
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
