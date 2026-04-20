export default function StatCard({ label, value, dark = false }) {
  return (
    <div className={`rounded-3xl p-4 ${dark ? 'bg-white/10' : 'border border-slate-200 bg-white'}`}>
      <div className={`text-sm ${dark ? 'text-slate-300' : 'text-slate-500'}`}>{label}</div>
      <div className={`mt-2 text-2xl font-semibold ${dark ? 'text-white' : 'text-slate-900'}`}>{value}</div>
    </div>
  );
}