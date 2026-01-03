// src/api.js
const API_URL =
  "https://script.google.com/macros/s/AKfycbzTKr0URWTrcPz1CmKX-T3nM4PDgqeaz0BqLrXux-nTlSaNdv9ocrZl9ab4wpZm8TA/exec"; // PASTIKAN PAKAI URL DEPLOY TERBARU

export async function fetchReports(filters = {}) {
  const params = new URLSearchParams(filters).toString();
  const res = await fetch(`${API_URL}?action=reports&${params}`);
  return res.json();
}

export async function fetchMedia() {
  const res = await fetch(`${API_URL}?action=media`);
  return res.json();
}

export async function fetchGallery() {
  const res = await fetch(`${API_URL}?action=gallery`);
  return res.json();
}
