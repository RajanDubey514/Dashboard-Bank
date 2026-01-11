export default function KpiCard({ title, value }) {
  return (
    <div
      className="
        bg-white rounded-xl p-2
        cursor-pointer
        border-l-4 border-[var(--color-primary)]
        transition-all duration-300 ease-in-out
        hover:-translate-y-1
      "
      style={{
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      }}
    >
      <p className="text-xs text-[var(--color-primary)]">{title}</p>

      <p className="text-md font-bold  text-gray-800">
        {value}
      </p>
    </div>
  );
}
