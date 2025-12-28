import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const WILAYAH_COORD = {
  Aceh: [5.55, 95.32],
  Tamiang: [4.2328871, 98.0028892],
  Langsat: [3.9149904, 98.4291086],
  "Tapanuli Tengah": [1.691947, 98.8254711],
  Padang: [-0.8523712, 100.3443731],
  "Tanah Datar": [-0.4797043, 100.5746224],
  Malalo: [-0.5684129, 100.480202],
  Solok: [-0.9643838, 100.8903099],
  Agam: [-0.2209392, 100.1703257],
};

const iconMap = {
  "Sekolah Ceria (PSS)": "blue",
  "Training of Trainer": "green",
  "School Kit": "orange",
  "Bantuan Tunai": "red",
  "Distribusi Logistik": "violet",
  Assessment: "grey",
  Lainnya: "black",
};

function getIcon(color) {
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
}

export default function Map({ data }) {
  // Kunci Koordinat Box Sumatera (North West -> South East)
  const sumatraBounds = [
    [6.5, 94.0], // Pojok Kiri Atas (Utara Aceh)
    [-3.0, 103.0], // Pojok Kanan Bawah (Selatan Sumbar/Jambi)
  ];

  return (
    <MapContainer
      center={[1.5, 99.0]}
      zoom={6}
      minZoom={6}
      maxBounds={sumatraBounds} // 🔒 FITUR KUNCI MAP
      maxBoundsViscosity={1.0} // Map mental balik kalau ditarik keluar
      style={{ height: "450px", width: "100%" }}
      className="rounded-xl shadow-inner z-0 border border-gray-200"
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />

      {data.map((d, i) => {
        const coord =
          WILAYAH_COORD[d.wilayah] ||
          WILAYAH_COORD[
            Object.keys(WILAYAH_COORD).find(
              (k) => k.toLowerCase() === d.wilayah?.toLowerCase()
            )
          ];
        if (!coord) return null;

        const firstActivity = d.aktivitas
          ? d.aktivitas.split(",")[0].trim()
          : "Lainnya";
        const iconColor = iconMap[firstActivity] || "blue";

        return (
          <Marker key={i} position={coord} icon={getIcon(iconColor)}>
            <Popup className="custom-popup">
              <div className="p-1">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                  {d.tanggal ? d.tanggal.split("T")[0] : ""}
                </div>
                <h3 className="text-sm font-bold text-gray-800 mb-1">
                  {d.lokasi}
                </h3>
                <div className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full mb-2">
                  {firstActivity}
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs border-t pt-2 mt-1">
                  <div>
                    <span className="block text-gray-500">Total PM</span>
                    <span className="font-bold text-gray-800 text-sm">
                      {d.pm_total || 0}
                    </span>
                  </div>
                  <div>
                    <span className="block text-gray-500">School Kit</span>
                    {/* Highlight angka School Kit */}
                    <span className="font-bold text-orange-600 text-sm">
                      {d.school_kit || 0}
                    </span>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
