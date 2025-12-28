import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Input from "./pages/Input";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header"; // Import Header
import Footer from "./components/Footer"; // Import Footer

export default function App() {
  return (
    <BrowserRouter>
      {/* Wrapper flex agar footer selalu di bawah (sticky bottom) */}
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Header />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/input" element={<Input />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
