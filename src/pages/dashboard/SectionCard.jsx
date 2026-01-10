export default function SectionCard({ title, children, actions }) {
  return (
    <div
      className="
        bg-white rounded-xl
        shadow-sm
        transition-all duration-300 ease-in-out
        hover:shadow-lg hover:-translate-y-[3px]
      "

        style={{
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      }}
    >
      {/* Header */}
      <div className="px-4 py-2 rounded-t-xl bg-[var(--color-primary)] text-center">
        <h2 className="text-sm font-semibold text-white tracking-wide ">
          {title}
        </h2>
      </div>

      {/* Body */}
      <div className="p-4">
        {children}

        {actions && (
          <div className="flex flex-wrap gap-2 mt-4">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
