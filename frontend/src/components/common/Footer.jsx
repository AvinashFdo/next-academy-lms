export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container-page flex flex-col gap-3 py-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
        <div>© 2026 NEXT Academy. Frontend prototype build.</div>
        <div className="flex gap-4">
          <span>About Us</span>
          <span>Privacy Policy</span>
          <span>Terms</span>
          <span>Contact</span>
        </div>
      </div>
    </footer>
  );
}