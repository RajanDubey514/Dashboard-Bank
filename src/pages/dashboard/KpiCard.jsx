export default function KpiCard({ title, value }) {
  return (
    <div
      className="
        bg-white rounded-xl p-4
        cursor-pointer
        border-l-4 border-[var(--color-primary)]
        transition-all duration-300 ease-in-out
        hover:-translate-y-1
      "
      style={{
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      }}
    >
      <p className="text-xs text-gray-500">{title}</p>

      <p className="text-xl font-bold mt-1 text-gray-800">
        {value}
      </p>
    </div>
  );
}
