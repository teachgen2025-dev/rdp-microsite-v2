const API_URL =
  "https://script.google.com/macros/s/AKfycbzTKr0URWTrcPz1CmKX-T3nM4PDgqeaz0BqLrXux-nTlSaNdv9ocrZl9ab4wpZm8TA/exec";

export async function fetchReports(filters = {}) {
  const params = new URLSearchParams(filters).toString();
  const res = await fetch(`${API_URL}?${params}`);
  return res.json();
}
