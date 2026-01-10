export default function SectionCard({ title, children, actions }) {
  return (
    <div className="card">
      <h2 className="text-base font-semibold border-b pb-2 mb-4">
        {title}
      </h2>

      {children}

      {actions && (
        <div className="flex flex-wrap gap-2 mt-4">
          {actions}
        </div>
      )}
    </div>
  );
}
