import { Link } from "react-router-dom"; // 👈 1. Import Link

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-4 py-3 flex justify-center items-center">
        {/* 👇 2. Bungkus <img> dengan Link ke "/" */}
        <Link
          to="/"
          className="hover:opacity-80 transition-opacity cursor-pointer"
        >
          <img
            src="/logo.png"
            alt="Logo GREAT Edunesia & Dompet Dhuafa"
            className="h-12 object-contain"
          />
        </Link>
      </div>
      <div className="h-1 w-full bg-gradient-to-r from-green-600 to-green-400"></div>
    </header>
  );
}
