import React from "react";

const SelectBoxCommon = ({
  value,
  onChange,
  options = [],
}) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="
        w-full
        sm:w-full
        md:w-48
        lg:w-56
        xl:w-64
        px-3 py-2
        border rounded-lg text-sm shadow-sm
        outline-none
        focus:ring-2
        transition
      "
      style={{
        borderColor: "var(--color-primary)",
        "--tw-ring-color": "var(--color-primary)",
      }}
    >
      {options.map((item, index) => (
        <option key={index} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
};

export default SelectBoxCommon;
