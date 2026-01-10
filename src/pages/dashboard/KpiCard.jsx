export default function KpiCard({ title, value }) {
  return (
    <div className="card">
      <p className="text-sm text-light">{title}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}
