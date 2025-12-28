export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto py-6 bg-gray-50 border-t border-gray-200">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <p className="text-gray-500 text-sm">
          &copy; {currentYear} GREAT Edunesia - Dompet Dhuafa. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
